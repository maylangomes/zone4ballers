import { useEffect } from 'react';
import { FetchUsersProps } from '@/app/types/type';

const FetchUsers = ({ setUsers, setLoadingUsers }: FetchUsersProps) => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/controllers/usersController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error response fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error catch fetch users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [setUsers, setLoadingUsers]);

  return null;
};

export default FetchUsers;
