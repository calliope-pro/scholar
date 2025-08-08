# 東工大奨学金検索サイト

> 東工大（東京科学大学）の奨学金情報を効率的に検索できるWebサービス

![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4.svg)

## 🎯 概要

東工大（東京科学大学）の奨学金サイトの情報をより見やすく整理し、効率的に検索できるようにしたWebサービスです。学部生・大学院生向けの給付型奨学金、貸与型奨学金情報を網羅的に提供します。

![東工大奨学金検索](public/logo.png)

## 🌟 特徴

- **効率的な検索**: 学年、金額、締切日等で絞り込み検索が可能
- **モバイル対応**: レスポンシブデザインでスマートフォンにも対応
- **SEO最適化**: 構造化データ、OpenGraph、Twitter Cards対応
- **高速表示**: Next.js App Routerによる最適化されたパフォーマンス

## 🛠 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **デプロイ**: Vercel
- **SEO**: 構造化データ (JSON-LD), OpenGraph, Twitter Cards

## 🚀 セットアップ

### 前提条件

- Node.js 18.0.0 以上
- npm, yarn, または pnpm

### インストール

```bash
# 依存関係のインストール
npm install
# または
yarn install

# 開発サーバーの起動
npm run dev
# または
yarn dev
```

開発サーバーが起動したら [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 📁 プロジェクト構造

```
scholar/
├── app/                    # Next.js App Router
│   ├── api/               # APIルート
│   ├── components/        # Reactコンポーネント
│   ├── privacy/           # プライバシーポリシー
│   ├── terms/             # 利用規約
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── globals.css        # グローバルスタイル
│   └── sitemap.ts         # サイトマップ生成
├── public/                # 静的ファイル
│   ├── favicons/          # ファビコン
│   ├── ads.txt            # 広告設定
│   ├── robots.txt         # クローラー制御
│   └── og_image.png       # OGP画像
└── hooks/                 # カスタムReactフック
```

## ⚠️ 注意点

できるだけ検索できるように項目を増やしたものの、元のサイトの表記揺れが激しいため以下のような注意点があります。当サイトで検索後は**元サイトで最終確認することをお勧めします**。

### データ解析仕様

- **対象者**
  - B1, B2, B3, B4, M1, M2, D1, D2, D3 のように学年を統一
  - 編入学生は考慮していない
  - 学士課程 → B1-B4、大学院 → M1-M2, D1-D3 に変換

- **推薦人数**
  - 「若干名」→ 3名として処理
  - 「1-3名」→ 最大値の3名として処理
  - 「直接応募」→ 人数不明(?)として処理

- **月額・年額**
  - 自宅/自宅外や学部/修士で金額が異なる場合、最低額を表示
  - 月額、年額、一時金を年額ベースで統一表示

- **他奨学金との重複**
  - 可: ○、不可: ×、その他: ? で表記

- **学内選考申請締切**
  - 明記されている場合: yyyy/mm/dd形式
  - 不明な場合: ? で表記

## 🔗 リンク

- **サービス**: https://science-tokyo-scholar.vercel.app
- **元サイト**: [東工大奨学金情報](https://www.titech.ac.jp/)

## 🤝 貢献

プロジェクトへの貢献を歓迎します！バグ報告や機能要望は [GitHub Issues](https://github.com/calliope-pro/scholar/issues) までお願いします。

