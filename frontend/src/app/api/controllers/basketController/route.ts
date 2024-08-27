import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { itemList } = await request.json();
    // console.log('BASKEEET', itemList);
    const itemId = itemList.map((item: { id: any; }) => item.id);
    console.log("ITEM ID HERE", itemId);
    
    return NextResponse.json({message : 'itemList received'}, {status: 200});
  } catch (error) {
    console.error('Error try fetching itemList', error);
  }
}