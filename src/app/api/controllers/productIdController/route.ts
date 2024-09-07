import { NextRequest, NextResponse } from 'next/server';
import { supabase } from './../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    const { data: product, error: productError } = await supabase
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
        color_id,
        size,
        rating,
        country,
        is_available,
        is_new,
        is_promoted,
        store_id,
        click,
        franchise
      `
      )
      .eq('id', productId)
      .single();

    if (productError) {
      return NextResponse.json({ error: productError.message }, { status: 500 });
    }

    const { data: category, error: categoryError } = await supabase
      .from('category')
      .select('name')
      .eq('id', product?.category_id)
      .single();

    if (categoryError) {
      console.error('Error fetching category name:', categoryError);
    }

    const productWithCategory = {
      ...product,
      categoryName: category?.name || null,
    };

    return NextResponse.json(productWithCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch product with category: ${error.message}` }, { status: 500 });
  }
}
