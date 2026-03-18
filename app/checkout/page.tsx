'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import styles from './checkout.module.css'

const products: Record<string, any> = {
  starter: {
    name: 'Starter Agent',
    price: 19,
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
  },
  pro: {
    name: 'Pro Agent Builder',
    price: 29,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
  enterprise: {
    name: 'Enterprise Automation',
    price: 39,
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product') || 'starter'
  const product = products[productId]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (!product?.priceId) {
      setError('Product price not configured. Please contact support.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: product.priceId,
          productId: productId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

      if (!stripe) {
        throw new Error('Failed to load Stripe')
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) {
        setError(stripeError.message || 'Checkout failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Product not found</h1>
          <p>Please select a valid product.</p>
          <a href="/" className={styles.link}>← Back to home</a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.checkout}>
        <h1>Complete Your Purchase</h1>
        
        <div className={styles.summary}>
          <h2>{product.name}</h2>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>{product.price}</span>
          </div>
          <p className={styles.description}>
            Instant access to all files, templates, and resources
          </p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={styles.checkoutButton}
        >
          {loading ? 'Processing...' : `Pay $${product.price}`}
        </button>

        <p className={styles.guarantee}>
          ✓ 30-day money-back guarantee | ✓ Instant access | ✓ Lifetime updates
        </p>

        <a href="/" className={styles.link}>← Continue shopping</a>
      </div>
    </div>
  )
}
