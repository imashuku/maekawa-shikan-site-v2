import Link from "next/link";
import Image from "next/image";
import { stories } from "@/lib/stories";
import { notFound } from "next/navigation";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, SITE_URL } from "@/lib/metadata";

// Generate static params for all stories
export async function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};

  // 1200x630 OG crops live in /og/ mirroring the original image filenames
  const ogImage = story.imageUrl.replace(/^\//, "/og/").replace(/\.png$/, ".jpg");
  return buildMetadata({
    title: `${story.title}｜前川史観`,
    description: story.excerpt,
    path: `/story/${story.slug}`,
    image: ogImage,
    imageAlt: story.title,
    type: "article",
  });
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params correctly (in Next.js 15+, params is a Promise)
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-kinari text-sumi flex flex-col items-center relative overflow-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: story.excerpt,
          image: `${SITE_URL}${story.imageUrl}`,
          mainEntityOfPage: `${SITE_URL}/story/${story.slug}`,
          author: {
            "@type": "Person",
            name: "前川真司",
            url: `${SITE_URL}/profile`,
          },
          publisher: {
            "@type": "Organization",
            name: "前川史観",
            url: SITE_URL,
          },
        }}
      />
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('/noise.svg')] bg-repeat z-0"></div>

      {/* Article Header */}
      <header className="w-full max-w-4xl pt-12 md:pt-20 pb-10 md:pb-12 px-5 md:px-6 relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
         <div className="w-full md:w-2/3">
             <span className="inline-block py-1 px-3 border border-kokihi text-kokihi text-xs font-bold tracking-widest mb-4">EPISODE</span>
             <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-sumi-dark mb-4 leading-tight">
                {story.title}
             </h1>
             <p className="text-base md:text-xl font-serif text-sumi/80 leading-relaxed">
                {story.subtitle}
             </p>
         </div>
      </header>

      {/* Featured Image */}
      <div className="w-full max-w-5xl h-[35vh] sm:h-[40vh] md:h-[60vh] relative z-10 mb-12 md:mb-16 shadow-lg">
         <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
            className="object-cover"
            priority
         />
      </div>

      {/* Article Content */}
      <article className="w-full max-w-3xl px-5 md:px-6 relative z-10 pb-24 md:pb-32">
         {/* Introduction / Excerpt */}
         <div className="mb-10 md:mb-12 p-6 md:p-8 bg-white/60 shadow-sm border border-sumi/5 font-serif text-base md:text-lg leading-relaxed md:leading-loose">
            {story.excerpt}
         </div>

         {/* Main Content */}
         <div
           className="prose prose-base md:prose-lg prose-p:text-sumi prose-headings:font-serif prose-headings:text-sumi-dark max-w-none font-serif"
           dangerouslySetInnerHTML={{ __html: story.content }}
         />
      </article>

      {/* Footer Navigation */}
      <div className="w-full max-w-4xl px-5 md:px-6 pb-20 md:pb-24 relative z-10 flex justify-center">
         <Link href="/" className="group flex flex-col items-center gap-2 py-3">
             <span className="w-12 h-px bg-sumi group-hover:bg-kokihi transition-colors"></span>
             <span className="tracking-widest text-sm group-hover:text-kokihi transition-colors">トップへ戻る</span>
         </Link>
      </div>
      
    </main>
  );
}
