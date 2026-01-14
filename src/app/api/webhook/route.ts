import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

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

// Notion APIへのリクエスト関数
async function saveToNotion(data: {
  name: string;
  email: string;
  plan: string;
  amount: number;
  stripeSessionId: string;
}) {
  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !databaseId) {
    console.warn('Notion API設定が未完了です');
    return null;
  }

  // プラン名のマッピング
  const planNames: Record<string, string> = {
    supporter: 'サポーター',
    fan: '応援団',
    patron: 'パトロン',
    sponsor: 'スポンサー',
  };

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          '氏名': {
            title: [{ text: { content: data.name || '匿名' } }],
          },
          'メールアドレス': {
            email: data.email,
          },
          '支援プラン': {
            select: { name: planNames[data.plan] || data.plan },
          },
          '金額': {
            number: data.amount,
          },
          '支援日時': {
            date: { start: new Date().toISOString() },
          },
          'ステータス': {
            select: { name: '完了' },
          },
          'Stripe Session ID': {
            rich_text: [{ text: { content: data.stripeSessionId } }],
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notion API エラー:', errorData);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Notion保存エラー:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Webhook設定のチェック
  if (!sig) {
    return NextResponse.json(
      { error: 'Webhook署名が見つかりません' },
      { status: 400 }
    );
  }

  if (!webhookSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook設定が未完了です' },
      { status: 500 }
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe APIキーが設定されていません' },
      { status: 500 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook署名検証エラー:', err);
    return NextResponse.json(
      { error: 'Webhook署名が無効です' },
      { status: 400 }
    );
  }

  // 決済完了イベントの処理
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Notionに支援者情報を保存
    await saveToNotion({
      name: session.metadata?.supporter_name || '',
      email: session.metadata?.supporter_email || session.customer_email || '',
      plan: session.metadata?.plan || '',
      amount: session.amount_total || 0,
      stripeSessionId: session.id,
    });

    console.log('支援完了:', {
      plan: session.metadata?.plan,
      amount: session.amount_total,
      email: session.customer_email,
    });
  }

  return NextResponse.json({ received: true });
}
