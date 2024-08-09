import { NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('product')
      .insert([
        {
          name: body.name,
          description: body.description,
          price: parseFloat(body.price),
          details: body.details,
          category_id: body.category_id,
          is_available: true,
          is_new: false,
          is_promoted: false,
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}