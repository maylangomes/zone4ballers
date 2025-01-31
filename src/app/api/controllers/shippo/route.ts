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
  const phone = (formData.get('phone') as string) || null;
  const email = formData.get('email') as string;

  try {
    const addressFrom = await shippo.addresses.create({
      name: name,
      street1: street,
      city: city,
      state: state,
      zip: zip,
      country: country,
      phone: phone,
      email: email,
    });

    const { data, error } = await supabase
      .from('delivery_address')
      .insert([{ name, phone, email }]);

    if (error) {
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
