'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateAccountForm from '@/app/components/fetchSignup/page';
import Navbar from '../../components/navbar/NavBar';

export default function AddUser() {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSuccess = () => {
    setMessage('Congrats! Your account has been created');
  };

  const handleError = (message: string) => {
    setMessage(message);
  };

  return (
    <div><Navbar/>
    <div className="container mx-auto p-4 max-w-md bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Signup</h2>
      <CreateAccountForm onSuccess={handleSuccess} onError={handleError} />
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
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
          onClick={() => router.push('/pages/login')}
        >
          Login
        </button>
      </div>
    </div>
    </div>
  );
}
