import { supabase } from '../../../../utils/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { filter } = await request.json();

    const { data: dataProducts, error } = await supabase
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
        is_available,
        is_new,
        is_promoted,
        store_id
      `);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedProducts = dataProducts.map((product) => ({
      ...product,
      category: product.category[0],
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
