import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '東工大奨学金検索',
  description: '理系単科大学とは思えないクソすぎるUIの東工大奨学金サイトを検索しやすいようにしたサイトです',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
