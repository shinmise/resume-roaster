import Stripe from 'stripe'

export const config = { api: { bodyParser: false } }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const buf = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('✅ New subscriber:', session.customer_email)
  }

  if (event.type === 'customer.subscription.deleted') {
    console.log('❌ Subscription cancelled')
  }

  res.status(200).json({ received: true })
}
