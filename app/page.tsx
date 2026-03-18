'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const products = [
  {
    id: 'starter',
    name: 'Starter Agent',
    price: 19,
    description: 'Perfect for beginners',
    features: [
      'Beginner\'s guide to autonomous agents',
      '3 pre-built agent templates',
      'Setup checklist & common mistakes',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Agent Builder',
    price: 29,
    description: 'For active developers',
    features: [
      'Everything in Starter',
      'Advanced agent patterns',
      '5 enterprise-grade templates',
      'API integration workshop',
      'Deployment guides',
      'Priority support + Discord community',
    ],
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Automation',
    price: 39,
    description: 'Full production setup',
    features: [
      'Everything in Pro',
      'Custom agent architecture course',
      '10 production-ready templates',
      'Revenue automation playbook',
      'Live 30-min strategy call',
      '1 month Discord access',
      'Direct Slack support',
    ],
  },
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            Synth<span>Labs</span>
          </div>
          <nav>
            <a href="#products">Products</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>Build Autonomous AI Agents That Work</h1>
          <p>
            Pre-built templates, production-ready frameworks, and everything you need to launch autonomous AI systems in hours, not weeks.
          </p>
          <div className={styles.heroButtons}>
            <a href="#pricing" className={`${styles.btn} ${styles.btnPrimary}`}>
              Get Started
            </a>
            <a href="#features" className={`${styles.btn} ${styles.btnSecondary}`}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <h2>Why Synth Labs?</h2>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <h3>🚀 Fast Launch</h3>
              <p>Get from idea to production in hours, not months. Pre-built templates eliminate boilerplate.</p>
            </div>
            <div className={styles.card}>
              <h3>📚 Complete Education</h3>
              <p>Learn system design, API integration, deployment, and revenue automation strategies.</p>
            </div>
            <div className={styles.card}>
              <h3>💪 Production Ready</h3>
              <p>Enterprise-grade templates, error handling, monitoring, and scaling patterns included.</p>
            </div>
            <div className={styles.card}>
              <h3>🔧 Framework Agnostic</h3>
              <p>Works with Python, Node.js, Rust, Go. Integrate with any API or service.</p>
            </div>
            <div className={styles.card}>
              <h3>👥 Community Support</h3>
              <p>Discord community, email support, and direct access to builders (Pro & Enterprise).</p>
            </div>
            <div className={styles.card}>
              <h3>💰 Monetize Immediately</h3>
              <p>Revenue playbook shows how to turn agents into income streams ($2-5K/month).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.container}>
          <h2>Simple, Transparent Pricing</h2>
          <div className={styles.grid3}>
            {products.map((product) => (
              <div
                key={product.id}
                className={`${styles.pricingCard} ${product.featured ? styles.featured : ''}`}
              >
                <h3>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.price}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.amount}>{product.price}</span>
                </div>
                <a
                  href={`/checkout?product=${product.id}`}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Get Access
                </a>
                <ul className={styles.features}>
                  {product.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.disclaimer}>
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready to launch?</h2>
          <p>Join 500+ developers building autonomous AI systems.</p>
          <a href="#pricing" className={`${styles.btn} ${styles.btnPrimary}`}>
            Choose Your Plan
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2026 Synth Labs. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
