import { supabase } from './../../../../../utils/supabase/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    const { data, error } = await supabase
      .from('product')
      .select(
        `
        id,
        name,
        description,
        price,
        details,
        stock,
        category_id,
        color,
        size,
        rating,
        country,
        is_available,
        is_new,
        is_promoted,
        store_id
      `,
      )
      .eq('id', productId)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: category, error: categoryError } = await supabase
      .from('category')
      .select('name')
      .eq('id', data.category_id)
      .single();

    if (categoryError) {
      console.error('Error fetching category name:', categoryError);
    }

    const productWithCategory = {
      ...data,
      categoryName: category?.name || null,
    };

    return NextResponse.json(productWithCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
