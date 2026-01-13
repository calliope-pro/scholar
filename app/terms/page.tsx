import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約・免責事項 | 東京科学大学奨学金検索",
  description: "東京科学大学奨学金検索サイトの利用規約と免責事項です。ご利用前に必ずお読みください。",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://science-tokyo-scholar.vercel.app/terms",
  },
  openGraph: {
    title: "利用規約・免責事項 | 東京科学大学奨学金検索",
    description: "東京科学大学奨学金検索サイトの利用規約と免責事項",
    url: "https://science-tokyo-scholar.vercel.app/terms",
  },
  twitter: {
    title: "利用規約・免責事項 | 東京科学大学奨学金検索",
    description: "東京科学大学奨学金検索サイトの利用規約と免責事項",
  },
};

export default function Terms() {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="neo-background"></div>

      <main className="relative z-10 container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="neo-card-featured p-8 lg:p-12 mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-black mb-4">
            利用規約・免責事項
          </h1>
          <p className="text-base opacity-90 leading-relaxed">
            本規約は、calliopeとth2ch-g（以下、当社）が提供する「東京科学大学奨学金検索サイト」（以下「本サービス」）を利用する際に適用されます。ご利用にあたっては、本規約をお読みいただき、内容をご承諾の上でご利用ください。
          </p>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {/* 免責事項 */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-accent-sunset">
              免責事項
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスは、掲載内容によって生じた損害に対する一切の責任を負いません。各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。
            </p>
          </section>

          {/* 著作権について */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-accent-sunset">
              著作権について
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスで掲載している文章や画像などにつきましては、無断転載することを禁止します。本サービスは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、GithubのIssueよりご連絡ください。迅速に対応いたします。
            </p>
          </section>

          {/* リンクについて */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-accent-sunset">
              リンクについて
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。ただし、インラインフレームの使用や、画像の直リンクはご遠慮ください。法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 neo-btn-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
