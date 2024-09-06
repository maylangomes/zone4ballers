import { Product } from '@/app/types/type';
import { supabase } from '../../../../../utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id, formData }: { id: number; formData: Partial<Product> } =
      await request.json();

    const { data, error } = await supabase
      .from('product')
      .update(formData)
      .eq('id', id);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('error update product catch :', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
