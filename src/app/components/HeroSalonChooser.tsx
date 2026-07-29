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
      <div className="relative mx-auto max-w-6xl px-5 py-10 md:py-24">
        <p className="text-xs font-bold tracking-[0.24em] text-kokihi md:text-sm">
          {siteConfig.project}｜{siteConfig.person}
        </p>
        <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-[1.25] tracking-[0.02em] text-sumi-dark md:mt-6 md:text-7xl md:leading-[1.18]">
          語られなかった歴史に、
          <br />
          <span className="text-kokihi">近江から光を。</span>
        </h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-sumi/80 md:mt-7 md:text-lg md:leading-8">
          前川真司が提唱する歴史の見取り図「前川史観」を、
          プロジェクト「それはまことですか？」で共に読み解きます。
          オンラインとリアル、二つの入口からいつでも参加できます。
        </p>

        <div
          id="salons"
          className="mt-7 grid gap-px border border-sumi/15 bg-sumi/15 md:mt-12 md:grid-cols-2"
        >
          {salonChoices.map((salon, index) => (
            <article
              key={salon.key}
              className="group relative bg-paper p-5 transition-colors hover:bg-white md:p-10"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-[0.2em] text-kokihi">
                  {salon.eyebrow}
                </p>
                <span className="font-serif text-2xl text-sumi/25 md:text-4xl md:text-sumi/15">
                  0{index + 1}
                </span>
              </div>
              <h2 className="mt-1 text-xl font-bold md:mt-3 md:text-3xl">
                {salon.title}
              </h2>
              <p className="mt-4 hidden leading-7 text-sumi/80 md:block">
                {salon.summary}
              </p>
              <p className="mt-2 border-l-2 border-ai pl-3 text-sm font-bold leading-6 text-ai md:mt-5">
                {salon.availability}
              </p>
              <Link
                className="mt-3 inline-flex border-b border-kokihi pb-1 text-sm font-bold text-kokihi md:mt-8 md:text-base"
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
