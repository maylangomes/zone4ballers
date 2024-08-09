
import { useEffect } from 'react';


const FetchAdmin: React.FC<{ setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>}> = ({ setIsAdmin }) => {
  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await fetch('/api/controllers/adminController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
          // console.log('ADMIN STATUS:', data.isAdmin);
        } else {
          console.error('Error fetching admin status:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchAdminStatus();
  }, [setIsAdmin]);

  return null;
};

export default FetchAdmin;
