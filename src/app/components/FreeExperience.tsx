import Link from "next/link";
import { siteConfig } from "@/content/site";
import SectionHeading from "./SectionHeading";

export default function FreeExperience() {
  return (
    <section className="bg-white/55 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="FIRST EXPERIENCE"
          title="まずは、無料で触れてみる。"
          lead="前川史観の入口は、知識を覚えることではなく、「本当にそうだろうか」と問いを持つことです。"
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.45fr_0.75fr]">
          <div>
            <div className="relative aspect-video overflow-hidden bg-sumi-dark shadow-xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={siteConfig.urls.youtubeEmbed}
                title="前川史観 オンライン歴史ラウンジへの招待動画"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-sumi/60">
              オンライン歴史ラウンジ「近江にみちびかれて」への招待動画
            </p>
          </div>
          <div className="border-t-4 border-ai bg-paper p-7 md:p-8">
            <p className="text-xs font-bold tracking-[0.2em] text-ai">READ</p>
            <h3 className="mt-4 text-2xl font-bold">文章から、静かに読む。</h3>
            <p className="mt-4 text-sm leading-7 text-sumi/75">
              現地で出会った痕跡や、教科書の余白にある物語をnoteで紹介しています。
            </p>
            <a
              href={siteConfig.urls.note}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex border-b border-ai pb-1 font-bold text-ai"
            >
              noteを読む →
            </a>
            <div className="mt-8 border-t border-sumi/15 pt-6">
              <p className="text-xs font-bold tracking-wider text-sumi/50">
                THREE STORIES
              </p>
              <Link
                href="/#stories"
                className="mt-3 inline-flex font-bold text-kokihi"
              >
                代表する三つの物語を見る →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
