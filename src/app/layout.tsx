import type { Metadata } from "next";
// import { Shippori_Mincho, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

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
  title: "前川史観 | 歴史の本質を問う",
  description:
    "教科書には載らない歴史の面白さを。前川真司による滋賀・近江の歴史再定義プロジェクト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className="font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
