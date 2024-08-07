'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateAccountForm from '@/app/components/fetchSignup/page';

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
    <div>
      <CreateAccountForm onSuccess={handleSuccess} onError={handleError} />
      {message && <p>{message}</p>}
      <button type="button" onClick={() => router.push('/')}>
        Home
      </button>
      <br />
      <button type="button" onClick={() => router.push('/pages/login')}>
        Login
      </button>
    </div>
  );
}
