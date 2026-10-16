import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.fullName,
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
      { url: '/kings-crown.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/kings-crown-32.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/kings-crown-180.png', sizes: '180x180', type: 'image/png' }],
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
      <body className="bg-background font-sans text-foreground antialiased">
        <JsonLd data={organizationSchema()} />
        <Header />
        {children}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

