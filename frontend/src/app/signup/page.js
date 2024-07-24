'use client';

import { useState } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const createAccount = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill in all inputs');
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { data, error } = await supabase
      .from('user')
      .insert([{ name: name, email: email, password: hashedPassword }]);

    if (error) {
      console.error("Error user :", error);
      alert('Error : your account has not been created');
    } else {
      alert('Congrats ! Your account has been created');
      setName('');
      setEmail('');
      setPassword('');
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
        <button type="submit">Sign up</button>
      </form>
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
