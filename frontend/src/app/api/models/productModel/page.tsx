// models/productModel.ts
import { supabase } from '../../../../../utils/supabase/client';

export const getAllProducts = async () => {
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
    throw new Error(error.message);
  }

  return dataProducts.map((product) => ({
    ...product,
    category: product.category[0],
  }));
};
