import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { newCategoryName } = await request.json();

    if (!newCategoryName) {
      return NextResponse.json(
        { message: 'Category name is required' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('category')
      .insert([{ name: newCategoryName }])
      .select();

    if (error) {
      return NextResponse.json(
        { message: 'Error adding category', error },
        { status: 500 },
      );
    }

    return NextResponse.json({ category: data[0] }, { status: 200 });
  } catch (error) {
    console.error('Error during category addition:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
