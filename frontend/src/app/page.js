'use client'


import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <h1>Accueil</h1>
            <br />
            <button type="button" onClick={() => router.push('/login')}>
                login
            </button>
            <br />
            <button type="button" onClick={() => router.push('/signup')}>
                signup
            </button>
        </div>
    );
}