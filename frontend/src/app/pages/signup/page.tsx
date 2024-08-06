'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !profileImage) {
      setMessage('Please fill in all inputs');
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await fetch('/api/controllers/signupController', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.ok) {
        setName('');
        setEmail('');
        setPassword('');
        setProfileImage(null);
      }
    } catch (error) {
      setMessage('An error occurred during sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={createAccount}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
      {message && <p>{message}</p>}
      <button type="button" onClick={() => router.push('/')}>
        Home
      </button>
      <br />
      <button type="button" onClick={() => router.push('/login')}>
        Login
      </button>
    </div>
  );
}
