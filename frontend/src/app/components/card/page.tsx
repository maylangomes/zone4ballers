import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase/client';
import { Product } from '@/app/types/type';

interface CardProps {
  product: Product;
  onAddToBasket: (product: Product) => void;
}

export default function Card({ product, onAddToBasket }: CardProps) {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data: category, error } = await supabase
        .from('category')
        .select('name')
        .eq('id', product.category_id)
        .single();

      if (error) {
        console.error('Error fetching category:', error);
      } else {
        setCategoryName(category ? category.name : 'No Category');
      }
    };

    fetchCategory();
  }, [product.category_id]);

  const handleClick = () => {
    localStorage.setItem('selectedProductId', product.id.toString());
    router.push(`../../pages/detailsProducts/${product.id}`);
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <div>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-lg font-bold mb-4">{product.description}</p>
        <p className="text-lg font-bold mb-4">${product.price}</p>
        <p className="text-lg font-bold mb-4">Category: {categoryName}</p>
        {!product.is_available ? (
          <p className="text-teal-500 font-bold mb-4">Unavailable</p>
        ) : (
          <p className="text-teal-500 font-bold mb-4">Available</p>
        )}
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded"
          onClick={handleClick}
        >
          Details
        </button>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded ml-2"
          onClick={() => onAddToBasket(product)}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}
