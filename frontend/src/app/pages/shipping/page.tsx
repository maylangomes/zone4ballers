'use client';
import { FormEvent, useEffect, useState } from 'react';

const ShippingPage = () => {
  const [addressTo, setAddressTo] = useState({
    name: '',
    street1: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  let user = '';

  if (typeof window !== 'undefined') {
    user = localStorage.getItem('username');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressTo((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const userAddress = await fetch('/api/controllers/getUserAddress', {
          method: 'POST',
          body: JSON.stringify({ user }),
        });

        // console.log('USERNAAME', user);

        const userData = await userAddress.json();
        addressTo.name = userData[0].name;
        addressTo.street1 = userData[0].street;
        addressTo.city = userData[0].city;
        addressTo.email = userData[0].email;
        addressTo.zip = userData[0].zip;
        addressTo.country = userData[0].country;
        addressTo.phone = userData[0].phone;
        setLoading(false);
      } catch (error) {
        console.error('Error catch fetch address', error);
      }
    };
    fetchAddress();
  }, []);

  const fetchShippingRates = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('addressTo', JSON.stringify(addressTo));

    try {
      const response = await fetch('/api/controllers/shipping', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setShippingRates(data);
      } else {
        setError(data.error || 'Erreur lors de la récupération des tarifs.');
      }
    } catch (error: any) {
      setError(error.message || 'Erreur lors de la récupération des tarifs.');
    } finally {
      setLoading(false);
    }
  };

  const handleShipping = async ({ provider }) => {
    try {
      const response = await fetch('/api/controllers/addShippingController', {
        method: 'POST',
        body: JSON.stringify({ provider }),
      });

      console.log("PROVIDEEER", provider);
      

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Server error response handleShipping:', errorMessage);
        throw new Error(`Error handleShipping: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error try handleShipping', error);
    }
  };

  if (loading) return <>Loading ...</>;

  console.log("SHIPPING RATES", shippingRates);
  

  return (
    <div>
      <form onSubmit={fetchShippingRates}>
        <h2>Adresse de destination</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={addressTo.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Street"
          name="street1"
          value={addressTo.street1}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="City"
          name="city"
          value={addressTo.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          value={addressTo.state}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Zip"
          name="zip"
          value={addressTo.zip}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          value={addressTo.country}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={addressTo.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={addressTo.email}
          onChange={handleInputChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : "Obtenir les tarifs d'expédition"}
        </button>
      </form>

      {shippingRates.length > 0 && (
        <ul>
          {shippingRates.map((rate, index) => (
            <li key={index}>
              <strong>Transporteur:</strong> {rate.provider} <br />
              <strong>Montant:</strong> {rate.amount} {rate.currency} <br />
              <button onClick={() => handleShipping(rate)}>
                Choose this option {rate.provider}
              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default ShippingPage;
