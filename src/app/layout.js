import Script from 'next/script';

export const metadata = {
  title: 'EcoVibe | Sustainable Living & Green Lifestyle Tips',
  description: 'Discover eco-friendly products, sustainable living tips, and green lifestyle guides. Join the EcoVibe community and make a positive impact on the planet.',
  keywords: ['eco friendly', 'sustainable living', 'green lifestyle', 'zero waste', 'eco products', 'environmental tips', 'sustainability', 'climate action', 'eco vibe'],
  authors: [{ name: 'EcoVibe' }],
  other: {
    'google-adsense-account': 'ca-pub-7322019754286753'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    title: 'EcoVibe | Sustainable Living & Green Lifestyle Tips',
    description: 'Eco-friendly products, sustainable living guides, and green lifestyle inspiration. Make a difference with EcoVibe.',
    siteName: 'EcoVibe',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoVibe | Sustainable Living & Green Lifestyle',
    description: 'Eco-friendly products, zero waste tips, and green lifestyle guides — all on EcoVibe.',
  },
}

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EcoVibe",
    "description": "Discover eco-friendly products, sustainable living tips, and green lifestyle guides. Join the EcoVibe community and make a positive impact on the planet.",
    "url": "https://eco-vibe.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://eco-vibe.vercel.app?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7322019754286753"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
