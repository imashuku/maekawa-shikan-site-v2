"use client";

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

      <section className="relative z-10 w-full max-w-2xl mx-auto pt-12 md:pt-20 pb-20 md:pb-24 px-5 md:px-6">
         <div className="text-center mb-10 md:mb-12">
             <h1 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-4">お問い合わせ</h1>
             <p className="text-sm md:text-base text-sumi/80 leading-relaxed">
                 講演のご依頼、取材、その他お問い合わせは<br/>
                 以下のフォームよりお願いいたします。
             </p>
         </div>

         <div className="bg-white/60 p-6 md:p-12 border border-sumi/10 shadow-lg">
             <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                     <label className="block text-sm font-bold mb-2 text-sumi-dark">お名前</label>
                     <input
                       type="text"
                       required
                       autoComplete="name"
                       className="w-full px-4 py-4 bg-kinari border border-sumi/20 focus:outline-none focus:border-kokihi transition-colors text-base"
                     />
                 </div>
                 <div>
                     <label className="block text-sm font-bold mb-2 text-sumi-dark">メールアドレス</label>
                     <input
                       type="email"
                       required
                       autoComplete="email"
                       inputMode="email"
                       className="w-full px-4 py-4 bg-kinari border border-sumi/20 focus:outline-none focus:border-kokihi transition-colors text-base"
                     />
                 </div>
                 <div>
                     <label className="block text-sm font-bold mb-2 text-sumi-dark">お問い合わせ内容</label>
                     <textarea
                       required
                       className="w-full px-4 py-4 bg-kinari border border-sumi/20 focus:outline-none focus:border-kokihi transition-colors text-base min-h-[8rem] md:min-h-[10rem]"
                     ></textarea>
                 </div>
                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full bg-sumi text-kinari py-5 hover:bg-kokihi transition-colors font-bold text-base tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
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
