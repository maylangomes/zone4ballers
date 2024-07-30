'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const router = useRouter();

  const createAccount = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !profileImage) {
      alert('Please fill in all inputs');
      return;
    }

    const date = new Date();
    const timestamp = date.toISOString().replace(/[:.-]/g, ''); 
    const imageFileName = `${timestamp}-${email}-${profileImage.name}`;

    const { error: uploadError } = await supabase
      .storage
      .from('images')
      .upload(`PDP/${imageFileName}`, profileImage);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      alert('Error: Your image has not been uploaded');
      return;
    }

    const { data: imageData } = supabase
      .storage
      .from('images')
      .getPublicUrl(`PDP/${imageFileName}`);

    const imageUrl = imageData.publicUrl;

    console.log("Image URL:", imageUrl);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const { data, error } = await supabase
      .from('user')
      .insert([{ name, email, password: hashedPassword, profile_image_url: imageUrl }]);

    if (error) {
      console.error('Error user :', error);
      alert('Error : your account has not been created');
    } else {
      alert('Congrats ! Your account has been created');
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div>
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

        <button type="submit">Sign up</button>
      </form>
      <button type="button" onClick={() => router.push('/')}>
        Home
      </button>
      <br />
      <button type="button" onClick={() => router.push('/login')}>
        Login
      </button>
    </div>
  );
}
