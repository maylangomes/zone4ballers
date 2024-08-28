import { useEffect } from "react"

const FetchAddress  = ({addressTo}) => {
    const user = localStorage.getItem('username');
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const userAddress = await fetch('/api/controllers/getUserAddress', {
                    method: 'POST',
                    body: JSON.stringify({ user }),
                  });
            
                  console.log('USERNAAME', user);
            
                  const userData = await userAddress.json();
                  console.log(userData);
                  addressTo.city = userData[0].city;
            } catch (error) {
                console.error('Error catch fetch address', error);
            }
        };

        fetchAddress();
    }, []);

    return null;
}

export default FetchAddress;