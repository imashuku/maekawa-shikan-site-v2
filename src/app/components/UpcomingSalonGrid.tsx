import Link from "next/link";
import { upcomingSalons } from "@/content/site";
import SectionHeading from "./SectionHeading";

export default function UpcomingSalonGrid() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="NEXT SESSIONS"
          title="次の一歩を、選ぶ。"
          lead="途中からでも大丈夫です。今の関心と、参加しやすい方法で選んでください。"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {Object.values(upcomingSalons).map((salon) => (
            <article
              key={salon.format}
              className="border border-sumi/15 bg-white p-7 shadow-[0_18px_50px_rgba(40,32,24,0.06)] md:p-9"
            >
              <div className="flex items-center justify-between border-b border-sumi/10 pb-5">
                <span className="text-xs font-bold tracking-[0.2em] text-kokihi">
                  {salon.format}
                </span>
                <span className="text-sm text-sumi/55">{salon.time}</span>
              </div>
              <p className="mt-6 font-serif text-2xl font-bold text-sumi-dark">
                {salon.date}
              </p>
              <h3 className="mt-3 text-xl font-bold leading-8">{salon.title}</h3>
              <p className="mt-4 text-sm leading-7 text-sumi/70">{salon.note}</p>
              <Link
                href={salon.href}
                className="mt-8 inline-flex bg-sumi-dark px-6 py-3.5 font-bold text-white transition-colors hover:bg-kokihi"
              >
                {salon.format === "リアル" ? "参加を申し込む" : "詳細を見る"}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
