"use client";

import Link from "next/link";

export default function SupportPage() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("ニュースレター登録（デモ）：ありがとうございます。現在は登録できません。");
  };

  return (
    <main className="min-h-screen bg-kinari text-sumi flex flex-col items-center relative overflow-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('/noise.svg')] bg-repeat z-0"></div>

      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-multiply">
        <Link href="/" className="text-sm font-serif tracking-widest hover:text-kokihi transition-colors">
            ← トップへ戻る
        </Link>
        <span className="text-xs font-bold tracking-[0.2em] opacity-50">SUPPORT PROJECT</span>
      </nav>

      {/* Hero Content */}
      <section className="relative z-10 w-full max-w-4xl pt-28 md:pt-32 pb-16 md:pb-24 px-6 text-center">
         <h1 className="text-3xl md:text-5xl font-serif font-bold text-sumi-dark mb-8 leading-tight">
            埋もれた歴史に、<br/>
            光を。
         </h1>
         <p className="text-base md:text-xl font-serif text-sumi/80 leading-loose mb-12">
            教科書にはない「もう一つの日本史」を、<br/>
            共に紐解きませんか。
         </p>
         <div className="h-px w-24 bg-kokihi mx-auto opacity-50"></div>
      </section>

      {/* Three Ways to Support */}
      <section className="relative z-10 w-full max-w-5xl px-6 pb-20 md:pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* 1. Newsletter */}
          <div className="bg-white/60 p-6 md:p-8 border border-sumi/10 text-center hover:shadow-lg transition-shadow duration-300">
             <div className="w-16 h-16 bg-sumi text-kinari rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-6">壱</div>
             <h3 className="text-xl font-serif font-bold mb-4">制作の裏側を知る</h3>
             <p className="text-sm leading-relaxed mb-6">
                表には出せない取材メモや、<br/>執筆過程の苦悩をニュースレターでお届けします。
             </p>
             <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="メールアドレス" 
                  className="w-full px-4 py-3 bg-kinari border border-sumi/20 focus:outline-none focus:border-kokihi transition-colors font-serif text-base"
                />
                <button type="submit" className="w-full bg-sumi text-kinari py-3 hover:bg-kokihi transition-colors font-serif font-bold">
                   登録する（無料）
                </button>
             </form>
          </div>

          {/* 2. Share */}
          <div className="bg-white/60 p-6 md:p-8 border border-sumi/10 text-center hover:shadow-lg transition-shadow duration-300">
             <div className="w-16 h-16 bg-kokihi text-white rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-6">弐</div>
             <h3 className="text-xl font-serif font-bold mb-4">物語を広める</h3>
             <p className="text-sm leading-relaxed mb-6">
                あなたのシェアが、<br/>誰かの新たな視点への扉を開きます。
             </p>
             <div className="flex justify-center gap-4 flex-wrap">
                <a 
                  href="https://twitter.com/intent/tweet?text=%E6%AD%B4%E5%8F%B2%E3%81%AF%E5%8B%9D%E8%80%85%E3%81%AB%E3%82%88%E3%81%A3%E3%81%A6%E4%BD%9C%E3%82%89%E3%82%8C%E3%82%8B%E3%80%82%E3%81%97%E3%81%8B%E3%81%97%E3%80%81%E7%9C%9F%E5%AE%9F%E3%81%AF%E6%95%97%E8%80%85%E3%81%AE%E5%81%B4%E3%81%AB%E3%81%93%E3%81%9D%E5%AE%BF%E3%82%8B%E3%80%82%20%7C%20%E5%89%8D%E5%B7%9D%E5%8F%B2%E8%A6%B3%20%23%E5%89%8D%E5%B7%9D%E5%8F%B2%E8%A6%B3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-sumi/20 hover:bg-sumi hover:text-kinari transition-colors text-sm font-serif inline-block font-bold min-w-[120px]"
                >
                   X (Twitter)
                </a>
                <a 
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmaekawa-shikan.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-sumi/20 hover:bg-sumi hover:text-kinari transition-colors text-sm font-serif inline-block font-bold min-w-[120px]"
                >
                   Facebook
                </a>
             </div>
          </div>

          {/* 3. Event */}
          <div className="bg-white/60 p-6 md:p-8 border border-sumi/10 text-center hover:shadow-lg transition-shadow duration-300">
             <div className="w-16 h-16 bg-sumi text-kinari rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-6">参</div>
             <h3 className="text-xl font-serif font-bold mb-4">プロジェクトに参加する</h3>
             <p className="text-sm leading-relaxed mb-6">
                定期開催の「歴史を語る会」や<br/>現地ツアーで、歴史の手触りを感じてください。
             </p>
             <Link href="/contact" className="w-full inline-block border-b border-kokihi text-kokihi pb-1 hover:opacity-70 transition-opacity font-serif mt-2">
                お問い合わせはこちら →
             </Link>
          </div>
      </section>

      {/* Patron / Support Section */}
      <section className="w-full bg-sumi-dark text-kinari py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="text-kokihi text-xs font-bold tracking-widest mb-6 block">SPECIAL SUPPORT</span>
              <h2 className="text-2xl md:text-4xl font-serif mb-8 leading-relaxed">
                  歴史探究の旅を、共に。
              </h2>
              <p className="text-sm md:text-base font-serif leading-loose opacity-80 mb-16">
                  取材活動には、多大なリソースが必要です。<br/>
                  あなたの支援が、次の真実を掘り起こすスコップとなります。<br/>
                  <br/>
                  対象商品をご購入いただくことで、売上の全額が<br/>
                  前川史観の取材・執筆活動費に充てられます。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {/* Support Item: bobs */}
                  <div className="bg-sumi/50 border border-kinari/10 p-8 hover:border-kokihi/50 transition-colors group">
                      <div className="h-48 bg-black/20 mb-6 flex items-center justify-center font-serif text-2xl tracking-widest border border-kinari/5">
                          bobs
                      </div>
                      <h3 className="text-xl font-serif font-bold mb-2">bobs 購入支援</h3>
                      <p className="text-xs opacity-60 mb-6 leading-relaxed">
                          日常に溶け込むアートピース。<br/>
                          その利益が、知の冒険を支えます。
                      </p>
                      <a 
                        href="https://bobs.base.ec/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full py-3 border border-kinari/30 text-kinari group-hover:bg-kokihi group-hover:border-kokihi group-hover:text-white transition-all duration-300 font-serif text-sm tracking-widest"
                      >
                          支援する（商品ページへ）
                      </a>
                  </div>

                  {/* Support Item: murasaki no */}
                  <div className="bg-sumi/50 border border-kinari/10 p-8 hover:border-kokihi/50 transition-colors group">
                      <div className="h-48 bg-pink-900/10 mb-6 flex items-center justify-center font-serif text-2xl tracking-widest border border-kinari/5 text-pink-100/50">
                          murasaki no
                      </div>
                      <h3 className="text-xl font-serif font-bold mb-2">murasaki no 購入支援</h3>
                      <p className="text-xs opacity-60 mb-6 leading-relaxed">
                          高貴なる紫の系譜。<br/>
                          歴史への敬意を纏う支援の形。
                      </p>
                      <a 
                         href="https://murasakino-organic.stores.jp/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="block w-full py-3 border border-kinari/30 text-kinari group-hover:bg-kokihi group-hover:border-kokihi group-hover:text-white transition-all duration-300 font-serif text-sm tracking-widest"
                      >
                          支援する（商品ページへ）
                      </a>
                  </div>
              </div>

              {/* Returns */}
              <div className="bg-kinari/5 p-8 md:p-10 border border-kinari/10 text-left md:text-center">
                  <h4 className="text-lg font-serif text-kokihi mb-4 flex items-center justify-center gap-3">
                      <span className="h-px w-8 bg-kokihi"></span>
                      支援者リターン
                      <span className="h-px w-8 bg-kokihi"></span>
                  </h4>
                  <ul className="text-sm font-serif space-y-4 opacity-80 inline-block text-left">
                      <li className="flex items-start gap-3">
                          <span className="text-kokihi">✦</span>
                          書籍出版時、巻末に「Special Thanks」としてお名前を掲載
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="text-kokihi">✦</span>
                          未公開の取材写真・資料の限定公開（不定期）
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="text-kokihi">✦</span>
                          出版記念パーティーへの優先ご招待
                      </li>
                  </ul>
              </div>
          </div>
      </section>

      {/* Message from Author */}
      <section className="relative z-10 w-full max-w-3xl px-6 pb-20 md:pb-32 text-center">
         <div className="p-8 md:p-12 border border-sumi/10 bg-white/40 relative">
             <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-kinari px-4 text-xs tracking-widest text-sumi/60">FROM SHINJI MAEKAWA</span>
             <p className="font-serif leading-loose text-sumi text-sm md:text-base">
                「歴史は、過去のものではありません。<br/>
                今を生きる私たちの足元を照らす光です。<br/>
                <br/>
                このプロジェクトを通じて、<br/>
                皆様と共に新たな歴史の地平を拓けることを<br/>
                心より楽しみにしています。」
             </p>
             <p className="mt-8 font-serif text-right text-sm">前川 真司</p>
         </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-sumi-dark text-kinari py-8 text-center text-xs opacity-60">
        &copy; {new Date().getFullYear()} Shinji Maekawa All Rights Reserved.
      </footer>
    </main>
  );
}
