import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { itemList } = await request.json();
  if (itemList === null) {
    return NextResponse.json({ message: 'itemList empty' }, { status: 200 });
  }
  try {
    const itemId = itemList.map((item: { id: any }) => item.id);

    return NextResponse.json({ message: 'itemList received' }, { status: 200 });
  } catch (error) {
    console.error('Error try fetching itemList', error);
    return NextResponse.json(
      { message: 'no response basket' },
      { status: 500 },
    );
  }
}
