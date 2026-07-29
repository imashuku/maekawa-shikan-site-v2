import type { Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata;

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
      <body
        suppressHydrationWarning
        className="bg-kinari font-sans text-sumi antialiased"
      >
        <Header />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
