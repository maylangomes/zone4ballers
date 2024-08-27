import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { colorId } = await request.json();

    // console.log('colorID :', colorId);

    const { data: colorPrice, error } = await supabase
      .from('color')
      .select('name, pourcentage_price')
      .eq('id', colorId)
      .single();

    if (error) {
      console.error('Error fetching controller color first', error);
      return NextResponse.json(
        { message: 'Error fetching controller color response', error },
        { status: 500 },
      );
    }
    // console.log('DATA POURCENTAGE', colorPrice);

    const { data: products, error: productError } = await supabase
      .from('product')
      .select('id, price')
      .eq('color_id', colorId);

    if (productError) {
      console.error('Error fetching product', productError);
      return NextResponse.json(
        { message: 'Error fetching product', productError },
        { status: 500 },
      );
    }

    const adjustedPrices = products.map((product) => {
      const adjustedPrice = product.price * (1 + colorPrice.pourcentage_price / 100);
      return { productId: product.id, adjustedPrice };
    });

    // console.log('Adjusted Prices:', adjustedPrices);

    return NextResponse.json({ colorPrice, adjustedPrices }, { status: 200 });
  } catch (error) {
    console.error('Error try request color', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
