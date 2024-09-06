import { NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST() {
  try {

    const { data, error } = await supabase.from('category').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
