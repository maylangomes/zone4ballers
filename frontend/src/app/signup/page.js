'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(data.message);
            setError(null);
            // router.push('/login');
        } else {
            const errorData = await response.json();
            setError(errorData.error);
            setMessage(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div>
                    <label>Username : </label>
                    <input
                        className='border border-gray-700'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password : </label>
                    <input
                        className='border border-gray-700'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email : </label>
                    <input
                        className='border border-gray-700'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign up</button>
                {error && <p>{error}</p>}
                {message && <p>{message}</p>}
            </form>
            <br />
            <button type="button" onClick={() => router.push('/')}>
                accueil
            </button>
            <br />
            <button type="button" onClick={() => router.push('/login')}>
                login
            </button>
        </div>
    );
}

export default Signup;
