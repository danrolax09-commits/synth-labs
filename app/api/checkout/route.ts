import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceId, productId } = body

    console.log('[CHECKOUT] Request received', { priceId, productId })

    // Validate inputs
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[CHECKOUT] STRIPE_SECRET_KEY not found')
      return NextResponse.json(
        { error: 'Server configuration error: Missing Stripe key' },
        { status: 500 }
      )
    }

    // Initialize Stripe with explicit configuration
    console.log('[CHECKOUT] Initializing Stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    })

    // Get safe origin
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || 'synth-labs-sigma.vercel.app'
    const origin = `${protocol}://${host}`

    console.log('[CHECKOUT] Creating session', { origin, priceId })

    // Create the checkout session
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
      metadata: {
        productId,
      },
    })

    console.log('[CHECKOUT] Session created successfully', { sessionId: session.id })

    return NextResponse.json({ sessionId: session.id })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[CHECKOUT] Error:', errorMessage)
    console.error('[CHECKOUT] Full error:', JSON.stringify(error))

    return NextResponse.json(
      { 
        error: errorMessage,
        debug: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}
