'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase/client';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  fiche: string;
  stock: number;
  category_id: number;
}

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = localStorage.getItem('selectedProductId');

    if (productId) {
      const fetchProduct = async () => {
        try {
          const { data, error } = await supabase
            .from('product')
            .select(
              `
              id,
              name,
              description,
              price,
              fiche,
              stock,
              category_id
            `,
            )
            .eq('id', productId)
            .single();

          if (error) throw error;

          if (data) {
            setProduct(data);

            const { data: category, error: categoryError } = await supabase
              .from('category')
              .select('name')
              .eq('id', data.category_id)
              .single();

            if (categoryError) {
              console.error('Error fetching category name:', categoryError);
            } else {
              setCategoryName(category?.name || null);
            }
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      console.error('No product ID found in localStorage');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="text-center">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p className="text-xl font-bold mb-4">{product.description}</p>
      <p className="text-lg font-bold mb-4">${product.price}</p>
      <p className="text-lg font-bold mb-4">{product.fiche}</p>
      <p className="text-lg font-bold mb-4">{product.stock} in stock</p>
      <p className="text-lg font-bold mb-4">
        Category: {categoryName || 'No Category'}
      </p>
      <button className="bg-teal-500 text-white px-4 py-2 rounded">
        Buy Now
      </button>
    </div>
  );
}
