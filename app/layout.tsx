import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const analyticsId = 'G-9D2KRKSGEH'
const analyticsEnabled = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.fullName,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  other: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ? { 'google-adsense-account': `ca-${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}` } : {},
  keywords: [
    'WoW gold guide',
    'World of Warcraft gold farming',
    'auction house flipping',
    'gold per hour',
    'WoW economy',
    'King Kunta',
  ],
  openGraph: {
    type: 'website',
    siteName: siteConfig.fullName,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.domain,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: '/king-k-logo.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/king-k-icon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/king-k-icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico?v=king-k',
    apple: [{ url: '/king-k-apple-180.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#252118' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        {analyticsEnabled && (
          <>
            <Script id="kgg-google-tag-defaults" strategy="beforeInteractive">{`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
              window['ga-disable-${analyticsId}'] = true;
              window.gtag('consent', 'default', {
                analytics_storage: 'denied', ad_storage: 'denied',
                ad_user_data: 'denied', ad_personalization: 'denied'
              });
            `}</Script>
            <Script id="kgg-google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
          </>
        )}
      </head>
      <body className="bg-background font-sans text-foreground antialiased">
        <JsonLd data={organizationSchema()} />
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics measurementId={analyticsId} enabled={analyticsEnabled} />
      </body>
    </html>
  )
}


