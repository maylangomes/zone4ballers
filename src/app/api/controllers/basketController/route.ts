import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { itemList } = await request.json();
    const itemId = itemList.map((item: { id: any }) => item.id);

    return NextResponse.json({ message: 'itemList received' }, { status: 200 });
  } catch (error) {
    console.error('Error try fetching itemList', error);
  }
}
