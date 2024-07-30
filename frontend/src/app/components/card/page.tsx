import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase/client';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  details: string;
  color: string;
  size: string;
  rating: number;
  country: string;
  is_available: boolean;
  is_new: boolean;
  is_promoted: boolean;
  store_id: number;
}

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryName = async () => {
      const { data: category, error } = await supabase
        .from('category')
        .select('name')
        .eq('id', product.category_id)
        .single();

      if (error) {
        console.error('Error fetching category name:', error);
      } else {
        setCategoryName(category?.name || null);
      }
    };

    fetchCategoryName();
  }, [product.category_id]);

  const handleClick = () => {
    localStorage.setItem('selectedProductId', product.id.toString());
    router.push(`../../products/${product.id}`);
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="mb-4">{product.description}</p>
      <p className="text-lg font-bold mb-4">${product.price}</p>
      <p className="text-lg font-bold mb-4">
        Category: {categoryName || 'No Category'}
      </p>
      <button
        onClick={handleClick}
        className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
      >
        Details
      </button>
      <button className="bg-teal-500 text-white px-4 py-2 rounded mt-2">
        Buy Now
      </button>
    </div>
  );
}
