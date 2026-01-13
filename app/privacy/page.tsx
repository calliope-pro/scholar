import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 東京科学大学奨学金検索",
  description: "東京科学大学奨学金検索サイトのプライバシーポリシーです。個人情報の取り扱いについて詳しく説明しています。",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://science-tokyo-scholar.vercel.app/privacy",
  },
  openGraph: {
    title: "プライバシーポリシー | 東京科学大学奨学金検索",
    description: "東京科学大学奨学金検索サイトのプライバシーポリシー",
    url: "https://science-tokyo-scholar.vercel.app/privacy",
  },
  twitter: {
    title: "プライバシーポリシー | 東京科学大学奨学金検索",
    description: "東京科学大学奨学金検索サイトのプライバシーポリシー",
  },
};

export default function Privacy() {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="neo-background"></div>

      <main className="relative z-10 container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="neo-card-featured p-8 lg:p-12 mb-8 fade-in">
          <h1 className="text-3xl lg:text-4xl font-black mb-4">
            プライバシーポリシー
          </h1>
          <p className="text-base opacity-90 leading-relaxed">
            本プライバシーポリシーは、calliopeとth2ch-g（以下、当社）が提供する「東京科学大学奨学金検索サイト」（以下「本サービス」）を利用する際に適用されます。
          </p>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {/* 基本方針 */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-primary-blue">
              基本方針
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスでは、個人情報の重要性を認識し、個人情報を保護することが社会的責務であると考え、個人情報に関する法令を遵守し、本サービスで取扱う個人情報の取得、利用、管理を適正に行います。
            </p>
          </section>

          {/* 適用範囲 */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-primary-blue">
              適用範囲
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本プライバシーポリシーは、お客様の個人情報もしくはそれに準ずる情報を取り扱う際に、本サービスが遵守する方針を示したものです。
            </p>
          </section>

          {/* 個人情報の利用について */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-primary-blue">
              個人情報の利用について
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスでは、お問い合わせの際、GithubのIssueを通していただくため、Githubのアカウントが必要となります。お問い合わせに用いられたGithubアカウントやメールアドレスなどについてはお問い合わせに対する回答などに対応する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
            </p>
          </section>

          {/* 広告について */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-primary-blue">
              広告について
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスでは、第三者配信の広告サービス（Googleアドセンス）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。クッキーを使用することで本サービスはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。詳細については、Googleのプライバシーポリシーをご覧ください。もし、第三者にデータ送信を行いたくない場合は、ブラウザのCookie機能をオフにしてアクセスしてください。
            </p>
          </section>

          {/* アクセス解析ツールについて */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-primary-blue">
              アクセス解析ツールについて
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。詳細については、同様にGoogleのプライバシーポリシーをご覧ください。
            </p>
          </section>

          {/* 変更について */}
          <section className="neo-card p-6 lg:p-8 fade-in-delayed">
            <h2 className="text-xl lg:text-2xl font-black text-ink-dark mb-4 pb-3 border-b-2 border-primary-blue">
              本プライバシーポリシーの変更
            </h2>
            <p className="text-ink-dark leading-relaxed">
              本サービスでは、本プライバシーポリシーの内容を適宜見直し、その改善に努めます。本プライバシーポリシーは、事前の予告なく変更することがあります。本プライバシーポリシーの変更は、本サービスに掲載された時点で有効になるものとします。
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
