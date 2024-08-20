import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { productId, file } = await request.json();

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
      console.error('Error during upload:', uploadError);
      throw new Error('Error uploading image');
    }

    const { data: imageData } = supabase.storage
      .from('images')
      .getPublicUrl(`PDP/${imageFileName}`);

    const imageUrl = imageData.publicUrl;

    const { data, error } = await supabase
      .from('image')
      .insert([{ product_id: productId, image_url: imageUrl }]);

    if (error) {
      console.error('Error inserting image URL:', error);
      return NextResponse.json(
        { message: 'Error inserting image URL', error },
        { status: 500 }
      );
    }

    console.log('Image uploaded successfully, URL:', imageUrl);
    return NextResponse.json({ imageUrl }, { status: 200 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
