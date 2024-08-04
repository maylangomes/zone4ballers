import { useEffect } from 'react';

interface DecryptAdminCookieProps {
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecryptAdminCookie = ({ setIsAdmin }: DecryptAdminCookieProps) => {
  useEffect(() => {
    const fetchAdminCookie = async () => {
      try {
        const response = await fetch('/api/decrypt_admin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.isAdmin) {
            setIsAdmin(true);
            console.log('décrypté et admin');
          } else {
            console.log('décrypté mais pas admin');
            console.log(data.isAdmin);
          }
        } else {
          console.error('Erreur lors de la requête:', response.statusText);
        }
      } catch (error) {
        console.error('error try fetch :', error);
      }
    };

    fetchAdminCookie();
  }, []);

  return null;
};

export default DecryptAdminCookie;
