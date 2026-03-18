import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Synth Labs — AI Agent Solutions',
  description: 'Premium AI agent templates, frameworks, and production-ready automation for developers.',
  keywords: 'AI agents, automation, templates, frameworks, autonomous systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
