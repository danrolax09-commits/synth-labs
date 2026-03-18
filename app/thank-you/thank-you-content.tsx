'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import styles from './thank-you.module.css'

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  React.useEffect(() => {
    if (!sessionId) {
      setError('Invalid session')
      setLoading(false)
      return
    }

    verifyPayment()
  }, [sessionId])

  const verifyPayment = async () => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        setSuccess(true)
      } else {
        setError('Failed to verify payment')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <h1>Processing your order...</h1>
          <p>Please wait while we confirm your payment.</p>
        </div>
      </div>
    )
  }

  if (error || !success) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>❌ Something went wrong</h1>
          <p>{error || 'Payment verification failed'}</p>
          <a href="/" className={styles.link}>← Back to home</a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.success}>
        <div className={styles.checkmark}>✓</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. You'll receive an email with download links shortly.</p>
        
        <div className={styles.details}>
          <h2>What's next?</h2>
          <ol>
            <li>Check your email (including spam) for your download links</li>
            <li>Access all product files, templates, and guides immediately</li>
            <li>Join the Synth Labs Discord community for support</li>
            <li>Start building your first autonomous AI agent</li>
          </ol>
        </div>

        <div className={styles.resources}>
          <h2>Quick Resources</h2>
          <a href="https://discord.gg/synthlab" className={styles.button}>
            Join Discord Community
          </a>
          <a href="mailto:support@synthlab.ai" className={styles.button}>
            Contact Support
          </a>
        </div>

        <p className={styles.guarantee}>
          30-day money-back guarantee if you're not satisfied.
        </p>

        <a href="/" className={styles.link}>← Back to home</a>
      </div>
    </div>
  )
}
