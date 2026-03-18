import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — Resume Roaster</title>
      </Head>
      <style>{`
        body { background:#0a0a0a; color:#f5f0eb; font-family:'DM Sans',sans-serif; padding:48px 24px; max-width:720px; margin:0 auto; line-height:1.8; }
        h1 { font-size:36px; font-weight:800; margin-bottom:8px; }
        h2 { font-size:20px; font-weight:700; margin:32px 0 12px; color:#FF8C00; }
        p { color:rgba(245,240,235,.7); margin-bottom:16px; }
        a { color:#FF4500; }
      `}</style>
      <h1>Terms of Service</h1>
      <p style={{color:'rgba(245,240,235,.4)', fontSize:14}}>Last updated: March 2026</p>

      <h2>1. Service Description</h2>
      <p>Resume Roaster provides AI-powered resume analysis and feedback. The service is provided "as is" and results are for informational purposes only.</p>

      <h2>2. Free and Paid Plans</h2>
      <p>Free users receive 3 resume reviews. Paid subscribers ($9.99/month) receive unlimited reviews and additional features. Subscriptions can be cancelled at any time.</p>

      <h2>3. Refund Policy</h2>
      <p>We offer a 7-day money-back guarantee. Contact us within 7 days of your first charge for a full refund.</p>

      <h2>4. Acceptable Use</h2>
      <p>You agree not to misuse the service, attempt to reverse-engineer the AI, or use the service for any unlawful purpose.</p>

      <h2>5. Limitation of Liability</h2>
      <p>Resume Roaster is not responsible for employment outcomes. AI feedback is a tool to assist you, not a guarantee of job placement.</p>

      <h2>6. Contact</h2>
      <p>For questions, contact us at: support@resumeroaster.app</p>
    </>
  )
}
