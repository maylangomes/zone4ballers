'use client'
import { useState } from 'react';

const HomePage = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createAddress = async () => {
    try {
      const res = await fetch('/api/controllers/shippo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la création adresse.');

      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'Une erreur inconnue est survenue.');
    }
  };

  return (
    <div>
      <button onClick={createAddress}>Créer l'adresse</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default HomePage;
