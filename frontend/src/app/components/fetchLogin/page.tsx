'use client';

import { useState } from 'react';

interface LoginFormProps {
  onLoginMessage: (message: string) => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

const LoginForm = ({ onLoginMessage, onError, setLoading }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email) {
      onLoginMessage('Please fill in both fields.');
      return;
    }

    setLoading(true);
    onError(null);

    try {
      const response = await fetch('/api/controllers/loginController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      const result = await response.json();

      if (!response.ok) {
        onLoginMessage(result.message);
        return;
      }

      onLoginMessage(result.message);
    } catch (error) {
      onError('An error occurred while logging in.');
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
