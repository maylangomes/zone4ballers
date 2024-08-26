import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '../../models/signupModel/page';

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
        { status: 400 },
      );
    }

    await createUser(name, email, password, profileImage, street, city, state, zip, country);

    return NextResponse.json(
      { message: 'Congrats! Your account has been created' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
