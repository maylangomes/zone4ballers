'use client';

import { useState } from 'react';

export default function SendCookie() {
  const [cookieValue, setCookieValue] = useState('');

  const handleSendCookie = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookieValue }),
      });

      if (!response.ok) {
        throw new Error('Error response');
      }

      const cookieReturn = await response.text();
      console.log(cookieReturn);
      
    } catch (error) {
      console.error('Error fetch:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cookieValue}
        onChange={(e) => setCookieValue(e.target.value)}
        placeholder="Cookie"
      />
      <button type="button" onClick={handleSendCookie}>
        Send Cookie
      </button>
    </div>
  );
}
