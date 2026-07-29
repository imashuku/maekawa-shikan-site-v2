import Link from "next/link";

export default function PublicationRoad() {
  return (
    <section className="relative overflow-hidden bg-sumi-dark py-20 text-kinari md:py-28">
      <div className="absolute inset-y-0 right-0 w-1/3 bg-kokihi/10" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-gold">
            ROAD TO PUBLICATION
          </p>
          <p className="mt-6 font-serif text-7xl text-kinari/15 md:text-9xl">
            本
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-snug text-kinari md:text-5xl">
            サロンで生まれた問いを、
            <br />
            来春、一冊の本へ。
          </h2>
          <p className="mt-7 max-w-2xl leading-8 text-kinari/70">
            長年の現地探究と、参加者との対話から生まれた物語をまとめています。
            読者になる前から、問いを寄せ、誰かに伝え、完成までの過程に参加できます。
          </p>
          <Link
            href="/publication"
            className="mt-9 inline-flex border border-kinari/50 px-7 py-4 font-bold text-kinari transition-colors hover:bg-kinari hover:text-sumi-dark"
          >
            出版への道を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
