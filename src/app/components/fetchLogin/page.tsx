'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  setLoading: (loading: boolean) => void;
}

const LoginForm = ({ setLoading }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/controllers/loginController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      localStorage.setItem('userId', result.userId);
      localStorage.setItem('username', username);
      document.cookie = `admin=${result.isAdmin}; path=/;`;
      alert('Login successful!');
      router.push('/');
    } catch (error) {
      alert('An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
