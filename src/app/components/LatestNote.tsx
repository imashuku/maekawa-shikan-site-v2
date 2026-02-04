import Image from "next/image";
import Link from "next/link";

export default function LatestNote() {
  return (
    <section className="w-full bg-washi-gray/30 py-20 px-6 md:px-0 border-t border-sumi/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          
          {/* Image Side */}
          <div className="w-full md:w-3/5">
            <Link 
              href="https://note.com/maekawa_shikan/n/n87f0499a42e1" 
              target="_blank"
              className="block group relative aspect-video overflow-hidden shadow-xl"
            >
              <Image
                src="/note-vol1.png"
                alt="Latest Note: History Hidden in Shiga"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-sumi/10 group-hover:bg-transparent transition-colors duration-300"></div>
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-kokihi text-white text-xs font-bold px-3 py-1 tracking-widest shadow-md">
                NEW ARTICLE
              </div>
            </Link>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-2/5 flex flex-col items-start text-left">
            <span className="text-kokihi font-bold text-xs tracking-[0.2em] mb-4 block">
              OFFICIAL NOTE
            </span>
            
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-6 leading-relaxed">
              教科書に載らない
              <br />
              歴史が、ここにある。
            </h2>

            <p className="text-sm md:text-base font-serif text-sumi leading-loose mb-8 opacity-80">
              滋賀県・東近江市から発信する「前川史観」。
              <br />
              あなたの足元には、教科書が語らなかった日本史の核心が眠っているかもしれません。
              <br />
              記念すべき第1弾記事、公開。
            </p>

            <Link
              href="https://note.com/maekawa_shikan/n/n87f0499a42e1"
              target="_blank"
              className="group flex items-center gap-3 text-sumi-dark hover:text-kokihi transition-colors font-serif font-bold tracking-wider"
            >
              <span className="border-b border-current pb-1">noteで記事を読む</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
