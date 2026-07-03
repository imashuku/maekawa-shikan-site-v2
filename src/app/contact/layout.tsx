import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "お問い合わせ｜それはまことですか？（前川史観プロジェクト）",
  description:
    "講演のご依頼、取材、その他お問い合わせはこちらのフォームからお願いいたします。",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
