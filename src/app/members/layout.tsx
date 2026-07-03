import type { Metadata } from "next";

// Private page (redirects to top) — keep out of search results
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
