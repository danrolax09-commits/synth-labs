export const STRIPE_PRICES = {
  starter: 'price_1TChYOFE7rCAiPw04Ya0XhEq',
  professional: 'price_1TChYOFE7rCAiPw0ttnOlYqG',
  enterprise: 'price_1TChYOFE7rCAiPw0p6gxXk5P',
};

export const PRICING_TIERS = [
  {
    name: 'Starter',
    priceId: 'price_1TChYOFE7rCAiPw04Ya0XhEq',
    price: 19,
    description: 'Perfect for getting started',
    features: [
      'Basic features',
      'Up to 100 requests/month',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    priceId: 'price_1TChYOFE7rCAiPw0ttnOlYqG',
    price: 49,
    description: 'Most popular for teams',
    features: [
      'All Starter features',
      'Unlimited requests',
      'Priority support',
      'Advanced analytics',
      'Team collaboration',
    ],
  },
  {
    name: 'Enterprise',
    priceId: 'price_1TChYOFE7rCAiPw0p6gxXk5P',
    price: 99,
    description: 'For large-scale operations',
    features: [
      'All Professional features',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'On-premise option',
    ],
  },
];
