import { NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: Request) {
  try {
    const { filter } = await request.json();
    console.log('Request filter:', filter);

    let query = supabase
      .from('product')
      .select(`
        id,
        name,
        description,
        price,
        details,
        stock,
        category_id,
        category (id, name),
        color,
        size,
        rating,
        country,
        is_new,
        is_promoted,
        store_id
      `);
    
    if (filter.categoryId) {
      query = query.eq('category_id', filter.categoryId);
    }

    const { data: dataProducts, error } = await query;
    
    if (error) {
      throw new Error(error.message);
    }

    const products = dataProducts.map((product) => ({
      ...product,
      category: product.category[0],
      is_available: product.stock > 0 ? true : false, // Met à jour is_available en fonction du stock
    }));

    console.log('Number of products:', products.length);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
