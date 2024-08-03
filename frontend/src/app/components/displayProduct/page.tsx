import { useEffect } from 'react';
import { Product } from '@/app/page';

interface FetchProductsProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLoadingProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

const FetchProducts = ({ setProducts, setLoadingProducts }: FetchProductsProps) => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const response = await fetch('/api/productsController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ filter: {} }),
        });
        if (!response.ok) {
          throw new Error('Error response fetch products');
        }
        const data = await response.json();
        console.log('Products fetched:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error catch fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [setProducts, setLoadingProducts]);

  return null;
};

export default FetchProducts;
