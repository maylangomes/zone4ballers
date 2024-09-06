import { useEffect, useRef } from 'react';
import { FetchProductsProps } from '@/app/types/type';

const FetchProducts = ({
  setProducts,
  setLoadingProducts,
  filter,
}: FetchProductsProps) => {
  const prevFilterRef = useRef(filter);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const response = await fetch('/api/controllers/productsController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ filter: filter.categoryId ? filter : {} }),
        });

        if (!response.ok) {
          throw new Error('Error response fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error catch fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    if (
      JSON.stringify(prevFilterRef.current) !== JSON.stringify(filter) ||
      prevFilterRef.current === filter
    ) {
      fetchProducts();
      prevFilterRef.current = filter;
    }
  }, [setProducts, setLoadingProducts, filter]);

  return null;
};

export default FetchProducts;
