import Image from "next/image";
import Link from "next/link";
import { salonChoices, siteConfig } from "@/content/site";

export default function HeroSalonChooser() {
  return (
    <section className="relative overflow-hidden border-b border-sumi/15">
      <div className="pointer-events-none absolute right-[-9rem] top-8 h-[28rem] w-[28rem] opacity-[0.07] md:right-[-2rem] md:h-[42rem] md:w-[42rem]">
        <Image
          src="/kamon.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 448px, 672px"
          className="object-contain"
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="text-xs font-bold tracking-[0.24em] text-kokihi md:text-sm">
          {siteConfig.project}｜{siteConfig.person}
        </p>
        <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.25] tracking-[0.02em] text-sumi-dark md:text-7xl md:leading-[1.18]">
          語られなかった歴史に、
          <br />
          <span className="text-kokihi">近江から光を。</span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-sumi/75 md:text-lg">
          前川真司とともに、日本史の「もう一枚の地図」を読み解く。
          <br className="hidden md:block" />
          オンラインとリアル、二つの入口からいつでも参加できます。
        </p>

        <div
          id="salons"
          className="mt-12 grid gap-px border border-sumi/15 bg-sumi/15 md:grid-cols-2"
        >
          {salonChoices.map((salon, index) => (
            <article
              key={salon.key}
              className="group relative bg-paper p-7 transition-colors hover:bg-white md:p-10"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.2em] text-kokihi">
                  {salon.eyebrow}
                </p>
                <span className="font-serif text-4xl text-sumi/15">
                  0{index + 1}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                {salon.title}
              </h2>
              <p className="mt-4 leading-7 text-sumi/80">{salon.summary}</p>
              <p className="mt-5 border-l-2 border-ai pl-3 text-sm font-bold leading-6 text-ai">
                {salon.availability}
              </p>
              <Link
                className="mt-8 inline-flex border-b border-kokihi pb-1 font-bold text-kokihi"
                href={salon.href}
              >
                詳しく見る
                <span
                  aria-hidden
                  className="ml-2 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
