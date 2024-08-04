'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/app/types/type';

interface ProductWithCategory extends Product {
  categoryName: string | null;
}

export default function ProductPage() {
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = localStorage.getItem('selectedProductId');

    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch('/api/controllers/productIdController', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ productId }),
          });

          if (!response.ok) {
            throw new Error('Error fetching product');
          }

          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      console.error('No product ID found in localStorage');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="text-center">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p className="text-xl font-bold mb-4">{product.description}</p>
      <p className="text-lg font-bold mb-4">${product.price}</p>
      <p className="text-lg font-bold mb-4">{product.details}</p>
      <p className="text-lg font-bold mb-4">{product.stock} in stock</p>
      <p className="text-lg font-bold mb-4">
        Category: {product.categoryName || 'No Category'}
      </p>
      <p className="text-lg font-bold mb-4">Color: {product.color}</p>
      <p className="text-lg font-bold mb-4">Size: {product.size}</p>
      <p className="text-lg font-bold mb-4">Rating: {product.rating}</p>
      <p className="text-lg font-bold mb-4">Country: {product.country}</p>
      <button className="bg-teal-500 text-white px-4 py-2 rounded">
        Buy Now
      </button>
    </div>
  );
}
