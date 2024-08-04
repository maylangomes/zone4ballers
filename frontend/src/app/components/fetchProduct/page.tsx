import { useEffect } from 'react';
import { FetchProductsProps } from '@/app/types/type';

const FetchProducts = ({ setProducts, setLoadingProducts, filter }: FetchProductsProps) => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products with filter:', filter);
        const response = await fetch('/api/controllers/productsController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ filter }),
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
  }, [setProducts, setLoadingProducts, filter]);

  return null;
};

export default FetchProducts;
