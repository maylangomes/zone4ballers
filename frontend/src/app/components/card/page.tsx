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
  const [productImages, setProductImages] = useState<string[]>([]);

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

        setColorName(data.colorPrice.name ? data.colorPrice.name : 'No color');
      } catch (error) {
        console.error('Error try fetch color');
      }
    };

    fetchColor();
  }, [product.color_id]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await fetch('/api/controllers/showImageController', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product.id }),
        });

        if (!response.ok) {
          throw new Error('Error fetching product images');
        }

        const data = await response.json();
        setProductImages(data.imageUrls);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };

    fetchProductImages();
  }, [product.id]);

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
          <p className="text-red-500 font-bold mb-4">Unavailable</p>
        ) : (
          <p className="text-teal-500 font-bold mb-4">Available</p>
        )}
        {productImages.length > 0 && (
          <div className="mb-4">
            {productImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  marginRight: '8px',
                }}
              />
            ))}
          </div>
        )}
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleClick}
        >
          Details
        </button>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded mt-2"
          onClick={() => onAddToBasket(product)}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}
