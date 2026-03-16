import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()
  return (
    <>
      <Head><title>Welcome to Resume Roaster Pro 🔥</title></Head>
      <style>{`
        body { background:#0a0a0a; color:#f5f0eb; font-family:'DM Sans',sans-serif; display:flex; align-items:center; justify-content:center; min-height:100vh; text-align:center; padding:24px; }
        h1 { font-family:'Syne',sans-serif; font-size:48px; font-weight:800; margin-bottom:16px; background:linear-gradient(135deg,#FF4500,#FFD700); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        p { color:rgba(245,240,235,.55); font-size:17px; line-height:1.65; max-width:420px; margin:0 auto 32px; }
        .btn { background:linear-gradient(135deg,#FF4500,#FF8C00); color:#fff; border:none; padding:15px 36px; border-radius:100px; font-size:16px; font-family:'Syne',sans-serif; font-weight:700; cursor:pointer; }
      `}</style>
      <div>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔥</div>
        <h1>You're in.</h1>
        <p>Welcome to Resume Roaster Pro. Unlimited reviews, ATS scores, and brutal honesty — all yours.</p>
        <button className="btn" onClick={() => router.push('/')}>Start Roasting →</button>
      </div>
    </>
  )
}
