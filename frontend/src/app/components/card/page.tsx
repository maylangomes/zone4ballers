import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/type';

interface CardProps {
  product: Product;
  onAddToBasket: (product: Product) => void;
}

export default function Card({ product, onAddToBasket }: CardProps) {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [colorName, setColorName] = useState<string | null>(null);


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          '/api/controllers/categoriesByIdController',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryId: product.category_id }),
          },
        );

        if (!response.ok) {
          throw new Error('Error fetching category');
        }

        const data = await response.json();
        setCategoryName(data.category ? data.category.name : 'No Category');
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [product.category_id]);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        // console.log('body color id:', JSON.stringify({ colorId: product.color_id }));
        const response = await fetch('api/controllers/colorIdController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ colorId: product.color_id }),
        });

        if (!response.ok) {
          throw new Error('error fetching color');
        }

        const data = await response.json();

        // console.log('Data color : ', data);

        setColorName(data.color ? data.color.name : 'No color');
        
      } catch (error) {
        console.error('Error try fetch color');
      }
    };

    fetchColor();
  }, [product.color_id]);

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
        <p className="text-lg font-bold mb-4">Color : {colorName}</p>
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
