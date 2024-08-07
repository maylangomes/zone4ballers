'use client';

import { useState } from 'react';
import LoginForm from '@/app/components/fetchLogin/page';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleLoginMessage = (message: string) => {
    setLoginMessage(message);
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <LoginForm
        onLoginMessage={handleLoginMessage}
        onError={handleError}
        setLoading={setLoading}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};

export default UserProfile;
