import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { data: image, error: imageError } = await supabase
      .from('image')
      .delete()
      .eq('product_id', id);

    if (imageError) {
      throw new Error('error deleting image');
    }

    const { data, error } = await supabase
      .from('product')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error('error deleting product');
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('error during delete product', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
