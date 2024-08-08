import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { categoryId } = await request.json();

    const { data: category, error } = await supabase
      .from('category')
      .select('name')
      .eq('id', categoryId)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return NextResponse.json(
        { message: 'Error fetching category', error },
        { status: 500 },
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
