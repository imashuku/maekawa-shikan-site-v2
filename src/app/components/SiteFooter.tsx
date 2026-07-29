import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-sumi/15 bg-sumi-dark text-kinari">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
        <div>
          <p className="font-serif text-2xl font-bold text-kinari">
            {siteConfig.brand}
          </p>
          <p className="mt-2 text-sm text-kinari/65">
            {siteConfig.project}｜{siteConfig.person}
          </p>
          <p className="mt-5 max-w-sm text-xs leading-6 text-kinari/70">
            近江から日本史を読み替え、まだ語られていない物語をひらく。
          </p>
        </div>
        <nav
          aria-label="フッターナビゲーション"
          className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:justify-self-end"
        >
          <Link href="/online">オンラインサロン</Link>
          <Link href="/real">リアルサロン</Link>
          <Link href="/profile">前川真司</Link>
          <Link href="/publication">出版への道</Link>
          <Link href="/contact">お問い合わせ</Link>
          <a
            href={siteConfig.urls.line}
            target="_blank"
            rel="noopener noreferrer"
          >
            公式LINE
          </a>
        </nav>
      </div>
      <div className="border-t border-kinari/10 px-5 py-5 text-center text-[11px] tracking-widest text-kinari/65">
        © {new Date().getFullYear()} Shinji Maekawa
      </div>
    </footer>
  );
}
