import { client } from '@/sanity/lib/client';
import { NextRequest, NextResponse } from "next/server";;
import stripe  from "stripe";
   


const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-03-31.basil',
    typescript: true,
});

export async function POST(req: NextRequest){
    const body = await req.text();
    const signature =req.headers.get('stripe-signature') || '';

    let event;
    try {
        event = stripeClient.webhooks.constructEvent(body, signature,process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('stripe webhook error:', error.message);
  } else {
    console.error('stripe webhook error:', error);
  }
  return NextResponse.json({ error: 'webhook error' }, { status: 400 });
}
    if (event.type === 'checkout.session.completed'){
        const session = event.data.object as stripe.Checkout.Session;

        try {
            // Retrieve line items from Stripe
            const lineItems = await stripeClient.checkout.sessions.listLineItems(session.id, {
                 expand :['data.price.product']
            });

            await client.create({
                _type : 'order',
                customerName: session.customer_details?.name || 'unknown',
                email: session.customer_details?.email || 'unknown',
                clerkUserId: session.metadata?.clerkUserId || '',
                products: lineItems.data.map((item:stripe.LineItem) => ({
                    _key: item.id,
                    product: {_type: 'reference', _ref:(item.price?.product as stripe.Product)?.metadata?.sanityId || ''},
                    size: (item.price?.product as stripe.Product)?.metadata?.size || '',
                    quantity: item.quantity,
                    price: item.price?.unit_amount || 0,
                    currency: item.currency.toUpperCase() || 'USD',
                })),
                totalPrice: session.amount_total!/ 100,
                currency: session.currency?.toUpperCase() || 'USD',  
                amountDiscounted: (session.amount_subtotal! - session.amount_total!)/100,
                status:'paid',
                stripeSessionId: session.id,
                stripePaymentId: session.payment_intent?.toString()|| '',
                paid: true,
                orderDate: new Date().toISOString(),
            })
        } catch {
       return NextResponse.json({error: 'sanity create error'}, {status: 500});
        }
        
    }
    return NextResponse.json({received: true}, {status: 200});
}