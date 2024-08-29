import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { provider } = await request.json();

    console.log(provider);
    

    const { data, error } = await supabase
      .from('delivery_methods')
      .insert([{ name: provider }])
      .select();

      if (error) {
        return NextResponse.json(
          { message: 'Error adding shipping', error },
          { status: 500 },
        );
      }

    return NextResponse.json(
      { message: 'Requete shipping accepted' },
      { status: 200 },
    );
  } catch (error) {
    console.error('erreur try add Shipping', error);
    return NextResponse.json(
      { error: error.message || 'error catch add Shipping' },
      { status: 500 },
    );
  }
}
