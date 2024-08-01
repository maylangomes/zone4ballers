import { NextResponse } from 'next/server';
import { decryptData } from '../../../../utils/crypto';

export async function POST(request: Request) {
  const cookies = request.headers.get('cookie');
  const adminCookie = cookies?.split('; ').find(cookie => cookie.startsWith('admin='))?.split('=')[1];

  if (!adminCookie) {
    return NextResponse.json({ error: 'Cookie admin not found' });
  }

  console.log('adminCookie :', adminCookie);

  try {
    const decryptedAdmin = decryptData(adminCookie);
    console.log('decrypted Admin:', decryptedAdmin);

    if (decryptedAdmin === 'true') {
      return NextResponse.json({ isAdmin: true });
    } else {
      return NextResponse.json({ isAdmin: false });
    }
  } catch (error) {
    console.error('Erreur décryptage:', error);
    return NextResponse.json({ error: 'Erreur décryptage' });
  }
}
