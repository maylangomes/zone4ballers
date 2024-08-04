import { NextResponse } from 'next/server';
import { getProductWithCategory } from './../../models/productIdModel/page';

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const productWithCategory = await getProductWithCategory(productId);
    return NextResponse.json(productWithCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}