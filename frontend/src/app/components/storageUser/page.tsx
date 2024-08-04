import { useEffect } from 'react';

const StorageUser = () => {
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      console.log('User connected:', user);
    } else {
      console.log('No user connected');
    }
  }, []);

  return null;
};

export default StorageUser;