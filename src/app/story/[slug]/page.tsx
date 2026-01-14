import Link from "next/link";
import Image from "next/image";
import { stories } from "@/lib/stories";
import { notFound } from "next/navigation";

// Generate static params for all stories
export async function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function StoryPage({ params }: { params: { slug: string } }) {
  // Await params correctly (in Next.js 15+, params is a Promise)
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-kinari text-sumi flex flex-col items-center relative overflow-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('/noise.svg')] bg-repeat z-0"></div>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-multiply">
        <Link href="/" className="text-sm font-serif tracking-widest hover:text-kokihi transition-colors">
            ← 戻る
        </Link>
        <span className="text-xs font-bold tracking-[0.2em] opacity-50">SHINJI MAEKAWA HISTORICAL VIEW</span>
      </nav>

      {/* Article Header */}
      <header className="w-full max-w-4xl pt-32 pb-12 px-6 relative z-10 flex flex-col md:flex-row gap-8 items-end">
         <div className="w-full md:w-2/3">
             <span className="inline-block py-1 px-3 border border-kokihi text-kokihi text-xs font-bold tracking-widest mb-4">EPISODE</span>
             <h1 className="text-3xl md:text-5xl font-serif font-bold text-sumi-dark mb-4 leading-tight">
                {story.title}
             </h1>
             <p className="text-lg md:text-xl font-serif text-sumi/80">
                {story.subtitle}
             </p>
         </div>
      </header>

      {/* Featured Image */}
      <div className="w-full max-w-5xl h-[40vh] md:h-[60vh] relative z-10 mb-16 shadow-lg">
         <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            className="object-cover"
            priority
         />
      </div>

      {/* Article Content */}
      <article className="w-full max-w-3xl px-6 relative z-10 pb-32">
         {/* Introduction / Excerpt */}
         <div className="mb-12 p-8 bg-white/60 shadow-sm border border-sumi/5 font-serif text-lg leading-loose">
            {story.excerpt}
         </div>

         {/* Main Content */}
         <div 
           className="prose prose-lg prose-p:text-sumi prose-headings:font-serif prose-headings:text-sumi-dark max-w-none font-serif"
           dangerouslySetInnerHTML={{ __html: story.content }}
         />
      </article>

      {/* Footer Navigation */}
      <div className="w-full max-w-4xl px-6 pb-24 relative z-10 flex justify-center">
         <Link href="/" className="group flex flex-col items-center gap-2">
             <span className="w-12 h-px bg-sumi group-hover:bg-kokihi transition-colors"></span>
             <span className="font-serif tracking-widest text-sm group-hover:text-kokihi transition-colors">トップへ戻る</span>
         </Link>
      </div>
      
    </main>
  );
}
