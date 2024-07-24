'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('user').select();
      if (error) {
        console.error('Error step 1 :', error);
        return;
      }
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Error step 2 :', data);
      }
      setLoading(false);
    };

    fetchUsers();

    const user = localStorage.getItem('supabase.auth.user');
    if (user) {
      console.log('User connected:', JSON.parse(user));
    } else {
      console.log('No user connected');
    }
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div>
          <h2>Users :</h2>
          <pre>{JSON.stringify(users, null, 2)}</pre>
          <button type="button" onClick={() => router.push('/signup')}>
            Sign up
          </button>
          <br />
          <button type="button" onClick={() => router.push('/login')}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}
