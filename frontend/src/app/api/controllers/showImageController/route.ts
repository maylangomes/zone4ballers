import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const { data: images, error } = await supabase
      .from('image')
      .select('image_url')
      .eq('product_id', productId);

    if (error) {
      console.error('Error fetching images:', error);
      return NextResponse.json(
        { message: 'Error fetching images', error },
        { status: 500 }
      );
    }

    const imageUrls = images.map((img) => img.image_url);

    return NextResponse.json({ imageUrls }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
