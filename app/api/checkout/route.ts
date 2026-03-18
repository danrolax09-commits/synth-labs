import { NextRequest, NextResponse } from 'next/server'

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

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      return NextResponse.json(
        { error: 'Stripe key not configured' },
        { status: 500 }
      )
    }

    // Get safe origin
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || 'synth-labs-sigma.vercel.app'
    const origin = `${protocol}://${host}`

    console.log('[CHECKOUT] Creating session for', { origin, priceId })

    // Use Payment Links instead of Checkout Sessions - avoids on_behalf_of param issues
    const params = new URLSearchParams()
    params.append('line_items[0][price]', priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('after_completion[type]', 'redirect')
    params.append('after_completion[redirect][url]', `${origin}/thank-you?product=${productId}`)

    const auth = Buffer.from(`${secretKey}:`).toString('base64')

    const response = await fetch('https://api.stripe.com/v1/payment_links', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[CHECKOUT] API error:', response.status, errorText)
      return NextResponse.json(
        { error: `Stripe API error: ${response.status}` },
        { status: 500 }
      )
    }

    const paymentLink = await response.json() as any

    console.log('[CHECKOUT] SUCCESS', { paymentLink: paymentLink.url })
    return NextResponse.json({ paymentLink: paymentLink.url })

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('[CHECKOUT] FAILED:', msg)
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    )
  }
}
