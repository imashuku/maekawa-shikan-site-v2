import type { Metadata, Viewport } from "next";
// import { Shippori_Mincho, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

/*
const shippori = Shippori_Mincho({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});
*/

export const metadata: Metadata = {
  title: "それはまことですか？｜前川真司の前川史観プロジェクト",
  description:
    "歴史講演家・前川真司による、近江から日本史を読み解く歴史プロジェクト「それはまことですか？」公式サイト。教科書には載らない、もう一つの日本史を発信。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning className="font-sans antialiased bg-kinari text-sumi">
        <Header />
        <main className="pt-16 md:pt-20">
          {/* Sitewide Announcement Ribbon — YOOR online salon */}
          <a
            href="https://yoor.jp/door/michibikarete"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-kokihi text-white"
          >
            <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-center gap-2 md:gap-3 text-center font-serif text-xs md:text-sm tracking-wider">
              <span className="shrink-0 rounded-sm bg-white/20 px-1.5 py-0.5 text-[10px] font-bold tracking-widest">
                NEW
              </span>
              <span className="leading-snug">
                オンライン歴史ラウンジ「近江にみちびかれて」事前受付スタート
                <span className="hidden sm:inline opacity-90">
                  ／2026年6月開講・全10回
                </span>
              </span>
              <span
                aria-hidden
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </a>
          {children}
        </main>
      </body>
    </html>
  );
}
