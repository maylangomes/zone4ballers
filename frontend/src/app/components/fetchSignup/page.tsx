'use client';

import { useState, FormEvent } from 'react';

interface CreateAccountFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

const CreateAccountForm = ({ onSuccess, onError }: CreateAccountFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !profileImage) {
      onError('Please fill in all inputs');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const response = await fetch('/api/controllers/signupController', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setName('');
        setEmail('');
        setPassword('');
        setProfileImage(null);
        onSuccess();
      } else {
        onError(result.message || 'An error occurred during sign up.');
      }
    } catch (error) {
      onError('An error occurred during sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
};

export default CreateAccountForm;
