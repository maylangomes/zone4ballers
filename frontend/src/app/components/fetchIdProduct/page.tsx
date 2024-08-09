'use client';

import { useEffect } from 'react';
import { Product } from '@/app/types/type';

interface ProductWithCategory extends Product {
  categoryName: string | null;
}

interface FetchIdProductProps {
  setProduct: (product: ProductWithCategory | null) => void;
  setLoading: (loading: boolean) => void;
}

const FetchIdProduct: React.FC<FetchIdProductProps> = ({ setProduct, setLoading }) => {
  useEffect(() => {
    const productId = localStorage.getItem('selectedProductId');

    if (productId) {
      const fetchIdProduct = async () => {
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

      fetchIdProduct();
    } else {
      console.error('No product ID found in localStorage');
      setLoading(false);
    }
  }, [setProduct, setLoading]);

  return null;
};

export default FetchIdProduct;
