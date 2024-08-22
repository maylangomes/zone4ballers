import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '../../models/loginModel/page';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 },
      );
    }

    const users = await getAllUsers();
    
    const user = users.find((item) => item.name === username);
    console.log("USEEEEER ID : ", user.id);
    const userId = user.id;
    

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const isAdmin = user.admin ? 'true' : 'false';

        const response = NextResponse.json(
          { message: 'Welcome!', isAdmin, userId },
          { status: 200 },
        );

        cookies().set('admin', isAdmin, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24,
        });
        console.log("RESPOOOONSE: ", response);
        
        return response;
      } else {
        return NextResponse.json(
          { message: 'Error: Invalid password' },
          { status: 401 },
        );
      }
    } else {
      return NextResponse.json(
        { message: 'Error: Invalid username' },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching users' },
      { status: 500 },
    );
  }
}
