import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();

    const { data: userTest, error } = await supabase
      .from('user')
      .select('')
      .eq('name', user);

    if (error) {
      console.error('Error fetch user', error);
      return NextResponse.json(
        { message: 'Error fetch user', error },
        { status: 500 },
      );
    }



    return NextResponse.json(userTest, { status: 200 });
  } catch (error) {
    console.error('erreur try get address', error);
    return NextResponse.json(
      { error: error.message || 'error catch user address' },
      { status: 500 },
    );
  }
}
