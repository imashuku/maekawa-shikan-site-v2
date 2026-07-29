import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { realProgram, siteConfig, upcomingSalons } from "@/content/site";
import { buildMetadata, SITE_URL } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "リアルサロン｜表層編・深層編",
  description:
    "近江で前川真司と対話しながら学ぶリアルサロン。表層編未受講でも深層編から参加できます。",
  path: "/real",
});

export default function RealSalonPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: "前川史観 リアルサロン 深層編 第1回",
          description:
            "前川真司が新しい仮説と物語を掘り下げるリアルサロン。表層編未受講でも参加できます。",
          startDate: "2026-08-27T18:30:00+09:00",
          endDate: "2026-08-27T20:30:00+09:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          organizer: {
            "@type": "Person",
            name: "前川真司",
            url: `${SITE_URL}/profile`,
          },
          url: `${SITE_URL}/real`,
        }}
      />
      <section className="border-b border-sumi/15 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            REAL SALON
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            同じ場を囲み、
            <br />
            歴史を深く読む。
          </h1>
          <p className="mt-7 max-w-3xl leading-8 text-sumi/75 md:text-lg">
            前川真司の語りを聞くだけではなく、問いを交わしながら地図の下にある
            「もう一枚の地図」を見つけていく場です。初めての方も参加できます。
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            TWO LAYERS
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            表層編と深層編
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="border-t-4 border-ai bg-white p-7 shadow-sm md:p-9">
              <p className="text-sm font-bold text-ai">
                {realProgram.surface.label}
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                {realProgram.surface.title}
              </h3>
              <p className="mt-5 leading-8 text-sumi/75">
                {realProgram.surface.description}
              </p>
              <a
                href={siteConfig.urls.line}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex border-b border-ai pb-1 font-bold text-ai"
              >
                第2期の案内を受け取る →
              </a>
            </article>
            <article className="border-t-4 border-kokihi bg-white p-7 shadow-sm md:p-9">
              <p className="text-sm font-bold text-kokihi">
                {realProgram.deep.label}
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                {realProgram.deep.title}
              </h3>
              <p className="mt-5 leading-8 text-sumi/75">
                {realProgram.deep.description}
              </p>
              <ul className="mt-6 space-y-2 border-t border-sumi/15 pt-5 text-sm">
                {realProgram.deep.dates.map((date) => (
                  <li key={date}>{date}–</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-sumi/15 bg-sumi-dark py-20 text-kinari md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.24em] text-gold">
              NEXT SESSION
            </p>
            <p className="mt-5 font-serif text-3xl font-bold text-kinari md:text-5xl">
              {upcomingSalons.real.date}
            </p>
            <p className="mt-2 text-kinari/60">{upcomingSalons.real.time}</p>
            <h2 className="mt-6 text-2xl font-bold text-kinari">
              {upcomingSalons.real.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-kinari/70">
              {upcomingSalons.real.note}
            </p>
          </div>
          <Link
            href="/apply"
            className="inline-flex justify-center bg-kokihi px-8 py-4 font-bold text-white md:justify-self-end"
          >
            深層編に申し込む
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            FOR FIRST-TIME GUESTS
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            表層編を受けていなくても大丈夫です。
          </h2>
          <p className="mt-6 leading-8 text-sumi/75">
            深層編の冒頭に、表層編の要点を10〜15分で共有します。分からない言葉や背景は、
            その場で問い直せます。知識量よりも「なぜだろう」という関心を持ってお越しください。
          </p>
          <Link
            href="/online"
            className="mt-8 inline-flex border-b border-sumi/40 pb-1 text-sm"
          >
            オンラインで参加する方法も見る →
          </Link>
        </div>
      </section>
    </>
  );
}
