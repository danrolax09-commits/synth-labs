# Synth Labs — AI Agent Solutions

A premium digital product marketplace built with Next.js and Stripe. Selling high-quality AI agent templates, guides, and frameworks.

## Features

- ✅ Modern, responsive landing page with product showcase
- ✅ Stripe payment integration (checkout + webhook handling)
- ✅ Product tiers: Starter ($19), Pro ($29), Enterprise ($39)
- ✅ Thank you page with purchase verification
- ✅ Email notifications on purchase (via Resend)
- ✅ 30-day money-back guarantee
- ✅ Deployed on Vercel with auto-scaling

## Tech Stack

- **Frontend:** Next.js 14, React 18, CSS Modules
- **Payments:** Stripe API (Checkout Sessions)
- **Hosting:** Vercel (serverless)
- **Email:** Resend (transactional emails)
- **Repository:** GitHub

## Getting Started

### Prerequisites

- Node.js 18+
- Stripe account (for API keys)
- Vercel account (for deployment)
- GitHub account (already connected)

### Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/danrolax09-commits/synth-labs.git
   cd synth-labs
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Stripe keys
   ```

3. **Create Stripe products:**
   - Go to Stripe Dashboard → Products
   - Create 3 products: Starter, Pro, Enterprise
   - Copy the Price IDs into your .env.local
   - Set webhook endpoint to: `https://yourdomain.com/api/webhook`

4. **Run locally:**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

5. **Deploy to Vercel:**
   ```bash
   vercel
   # Follow prompts, add environment variables
   ```

## Product Structure

### Starter ($19)
- Beginner's guide to autonomous agents
- 3 pre-built agent templates
- Setup checklist
- Email support

### Pro ($29)
- Everything in Starter
- Advanced agent patterns
- 5 enterprise templates
- API workshop
- Deployment guides
- Discord community

### Enterprise ($39)
- Everything in Pro
- Custom architecture course
- 10 production templates
- Revenue automation playbook
- Live strategy call
- Slack support

## Stripe Configuration

### Create Products

1. **Starter Agent**
   - Price: $19
   - Description: "Beginner's guide + 3 templates + setup checklist"

2. **Pro Agent Builder**
   - Price: $29
   - Description: "Advanced templates + workshops + community access"

3. **Enterprise Automation**
   - Price: $39
   - Description: "Full production suite + strategy call + support"

### Webhook Setup

Add webhook endpoint in Stripe Dashboard:
- **URL:** `https://yourdomain.com/api/webhook`
- **Events:** checkout.session.completed, payment_intent.succeeded, payment_intent.payment_failed

## File Structure

```
synth-labs/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   ├── checkout/
│   │   └── page.tsx        # Checkout form
│   ├── thank-you/
│   │   └── page.tsx        # Success page
│   └── api/
│       ├── checkout/       # Create session
│       ├── webhook/        # Stripe webhooks
│       └── verify-payment/ # Payment verification
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.local             # Environment variables (local only)
```

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page with product tiers |
| `/checkout?product=starter` | Checkout for Starter |
| `/checkout?product=pro` | Checkout for Pro |
| `/checkout?product=enterprise` | Checkout for Enterprise |
| `/thank-you?session_id=...` | Success page after payment |
| `/api/checkout` | Create Stripe session |
| `/api/webhook` | Handle Stripe events |
| `/api/verify-payment` | Verify payment status |

## Email Integration

When a customer completes checkout:

1. Stripe sends webhook to `/api/webhook`
2. We receive `checkout.session.completed` event
3. Send transactional email via Resend with:
   - Product download links
   - Setup guides
   - Community invite
   - Support contact info

**Setup:** Add Resend API key to `.env.local`

## Monitoring & Analytics

### Real-Time Sales Dashboard
Check Stripe Dashboard for:
- Total revenue
- Recent transactions
- Customer emails
- Payment methods

### Logs
- Vercel Analytics: https://vercel.com/dashboard
- Stripe Logs: https://dashboard.stripe.com/logs

## Deployment

Automatically deployed on every push to `main`:
1. GitHub → Vercel webhook triggers
2. Vercel builds Next.js
3. API routes + static files deployed
4. Live within 2 minutes

## Support

- **Email:** support@synthlab.ai
- **Discord:** https://discord.gg/synthlab
- **Twitter:** @synthlab

## License

MIT — Feel free to modify and deploy.

---

**Built with ❤️ by Synth Labs**
