import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "リアルサロン参加お申込み",
  description:
    "前川史観リアルサロンの参加お申込み。Web受付の準備中は、公式LINEからご案内します。",
  path: "/apply",
});

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
