'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase/client';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !password) {
      alert('Please fill in all inputs');
      return;
    }

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('name', name);

    if (error) {
      console.error('Error in select:', error);
      alert('Error in select');
    } else if (data.length === 0) {
      alert('Error : Invalid name or password');
    } else {
      const user = data[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        Cookies.set('admin', String(user.admin), { expires: 7, path: '/' });
        const cookies = document.cookie;
        console.log('Cookies:', cookies);

        alert('Welcome!');
        setName('');
        setPassword('');
      } else {
        alert('Error : Invalid name or password');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={() => router.push('/')}>
        Home
      </button>
      <br />
      <button type="button" onClick={() => router.push('/signup')}>
        Sign Up
      </button>
    </div>
  );
}
