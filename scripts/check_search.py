#!/usr/bin/env python3
"""Check rendered search metadata on every sitemap URL. Standard library only."""
import argparse
import concurrent.futures
import datetime
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

DOMAIN = 'https://kingsgoldguides.com'


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.title = ''
        self.description = ''
        self.canonical = ''
        self.robots = ''
        self.h1 = 0
        self.schemas = []
        self.inside_title = False
        self.inside_schema = False
        self.schema_text = ''
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title': self.inside_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'meta':
            if attrs.get('name') == 'description': self.description = attrs.get('content', '')
            if attrs.get('name') in ('robots', 'googlebot'): self.robots += attrs.get('content', '') + ' '
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical = attrs.get('href', '')
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.inside_schema = True
            self.schema_text = ''

    def handle_data(self, data):
        if self.inside_title: self.title += data
        if self.inside_schema: self.schema_text += data

    def handle_endtag(self, tag):
        if tag == 'title': self.inside_title = False
        if tag == 'script' and self.inside_schema:
            self.schemas.append(json.loads(self.schema_text))
            self.inside_schema = False


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'KingsGoldGuides-SearchCheck/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        return {'status': response.status, 'headers': dict(response.headers), 'text': response.read().decode()}


def audit(pages):
    errors, titles, videos = [], {}, 0
    for url, response in pages.items():
        try:
            assert response['status'] == 200, f"HTTP {response['status']}"
            headers = {key.lower(): value for key, value in response.get('headers', {}).items()}
            assert 'noindex' not in headers.get('x-robots-tag', '').lower(), 'HTTP noindex'
            page = Page(response['text'])
            assert page.title.strip() and page.title != 'Kings Gold Guides', 'Missing specific search title'
            assert page.description.strip(), 'Missing description'
            assert page.canonical.rstrip('/') == url.rstrip('/'), f'Incorrect canonical: {page.canonical}'
            assert 'noindex' not in page.robots.lower(), 'Meta noindex'
            assert page.h1 == 1, f'Expected one H1, found {page.h1}'
            assert page.title not in titles, f'Duplicate title with {titles.get(page.title)}'
            titles[page.title] = url
            for data in page.schemas:
                if data.get('@type') != 'VideoObject': continue
                videos += 1
                for key in ('name', 'description', 'thumbnailUrl', 'embedUrl', 'uploadDate'):
                    assert data.get(key), f'VideoObject missing {key}'
                timestamp = data['uploadDate']
                assert re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})', timestamp), 'Invalid VideoObject timestamp'
                assert datetime.datetime.fromisoformat(timestamp.replace('Z', '+00:00')).tzinfo is not None
                assert not data.get('contentUrl', '').startswith('https://www.youtube.com/watch'), 'HTML watch page used as raw video file'
        except (AssertionError, ValueError, KeyError) as error:
            errors.append(f'{url}: {error}')
    return errors, videos


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--snapshot', type=Path, help='Audit previously fetched responses in a JSON file')
    args = parser.parse_args()
    if args.snapshot:
        pages = json.loads(args.snapshot.read_text())
    else:
        root = ET.fromstring(fetch(DOMAIN + '/sitemap.xml')['text'])
        urls = [node.text for node in root.findall('.//{*}loc')]
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            pages = dict(zip(urls, pool.map(fetch, urls)))
    errors, videos = audit(pages)
    for error in errors: print(error, file=sys.stderr)
    print(f'{len(pages)} pages checked; {videos} video schemas; {len(errors)} errors.')
    return bool(errors)


if __name__ == '__main__':
    sys.exit(main())
