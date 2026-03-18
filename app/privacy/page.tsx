'use client'

import styles from '../page.module.css'

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
          
          <div style={{ maxWidth: '800px', lineHeight: '1.8' }}>
            <h2>Introduction</h2>
            <p>Synth Labs ("we", "us", "our", or "Company") operates the https://synth-labs.vercel.app website (the "Service").</p>
            <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

            <h2>Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you:</p>
            <ul>
              <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include:
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>
              <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's IP address, browser type, browser version, the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
            </ul>

            <h2>Security of Data</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

            <h2>Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@synth-labs.ai">support@synth-labs.ai</a></p>
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
