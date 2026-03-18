import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    stripe_key_present: !!process.env.STRIPE_SECRET_KEY,
    stripe_key_length: process.env.STRIPE_SECRET_KEY?.length || 0,
    stripe_key_prefix: process.env.STRIPE_SECRET_KEY?.substring(0, 10),
    vercel_url: process.env.VERCEL_URL,
    node_env: process.env.NODE_ENV,
  })
}
