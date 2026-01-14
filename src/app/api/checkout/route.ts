import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// 支援プランの定義
const PLANS = {
  supporter: {
    name: 'サポーター',
    amount: 3000,
    description: 'Special Thanksにお名前を掲載',
  },
  fan: {
    name: '応援団',
    amount: 10000,
    description: 'サイン入り書籍の送付',
  },
  patron: {
    name: 'パトロン',
    amount: 30000,
    description: '出版記念パーティーへのご招待',
  },
  sponsor: {
    name: 'スポンサー',
    amount: 100000,
    description: '前川先生と一緒に歴史ツアー体験',
  },
};

// Stripeインスタンスを遅延初期化（リクエスト時に初期化）
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
  });
}

export async function POST(request: NextRequest) {
  try {
    // 環境変数のチェック
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe APIキーが設定されていません。管理者にお問い合わせください。' },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const body = await request.json();
    const { plan, email, name } = body;

    // プランの検証
    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json(
        { error: '無効な支援プランです' },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];

    // Stripe Checkout セッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'ja',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: `前川史観 支援 - ${selectedPlan.name}プラン`,
              description: selectedPlan.description,
            },
            unit_amount: selectedPlan.amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        plan,
        supporter_name: name || '',
        supporter_email: email || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://maekawa-shikan-site-v2.vercel.app'}/support/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://maekawa-shikan-site-v2.vercel.app'}/support`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout エラー:', error);
    return NextResponse.json(
      { error: '決済セッションの作成に失敗しました' },
      { status: 500 }
    );
  }
}
