import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionData } = req.body;
    const encryptedSessionData = JSON.stringify(sessionData);

    const cookie = serialize('session', encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ message: 'Successfully set cookie!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}