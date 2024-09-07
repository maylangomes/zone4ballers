import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../utils/supabase/client';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const profileImage = formData.get('profileImage') as File;
    const street = formData.get('street') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const zip = formData.get('zip') as string;
    const country = formData.get('country') as string;

    if (!name || !email || !password || !profileImage) {
      return NextResponse.json(
        { message: 'Please fill in all inputs' },
        { status: 400 }
      );
    }

    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.-]/g, '');
    const imageFileName = `${timestamp}-${email}-${profileImage.name}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(`PDP/${imageFileName}`, profileImage);

    if (uploadError) {
      throw new Error('Error uploading image');
    }

    const { data: imageData } = supabase.storage
      .from('images')
      .getPublicUrl(`PDP/${imageFileName}`);

    const imageUrl = imageData.publicUrl;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { data, error } = await supabase
      .from('user')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          profile_image_url: imageUrl,
          street,
          city,
          state,
          zip,
          country,
        },
      ]);

    if (error) {
      throw new Error('Error creating user');
    }

    return NextResponse.json(
      { message: 'Congrats! Your account has been created' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
