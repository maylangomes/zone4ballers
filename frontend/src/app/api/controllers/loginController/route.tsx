import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '../../models/loginModel/page';

export async function POST(request: NextRequest) {
  try {
    const { username, email } = await request.json(); // Récupérer les données du corps de la requête

    if (!username || !email) {
      return NextResponse.json({ message: 'Username and email are required' }, { status: 400 });
    }

    const users = await getAllUsers();

    const user = users.find(
      (item) => item.name === username && item.email === email
    );

    if (user) {
      return NextResponse.json({ message: 'Welcome!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Error: Invalid login' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}
