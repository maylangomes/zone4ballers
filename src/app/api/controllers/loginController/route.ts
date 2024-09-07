import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { supabase } from '../../../../../utils/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const { data: users, error } = await supabase.from('user').select('*');

    if (error) {
      return NextResponse.json(
        { message: 'Error fetching users' },
        { status: 500 }
      );
    }

    const user = users?.find((item) => item.name === username);
    
    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const userId = user.id;
        const isAdmin = user.admin ? 'true' : 'false';

        const response = NextResponse.json(
          { message: 'Welcome!', isAdmin, userId },
          { status: 200 }
        );

        cookies().set('admin', isAdmin, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24,
        });

        return response;
      } else {
        return NextResponse.json(
          { message: 'Error: Invalid password' },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'Error: Invalid username' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 }
    );
  }
}
