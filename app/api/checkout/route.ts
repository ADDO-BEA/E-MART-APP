// app/api/checkout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion: '2025-03-31.basil' // updated to match required type
 // or whatever version you're using
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customer } = body;
    console.log(' received items:',items )
    

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ message: 'Invalid items' }, { status: 400 });
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
       sanityId: item._id,              
       size: item.size || "N/A"
       
      },
        },
        unit_amount: Math.round(
          (item.price - (item.discount ? (item.price * item.discount) / 100 : 0)) * 100
        ),
      },
      quantity: item.quantity,
    }));
    // console.log('lime_items:',JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID} `,
      cancel_url: `${req.nextUrl.origin}/cart`,
      customer_email: customer.email,
      metadata: {
    clerkUserId: customer.clerkUserId,
    
  }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    // console.error('Checkout error:', err);
    return NextResponse.json(
      {
        message: err.message || 'Internal server error',
        details: err.raw?.message || null,
      },
      { status: 500 }
    );
  }
}
