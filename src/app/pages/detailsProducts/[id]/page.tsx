'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/app/types/type';
import FetchIdProduct from '@/app/components/fetchIdProduct/page';
import handleBasket from '@/app/components/handleBasket/page';
import Basket from '@/app/components/basket/page';
import NavBar from '@/app/components/navbar/NavBar';

interface ProductWithCategory extends Product {
  categoryName: string | null;
}

export default function ProductPage() {
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState<string[]>([]);

  const {
    basketItems,
    handleAddToBasket,
    handleRemoveFromBasket,
    handleClearBasket,
  } = handleBasket();

  useEffect(() => {
    const fetchProductImages = async () => {
      if (!product) return;
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
  }, [product]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <FetchIdProduct setProduct={setProduct} setLoading={setLoading} />

        {loading ? (
          <p className="text-center">Loading product...</p>
        ) : !product ? (
          <p className="text-center">Product not found</p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-xl font-bold mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">${product.price}</p>
            <p className="text-lg font-bold mb-4">{product.details}</p>
            <p className="text-lg font-bold mb-4">{product.stock} in stock</p>
            <p className="text-lg font-bold mb-4">
              Category: {product.categoryName || 'No Category'}
            </p>
            <p className="text-lg font-bold mb-4">Size: {product.size}</p>
            <p className="text-lg font-bold mb-4">Rating: {product.rating}</p>
            <p className="text-lg font-bold mb-4">Country: {product.country}</p>
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
          </div>
        )}
        <div className="mt-8">
          <Basket
            items={basketItems}
            onRemove={handleRemoveFromBasket}
            onClear={handleClearBasket}
          />
        </div>
      </div>
    </div>
  );
}
