import { supabase } from './../../../../utils/supabase/client';

export async function GET() {
  try {
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
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    const formattedProducts = dataProducts.map((product) => ({
      ...product,
      category: product.category[0],
    }));

    return new Response(JSON.stringify(formattedProducts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
