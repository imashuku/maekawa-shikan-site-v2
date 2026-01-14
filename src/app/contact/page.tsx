"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert("お問い合わせありがとうございます。（デモ機能：実際には送信されていません）");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
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
        <span className="text-xs font-bold tracking-[0.2em] opacity-50">CONTACT</span>
      </nav>

      <section className="relative z-10 w-full max-w-2xl pt-32 pb-24 px-6">
         <div className="text-center mb-12">
             <h1 className="text-3xl font-serif font-bold text-sumi-dark mb-4">お問い合わせ</h1>
             <p className="text-sm text-sumi/60 leading-relaxed">
                 講演のご依頼、取材、その他お問い合わせは<br/>
                 以下のフォームよりお願いいたします。
             </p>
         </div>

         <div className="bg-white/60 p-8 md:p-12 border border-sumi/10 shadow-lg">
             <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                     <label className="block text-sm font-serif mb-2 text-sumi/80">お名前</label>
                     <input 
                       type="text" 
                       required
                       className="w-full px-4 py-3 bg-kinari border border-sumi/20 focus:outline-none focus:border-kokihi transition-colors font-serif"
                     />
                 </div>
                 <div>
                     <label className="block text-sm font-serif mb-2 text-sumi/80">メールアドレス</label>
                     <input 
                       type="email" 
                       required
                       className="w-full px-4 py-3 bg-kinari border border-sumi/20 focus:outline-none focus:border-kokihi transition-colors font-serif"
                     />
                 </div>
                 <div>
                     <label className="block text-sm font-serif mb-2 text-sumi/80">お問い合わせ内容</label>
                     <textarea 
                       rows={5}
                       required
                       className="w-full px-4 py-3 bg-kinari border border-sumi/20 focus:outline-none focus:border-kokihi transition-colors font-serif"
                     ></textarea>
                 </div>
                 <button 
                   type="submit" 
                   disabled={isSubmitting}
                   className="w-full bg-sumi text-kinari py-4 hover:bg-kokihi transition-colors font-serif font-bold tracking-widest disabled:opacity-50"
                 >
                    {isSubmitting ? "送信中..." : "送信する"}
                 </button>
             </form>
         </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-sumi-dark text-kinari py-8 text-center text-xs opacity-60">
        &copy; {new Date().getFullYear()} Shinji Maekawa All Rights Reserved.
      </footer>

    </main>
  );
}
