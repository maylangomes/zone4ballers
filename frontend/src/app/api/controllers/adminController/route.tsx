import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const adminCookie = cookieStore.get('admin');

    const isAdmin = adminCookie?.value === 'true';

    return NextResponse.json({ isAdmin }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching admin status' }, { status: 500 });
  }
}
