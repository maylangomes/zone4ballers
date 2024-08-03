import { supabase } from "../../supabase/client";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  details: string;
  stock: number;
  category_id: number;
  category: Category;
  color: string;
  size: string;
  rating: number;
  country: string;
  is_available: boolean;
  is_new: boolean;
  is_promoted: boolean;
  store_id: number;
}

export const fetchProducts = async ({setProducts}) => {
    const { data: dataProducts, error } = await supabase
      .from('product')
      .select(`
        id,
        name,
        description,
        price,
        details,
        stock,
        category_id,
        category (id, name),
        color,
        size,
        rating,
        country,
        is_available,
        is_new,
        is_promoted,
        store_id
      `);
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }
    if (Array.isArray(dataProducts)) {
      const formattedProducts = dataProducts.map((product) => ({
        ...product,
        category: product.category[0],
      }));
      setProducts(formattedProducts as Product[]);
    } else {
      console.error('Error formatting products:', dataProducts);
    }
  };