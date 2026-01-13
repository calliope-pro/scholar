import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "東京科学大学奨学金検索サイト",
  description:
    "東京科学大学(東工大)奨学金サイトの情報をより見やすく整理し、効率的に検索できるようにしたサイトです。学部生・大学院生向けの給付型奨学金、貸与型奨学金情報を網羅。",
  keywords: [
    "東工大",
    "東京科学大学",
    "科学大",
    "東科大",
    "奨学金",
    "scholarship",
    "学費",
    "給付型奨学金",
    "貸与型奨学金",
    "学部生",
    "大学院生",
    "博士課程",
    "修士課程",
    "理工系",
    "研究支援",
    "学生支援",
    "Tokyo Tech",
    "Science Tokyo",
    "financial aid",
    "学習支援",
    "教育費",
    "研究費"
  ],
  authors: [{ name: "東京科学大学奨学金検索" }],
  creator: "東京科学大学奨学金検索",
  publisher: "東京科学大学奨学金検索",
  category: "education",
  verification: {
    google: "ZKNc4TClIndQoBaMwx0x_lwgtUan6NgA3ix8adRSbik",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/favicons/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/favicons/site.webmanifest",
  alternates: {
    canonical: "https://science-tokyo-scholar.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://science-tokyo-scholar.vercel.app",
    siteName: "東京科学大学奨学金検索",
    title: "東京科学大学奨学金検索 | 東京科学大学 奨学金データベース",
    description: "東京科学大学(東工大)の奨学金情報を効率的に検索できるサービスです。学部生・大学院生向けの給付型・貸与型奨学金情報を網羅。",
    images: [
      {
        url: "https://science-tokyo-scholar.vercel.app/logo.png",
        width: 380,
        height: 90,
        alt: "東京科学大学奨学金検索",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "東京科学大学奨学金検索 | 東京科学大学 奨学金データベース",
    description: "東京科学大学(東工大)の奨学金情報を効率的に検索できるサービスです。",
    images: ["https://science-tokyo-scholar.vercel.app/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1A4D7C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.titech.ac.jp" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="h-full bg-base-cream">
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5059912395081075"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://science-tokyo-scholar.vercel.app/#website",
                  name: "東京科学大学奨学金検索",
                  alternateName: "東京科学大学 奨学金データベース",
                  description: "東京科学大学(東工大)の奨学金情報を効率的に検索できるサービスです。学部生・大学院生向けの給付型・貸与型奨学金情報を網羅。",
                  url: "https://science-tokyo-scholar.vercel.app",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://science-tokyo-scholar.vercel.app/?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  },
                  publisher: {
                    "@id": "https://science-tokyo-scholar.vercel.app/#organization"
                  },
                  about: {
                    "@id": "https://science-tokyo-scholar.vercel.app/#educationalorganization"
                  },
                  keywords: "東工大,東京科学大学,奨学金,scholarship,学費,給付型奨学金,貸与型奨学金,学部生,大学院生,博士課程,修士課程,理工系,研究支援,学生支援,Tokyo Tech,Science Tokyo,financial aid"
                },
                {
                  "@type": "Organization",
                  "@id": "https://science-tokyo-scholar.vercel.app/#organization",
                  name: "東京科学大学奨学金検索",
                  url: "https://science-tokyo-scholar.vercel.app",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://science-tokyo-scholar.vercel.app/logo.png"
                  }
                },
                {
                  "@type": "EducationalOrganization",
                  "@id": "https://science-tokyo-scholar.vercel.app/#educationalorganization",
                  name: "東京科学大学",
                  alternateName: ["東京科学大学(東工大)", "Tokyo Institute of Technology", "Tokyo Tech", "Science Tokyo"],
                  url: "https://www.titech.ac.jp/",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "JP",
                    addressRegion: "東京都",
                    addressLocality: "目黒区"
                  }
                },
                {
                  "@type": "Service",
                  "@id": "https://science-tokyo-scholar.vercel.app/#service",
                  name: "奨学金検索サービス",
                  description: "東京科学大学(東工大)の学生向け奨学金検索・フィルタリングサービス",
                  provider: {
                    "@id": "https://science-tokyo-scholar.vercel.app/#organization"
                  },
                  serviceType: "奨学金検索サービス",
                  areaServed: {
                    "@type": "Place",
                    name: "日本",
                    address: {
                      "@type": "PostalAddress",
                      addressCountry: "JP"
                    }
                  },
                  audience: {
                    "@type": "EducationalAudience",
                    educationalRole: ["学部生", "大学院生", "博士課程学生", "修士課程学生"]
                  }
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
