'use client'

import styles from './products.module.css'

const allProducts = [
  {
    category: 'Agent Templates',
    name: 'Synth Labs - AI Agent Courses',
    description: 'Pre-built templates and complete training',
    link: '/#pricing',
    prices: ['$19', '$29', '$39'],
    icon: '🤖',
    color: '#6366f1',
  },
  {
    category: 'Marketplace',
    name: 'Agent Marketplace',
    description: 'Sell and buy AI agents. 15% commission, instant payouts.',
    link: 'https://agent-marketplace-danrolax09-commits.vercel.app',
    prices: ['$9.99+'],
    icon: '🏪',
    color: '#ec4899',
  },
  {
    category: 'Analytics',
    name: 'CryptoTracker Pro',
    description: 'AI-powered crypto portfolio analytics and predictions',
    link: 'https://crypto-analyzer-danrolax09-commits.vercel.app',
    prices: ['Free', '$9.99/mo', '$24.99/mo'],
    icon: '📊',
    color: '#f59e0b',
  },
  {
    category: 'Job Board',
    name: 'AI Jobs Board',
    description: 'Post jobs for AI engineers. Reach qualified candidates.',
    link: 'https://ai-jobs-danrolax09-commits.vercel.app',
    prices: ['$99', '$199', '$499'],
    icon: '💼',
    color: '#10b981',
  },
]

export default function ProductsPage() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <a href="/" className={styles.logo}>
            Synth<span>Labs</span>
          </a>
          <nav>
            <a href="/">Home</a>
            <a href="/products" className={styles.active}>Products</a>
            <a href="/#pricing">Pricing</a>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Our Products</h1>
          <p>
            A complete suite of AI tools designed to help you build, monetize, and scale autonomous agents.
          </p>
        </div>
      </section>

      <section className={styles.products}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {allProducts.map((product, idx) => (
              <a
                key={idx}
                href={product.link}
                className={styles.productCard}
                style={{ '--accent-color': product.color } as React.CSSProperties}
              >
                <div className={styles.icon}>{product.icon}</div>
                <div className={styles.category}>{product.category}</div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.pricing}>
                  {product.prices.map((price, i) => (
                    <span key={i}>{price}</span>
                  ))}
                </div>
                <div className={styles.cta}>
                  View {product.name.split(' - ')[0]} →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.combined}>
        <div className={styles.container}>
          <h2>Bundle & Save</h2>
          <div className={styles.bundleCard}>
            <h3>All-In-One Creator Package</h3>
            <p>Get everything to build and monetize AI agents</p>
            <ul>
              <li>Synth Labs Pro ($29) - Complete training</li>
              <li>Agent Marketplace access - Sell agents instantly</li>
              <li>CryptoTracker Pro (3 months free) - Build trading bots</li>
              <li>AI Jobs Board - Find/post gigs</li>
            </ul>
            <div className={styles.bundlePrice}>
              <div className={styles.original}>$119.99 value</div>
              <div className={styles.price}>$49</div>
              <a href="https://buy.stripe.com/5kQeVdfq35ambmU9dzcwg0f" className={styles.btn}>
                Get Bundle
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2026 Synth Labs. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
