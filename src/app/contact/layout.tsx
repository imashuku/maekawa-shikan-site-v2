import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "講演・取材・協業のお問い合わせ",
  description:
    "前川真司への講演、取材、教育、地域企画などのご相談。現在は公式LINEで受け付けています。",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
