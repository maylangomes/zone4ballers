'use client';
import { FormEvent, useEffect, useState } from 'react';
import Stripe from 'stripe';


const stripe = new Stripe('sk_test_51Pv3HaKBL3DExcL0iJggQBvnjCque0pbaut6Aqdf3X0QiQdcmm01UgB7NC9GyGuuwHVFrcVWsV7bbuTtwq9bpHLr00QWIjm9tk');

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

  const handleShipping = async ({ provider, amount }) => {
    try {
      const response = await fetch('/api/controllers/addShippingController', {
        method: 'POST',
        body: JSON.stringify({ provider, amount }),
      });


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


  return (
    <div>
      <form onSubmit={fetchShippingRates}>
        <h2 className="text-2xl font-bold mb-4">Adresse de destination</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={addressTo.name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Street"
            name="street1"
            value={addressTo.street1}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={addressTo.city}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={addressTo.state}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Zip"
            name="zip"
            value={addressTo.zip}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={addressTo.country}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={addressTo.phone}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={addressTo.email}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : "Obtenir les tarifs d'expédition"}
        </button>
      </form>

      {shippingRates.length > 0 && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold mb-4">
            Tarifs d'expédition disponibles :
          </h2>
          <ul className="space-y-4">
            {shippingRates.map((rate, index) => (
              <li key={index} className="border p-4 rounded shadow">
                <p>
                  <strong>Transporteur:</strong> {rate.provider}
                </p>
                <p>
                  <strong>Montant:</strong> {rate.amount} {rate.currency}
                </p>
                <button
                  onClick={() => handleShipping(rate)}
                  className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Choisir cette option {rate.provider}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default ShippingPage;
