'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setMessage(data.message);
            setError(null);
        } else {
            const errorData = await response.json();
            setError(errorData.error);
            setMessage(null);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label>Username:</label>
                    <input
                        className='border border-gray-700'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        className='border border-gray-700'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
            </form>
            <br />
            <button type="button" onClick={() => router.push('/')}>
                accueil
            </button>
            <br />
            <button type="button" onClick={() => router.push('/signup')}>
                sign up
            </button>
        </div>
    );
}

export default Login;
