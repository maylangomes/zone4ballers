'use client';

import { useState } from 'react';
import LoginForm from '@/app/components/fetchLogin/page';
import StorageUser from '@/app/components/storageUser/page';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div>
      <h2>User Profile</h2>
      <StorageUser />
      <LoginForm setLoading={setLoading} />
      {loading && <p>Loading...</p>}
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
