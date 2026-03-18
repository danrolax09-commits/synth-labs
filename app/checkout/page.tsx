'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import styles from './checkout.module.css'

const CheckoutContent = dynamic(() => import('./checkout-content'), {
  ssr: false,
})

function LoadingFallback() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <h1>Loading checkout...</h1>
        <p>Please wait.</p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  )
}
