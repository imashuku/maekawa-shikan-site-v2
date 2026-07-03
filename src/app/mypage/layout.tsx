import type { Metadata } from "next";

// Personal member pages — keep out of search results
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
