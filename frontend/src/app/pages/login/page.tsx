'use client';

import { useState } from 'react';
import LoginForm from '@/app/components/fetchLogin/page';
import StorageUser from '@/app/components/storageUser/page';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLoginMessage = (message: string) => {
    setLoginMessage(message);
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <StorageUser />
      <LoginForm
        onLoginMessage={handleLoginMessage}
        onError={handleError}
        setLoading={setLoading}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {loginMessage && <p>{loginMessage}</p>}
      <button type="button" onClick={() => router.push('/')}>
        Home
      </button>
      <br />
      <button type="button" onClick={() => router.push('/pages/signup')}>
        Signup
      </button>
    </div>
  );
};

export default UserProfile;
