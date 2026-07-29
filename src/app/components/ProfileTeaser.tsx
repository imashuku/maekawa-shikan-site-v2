import Image from "next/image";
import Link from "next/link";

export default function ProfileTeaser() {
  return (
    <section className="border-y border-sumi/15 bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-sumi/10">
          <Image
            src="/profile.png"
            alt="近江史コンテンツプロデューサー・歴史講演家の前川真司"
            fill
            sizes="(max-width: 768px) 90vw, 384px"
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sumi-dark/80 to-transparent px-6 pb-6 pt-20 text-white">
            <p className="text-xs tracking-[0.18em]">SHINJI MAEKAWA</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            FOUNDER &amp; STORYTELLER
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">前川 真司</h2>
          <p className="mt-4 font-bold text-ai">
            近江史コンテンツプロデューサー／歴史講演家
          </p>
          <p className="mt-7 max-w-2xl leading-8 text-sumi/75">
            地域の現場で見つけた痕跡をつなぎ、近江から日本史全体を読み替える。
            前川史観は、史資料と先行研究、現地で受け継がれた記憶、そして参加者との対話から育つ歴史の見取り図です。
          </p>
          <blockquote className="mt-8 border-l-2 border-kokihi pl-5 font-serif text-xl leading-9 text-sumi-dark">
            日本の歴史を10巻の本にまとめたら、
            <br />
            そこに近江の登場しない巻は無い。
          </blockquote>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/profile"
              className="bg-kokihi px-6 py-3.5 text-center font-bold text-white"
            >
              前川真司を知る
            </Link>
            <Link
              href="/contact"
              className="border border-sumi px-6 py-3.5 text-center font-bold"
            >
              講演・取材を相談する
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
