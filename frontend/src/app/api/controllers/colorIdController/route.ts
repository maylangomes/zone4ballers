import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { colorId } = await request.json();

    console.log("colorID :", colorId);
    

    const { data: color, error } = await supabase
      .from('color')
      .select('name')
      .eq('id', colorId)
      .single();

    if (error) {
      console.error('Error fetching controller color first', error);
      return NextResponse.json(
        { message: 'Error fetching controller color response', error },
        { status: 500 },
      );
    }

    return NextResponse.json({ color }, { status: 200 });
  } catch (error) {
    console.error('Error try request color', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
