import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceId, productId } = body

    console.log('[CHECKOUT] Request received', { priceId, productId })

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    // Get safe origin
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || 'synth-labs-sigma.vercel.app'
    const origin = `${protocol}://${host}`

    console.log('[CHECKOUT] Creating session for', { origin, priceId })

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

    console.log('[CHECKOUT] SUCCESS', { sessionId: session.id })
    return NextResponse.json({ sessionId: session.id })

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('[CHECKOUT] FAILED:', msg)
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    )
  }
}
