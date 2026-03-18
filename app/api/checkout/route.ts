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

    // Verify stripe key is loaded
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not found in environment')
      return NextResponse.json(
        { error: 'Stripe configuration missing' },
        { status: 500 }
      )
    }

    // Get the origin from headers, fallback to environment variable or default
    const origin = request.headers.get('origin') || 
                   (request.headers.get('x-forwarded-proto') ? 
                    `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}` : 
                    'https://synth-labs-sigma.vercel.app')

    console.log('Checkout request:', { priceId, productId, origin })

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
    })

    console.log('Session created:', session.id)
    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    const errorMsg = error instanceof Error ? error.message : 'Checkout failed'
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    )
  }
}
