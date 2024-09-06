import { useEffect } from 'react';

const StorageUser = () => {
  useEffect(() => {
    const user = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    if (user) {
      console.log('Id user :', userId);
    } else {
      console.log('No user connected');
    }
  }, []);

  return null;
};

export default StorageUser;
