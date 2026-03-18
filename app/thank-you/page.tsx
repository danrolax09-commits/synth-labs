'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import styles from './thank-you.module.css'

const ThankYouContent = dynamic(() => import('./thank-you-content'), {
  ssr: false,
})

function LoadingFallback() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <h1>Processing your order...</h1>
        <p>Please wait while we confirm your payment.</p>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ThankYouContent />
    </Suspense>
  )
}


