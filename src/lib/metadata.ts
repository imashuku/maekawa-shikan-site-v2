import type { Metadata } from "next";

export const SITE_URL = "https://maekawa-shikan-site-v2.vercel.app";
export const SITE_NAME = "それはまことですか？｜前川真司の前川史観プロジェクト";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

// Root layout sets metadataBase, so relative path/image resolve to absolute URLs
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
}: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
