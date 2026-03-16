import Stripe from 'stripe'
import { buffer } from 'micro'

export const config = { api: { bodyParser: false } }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    // TODO: Mark user as paid in your database
    const session = event.data.object
    console.log('✅ New subscriber:', session.customer_email)
  }

  if (event.type === 'customer.subscription.deleted') {
    // TODO: Remove paid access
    console.log('❌ Subscription cancelled')
  }

  res.status(200).json({ received: true })
}
