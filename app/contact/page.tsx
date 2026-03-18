'use client'

import { useState } from 'react'
import styles from '../page.module.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this to an API endpoint
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            Synth<span>Labs</span>
          </div>
          <nav>
            <a href="/">Home</a>
          </nav>
        </div>
      </header>

      <section className={styles.features}>
        <div className={styles.container}>
          <h1>Contact Us</h1>
          
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Have questions about Synth Labs? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            {submitted && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '4px',
                marginBottom: '1rem',
                color: '#155724'
              }}>
                ✓ Thank you! We've received your message and will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                Send Message
              </button>
            </form>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
              <h3>Other Ways to Reach Us</h3>
              <p>
                <strong>Email:</strong> <a href="mailto:support@synth-labs.ai">support@synth-labs.ai</a>
              </p>
              <p>
                <strong>Discord:</strong> Join our community for support and discussions
              </p>
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
