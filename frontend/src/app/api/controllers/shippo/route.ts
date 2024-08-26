import { NextRequest } from 'next/server';
import { Shippo } from 'shippo';
import { supabase } from '../../../../../utils/supabase/client';

const shippo = new Shippo({
  apiKeyHeader: 'shippo_test_a221da6720c36b41b1e265e2fbf66fa7b9cc7453',
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const street = formData.get('street') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const zip = formData.get('zip') as string;
  const country = formData.get('country') as string;
  console.log('NAME : ', name);

  try {
    const addressFrom = await shippo.addresses.create({
      name: name,
      street1: '215 Clayton St.',
      city: 'San Francisco',
      state: 'CA',
      zip: '94117',
      country: 'US',
      phone: '+1 555 341 9393',
      email: 'shippotle@shippo.com',
    });

    const { data, error } = await supabase
      .from('delivery_address')
      .insert([{ name: name }]);

    console.log('Adresse créée avec succès :', addressFrom);
    console.log("DATA : ", data);
    

    if (error) {
      console.log("error requete supabase");
      throw new Error(error.message);
    }

    return new Response(JSON.stringify(addressFrom), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'adresse :", error);

    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
