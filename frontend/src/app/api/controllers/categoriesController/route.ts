import { NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body);

    const { data, error } = await supabase.from('category').select('id, name');

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
