import Link from "next/link";
import { siteConfig } from "@/content/site";
import { getOpenRealEvent } from "@/lib/real-events";
import ApplicationForm from "./ApplicationForm";

export const dynamic = "force-dynamic";

export default async function ApplyPage() {
  const event = await getOpenRealEvent().catch((error) => {
    console.error("Apply page event fetch error:", error);
    return null;
  });

  if (event) {
    return <ApplicationForm event={event} />;
  }

  return (
    <section className="min-h-[70vh] py-20">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
          REAL SALON
        </p>
        <h1 className="mt-5 text-balance text-3xl font-bold md:text-5xl">
          Web受付を準備中です
        </h1>
        <p className="mt-6 leading-8 text-sumi/70">
          次回日程はリアルサロンページでご確認いただけます。お申込み・お問い合わせは公式LINEから承ります。
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={siteConfig.urls.line}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#057538] px-7 py-4 font-bold text-white"
          >
            公式LINEを開く
          </a>
          <Link
            href="/real"
            className="border border-sumi px-7 py-4 font-bold"
          >
            リアルサロンへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
