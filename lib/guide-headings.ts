export interface GuideHeading {
  id: string;
  text: string;
  depth: number;
}

interface MarkdownNode {
  type: string;
  depth?: number;
  value?: string;
  children?: MarkdownNode[];
  data?: { hProperties?: Record<string, unknown>; [key: string]: unknown };
}

function headingText(node: MarkdownNode): string {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  return (node.children ?? []).map(headingText).join('');
}

/** One AST pass supplies both rendered anchors and the matching navigation. */
export function guideHeadingPlugin(headings: GuideHeading[]) {
  return function plugin() {
    return function transform(tree: MarkdownNode) {
      const used = new Set<string>();
      function visit(node: MarkdownNode) {
        if (node.type === 'heading' && (node.depth === 2 || node.depth === 3)) {
          const text = headingText(node).trim();
          const base = text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
            .replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
          let id = base;
          let suffix = 2;
          while (used.has(id)) id = `${base}-${suffix++}`;
          used.add(id);
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
          headings.push({ id, text, depth: node.depth });
        }
        for (const child of node.children ?? []) visit(child);
      }
      visit(tree);
    };
  };
}
