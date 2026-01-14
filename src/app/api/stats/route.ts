import { NextResponse } from 'next/server';

// 支援統計を取得するAPI
// 注意: 現在はモックデータを返しています
// Notionデータベースが設定されたら、実際のデータを取得するように変更してください

export async function GET() {
  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  // Notion設定がない場合はモックデータを返す
  if (!notionApiKey || !databaseId) {
    return NextResponse.json({
      totalAmount: 0,
      supporterCount: 0,
      goalAmount: 1000000,
      daysRemaining: calculateDaysRemaining(),
      percentage: 0,
    });
  }

  try {
    // Notionデータベースをクエリして合計を計算
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        filter: {
          property: 'ステータス',
          select: {
            equals: '完了',
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Notion API request failed');
    }

    const data = await response.json();
    
    // 合計金額と支援者数を計算
    let totalAmount = 0;
    const supporterCount = data.results.length;

    for (const page of data.results) {
      const amount = page.properties['金額']?.number || 0;
      totalAmount += amount;
    }

    const goalAmount = 1000000;
    const percentage = Math.round((totalAmount / goalAmount) * 100);

    return NextResponse.json({
      totalAmount,
      supporterCount,
      goalAmount,
      daysRemaining: calculateDaysRemaining(),
      percentage,
    });
  } catch (error) {
    console.error('Stats API error:', error);
    
    // エラー時はモックデータを返す
    return NextResponse.json({
      totalAmount: 0,
      supporterCount: 0,
      goalAmount: 1000000,
      daysRemaining: calculateDaysRemaining(),
      percentage: 0,
    });
  }
}

// 残り日数を計算する関数
function calculateDaysRemaining(): number {
  const endDate = new Date('2026-03-31T23:59:59+09:00');
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}
