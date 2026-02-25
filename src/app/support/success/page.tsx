'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// メインコンテンツコンポーネント（useSearchParamsを使用）
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // セッションIDがない場合はエラー表示
  if (!sessionId) {
    return (
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold mb-4">エラーが発生しました</h1>
        <p className="text-gray-400 mb-8">
          決済の確認ができませんでした。お手数ですが、もう一度お試しください。
        </p>
        <Link
          href="/support"
          className="inline-block px-8 py-4 bg-[#9d2b2b] text-white font-bold tracking-widest hover:bg-[#7a1f1f] transition-colors"
        >
          支援ページに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center max-w-2xl">
      {/* 成功アイコン */}
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#2d5a2d] to-[#1a3a1a] flex items-center justify-center">
        <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* メッセージ */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        ご支援ありがとうございます
      </h1>
      <p className="text-xl text-[#9d2b2b] font-bold mb-6">
        「それはまことですか？」プロジェクト
      </p>
      <p className="text-gray-300 leading-relaxed mb-8">
        あなたのご支援が、滋賀・近江の歴史を紐解く旅を支えてくれます。<br />
        書籍の完成まで、どうぞ楽しみにお待ちください。
      </p>

      {/* 確認メールについて */}
      <div className="bg-[#222] border border-[#333] p-6 mb-8 text-left">
        <h3 className="font-bold mb-2">📧 確認メールをお送りしました</h3>
        <p className="text-gray-400 text-sm">
          ご登録いただいたメールアドレスに、決済完了の確認メールをお送りしました。
          メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </p>
      </div>

      {/* ボタン */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-4 bg-[#9d2b2b] text-white font-bold tracking-widest hover:bg-[#7a1f1f] transition-colors"
        >
          トップページへ
        </Link>
        <Link
          href="/support"
          className="px-8 py-4 border border-[#555] text-white font-bold tracking-widest hover:bg-[#333] transition-colors"
        >
          支援ページへ戻る
        </Link>
      </div>

      {/* SNSシェア */}
      <div className="mt-12 pt-8 border-t border-[#333]">
        <p className="text-gray-500 text-sm mb-4">プロジェクトを応援する</p>
        <div className="flex justify-center gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('「それはまことですか？」プロジェクトを支援しました！滞賀・近江の歴史を紐解く書籍、完成が楽しみです。')}&url=${encodeURIComponent('https://maekawa-shikan-site-v2.vercel.app/support')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-[#1da1f2] text-white text-sm font-bold rounded hover:bg-[#1a8cd8] transition-colors"
          >
            Xでシェア
          </a>
        </div>
      </div>
    </div>
  );
}

// ローディング状態を表示するコンポーネント
function LoadingFallback() {
  return (
    <div className="text-center">
      <div className="animate-spin w-12 h-12 border-4 border-[#9d2b2b] border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-lg">確認中...</p>
    </div>
  );
}

// メインページコンポーネント（Suspense境界でラップ）
export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-6">
      <Suspense fallback={<LoadingFallback />}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
