import { supabase } from '../../../../../utils/supabase/client';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const { data, error } = await supabase.from('user').select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
