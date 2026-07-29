# 前川史観公式サイトリニューアル Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 「前川史観」を上位ブランドとし、オンラインサロンとリアルサロンへ初めての人を案内できる、安全で更新しやすい公式サイトを公開する。

**Architecture:** Next.js App Routerの既存構成を維持し、ブランド・サロン・日程などの公開情報を`src/content/site.ts`へ集約する。トップページは表示責務ごとのServer Componentへ分割し、リアルイベント申込みだけをClient ComponentとAPI Routeに残す。Tursoのスキーマは変更せず、受付可能日をコード上の明示ポリシーで制御し、公開会員APIと番号だけで閲覧できるマイページを停止する。

**Tech Stack:** Next.js 15 App Router、React 19、TypeScript、Tailwind CSS 4、Turso/libSQL、Node.js built-in test runner、Playwrightによるブラウザ確認

---

## File map

### Create

- `src/content/site.ts`: ブランド、外部URL、サロン、日程、出版、関わり方の正本
- `src/lib/event-policy.ts`: リアルイベントの受付可否を判定する純粋関数
- `src/lib/real-events.ts`: Tursoから受付対象イベントだけを取得するサーバー関数
- `src/app/components/SectionHeading.tsx`: 各章の見出し
- `src/app/components/HeroSalonChooser.tsx`: ブランドと二つの参加入口
- `src/app/components/FreeExperience.tsx`: 無料動画・noteへの入口
- `src/app/components/UpcomingSalonGrid.tsx`: オンライン／リアルの次回案内
- `src/app/components/ProfileTeaser.tsx`: 前川真司の価値とプロフィール導線
- `src/app/components/StoryHighlights.tsx`: 三つの代表物語
- `src/app/components/PublicationRoad.tsx`: 来春の出版への道
- `src/app/components/EngagementWays.tsx`: 参加、紹介、出版案内、講演・取材
- `src/app/components/SiteFooter.tsx`: 共通フッター
- `src/app/online/page.tsx`: オンラインサロン詳細
- `src/app/real/page.tsx`: リアルサロン、表層編・深層編詳細
- `src/app/publication/page.tsx`: 出版プロジェクト詳細
- `src/app/robots.ts`: robots.txt
- `src/app/sitemap.ts`: sitemap.xml
- `tests/event-policy.test.mjs`: 受付状態の単体テスト

### Modify

- `package.json`: Node標準テストのコマンド追加
- `src/app/globals.css`: 歴史誌・ミュージアムのデザイントークンと共通スタイル
- `src/app/layout.tsx`: 前川史観の共通メタデータとサイトシェル
- `src/app/components/Header.tsx`: 前川史観を主表示するナビゲーション
- `src/app/page.tsx`: 分割コンポーネントでトップページを再構成
- `src/lib/metadata.ts`: canonicalを含むブランドメタデータ
- `src/app/profile/page.tsx`: 史実・出典と前川真司の解釈を区別する説明
- `src/app/contact/page.tsx`: 動かないフォームを撤去し、公式LINEを実窓口にする
- `src/app/support/page.tsx`: `/publication`への恒久リダイレクト
- `src/app/support/success/page.tsx`: `/publication`への恒久リダイレクト
- `src/app/apply/page.tsx`: 公開名簿を使わない申込みフォーム
- `src/app/api/apply/route.ts`: サーバー側受付可否と本人照合
- `src/app/api/members/route.ts`: 公開会員情報を停止
- `src/app/api/mypage/route.ts`: 公開会員情報を停止
- `src/app/members/page.tsx`: サーバーリダイレクト
- `src/app/mypage/[no]/page.tsx`: 安全な案内画面

## Task 0: 既存のESLint設定をNext.js 15へ適合

**Files:**

- Modify: `eslint.config.mjs`

- [x] **Step 1: 既存障害を再現**

Run: `npm run lint`

Observed: `TypeError: nextVitals is not iterable`

- [x] **Step 2: export形式を確認**

Run:

```bash
node -e 'import("eslint-config-next/core-web-vitals.js").then(m=>console.log(Array.isArray(m.default), Object.keys(m.default)))'
```

Observed: 配列ではなく、`extends`を持つlegacy config object

- [x] **Step 3: 同梱のFlatCompatで読み込む**

```js
import { defineConfig, globalIgnores } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const baseDirectory = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

- [x] **Step 4: 設定エラーが解消したことを確認**

Run: `npm run lint`

Observed: ESLintが全ファイルを検査し、旧`support/page.tsx`の既存JSXエラー1件と`profile/page.tsx`の既存警告1件を報告。設定起因の停止は解消。

- [x] **Step 5: 現行サイトのビルドを確認**

Run: `npm run build`

Observed: exit `0`。旧支援ページのlintエラーはTask 6のページ置換で、プロフィール警告はTask 4のコンポーネント整理で解消する。

## Task 1: 受付ポリシーをテスト駆動で追加

**Files:**

- Create: `tests/event-policy.test.mjs`
- Create: `src/lib/event-policy.ts`
- Modify: `package.json`

- [ ] **Step 1: テストコマンドを追加**

`package.json`の`scripts`を次にする。

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "node --experimental-strip-types --test tests/*.test.mjs"
  }
}
```

- [ ] **Step 2: 失敗する受付状態テストを書く**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  getRegistrationState,
  listOpenRegistrationDates,
} from "../src/lib/event-policy.ts";

test("8月27日の深層編は受付期間内ならopen", () => {
  assert.equal(
    getRegistrationState(
      "2026-08-27",
      new Date("2026-07-30T12:00:00+09:00"),
    ),
    "open",
  );
});

test("受付終了時刻を過ぎたイベントはcompleted", () => {
  assert.equal(
    getRegistrationState(
      "2026-08-27",
      new Date("2026-08-27T18:31:00+09:00"),
    ),
    "completed",
  );
});

test("明示されていない日付はdraft", () => {
  assert.equal(
    getRegistrationState(
      "2026-08-28",
      new Date("2026-07-30T12:00:00+09:00"),
    ),
    "draft",
  );
});

test("受付中の日付だけを返す", () => {
  assert.deepEqual(
    listOpenRegistrationDates(new Date("2026-08-28T12:00:00+09:00")),
    ["2026-09-30"],
  );
});
```

- [ ] **Step 3: テストが失敗することを確認**

Run: `npm test`

Expected: `ERR_MODULE_NOT_FOUND` for `src/lib/event-policy.ts`

- [ ] **Step 4: 最小実装を書く**

```ts
export type RegistrationState =
  | "draft"
  | "open"
  | "full"
  | "closed"
  | "completed";

type RegistrationPolicy = {
  status: Exclude<RegistrationState, "completed">;
  opensAt: string;
  closesAt: string;
};

export const REAL_EVENT_POLICIES: Record<string, RegistrationPolicy> = {
  "2026-08-27": {
    status: "open",
    opensAt: "2026-07-30T00:00:00+09:00",
    closesAt: "2026-08-27T18:30:00+09:00",
  },
  "2026-09-30": {
    status: "open",
    opensAt: "2026-07-30T00:00:00+09:00",
    closesAt: "2026-09-30T18:30:00+09:00",
  },
};

export function getRegistrationState(
  eventDate: string,
  now = new Date(),
): RegistrationState {
  const policy = REAL_EVENT_POLICIES[eventDate];
  if (!policy) return "draft";
  if (now < new Date(policy.opensAt)) return "draft";
  if (now > new Date(policy.closesAt)) return "completed";
  return policy.status;
}

export function listOpenRegistrationDates(now = new Date()): string[] {
  return Object.keys(REAL_EVENT_POLICIES)
    .filter((date) => getRegistrationState(date, now) === "open")
    .sort();
}
```

- [ ] **Step 5: テストを通す**

Run: `npm test`

Expected: `4 tests`、`4 pass`、`0 fail`

- [ ] **Step 6: コミット**

```bash
git add package.json package-lock.json tests/event-policy.test.mjs src/lib/event-policy.ts
git commit -m "test: define real salon registration policy"
```

## Task 2: 公開コンテンツの正本を作る

**Files:**

- Create: `src/content/site.ts`

- [ ] **Step 1: ブランドと外部導線を定義**

```ts
export const siteConfig = {
  brand: "前川史観",
  project: "それはまことですか？",
  person: "前川真司",
  tagline: "語られなかった歴史に、近江から光を当てる。",
  description:
    "前川真司が近江から日本史を読み解く「前川史観」の公式サイト。オンラインとリアル、二つのサロンにいつからでも参加できます。",
  urls: {
    line: "https://lin.ee/KY9xx1E",
    note: "https://note.com/maekawa_shikan",
    youtube: "https://www.youtube.com/embed/gjrhWpu5CjY",
    onlinePass: "https://yoor.jp/door/michibikarete",
    onlineSingle: "https://buy.stripe.com/aFa7sKfPV0yKgaegRn5c401",
  },
} as const;

export const salonChoices = [
  {
    key: "online",
    eyebrow: "ONLINE SALON",
    title: "オンラインサロン",
    summary: "全国から参加でき、これまでの回もアーカイブでたどれます。",
    availability: "開催途中から、いつでも参加できます",
    href: "/online",
  },
  {
    key: "real",
    eyebrow: "REAL SALON",
    title: "リアルサロン",
    summary: "近江で同じ場を囲み、前川真司と対話しながら読み解きます。",
    availability: "表層編未受講でも、深層編から参加できます",
    href: "/real",
  },
] as const;
```

- [ ] **Step 2: 日程とプログラムを同じファイルへ追加**

```ts
export const upcomingSalons = {
  online: {
    date: "2026/08/13（木）",
    time: "19:00–21:00",
    title: "第3回｜もしかして、ここが「あの国」？",
    note: "アーカイブ視聴があるため、途中参加でも第1回から学べます。",
    href: "/online",
  },
  real: {
    date: "2026/08/27（木）",
    time: "18:30–20:30",
    title: "深層編 第1回",
    note: "初めての方へ、冒頭に表層編のダイジェストを用意します。",
    href: "/apply",
  },
} as const;

export const realProgram = {
  surface: {
    title: "表層編",
    label: "入口となる全体地図",
    description:
      "近江の1万3000年を体系的にたどる入門編。第2期は参加希望を受け付けます。",
  },
  deep: {
    title: "深層編",
    label: "地図の下にある、もう一枚の地図",
    description:
      "前川真司が新しい仮説と物語を掘り下げる旗艦編。表層編未受講でも参加できます。",
    dates: ["2026/08/27（木）18:30", "2026/09/30（水）18:30"],
  },
} as const;
```

- [ ] **Step 3: コミット**

```bash
git add src/content/site.ts
git commit -m "feat: centralize public site content"
```

## Task 3: ブランドシェルとメタデータを更新

**Files:**

- Modify: `src/lib/metadata.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/components/Header.tsx`
- Create: `src/app/components/SiteFooter.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: canonicalを含むメタデータ関数へ更新**

```ts
import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://maekawa-shikan-site-v2.vercel.app";
export const SITE_NAME = "前川史観｜それはまことですか？";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Metadata {
  const image = input.image ?? DEFAULT_OG_IMAGE;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.path,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type: input.type ?? "website",
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: input.imageAlt ?? input.title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}｜前川真司が近江から読み解く、もう一つの日本史`,
    template: `%s｜${siteConfig.brand}`,
  },
  description: siteConfig.description,
};
```

- [ ] **Step 2: 共通レイアウトから古い告知帯を撤去**

`src/app/layout.tsx`は`metadata = rootMetadata`をexportし、`Header`、`children`、`SiteFooter`だけを描画する。2026年6月開講の告知帯は削除する。

```tsx
import type { Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata;
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-kinari text-sumi antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: ヘッダーをブランド階層に合わせる**

ロゴは「前川史観」、副表示は「それはまことですか？｜前川真司」。ナビゲーションは`オンライン`、`リアル`、`前川真司`、`出版への道`、`物語`、`お問い合わせ`とする。モバイルメニューの開閉時は`aria-expanded`と`aria-controls`を設定する。

- [ ] **Step 4: 共通フッターを作る**

```tsx
import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-sumi/15 bg-sumi-dark text-kinari">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
        <div>
          <p className="font-serif text-2xl font-bold">{siteConfig.brand}</p>
          <p className="mt-2 text-sm text-kinari/65">
            {siteConfig.project}｜{siteConfig.person}
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm md:justify-self-end">
          <Link href="/online">オンラインサロン</Link>
          <Link href="/real">リアルサロン</Link>
          <Link href="/profile">前川真司</Link>
          <Link href="/publication">出版への道</Link>
          <Link href="/contact">お問い合わせ</Link>
          <a href={siteConfig.urls.line} target="_blank" rel="noreferrer">
            公式LINE
          </a>
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: デザイントークンを調整**

`globals.css`の`:root`へ`--ai: #294a5a`、`--gold: #aa8653`、`--paper: #f6f0e4`を追加し、`@theme inline`へ対応色を登録する。本文はゴシック、見出しは明朝、フォーカスリングは臙脂で統一する。

```css
:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--kokihi) 70%, white);
  outline-offset: 4px;
}

::selection {
  background: color-mix(in srgb, var(--kokihi) 20%, white);
}
```

- [ ] **Step 6: 静的検証とコミット**

Run: `npm run lint && npm run build`

Expected: both exit `0`

```bash
git add src/app/layout.tsx src/app/globals.css src/app/components/Header.tsx src/app/components/SiteFooter.tsx src/lib/metadata.ts
git commit -m "feat: establish Maekawa Shikan brand shell"
```

## Task 4: トップページを二つのサロン案内所へ再構成

**Files:**

- Create: `src/app/components/SectionHeading.tsx`
- Create: `src/app/components/HeroSalonChooser.tsx`
- Create: `src/app/components/FreeExperience.tsx`
- Create: `src/app/components/UpcomingSalonGrid.tsx`
- Create: `src/app/components/ProfileTeaser.tsx`
- Create: `src/app/components/StoryHighlights.tsx`
- Create: `src/app/components/PublicationRoad.tsx`
- Create: `src/app/components/EngagementWays.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 共通見出しを作る**

```tsx
export default function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold tracking-[0.24em] text-kokihi">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">{title}</h2>
      {lead ? <p className="mt-5 leading-8 text-sumi/75">{lead}</p> : null}
    </div>
  );
}
```

- [ ] **Step 2: ヒーローを作る**

`HeroSalonChooser`は次の順序で表示する。

```tsx
import Link from "next/link";
import { salonChoices, siteConfig } from "@/content/site";

export default function HeroSalonChooser() {
  return (
    <section className="relative overflow-hidden border-b border-sumi/15">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-sm tracking-[0.22em] text-kokihi">
          {siteConfig.project}｜{siteConfig.person}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-7xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-sumi/75 md:text-lg">
          オンラインとリアル、二つの入口があります。どちらも開催途中から参加できます。
        </p>
        <div className="mt-12 grid gap-px border border-sumi/15 bg-sumi/15 md:grid-cols-2">
          {salonChoices.map((salon) => (
            <article key={salon.key} className="bg-paper p-7 md:p-10">
              <p className="text-xs font-bold tracking-[0.2em] text-kokihi">
                {salon.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold">{salon.title}</h2>
              <p className="mt-4 leading-7">{salon.summary}</p>
              <p className="mt-4 text-sm font-bold text-ai">{salon.availability}</p>
              <Link className="mt-7 inline-flex border-b border-kokihi pb-1 font-bold text-kokihi" href={salon.href}>
                詳しく見る →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 残りの表示コンポーネントを作る**

各コンポーネントはDBへアクセスせず、`siteConfig`、`upcomingSalons`、`src/lib/stories.ts`のデータだけを使用する。

- `FreeExperience`: YouTube埋込み、note、代表3物語
- `UpcomingSalonGrid`: オンライン2026/08/13（木）とリアル2026/08/27（木）
- `ProfileTeaser`: `/profile`と`/contact`
- `StoryHighlights`: 既存3物語と画像
- `PublicationRoad`: 来春の出版、`/publication`
- `EngagementWays`: サロン参加、友人へ紹介、出版情報、講演・取材・協業

すべての外部リンクへ`target="_blank"`と`rel="noopener noreferrer"`を付け、リンク内にbuttonを入れない。

- [ ] **Step 4: トップページを組み立てる**

```tsx
import EngagementWays from "./components/EngagementWays";
import FreeExperience from "./components/FreeExperience";
import HeroSalonChooser from "./components/HeroSalonChooser";
import ProfileTeaser from "./components/ProfileTeaser";
import PublicationRoad from "./components/PublicationRoad";
import StoryHighlights from "./components/StoryHighlights";
import UpcomingSalonGrid from "./components/UpcomingSalonGrid";

export default function Home() {
  return (
    <>
      <HeroSalonChooser />
      <FreeExperience />
      <UpcomingSalonGrid />
      <ProfileTeaser />
      <StoryHighlights />
      <PublicationRoad />
      <EngagementWays />
    </>
  );
}
```

- [ ] **Step 5: 検証とコミット**

Run: `npm run lint && npm run build`

Expected: both exit `0`

```bash
git add src/app/page.tsx src/app/components
git commit -m "feat: rebuild homepage around two salon paths"
```

## Task 5: オンライン・リアルの詳細ページを作る

**Files:**

- Create: `src/app/online/page.tsx`
- Create: `src/app/real/page.tsx`

- [ ] **Step 1: オンラインページを作る**

ページ冒頭で「途中参加OK」「全回アーカイブ」を表示し、無料動画、全10回の構成、全10回パス、単発参加を順に配置する。既存トップページにある10回分の題名と日程を移設し、事前受付という表現は使わない。

- [ ] **Step 2: リアルページを作る**

```tsx
import Link from "next/link";
import { realProgram } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "リアルサロン｜表層編・深層編",
  description:
    "近江で前川真司と対話しながら学ぶリアルサロン。表層編未受講でも深層編から参加できます。",
  path: "/real",
});

export default function RealSalonPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="text-xs font-bold tracking-[0.24em] text-kokihi">REAL SALON</p>
      <h1 className="mt-4 text-4xl font-bold md:text-6xl">同じ場を囲み、歴史を深く読む。</h1>
      <p className="mt-6 max-w-3xl leading-8">
        初めての方も参加できます。深層編の冒頭では、表層編の要点を10〜15分で共有します。
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {[realProgram.surface, realProgram.deep].map((program) => (
          <article key={program.title} className="border-t-4 border-kokihi bg-white p-7">
            <p className="text-sm text-ai">{program.label}</p>
            <h2 className="mt-2 text-3xl font-bold">{program.title}</h2>
            <p className="mt-4 leading-8">{program.description}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link href="/apply" className="bg-kokihi px-7 py-4 text-center font-bold text-white">
          深層編に申し込む
        </Link>
        <a href="https://lin.ee/KY9xx1E" target="_blank" rel="noopener noreferrer" className="border border-sumi px-7 py-4 text-center font-bold">
          表層編 第2期の案内を受け取る
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 検証とコミット**

Run: `npm run lint && npm run build`

Expected: both exit `0`

```bash
git add src/app/online/page.tsx src/app/real/page.tsx
git commit -m "feat: add online and real salon guides"
```

## Task 6: 出版・プロフィール・問い合わせをブランドに合わせる

**Files:**

- Create: `src/app/publication/page.tsx`
- Modify: `src/app/profile/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/support/page.tsx`
- Modify: `src/app/support/success/page.tsx`

- [ ] **Step 1: 出版ページを作る**

公開済みの事実だけを使い、「来春に向けて準備中」「サロンでの対話が内容を育てる」「LINEで出版案内を受け取る」を表示する。予約開始、出版社、発売日、価格は確定情報がないため記載しない。

- [ ] **Step 2: プロフィールへ信頼性表示を追加**

前川史観の説明直後に、次の枠を追加する。

```tsx
<aside className="mt-10 border-l-4 border-gold bg-paper p-6">
  <h3 className="text-lg font-bold">前川史観の読み方</h3>
  <p className="mt-3 text-sm leading-7">
    このサイトでは、史資料や先行研究で確認できる事実と、前川真司による仮説・解釈を区別して紹介します。出典を示せるものは明記し、仮説は問いとして開いていきます。
  </p>
</aside>
```

- [ ] **Step 3: 動かない問い合わせフォームを撤去**

`src/app/contact/page.tsx`をServer Componentに戻し、講演、取材、協業の相談内容例と公式LINEボタンを表示する。「返信時に必要な情報」として、氏名、所属、希望内容、希望時期、連絡先を案内する。

- [ ] **Step 4: 旧支援URLを恒久リダイレクト**

`src/app/support/page.tsx`と`src/app/support/success/page.tsx`を次にする。

```tsx
import { permanentRedirect } from "next/navigation";

export default function SupportRedirect() {
  permanentRedirect("/publication");
}
```

- [ ] **Step 5: 検証とコミット**

Run: `npm run lint && npm run build`

Expected: both exit `0`

```bash
git add src/app/publication src/app/profile/page.tsx src/app/contact/page.tsx src/app/support
git commit -m "feat: align publication and profile journeys"
```

## Task 7: 会員情報の公開を止める

**Files:**

- Modify: `src/app/api/members/route.ts`
- Modify: `src/app/api/mypage/route.ts`
- Modify: `src/app/members/page.tsx`
- Modify: `src/app/mypage/[no]/page.tsx`

- [ ] **Step 1: 公開APIを410にする**

両API RouteでDBをimportせず、次だけを返す。

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "この公開APIは終了しました" },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
```

- [ ] **Step 2: 会員一覧をサーバーリダイレクト**

```tsx
import { redirect } from "next/navigation";

export default function MembersPage() {
  redirect("/");
}
```

- [ ] **Step 3: 旧マイページを安全な案内に変更**

会員番号を画面へ再表示せず、「旧マイページは公開を終了しました」「参加履歴の確認は公式LINEへ」を表示する。

- [ ] **Step 4: HTTP確認**

Run:

```bash
curl -i http://localhost:3000/api/members
curl -i "http://localhost:3000/api/mypage?no=001"
```

Expected: both `HTTP/1.1 410 Gone` and no name, furigana, attendance data

- [ ] **Step 5: コミット**

```bash
git add src/app/api/members src/app/api/mypage src/app/members src/app/mypage
git commit -m "fix: close public member data endpoints"
```

## Task 8: 申込みを名簿非公開・受付状態検証へ変更

**Files:**

- Create: `src/lib/real-events.ts`
- Modify: `src/app/api/apply/route.ts`
- Modify: `src/app/apply/page.tsx`

- [ ] **Step 1: 受付中イベント取得関数を作る**

```ts
import db from "@/lib/db";
import {
  getRegistrationState,
  listOpenRegistrationDates,
} from "@/lib/event-policy";

export type PublicRealEvent = {
  id: number;
  name: string;
  event_date: string;
  venue: string;
  notes: string | null;
};

export async function getOpenRealEvent(
  now = new Date(),
): Promise<PublicRealEvent | null> {
  const dates = listOpenRegistrationDates(now);
  if (dates.length === 0) return null;
  const placeholders = dates.map(() => "?").join(", ");
  const result = await db.execute({
    sql: `SELECT id, name, event_date, venue, notes
          FROM events
          WHERE event_date IN (${placeholders})
          ORDER BY event_date ASC
          LIMIT 1`,
    args: dates,
  });
  const event = result.rows[0] as unknown as PublicRealEvent | undefined;
  if (!event || getRegistrationState(event.event_date, now) !== "open") {
    return null;
  }
  return event;
}
```

- [ ] **Step 2: GETを安全なイベント取得へ変更**

`GET`は`getOpenRealEvent()`を呼び、成功時も失敗時も`Cache-Control: no-store`を付ける。DB障害時は500と一般向け文言を返し、過去イベントへフォールバックしない。

- [ ] **Step 3: POSTでイベント状態を再検証**

POST冒頭で`event_id`のイベント日を取得し、`getRegistrationState(event_date) !== "open"`なら409を返す。

```ts
const eventResult = await db.execute({
  sql: "SELECT id, event_date FROM events WHERE id = ?",
  args: [event_id],
});
const targetEvent = eventResult.rows[0];
if (
  !targetEvent ||
  getRegistrationState(String(targetEvent.event_date)) !== "open"
) {
  return NextResponse.json(
    { error: "この回の受付は終了しています" },
    { status: 409 },
  );
}
```

- [ ] **Step 4: 継続参加者の会員番号と氏名を照合**

```ts
const normalizeName = (value: unknown) =>
  String(value ?? "").trim().replace(/[ 　]+/g, "");

const existing = await db.execute({
  sql: "SELECT id, member_no, name FROM members WHERE member_no = ?",
  args: [String(member_no).trim()],
});
if (
  existing.rows.length === 0 ||
  normalizeName(existing.rows[0].name) !== normalizeName(name)
) {
  return NextResponse.json(
    { error: "会員番号とお名前を確認してください" },
    { status: 400 },
  );
}
```

レスポンスには会員番号、氏名、参加履歴を返さない。成功時は`{ success: true, is_new, already_registered }`だけを返す。

- [ ] **Step 5: フォームから名簿取得を削除**

参加区分を「初参加」「参加したことがある」のradioにし、両方で氏名を入力する。継続参加者は会員番号、初参加者はふりがなを追加で入力する。`/api/members`は呼ばず、完了画面から旧マイページへのリンクを削除する。

- [ ] **Step 6: API検証**

Run:

```bash
curl -sS http://localhost:3000/api/apply
curl -sS -X POST http://localhost:3000/api/apply \
  -H 'Content-Type: application/json' \
  -d '{"name":"テスト","event_id":-1,"is_new":true,"furigana":"てすと"}'
```

Expected: GETは受付中イベントまたは安全なエラー。POSTは409で、会員情報を作成しない。

- [ ] **Step 7: テスト、ビルド、コミット**

Run: `npm test && npm run lint && npm run build`

Expected: all exit `0`

```bash
git add src/lib/real-events.ts src/app/api/apply/route.ts src/app/apply/page.tsx
git commit -m "fix: secure real salon applications"
```

## Task 9: SEOファイルと構造化データを追加

**Files:**

- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Modify: `src/app/profile/page.tsx`
- Modify: `src/app/real/page.tsx`
- Modify: `src/app/story/[slug]/page.tsx`

- [ ] **Step 1: robots.txtを追加**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/members", "/mypage/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: sitemap.xmlを追加**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { stories } from "@/lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/online",
    "/real",
    "/profile",
    "/publication",
    "/activities",
    "/contact",
  ];
  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date("2026-07-30T00:00:00+09:00"),
    })),
    ...stories.map((story) => ({
      url: `${SITE_URL}/story/${story.slug}`,
      lastModified: new Date("2026-07-30T00:00:00+09:00"),
    })),
  ];
}
```

- [ ] **Step 3: JSON-LDを追加**

- `/profile`: `Person`
- `/real`: 受付中の2026/08/27（木）を`Event`
- `/story/[slug]`: `Article`

`dangerouslySetInnerHTML`へ渡すJSONは`JSON.stringify(data).replace(/</g, "\\u003c")`で`<`をエスケープする。

- [ ] **Step 4: HTTP確認**

Run:

```bash
curl -I http://localhost:3000/robots.txt
curl -I http://localhost:3000/sitemap.xml
curl -sS http://localhost:3000/profile | rg 'application/ld\\+json'
```

Expected: robots and sitemap `200`; profile contains JSON-LD

- [ ] **Step 5: コミット**

```bash
git add src/app/robots.ts src/app/sitemap.ts src/app/profile/page.tsx src/app/real/page.tsx src/app/story
git commit -m "feat: add discovery metadata and structured data"
```

## Task 10: ブラウザ検証、デザインレビュー、公開準備

**Files:**

- Modify: defects found in Tasks 3–9 only

- [ ] **Step 1: 全自動チェック**

Run: `npm test && npm run lint && npm run build`

Expected: all exit `0`

- [ ] **Step 2: ローカルサーバー起動**

Run: `npm run dev`

Expected: Next.js ready on the reported localhost URL

- [ ] **Step 3: Playwrightで主要画面を確認**

Desktop 1440×1000とmobile 390×844で次を撮影する。

- `/`
- `/online`
- `/real`
- `/profile`
- `/publication`
- `/apply`
- `/contact`

確認項目は、横スクロールなし、文字切れなし、第一画面で二つのサロンを認識できる、ヘッダー階層が明確、CTAが押せる、暗色背景上の文字が明るいこと。

- [ ] **Step 4: 導線と安全性を確認**

- トップ→オンライン→YOOR
- トップ→リアル→申込み
- トップ→出版→LINE
- トップ→プロフィール→問い合わせ
- `/support`→`/publication`が308
- `/api/members`と`/api/mypage`が410
- 終了済みまたは未許可イベントへのPOSTが409

- [ ] **Step 5: design-reviewerへレビュー依頼**

スクリーンショットと設計書を渡し、情報階層、ブランド表現、モバイル可読性、CTA、アクセシビリティをレビューする。指摘は同じfeature branchで修正し、該当スクリーンショットを再撮影する。

- [ ] **Step 6: 最終コミット**

```bash
git add src tests package.json package-lock.json
git commit -m "fix: polish site renewal after visual review"
```

- [ ] **Step 7: 公開前の別承認事項を整理**

次は実装コミットに含めず、今宿裕昭の承認後に実施する。

- `maekawa-shikan.jp`の購入
- Vercelへのドメイン追加とDNS設定
- `NEXT_PUBLIC_SITE_URL=https://maekawa-shikan.jp`の本番設定
- Tursoへ`status`、受付期間、シリーズ種別を追加するスキーマ移行
- 認証付き会員ポータルの新規構築
