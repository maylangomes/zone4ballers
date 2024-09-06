import { supabase } from './../../../../../utils/supabase/client';

export const getProductWithCategory = async (productId: string) => {
  try {
    const { data, error } = await supabase
      .from('product')
      .select(
        `
        id,
        name,
        description,
        price,
        details,
        stock,
        category_id,
        color_id,
        size,
        rating,
        country,
        is_available,
        is_new,
        is_promoted,
        store_id,
        click,
        franchise
      `,
      )
      .eq('id', productId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const { data: category, error: categoryError } = await supabase
      .from('category')
      .select('name')
      .eq('id', data.category_id)
      .single();

    if (categoryError) {
      console.error('Error fetching category name:', categoryError);
    }

    return {
      ...data,
      categoryName: category?.name || null,
    };
  } catch (error) {
    throw new Error(`Failed to fetch product with category: ${error.message}`);
  }
};
