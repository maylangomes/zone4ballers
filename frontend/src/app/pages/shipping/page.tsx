'use client';
import StorageUser from '@/app/components/storageUser/page';
import { FormEvent, useState } from 'react';

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

  const [loading, setLoading] = useState(false);
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressTo((prev) => ({ ...prev, [name]: value }));
  };

  const fetchShippingRates = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const user = localStorage.getItem('username');
    const formData = new FormData();
    formData.append('addressTo', JSON.stringify(addressTo));

    try {
      const userAddress = await fetch('/api/controllers/getUserAddress', {
        method: 'POST',
        body: JSON.stringify({ user }),
      });

      console.log('USERNAAME', user);

      const userData = await userAddress.json();
      console.log(userData[0].city);
      addressTo.city = userData[0].city;

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

  return (
    <div>
      <StorageUser />
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
