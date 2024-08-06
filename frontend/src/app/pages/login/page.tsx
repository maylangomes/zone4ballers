'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import handleLogin from '@/app/api/controllers/loginController/page';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const IsLoginSuccess = () => {
    router.push('/');
  }

  return (
    <div>
      <form onSubmit={(e) => handleLogin(e, name, password, setName, setPassword, IsLoginSuccess)}>
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
      <button type="button" onClick={() => router.push('/pages/signup')}>
        Sign Up
      </button>
    </div>
  );
}
