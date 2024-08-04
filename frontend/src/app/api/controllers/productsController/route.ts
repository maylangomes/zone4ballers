import { NextResponse } from 'next/server';
import { getAllProducts } from '../../models/productModel/page';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    console.log('Request:', requestBody);

    const products = await getAllProducts();
    
    console.log('Number of products :', products.length);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
