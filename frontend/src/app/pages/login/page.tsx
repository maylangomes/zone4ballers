'use client';

import { useState } from 'react';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email) {
      setLoginMessage('Please fill in both fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/controllers/loginController', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      if (!response.ok) {
        const result = await response.json();
        setLoginMessage(result.message);
        return;
      }

      const result = await response.json();
      setLoginMessage(result.message);
    } catch (error) {
      setError('An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};

export default UserProfile;
