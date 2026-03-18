import Head from 'next/head'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Resume Roaster</title>
      </Head>
      <style>{`
        body { background:#0a0a0a; color:#f5f0eb; font-family:'DM Sans',sans-serif; padding:48px 24px; max-width:720px; margin:0 auto; line-height:1.8; }
        h1 { font-size:36px; font-weight:800; margin-bottom:8px; }
        h2 { font-size:20px; font-weight:700; margin:32px 0 12px; color:#FF8C00; }
        p { color:rgba(245,240,235,.7); margin-bottom:16px; }
        a { color:#FF4500; }
      `}</style>
      <h1>Privacy Policy</h1>
      <p style={{color:'rgba(245,240,235,.4)', fontSize:14}}>Last updated: March 2026</p>

      <h2>1. Information We Collect</h2>
      <p>We collect resume content you submit for analysis, your email address if you create an account, and usage data to improve our service.</p>

      <h2>2. How We Use Your Information</h2>
      <p>Resume content is sent to Anthropic's Claude API for analysis and is not stored permanently. We do not sell your personal data to third parties.</p>

      <h2>3. Payment Information</h2>
      <p>Payments are processed by Stripe. We do not store your credit card information. Please review Stripe's privacy policy at stripe.com/privacy.</p>

      <h2>4. Data Retention</h2>
      <p>Resume content is processed in real-time and not stored on our servers. Account information is retained until you delete your account.</p>

      <h2>5. Contact</h2>
      <p>For privacy inquiries, contact us at: privacy@resumeroaster.app</p>
    </>
  )
}
