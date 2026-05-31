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
          {children}
        </main>
      </body>
    </html>
  );
}
