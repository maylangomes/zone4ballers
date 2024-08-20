'use client';

import { useState } from 'react';
import LoginForm from '@/app/components/fetchLogin/page';
import StorageUser from '@/app/components/storageUser/page';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 max-w-md bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
      <StorageUser />
      <LoginForm setLoading={setLoading} />
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          onClick={() => router.push('/')}
        >
          Home
        </button>
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          onClick={() => router.push('/pages/signup')}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
