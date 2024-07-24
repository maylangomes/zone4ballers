'use client';

import { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in all inputs');
      return;
    }

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email);

    if (error) {
        console.error("Error in select :", error);
        alert('Error in select');
    } else if (data.length === 0) {
        alert('Error : Invalid email or password');
    } else {
        console.log(data);
        const user = data[0];
      
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        alert('Welcome !');
        localStorage.setItem('supabase.auth.user', JSON.stringify({ name: data[0].name }));
        setEmail('');
        setPassword('');
        router.push('/');
      } else {
        alert('Error : Invalid email or password');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
