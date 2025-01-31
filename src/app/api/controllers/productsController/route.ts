import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { filter } = await request.json();

    let query = supabase.from('product').select(`
        id,
        name,
        description,
        price,
        details,
        stock,
        category_id,
        category (id, name),
        color_id,
        color (id, name),
        size,
        rating,
        country,
        is_new,
        is_promoted,
        store_id,
        click,
        franchise
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
      is_available: product.stock > 0 ? true : false,
    }));
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
