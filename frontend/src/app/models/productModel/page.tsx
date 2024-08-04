import { supabase } from "../../../../utils/supabase/client";
import { ProductWithCategory } from "@/app/types/type";

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
      setProducts(formattedProducts as ProductWithCategory[]);
    } else {
      console.error('Error formatting products:', dataProducts);
    }
  };