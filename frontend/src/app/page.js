'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../app/components/card/page';

export default function Home() {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Accueil</h1>
            <br />
            <button type="button" onClick={() => router.push('/login')}>
                Login
            </button>
            <br />
            <button type="button" onClick={() => router.push('/signup')}>
                Signup
            </button>
            <div>
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
