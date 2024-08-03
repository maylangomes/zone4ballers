import { useEffect } from 'react';

interface FetchUsersProps {
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  setLoadingUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

const FetchUsers = ({ setUsers, setLoadingUsers }: FetchUsersProps) => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const response = await fetch('/api/usersController', {
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
        console.log('Users fetched:', data);
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
