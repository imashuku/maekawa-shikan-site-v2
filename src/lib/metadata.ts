import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://maekawa-shikan-site-v2.vercel.app";
export const SITE_NAME = "前川史観｜それはまことですか？";
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
    alternates: {
      canonical: path,
    },
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

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "前川史観｜それはまことですか？― 前川真司が近江から読み解く、もう一つの日本史",
    template: `%s｜${siteConfig.brand}`,
  },
  description: siteConfig.description,
  openGraph: {
    title:
      "前川史観｜それはまことですか？― 前川真司が近江から読み解く、もう一つの日本史",
    description: siteConfig.description,
    url: "/",
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "前川史観｜それはまことですか？",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: siteConfig.description,
    images: [DEFAULT_OG_IMAGE],
  },
};
