import Link from "next/link";
import {
  onlineCurriculum,
  siteConfig,
  upcomingSalons,
} from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "オンラインサロン｜近江にみちびかれて",
  description:
    "全国から参加できる前川史観のオンライン歴史ラウンジ。開催途中から参加でき、全回のアーカイブを視聴できます。",
  path: "/online",
});

export default function OnlineSalonPage() {
  return (
    <>
      <section className="border-b border-sumi/15 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            ONLINE SALON
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            近江にみちびかれて
          </h1>
          <p className="mt-3 font-serif text-lg text-sumi/60 md:text-2xl">
            オンライン歴史ラウンジ
          </p>
          <p className="mt-7 max-w-3xl leading-8 text-sumi/75 md:text-lg">
            近江を入口に、日本史を読み直す全10回。年号を覚える講座ではなく、
            自分自身と、今を暮らす土地を見つめ直す知的な対話の時間です。
          </p>
          <div className="mt-10 grid gap-px border border-sumi/15 bg-sumi/15 sm:grid-cols-3">
            {[
              ["参加", "開催途中からいつでも"],
              ["視聴", "全回アーカイブ対応"],
              ["形式", "Zoom／毎月第2木曜"],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-6">
                <p className="text-xs font-bold tracking-wider text-kokihi">
                  {label}
                </p>
                <p className="mt-2 font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative aspect-video overflow-hidden bg-sumi-dark shadow-xl">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={siteConfig.urls.youtubeEmbed}
              title="オンライン歴史ラウンジ「近江にみちびかれて」への招待"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <aside className="border-t-4 border-kokihi bg-paper p-7 md:p-9">
            <p className="text-xs font-bold tracking-[0.2em] text-kokihi">
              NEXT SESSION
            </p>
            <p className="mt-4 font-serif text-2xl font-bold">
              {upcomingSalons.online.date}
            </p>
            <p className="mt-1 text-sm text-sumi/60">
              {upcomingSalons.online.time}
            </p>
            <h2 className="mt-5 text-xl font-bold leading-8">
              {upcomingSalons.online.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-sumi/70">
              {upcomingSalons.online.note}
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-sumi/15 bg-white/60 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            TEN STORIES
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            全10回のものがたり
          </h2>
          <ol className="mt-12 border-t border-sumi/15">
            {onlineCurriculum.map((session, index) => (
              <li
                key={session.date}
                className="grid gap-3 border-b border-sumi/15 py-6 md:grid-cols-[8rem_10rem_1fr] md:items-baseline"
              >
                <span className="font-serif text-xl font-bold text-kokihi">
                  第{index + 1}回
                </span>
                <span className="text-sm text-sumi/55">{session.date}</span>
                <div>
                  <p className="font-bold leading-7">{session.title}</p>
                  <p className="mt-1 text-sm leading-6 text-sumi/60">
                    {session.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            JOIN ANYTIME
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            いまから、第1回へ戻れます。
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-sumi/70">
            全10回パスはアーカイブ見放題。まず一回だけ試すこともできます。
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={siteConfig.urls.onlinePass}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-kokihi px-8 py-4 font-bold text-white"
            >
              全10回パスで参加する
            </a>
            <a
              href={siteConfig.urls.onlineSingle}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-sumi px-8 py-4 font-bold"
            >
              単発で試す
            </a>
          </div>
          <Link
            href="/real"
            className="mt-8 inline-flex border-b border-sumi/40 pb-1 text-sm"
          >
            リアルサロンも見る →
          </Link>
        </div>
      </section>
    </>
  );
}
