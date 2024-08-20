import { uploadImage } from './../../models/uploadImageModel/page';
import { NextRequest, NextResponse } from 'next/server';

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

    const imageUrl = await uploadImage(file, productId);

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
