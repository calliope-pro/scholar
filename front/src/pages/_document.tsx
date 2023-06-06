import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicons/favicon-16x16.png"
                />
                <link
                    rel="manifest"
                    href="/favicons/site.webmanifest"
                />
                <link
                    rel="mask-icon"
                    href="/favicons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta
                    name="msapplication-TileColor"
                    content="#0c2840"
                />
                <meta
                    name="theme-color"
                    content="#ff0000"
                />
                <meta name="description" content="理系単科大学とは思えないクソすぎるUIの東工大奨学金サイトを検索しやすいようにしたサイトです" />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5059912395081075"
                    crossOrigin="anonymous"
                />
                <meta name="google-site-verification" content="siNP3m17WDjCX1MmxhKAbecqOMiM7qWTmChPwtZJn8w"  />
                <meta
                    property="og:image"
                    content='og_image.jpg'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}