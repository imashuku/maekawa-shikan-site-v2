import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function LegacyMypagePage() {
  return (
    <section className="min-h-[70vh] py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
          MEMBER INFORMATION
        </p>
        <h1 className="mt-5 text-3xl font-bold md:text-5xl">
          旧マイページは公開を終了しました
        </h1>
        <p className="mt-7 leading-8 text-sumi/70">
          会員情報と参加履歴を安全に扱うため、会員番号だけで閲覧できるページを停止しました。
          確認が必要な方は、公式LINEから運営へご連絡ください。
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={siteConfig.urls.line}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#06C755] px-7 py-4 font-bold text-white"
          >
            公式LINEで確認する
          </a>
          <Link
            href="/"
            className="border border-sumi px-7 py-4 font-bold"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
