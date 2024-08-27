import { NextRequest, NextResponse } from 'next/server';
import { getProductWithCategory } from './../../models/productIdModel/page';

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    // console.log("product ID : ", productId);
    
    const productWithCategory = await getProductWithCategory(productId);
    // console.log("product with category : ", productWithCategory);
    
    return NextResponse.json(productWithCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
