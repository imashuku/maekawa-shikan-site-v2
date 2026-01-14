"use client";

import Link from "next/link";
import { Noto_Serif_JP } from "next/font/google";

const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-serif",
});


export default function SupportPage() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("ニュースレター登録（デモ）：ありがとうございます。現在は登録できません。");
  };

  return (
    <main className={`min-h-screen bg-[#f7f6f2] text-[#333] flex flex-col items-center relative overflow-hidden ${serif.variable} font-serif`}>
      {/* Background Texture & Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('/noise.svg')] bg-repeat z-0"></div>
      
      {/* Header / Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:p-8 flex justify-between items-center mix-blend-multiply bg-white/5 backdrop-blur-sm">
        <Link href="/" className="text-sm font-bold tracking-widest hover:text-[#9d2b2b] transition-colors border-b border-transparent hover:border-[#9d2b2b]">
            ← トップへ戻る
        </Link>
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] opacity-60">SUPPORT PROJECT</span>
      </nav>

      {/* Hero Content */}
      <section className="relative z-10 w-full pt-40 pb-24 md:pt-52 md:pb-32 px-6 flex flex-col items-center text-center">
         <span className="text-[#9d2b2b] text-xs md:text-sm font-bold tracking-[0.2em] mb-8 block animate-fade-in-up">JOIN THE JOURNEY</span>
         <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] mb-10 leading-tight tracking-wide animate-fade-in-up delay-100">
            埋もれた歴史に、<br/>
            <span className="text-[#9d2b2b]">光</span>を。
         </h1>
         <p className="text-base md:text-xl text-[#4a4a4a] leading-loose max-w-2xl mx-auto animate-fade-in-up delay-200">
            教科書にはない「もう一つの日本史」を、<br className="md:hidden"/>
            共に紐解く旅に出ませんか。<br/>
            あなたの参加が、新たな真実を照らす灯火となります。
         </p>
         <div className="h-24 w-px bg-[#333] mt-16 opacity-20 animate-fade-in-up delay-300"></div>
      </section>

      {/* Three Ways to Support */}
      <section className="relative z-10 w-full max-w-6xl px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* 1. Newsletter */}
              <div className="bg-white p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                 <div className="absolute -right-4 -top-8 text-[120px] font-bold text-[#f0f0f0] pointer-events-none group-hover:text-[#f7e8e8] transition-colors z-0 font-serif">壹</div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#9d2b2b] rounded-full"></span>
                        知る
                    </h3>
                    <p className="text-sm leading-8 text-[#666] mb-8 min-h-[5rem]">
                        表には出せない取材メモや、執筆過程の苦悩。<br/>
                        ここでしか読めない裏話をニュースレターで。
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                        <input 
                          type="email" 
                          placeholder="メールアドレス" 
                          className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e0e0e0] focus:outline-none focus:border-[#9d2b2b] transition-colors text-sm"
                        />
                        <button type="submit" className="w-full bg-[#333] text-white py-3 hover:bg-[#9d2b2b] transition-colors text-sm font-bold tracking-widest">
                           登録する（無料）
                        </button>
                    </form>
                 </div>
              </div>

              {/* 2. Share */}
              <div className="bg-white p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                 <div className="absolute -right-4 -top-8 text-[120px] font-bold text-[#f0f0f0] pointer-events-none group-hover:text-[#f7e8e8] transition-colors z-0 font-serif">貳</div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#9d2b2b] rounded-full"></span>
                        広める
                    </h3>
                    <p className="text-sm leading-8 text-[#666] mb-8 min-h-[5rem]">
                        「歴史は勝者によって作られる」<br/>
                        あなたのシェアが、誰かの固定観念を壊します。
                    </p>
                    <div className="flex flex-col gap-3">
                        <a 
                          href="https://twitter.com/intent/tweet?text=%E6%AD%B4%E5%8F%B2%E3%81%AF%E5%8B%9D%E8%80%85%E3%81%AB%E3%82%88%E3%81%A3%E3%81%A6%E4%BD%9C%E3%82%89%E3%82%8C%E3%82%8B%E3%80%82%E3%81%97%E3%81%8B%E3%81%97%E3%80%81%E7%9C%9F%E5%AE%9F%E3%81%AF%E6%95%97%E8%80%85%E3%81%AE%E5%81%B4%E3%81%AB%E3%81%93%E3%81%9D%E5%AE%BF%E3%82%8B%E3%80%82%20%7C%20%E5%89%8D%E5%B7%9D%E5%8F%B2%E8%A6%B3%20%23%E5%89%8D%E5%B7%9D%E5%8F%B2%E8%A6%B3" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-3 border border-[#333] text-[#333] hover:bg-[#333] hover:text-white transition-colors text-sm tracking-widest text-center"
                        >
                           X (Twitter)
                        </a>
                        <a 
                          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmaekawa-shikan.vercel.app" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-3 border border-[#e0e0e0] text-[#666] hover:bg-[#3b5998] hover:text-white hover:border-[#3b5998] transition-colors text-sm tracking-widest text-center"
                        >
                           Facebook
                        </a>
                    </div>
                 </div>
              </div>

              {/* 3. Participate */}
              <div className="bg-white p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                 <div className="absolute -right-4 -top-8 text-[120px] font-bold text-[#f0f0f0] pointer-events-none group-hover:text-[#f7e8e8] transition-colors z-0 font-serif">參</div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="w-2 h-2 bg-[#9d2b2b] rounded-full"></span>
                        参加する
                    </h3>
                    <p className="text-sm leading-8 text-[#666] mb-8 min-h-[5rem]">
                        「歴史を語る会」や現地ツアー。<br/>
                        文字だけでは伝わらない熱量を、現場で。
                    </p>
                    <Link 
                        href="/contact" 
                        className="flex items-center justify-center w-full py-3 bg-[#9d2b2b] text-white hover:bg-[#7a1f1f] transition-all duration-300 text-sm font-bold tracking-widest shadow-md hover:shadow-lg"
                    >
                        お問い合わせへ
                    </Link>
                 </div>
              </div>
          </div>
      </section>

      {/* Patron / Support Section */}
      <section className="w-full bg-[#1a1a1a] text-[#f0f0f0] py-24 md:py-40">
          <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-24">
                  <span className="text-[#e0e0e0] opacity-70 text-xs font-bold tracking-[0.3em] mb-6 block">SPECIAL SUPPORT</span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                      歴史探究の旅を、共に。
                  </h2>
                  <p className="text-sm md:text-base opacity-70 leading-loose max-w-2xl mx-auto font-light">
                      取材活動には、多大なリソースが必要です。<br/>
                      対象商品をご購入いただくことで、<span className="text-[#fff] border-b border-[#9d2b2b] pb-1 mx-1">売上の一部</span>が<br/>
                      前川史観の取材・執筆活動費に充てられます。
                  </p>
              </div>

              <div className="grid grid-cols-1 gap-16">
                  {/* Support Item: bobs */}
                  <div className="bg-[#222] border border-[#333] overflow-hidden group hover:border-[#555] transition-colors duration-500 grid grid-cols-1 md:grid-cols-2">
                       <div className="h-64 md:h-auto bg-[#111] relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-[#004d40] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#004d40]/20 to-transparent"></div>
                            <span className="relative z-10 text-4xl md:text-5xl font-bold tracking-[0.1em] text-[#e0e0e0] opacity-90 group-hover:scale-105 transition-transform duration-700">bobs</span>
                       </div>
                       <div className="p-8 md:p-12 flex flex-col justify-center">
                           <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-[#004d40]/20 text-[#4db6ac] text-[10px] tracking-widest font-bold border border-[#004d40]/30">MEN'S ORGANIC</span>
                                <span className="px-3 py-1 bg-[#b71c1c]/10 text-[#ef5350] text-[10px] tracking-widest font-bold border border-[#b71c1c]/20">AWARD WINNER</span>
                           </div>
                           <h3 className="text-2xl font-bold mb-4 tracking-wide" style={{ color: '#ffffff' }}>bobs ambient root</h3>
                           <p className="text-sm leading-8 mb-8 border-l border-[#333] pl-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
                               滋賀のセレクトショップ「BORN FREE」が共同開発した、<br/>
                               メンズオーガニックコスメ。<br/>
                               「ニッポンの宝物 グランプリ」を受賞。<br/>
                               奥永源寺の紫根と政所茶、自然の宝を肌に纏う。
                           </p>
                           <a 
                             href="https://bobs.base.ec/" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="inline-flex items-center justify-center px-8 py-4 border border-[#444] text-[#ccc] hover:bg-[#004d40] hover:text-white hover:border-[#004d40] transition-colors duration-300 text-sm tracking-widest self-start"
                           >
                               商品ページを見る →
                           </a>
                       </div>
                  </div>

                  {/* Support Item: murasaki no organic */}
                  <div className="bg-[#222] border border-[#333] overflow-hidden group hover:border-[#555] transition-colors duration-500 grid grid-cols-1 md:grid-cols-2">
                       <div className="h-64 md:h-auto bg-[#111] relative overflow-hidden flex items-center justify-center order-1 md:order-2">
                            <div className="absolute inset-0 bg-[#4a148c] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
                            {/* Decorative Elements */}
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#4a148c]/20 to-transparent"></div>
                            <span className="relative z-10 text-3xl md:text-4xl font-bold tracking-[0.1em] text-[#e0e0e0] opacity-90 group-hover:scale-105 transition-transform duration-700 text-center leading-tight">murasaki no<br/>organic</span>
                       </div>
                       <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                           <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-[#4a148c]/20 text-[#ea80fc] text-[10px] tracking-widest font-bold border border-[#4a148c]/30">ORGANIC COSMETICS</span>
                                <span className="px-3 py-1 bg-[#fff]/5 text-[#ccc] text-[10px] tracking-widest font-bold border border-[#fff]/10">SUSTAINABLE</span>
                           </div>
                           <h3 className="text-2xl font-bold mb-4 tracking-wide" style={{ color: '#ffffff' }}>murasaki no organic</h3>
                           <p className="text-sm leading-8 mb-8 border-l border-[#333] pl-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
                               滋賀県東近江市で、絶滅危惧種「紫草」を<br/>
                               完全無農薬オーガニック栽培で再生。<br/>
                               万葉の時代から愛される神秘の力（紫根エキス）を、<br/>
                               現代のスキンケアへ。
                           </p>
                           <a 
                             href="https://murasakino-organic.stores.jp/" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="inline-flex items-center justify-center px-8 py-4 border border-[#444] text-[#ccc] hover:bg-[#4a148c] hover:text-white hover:border-[#4a148c] transition-colors duration-300 text-sm tracking-widest self-start"
                           >
                               商品ページを見る →
                           </a>
                       </div>
                  </div>
              </div>

              {/* Crowdfunding Section */}
              <div className="mt-24">
                   {/* Progress Header */}
                   <div className="text-center mb-16">
                        <span className="text-xs tracking-[0.3em] opacity-60 mb-4 block">CROWDFUNDING</span>
                        <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#ffffff' }}>前川史観 出版支援プロジェクト</h3>
                        <p className="text-sm opacity-70 mb-2">All-In方式（目標金額に関わらず支援金を受け取ります）</p>
                   </div>

                   {/* Stats Card */}
                   <div className="border border-[#333] bg-[#222] p-8 md:p-12 mb-12 relative">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#555]"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#555]"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#555]"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#555]"></div>

                        {/* Current Amount */}
                        <div className="text-center mb-8">
                             <p className="text-xs opacity-60 mb-2">現在の支援総額</p>
                             <p className="text-4xl md:text-5xl font-bold" style={{ color: '#ffffff' }}>
                                  ¥<span id="current-amount">0</span>
                             </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#333] h-3 rounded-full mb-6 overflow-hidden">
                             <div 
                                  className="h-full bg-gradient-to-r from-[#9d2b2b] to-[#c74545] rounded-full transition-all duration-1000"
                                  style={{ width: '0%' }}
                                  id="progress-bar"
                             ></div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                             <div>
                                  <p className="text-2xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>0%</p>
                                  <p className="text-xs opacity-60 mt-1">達成率</p>
                             </div>
                             <div>
                                  <p className="text-2xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>
                                       <span id="supporter-count">0</span>人
                                  </p>
                                  <p className="text-xs opacity-60 mt-1">支援者</p>
                             </div>
                             <div>
                                  <p className="text-2xl md:text-3xl font-bold" style={{ color: '#ffffff' }}>
                                       <span id="days-left">76</span>日
                                  </p>
                                  <p className="text-xs opacity-60 mt-1">残り</p>
                             </div>
                        </div>

                        {/* Goal */}
                        <div className="mt-8 pt-6 border-t border-[#333] text-center">
                             <p className="text-sm opacity-70">目標金額: <span className="font-bold" style={{ color: '#ffffff' }}>¥1,000,000</span></p>
                             <p className="text-xs opacity-50 mt-2">期間: 2026年2月1日 〜 3月31日</p>
                        </div>
                   </div>

                   {/* Support Plans */}
                   <div className="space-y-6">
                        <h4 className="text-center text-lg font-bold tracking-widest mb-8" style={{ color: '#ffffff' }}>支援プランを選ぶ</h4>
                        
                        {/* Plan 1: サポーター */}
                        <div className="border border-[#333] bg-[#222] p-6 md:p-8 hover:border-[#555] transition-colors group">
                             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                  <div className="flex-1">
                                       <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-[#9d2b2b]/20 text-[#ef5350] text-[10px] tracking-widest font-bold border border-[#9d2b2b]/30">SUPPORTER</span>
                                       </div>
                                       <h5 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>サポーター</h5>
                                       <p className="text-2xl font-bold mb-4" style={{ color: '#9d2b2b' }}>¥3,000</p>
                                       <ul className="text-sm space-y-2 opacity-80">
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#9d2b2b] mt-1">✓</span>
                                                 <span>書籍巻末に「Special Thanks」としてお名前を掲載</span>
                                            </li>
                                       </ul>
                                  </div>
                                  <button 
                                       className="w-full md:w-auto px-8 py-4 bg-[#9d2b2b] text-white font-bold tracking-widest hover:bg-[#7a1f1f] transition-colors text-sm"
                                       data-plan="supporter"
                                       data-amount="3000"
                                  >
                                       このプランで支援する
                                  </button>
                             </div>
                        </div>

                        {/* Plan 2: 応援団 */}
                        <div className="border border-[#333] bg-[#222] p-6 md:p-8 hover:border-[#555] transition-colors group">
                             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                  <div className="flex-1">
                                       <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-[#004d40]/20 text-[#4db6ac] text-[10px] tracking-widest font-bold border border-[#004d40]/30">FAN</span>
                                            <span className="px-3 py-1 bg-[#fff]/5 text-[#ccc] text-[10px] tracking-widest font-bold border border-[#fff]/10">人気</span>
                                       </div>
                                       <h5 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>応援団</h5>
                                       <p className="text-2xl font-bold mb-4" style={{ color: '#004d40' }}>¥10,000</p>
                                       <ul className="text-sm space-y-2 opacity-80">
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#4db6ac] mt-1">✓</span>
                                                 <span>サポータープランのすべて</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#4db6ac] mt-1">✓</span>
                                                 <span>著者サイン入り書籍の送付</span>
                                            </li>
                                       </ul>
                                  </div>
                                  <button 
                                       className="w-full md:w-auto px-8 py-4 bg-[#004d40] text-white font-bold tracking-widest hover:bg-[#00352c] transition-colors text-sm"
                                       data-plan="fan"
                                       data-amount="10000"
                                  >
                                       このプランで支援する
                                  </button>
                             </div>
                        </div>

                        {/* Plan 3: パトロン */}
                        <div className="border border-[#333] bg-[#222] p-6 md:p-8 hover:border-[#555] transition-colors group">
                             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                  <div className="flex-1">
                                       <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-[#4a148c]/20 text-[#ea80fc] text-[10px] tracking-widest font-bold border border-[#4a148c]/30">PATRON</span>
                                       </div>
                                       <h5 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>パトロン</h5>
                                       <p className="text-2xl font-bold mb-4" style={{ color: '#4a148c' }}>¥30,000</p>
                                       <ul className="text-sm space-y-2 opacity-80">
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#ea80fc] mt-1">✓</span>
                                                 <span>応援団プランのすべて</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#ea80fc] mt-1">✓</span>
                                                 <span>出版記念パーティーへのご招待</span>
                                            </li>
                                       </ul>
                                  </div>
                                  <button 
                                       className="w-full md:w-auto px-8 py-4 bg-[#4a148c] text-white font-bold tracking-widest hover:bg-[#320e61] transition-colors text-sm"
                                       data-plan="patron"
                                       data-amount="30000"
                                  >
                                       このプランで支援する
                                  </button>
                             </div>
                        </div>

                        {/* Plan 4: スポンサー */}
                        <div className="border border-[#9d2b2b] bg-gradient-to-br from-[#222] to-[#2a1a1a] p-6 md:p-8 hover:border-[#c74545] transition-colors group relative overflow-hidden">
                             {/* Premium Badge */}
                             <div className="absolute top-0 right-0 bg-[#9d2b2b] text-white text-[10px] px-4 py-1 tracking-widest font-bold">PREMIUM</div>
                             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                  <div className="flex-1">
                                       <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-[#9d2b2b]/30 text-[#ff8a80] text-[10px] tracking-widest font-bold border border-[#9d2b2b]/50">SPONSOR</span>
                                       </div>
                                       <h5 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>スポンサー</h5>
                                       <p className="text-2xl font-bold mb-4" style={{ color: '#ff8a80' }}>¥100,000</p>
                                       <ul className="text-sm space-y-2 opacity-80">
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#ff8a80] mt-1">✓</span>
                                                 <span>パトロンプランのすべて</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#ff8a80] mt-1">✓</span>
                                                 <span>前川先生と一緒に取材地を巡る歴史ツアー（日帰り）</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                 <span className="text-[#ff8a80] mt-1">✓</span>
                                                 <span>直筆サイン＆メッセージ入り特装版書籍</span>
                                            </li>
                                       </ul>
                                  </div>
                                  <button 
                                       className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#9d2b2b] to-[#c74545] text-white font-bold tracking-widest hover:from-[#7a1f1f] hover:to-[#9d2b2b] transition-all text-sm"
                                       data-plan="sponsor"
                                       data-amount="100000"
                                  >
                                       このプランで支援する
                                  </button>
                             </div>
                        </div>
                   </div>
              </div>
          </div>
      </section>

      {/* Message from Author */}
      <section className="relative z-10 w-full max-w-4xl px-6 pb-24 md:pb-40 text-center pt-24">
          <div className="relative">
              <span className="block text-[10px] tracking-[0.3em] opacity-40 mb-6">MESSAGE</span>
              <p className="text-lg md:text-2xl font-bold leading-loose text-[#333]">
                 「歴史は、過去のものではありません。<br/>
                 今を生きる私たちの、<br/>
                 <span className="text-[#9d2b2b]">足元を照らす光</span>です。」
              </p>
              <div className="mt-12 flex justify-center items-center gap-4 opacity-60">
                 <div className="h-px w-12 bg-[#333]"></div>
                 <p className="text-sm tracking-widest">前川 真司</p>
                 <div className="h-px w-12 bg-[#333]"></div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#151515] text-[#888] py-12 text-center text-[10px] tracking-widest border-t border-[#333]">
        &copy; {new Date().getFullYear()} Shinji Maekawa All Rights Reserved.
      </footer>
    </main>
  );
}
