import { supabase } from './../../../../utils/supabase/client';

export async function GET() {
  try {
    const { data, error } = await supabase.from('user').select();
    
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}