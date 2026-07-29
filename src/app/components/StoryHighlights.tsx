import Image from "next/image";
import Link from "next/link";
import { stories } from "@/lib/stories";
import SectionHeading from "./SectionHeading";

export default function StoryHighlights() {
  return (
    <section id="stories" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="STORIES"
          title="近江に眠る、三つの入口。"
          lead="歴史的事実、土地に残る伝承、前川真司の解釈を行き来しながら、もう一つの日本史を読みます。"
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {stories.map((story, index) => (
            <article key={story.slug} className="group">
              <Link href={`/story/${story.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sumi/10">
                  <Image
                    src={story.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-kinari px-3 py-1.5 font-serif text-sm font-bold">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-8">{story.title}</h3>
                <p className="mt-2 text-sm font-bold text-kokihi">
                  {story.subtitle}
                </p>
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-sumi/70">
                  {story.excerpt}
                </p>
                <span className="mt-5 inline-flex border-b border-sumi/30 pb-1 text-sm font-bold">
                  物語を読む →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
