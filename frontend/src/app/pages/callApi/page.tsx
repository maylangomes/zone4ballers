'use client';
import { FormEvent, useState } from 'react';


const CreateAddressForm = () => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState<any>(null);
  const [showError, setShowError] = useState<any>(null);

  const createAddress = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('street', street);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('zip', zip);
    formData.append('country', country);

    try {
      const response = await fetch('/api/controllers/shippo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setName('');
        setStreet('');
        setCity('');
        setState('');
        setZip('');
        setCountry('');

        setShowResponse(data);
      } else {
        console.log("error response :", data.error);
      }
    } catch (error: any) {
      setShowError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={createAddress}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
      {showResponse && <pre>{JSON.stringify(showResponse, null, 2)}</pre>}
      {showError}
    </div>
  );
};

export default CreateAddressForm;
