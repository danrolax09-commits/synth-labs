'use client'

import styles from '../page.module.css'

export default function TermsPage() {
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
          <h1>Terms of Service</h1>
          
          <div style={{ maxWidth: '800px', lineHeight: '1.8' }}>
            <h2>1. Agreement to Terms</h2>
            <p>These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Synth Labs ("we," "us," "our," or "Company") concerning your access to and use of the https://synth-labs.vercel.app website as well as any related applications, products, services, tools, and materials offered therein (the "Service").</p>

            <h2>2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Service is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Service are owned or controlled by Synth Labs or licensed to such parties and are protected by copyright and trademark laws.</p>

            <h2>3. User Responsibilities</h2>
            <p>By accessing the Service, you represent and warrant that:</p>
            <ul>
              <li>All registration information you submit is true, accurate, current, and complete</li>
              <li>You will maintain the accuracy of such information and promptly update it</li>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>You will comply with these Terms and all applicable laws and regulations</li>
            </ul>

            <h2>4. Prohibited Conduct</h2>
            <p>You agree not to access or use the Service for any purpose other than that for which the Service is made available. The Service may not be used in connection with any commercial endeavors except those specifically endorsed or approved by us.</p>

            <h2>5. Limitation of Liability</h2>
            <p>In no event shall Synth Labs, its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages resulting from your use of or inability to use the Service.</p>

            <h2>6. Refund Policy</h2>
            <p>We offer a 30-day money-back guarantee on all purchases. If you're not satisfied with your purchase, contact us within 30 days and we'll refund your full purchase price, no questions asked.</p>

            <h2>7. Changes to Terms</h2>
            <p>We reserve the right, in our sole discretion, to make changes to these Terms at any time. When we make material changes to these Terms, we will notify you via email or through a notice on the Service. Your continued use of the Service following the posting of revised Terms means that you accept and agree to the changes.</p>

            <h2>8. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at: <a href="mailto:support@synth-labs.ai">support@synth-labs.ai</a></p>

            <p><strong>Last Updated:</strong> March 2026</p>
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
