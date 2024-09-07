import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const productId = formData.get('productId') as string;
    const file = formData.get('file') as File;

    if (!productId || !file) {
      return NextResponse.json(
        { message: 'Product ID and file are required' },
        { status: 400 }
      );
    }

    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.-]/g, '');
    const imageFileName = `${timestamp}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(`PDP/${imageFileName}`, file);

    if (uploadError) {
      throw new Error('Error uploading image');
    }

    const { data: imageData } = supabase.storage
      .from('images')
      .getPublicUrl(`PDP/${imageFileName}`);

    const imageUrl = imageData.publicUrl;

    const { data, error: dbError } = await supabase
      .from('image')
      .insert([{ product_id: productId, image_url: imageUrl }]);

    if (dbError) {
      throw new Error('Error inserting image URL into database');
    }

    return NextResponse.json(
      { message: 'Image uploaded successfully', imageUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
