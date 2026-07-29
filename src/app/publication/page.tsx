import Link from "next/link";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "出版への道",
  description:
    "前川史観を書籍として届ける出版プロジェクト。サロンでの問いと対話を重ねながら、来春に向けて準備を進めています。",
  path: "/publication",
});

const stages = [
  {
    number: "01",
    title: "現地を歩き、物語を集める",
    body: "近江の土地に残る痕跡、史資料、受け継がれてきた記憶をたどります。",
    state: "積み重ねてきたこと",
  },
  {
    number: "02",
    title: "サロンで問い、混ぜ直す",
    body: "オンラインとリアルの対話を通じ、一つの見方に閉じず物語を深めます。",
    state: "現在地",
  },
  {
    number: "03",
    title: "一冊の本として手渡す",
    body: "初めて近江を知る人にも届く形へ整え、来春の出版を目指します。",
    state: "次の節目",
  },
] as const;

export default function PublicationPage() {
  return (
    <>
      <section className="bg-sumi-dark py-20 text-kinari md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-bold tracking-[0.24em] text-gold">
            ROAD TO PUBLICATION
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-kinari md:text-7xl">
            語り合った歴史を、
            <br />
            一冊の本へ。
          </h1>
          <p className="mt-8 max-w-3xl leading-8 text-kinari/70 md:text-lg">
            前川史観は、前川真司が一人で語って終わるものではありません。
            現地で見つけ、サロンで問い、参加者と混ぜ直した物語を、来春に向けて本にしていきます。
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            CURRENT JOURNEY
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            出版までの三つの段階
          </h2>
          <div className="mt-12 border-t border-sumi/15">
            {stages.map((stage) => (
              <article
                key={stage.number}
                className="grid gap-4 border-b border-sumi/15 py-8 md:grid-cols-[5rem_1fr_10rem]"
              >
                <p className="font-serif text-3xl text-kokihi/45">
                  {stage.number}
                </p>
                <div>
                  <h3 className="text-xl font-bold">{stage.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-sumi/70">
                    {stage.body}
                  </p>
                </div>
                <p className="text-sm font-bold text-ai md:text-right">
                  {stage.state}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-sumi/15 bg-paper py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-3xl font-bold md:text-5xl">
            完成を待つだけではなく、
            <br />
            いまから関われます。
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["サロンへ参加", "問いや感想を持ち寄り、物語を一緒に深める。", "/#salons"],
              ["誰かへ紹介", "気になった物語を、歴史の好きな人へ手渡す。", "/#stories"],
              ["出版案内を受け取る", "予約・発売など、確定した情報をLINEで受け取る。", siteConfig.urls.line],
            ].map(([title, body, href]) => (
              <article key={title} className="bg-white p-7">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-sumi/70">{body}</p>
                {href.startsWith("http") ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex border-b border-kokihi pb-1 font-bold text-kokihi"
                  >
                    LINEを追加する →
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="mt-6 inline-flex border-b border-kokihi pb-1 font-bold text-kokihi"
                  >
                    詳しく見る →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-sm leading-7 text-sumi/70">
            発売日、出版社、価格、予約方法は、確定後にこのページと公式LINEでお知らせします。
          </p>
          <a
            href={siteConfig.urls.line}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex bg-[#057538] px-8 py-4 font-bold text-white"
          >
            出版案内をLINEで受け取る
          </a>
        </div>
      </section>
    </>
  );
}
