import { supabase } from '../../../../../utils/supabase/client';
import Cookies from 'js-cookie';
import { encryptData } from '../../../../../utils/crypto';
import bcrypt from 'bcryptjs';
import { FormEvent } from 'react';

const handleLogin = async (
  e: FormEvent,
  name: string,
  password: string,
  setName: (name: string) => void,
  setPassword: (password: string) => void,
  onSuccess: () => void
) => {
  e.preventDefault();

  if (!name || !password) {
    alert('Please fill in all inputs');
    return;
  }

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('name', name);

  if (error) {
    console.error('Error in select:', error);
    alert('Error in select');
  } else if (data.length === 0) {
    alert('Error: Invalid name or password');
  } else {
    const user = data[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (isPasswordValid) {
      localStorage.setItem('username', user.name);

      const encryptedAdmin = encryptData(String(user.admin));
      console.log('encryptedAdmin:', encryptedAdmin);
      Cookies.set('admin', encryptedAdmin, { expires: 7, path: '/' });

      const cookies = document.cookie;
      console.log('Cookies:', cookies);

      alert('Welcome!');
      setName('');
      setPassword('');
      onSuccess();
    } else {
      alert('Error: Invalid name or password');
    }
  }
};

export default handleLogin;
