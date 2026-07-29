import Link from "next/link";
import { engagementWays, siteConfig } from "@/content/site";
import SectionHeading from "./SectionHeading";

export default function EngagementWays() {
  return (
    <section className="bg-white/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="GET INVOLVED"
          title="知ることから、共につくることへ。"
          lead="応援のかたちは一つではありません。今できる関わり方から始めてください。"
        />
        <div className="mt-12 grid gap-px border border-sumi/15 bg-sumi/15 md:grid-cols-2">
          {engagementWays.map((way) => (
            <article key={way.number} className="bg-kinari p-7 md:p-9">
              <p className="font-serif text-3xl text-kokihi/35">{way.number}</p>
              <h3 className="mt-3 text-2xl font-bold">{way.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-sumi/70">
                {way.body}
              </p>
              <Link
                href={way.href}
                className="mt-6 inline-flex border-b border-kokihi pb-1 text-sm font-bold text-kokihi"
              >
                {way.label} →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-12 border-l-4 border-[#057538] bg-paper p-7 md:flex md:items-center md:justify-between md:p-9">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#078c40]">
              OFFICIAL LINE
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              次の案内を、LINEで受け取る。
            </h3>
          </div>
          <a
            href={siteConfig.urls.line}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex bg-[#057538] px-7 py-4 font-bold text-white md:mt-0"
          >
            友だち追加する →
          </a>
        </div>
      </div>
    </section>
  );
}
