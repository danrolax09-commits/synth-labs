import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { priceId, productId } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Get the origin from headers, fallback to environment variable or default
    const origin = request.headers.get('origin') || 
                   request.headers.get('x-forwarded-proto') + '://' + request.headers.get('host') ||
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://synth-labs-sigma.vercel.app'

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
      cancel_url: `${origin}/checkout?product=${productId}`,
      customer_email: undefined,
      metadata: {
        productId,
      },
    } as any)

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}
