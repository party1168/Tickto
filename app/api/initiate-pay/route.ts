import { NextRequest, NextResponse } from 'next/server';
import eruda from 'eruda';

// 初始化 Eruda
if (process.env.NODE_ENV === 'development') {
  eruda.init();
}

export async function POST(req: NextRequest) {
  try {
    const uuid = crypto.randomUUID().replace(/-/g, '');

    // 使用 Eruda 記錄請求資訊
    if (process.env.NODE_ENV === 'development') {
      console.log('Payment initiation:', { uuid });
    }

    // TODO: Store the ID field in your database so you can verify the payment later
    return NextResponse.json({ id: uuid });
  } catch (error) {
    // 使用 Eruda 記錄錯誤
    if (process.env.NODE_ENV === 'development') {
      console.error('Payment initiation error:', error);
    }

    return NextResponse.json(
      { success: false, message: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
} 