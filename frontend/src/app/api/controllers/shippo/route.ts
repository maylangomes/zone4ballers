import { Shippo } from 'shippo';

const shippo = new Shippo({
  apiKeyHeader: 'shippo_test_a221da6720c36b41b1e265e2fbf66fa7b9cc7453',
});

export async function POST() {
  try {
    const addressFrom = await shippo.addresses.create({
      name: 'Shawn Ippotle',
      company: 'Shippo',
      street1: '215 Clayton St.',
      city: 'San Francisco',
      state: 'CA',
      zip: '94117',
      country: 'US',
      phone: '+1 555 341 9393',
      email: 'shippotle@shippo.com',
    });

    console.log('Adresse créée avec succès :', addressFrom);

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
