'use server';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 },
    );
    cookies().set('admin', '');
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error during logout' },
      { status: 500 },
    );
  }
}
