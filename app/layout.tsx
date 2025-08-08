import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '東工大奨学金検索',
  description: '東工大の奨学金情報を効率的に検索できるサービスです。',
  openGraph: {
    title: '東工大奨学金検索',
    description: '東工大の奨学金情報を効率的に検索できるサービスです。',
    images: '/og_image.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full bg-white">
        {children}
      </body>
    </html>
  );
}
