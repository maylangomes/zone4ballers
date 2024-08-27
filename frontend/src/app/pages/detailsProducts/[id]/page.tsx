'use client';

import { useState } from 'react';
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

  const {
    basketItems,
    handleAddToBasket,
    handleRemoveFromBasket,
    handleClearBasket,
  } = handleBasket();

  return (
    <div>
    <NavBar/>
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
          <button className="bg-teal-500 text-white px-4 py-2 rounded">
            Buy Now
          </button>
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
