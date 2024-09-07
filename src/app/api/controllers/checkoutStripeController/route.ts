import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { provider, amount } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Shipping with ${provider}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/`,
      cancel_url: `${request.headers.get('origin')}/pages/shipping`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error('Error in creating checkout session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
