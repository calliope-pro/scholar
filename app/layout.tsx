import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "東工大奨学金検索サイト",
  description:
    "東工大（東京科学大学）奨学金サイトの情報をより見やすく整理し、効率的に検索できるようにしたサイトです。学部生・大学院生向けの給付型奨学金、貸与型奨学金情報を網羅。",
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
  authors: [{ name: "東工大奨学金検索" }],
  creator: "東工大奨学金検索",
  publisher: "東工大奨学金検索",
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
  other: {
    "msapplication-TileColor": "#0c2840",
  },
  alternates: {
    canonical: "https://science-tokyo-scholar.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://science-tokyo-scholar.vercel.app",
    siteName: "東工大奨学金検索",
    title: "東工大奨学金検索 | 東京科学大学 奨学金データベース",
    description: "東工大（東京科学大学）の奨学金情報を効率的に検索できるサービスです。学部生・大学院生向けの給付型・貸与型奨学金情報を網羅。",
    images: [
      {
        url: "https://science-tokyo-scholar.vercel.app/og_image.png",
        width: 1200,
        height: 630,
        alt: "東工大奨学金検索",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "東工大奨学金検索 | 東京科学大学 奨学金データベース",
    description: "東工大（東京科学大学）の奨学金情報を効率的に検索できるサービスです。",
    images: ["https://science-tokyo-scholar.vercel.app/og_image.png"],
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
  themeColor: "#0d9488",
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
      </head>
      <body className="h-full bg-white">
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
              "@type": "WebSite",
              name: "東工大奨学金検索",
              alternateName: "東京科学大学 奨学金データベース",
              description: "東工大（東京科学大学）の奨学金情報を効率的に検索できるサービスです。学部生・大学院生向けの給付型・貸与型奨学金情報を網羅。",
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
                "@type": "Organization",
                name: "東工大奨学金検索",
                url: "https://science-tokyo-scholar.vercel.app"
              },
              about: {
                "@type": "EducationalOrganization",
                name: "東京科学大学",
                alternateName: ["東工大", "Tokyo Institute of Technology", "Tokyo Tech", "Science Tokyo"],
                url: "https://www.titech.ac.jp/"
              },
              keywords: "東工大,東京科学大学,奨学金,scholarship,学費,給付型奨学金,貸与型奨学金,学部生,大学院生,博士課程,修士課程,理工系,研究支援,学生支援,Tokyo Tech,Science Tokyo,financial aid"
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
