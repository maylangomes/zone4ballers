import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const { data, error } = await supabase.from('category').delete().eq('id', id);

    if (error) {
      throw new Error('Error deleting category');
    }

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { message: 'Error deleting category' },
      { status: 500 },
    );
  }
}
