import { useState, useRef } from 'react'
import Head from 'next/head'

export default function Home() {
  const [resumeText, setResumeText] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [usageCount, setUsageCount] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const handleFile = async (file) => {
    setFileName(file.name)
    if (file.type === 'text/plain') {
      const text = await file.text()
      setResumeText(text)
    } else {
      setResumeText(`[Uploaded: ${file.name} - Please also paste text for best results]`)
    }
  }

  const startRoast = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text or upload a file.')
      return
    }
    if (usageCount >= 3) {
      setResults({ paywalled: true })
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: resumeText, jobTitle }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data)
      setUsageCount(c => c + 1)
    } catch (e) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const reset = () => {
    setResults(null)
    setResumeText('')
    setJobTitle('')
    setFileName('')
    setError('')
  }

  const handleUpgrade = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' })
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <>
      <Head>
        <title>Resume Roaster 🔥 — Brutally Honest AI Resume Review</title>
        <meta name="description" content="Get your resume torn apart by AI before hiring managers do. Honest scores, actionable fixes, ATS optimization." />
        <meta property="og:title" content="Resume Roaster 🔥 — Brutally Honest AI Resume Review" />
        <meta property="og:description" content="Your resume probably sucks. Let our AI fix it." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        :root {
          --fire: #FF4500; --fire2: #FF8C00; --char: #0a0a0a;
          --ash: #1a1a1a; --smoke: #2d2d2d; --ember: #3d3d3d;
          --white: #f5f0eb; --cream: #e8e0d5; --gold: #FFD700; --green: #00ff88;
        }
        * { margin:0; padding:0; box-sizing:border-box; }
        body { background:var(--char); color:var(--white); font-family:'DM Sans',sans-serif; min-height:100vh; overflow-x:hidden; }
        body::before { content:''; position:fixed; inset:0; background:radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,69,0,0.1) 0%, transparent 70%); pointer-events:none; z-index:0; }
        .wrap { position:relative; z-index:1; max-width:860px; margin:0 auto; padding:0 24px; }
        header { padding:52px 0 36px; text-align:center; }
        .badge { display:inline-block; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.2em; text-transform:uppercase; color:var(--fire); border:1px solid rgba(255,69,0,.3); padding:6px 16px; border-radius:100px; margin-bottom:24px; background:rgba(255,69,0,.05); }
        h1 { font-family:'Syne',sans-serif; font-size:clamp(52px,9vw,92px); font-weight:800; line-height:.92; letter-spacing:-.03em; margin-bottom:16px; }
        .fire-text { background:linear-gradient(135deg,var(--fire) 0%,var(--fire2) 50%,var(--gold) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .tagline { font-size:18px; color:rgba(245,240,235,.5); font-weight:300; max-width:460px; margin:0 auto 40px; line-height:1.6; }
        .stats { display:flex; justify-content:center; gap:40px; margin-bottom:52px; flex-wrap:wrap; }
        .stat-num { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:var(--fire); }
        .stat-label { font-size:12px; color:rgba(245,240,235,.35); font-family:'DM Mono',monospace; letter-spacing:.1em; }
        .card { background:var(--ash); border:1px solid var(--smoke); border-radius:20px; padding:40px; margin-bottom:24px; position:relative; overflow:hidden; }
        .card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--fire),transparent); }
        .upload-zone { border:2px dashed var(--smoke); border-radius:12px; padding:44px 32px; text-align:center; cursor:pointer; transition:all .3s; background:rgba(255,69,0,.02); }
        .upload-zone:hover,.upload-zone.over { border-color:var(--fire); background:rgba(255,69,0,.05); }
        .upload-icon { font-size:44px; margin-bottom:14px; display:block; }
        .upload-title { font-family:'Syne',sans-serif; font-size:20px; font-weight:700; margin-bottom:8px; }
        .upload-sub { font-size:13px; color:rgba(245,240,235,.35); margin-bottom:22px; }
        .btn { background:linear-gradient(135deg,var(--fire),var(--fire2)); color:#fff; border:none; padding:13px 30px; border-radius:100px; font-family:'Syne',sans-serif; font-size:15px; font-weight:700; cursor:pointer; transition:all .2s; letter-spacing:.02em; }
        .btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,69,0,.35); }
        .btn:disabled { opacity:.4; cursor:not-allowed; }
        .divider { display:flex; align-items:center; gap:16px; margin:22px 0; color:rgba(245,240,235,.2); font-size:12px; font-family:'DM Mono',monospace; letter-spacing:.1em; }
        .divider::before,.divider::after { content:''; flex:1; height:1px; background:var(--smoke); }
        textarea { width:100%; background:var(--smoke); border:1px solid var(--ember); border-radius:12px; padding:18px; color:var(--white); font-family:'DM Mono',monospace; font-size:13px; line-height:1.7; resize:vertical; min-height:190px; outline:none; transition:border-color .2s; }
        textarea:focus { border-color:var(--fire); }
        textarea::placeholder { color:rgba(245,240,235,.2); }
        .label { font-size:12px; color:rgba(245,240,235,.45); font-family:'DM Mono',monospace; letter-spacing:.1em; margin-bottom:10px; display:block; margin-top:18px; }
        input[type=text] { width:100%; background:var(--smoke); border:1px solid var(--ember); border-radius:8px; padding:13px 16px; color:var(--white); font-family:'DM Sans',sans-serif; font-size:15px; outline:none; transition:border-color .2s; }
        input[type=text]:focus { border-color:var(--fire); }
        input[type=text]::placeholder { color:rgba(245,240,235,.2); }
        .roast-btn { width:100%; padding:18px; font-size:18px; margin-top:22px; border-radius:12px; }
        .error { background:rgba(255,69,0,.1); border:1px solid rgba(255,69,0,.3); border-radius:8px; padding:12px 16px; font-size:14px; color:var(--fire); margin-top:12px; }
        .file-chip { display:inline-flex; align-items:center; gap:8px; background:rgba(0,255,136,.08); border:1px solid rgba(0,255,136,.2); border-radius:8px; padding:10px 14px; margin-top:14px; font-family:'DM Mono',monospace; font-size:13px; color:var(--green); }
        /* LOADING */
        .loading { text-align:center; padding:64px 0; }
        .flicker { font-size:52px; display:inline-block; animation:flicker .8s infinite alternate; }
        @keyframes flicker { from{opacity:1;transform:scale(1)} to{opacity:.7;transform:scale(1.12) rotate(3deg)} }
        .loading-txt { font-family:'DM Mono',monospace; font-size:14px; color:rgba(245,240,235,.4); margin-top:18px; letter-spacing:.05em; }
        /* RESULTS */
        .score-wrap { display:flex; align-items:center; gap:36px; flex-wrap:wrap; }
        .score-ring { flex-shrink:0; width:120px; height:120px; border-radius:50%; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .score-ring svg { position:absolute; inset:0; width:100%; height:100%; transform:rotate(-90deg); }
        .score-ring circle { fill:none; stroke-width:6; }
        .ring-bg { stroke:var(--smoke); }
        .ring-fill { stroke:var(--fire); stroke-linecap:round; transition:stroke-dashoffset 1.5s ease; }
        .score-num { font-family:'Syne',sans-serif; font-size:36px; font-weight:800; position:relative; z-index:1; line-height:1; }
        .score-lbl { font-size:10px; color:rgba(245,240,235,.4); font-family:'DM Mono',monospace; letter-spacing:.1em; position:relative; z-index:1; }
        .score-text h2 { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; margin-bottom:8px; }
        .score-text p { color:rgba(245,240,235,.6); font-size:15px; line-height:1.65; }
        .cats { display:grid; grid-template-columns:repeat(auto-fit,minmax(185px,1fr)); gap:14px; margin-bottom:22px; }
        .cat-card { background:var(--ash); border:1px solid var(--smoke); border-radius:12px; padding:18px; }
        .cat-name { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:rgba(245,240,235,.35); margin-bottom:10px; }
        .cat-score { font-family:'Syne',sans-serif; font-size:30px; font-weight:800; margin-bottom:8px; }
        .cat-bar { height:4px; background:var(--smoke); border-radius:100px; overflow:hidden; }
        .cat-fill { height:100%; border-radius:100px; transition:width 1.2s ease; }
        .fb-card { background:var(--ash); border:1px solid var(--smoke); border-radius:14px; padding:26px; margin-bottom:14px; }
        .fb-card.critical { border-color:rgba(255,69,0,.3); }
        .fb-card.warning { border-color:rgba(255,140,0,.2); }
        .fb-card.good { border-color:rgba(0,255,136,.2); }
        .fb-type { display:inline-flex; align-items:center; gap:7px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.12em; text-transform:uppercase; padding:4px 11px; border-radius:100px; margin-bottom:12px; }
        .fb-card.critical .fb-type { background:rgba(255,69,0,.1); color:var(--fire); }
        .fb-card.warning .fb-type { background:rgba(255,140,0,.1); color:var(--fire2); }
        .fb-card.good .fb-type { background:rgba(0,255,136,.1); color:var(--green); }
        .fb-title { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; margin-bottom:8px; }
        .fb-text { color:rgba(245,240,235,.6); font-size:14px; line-height:1.7; }
        .sec-title { font-family:'Syne',sans-serif; font-size:19px; font-weight:800; margin-bottom:18px; }
        .action-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .action-item { display:flex; align-items:flex-start; gap:14px; padding:14px 16px; background:var(--smoke); border-radius:10px; }
        .action-num { font-family:'DM Mono',monospace; font-size:12px; color:var(--fire); font-weight:500; flex-shrink:0; width:22px; padding-top:2px; }
        .action-txt { font-size:14px; line-height:1.65; color:rgba(245,240,235,.72); }
        .upgrade-card { background:linear-gradient(135deg,rgba(255,69,0,.1),rgba(255,140,0,.05)); border:1px solid rgba(255,69,0,.25); border-radius:20px; padding:44px; text-align:center; margin-bottom:32px; position:relative; overflow:hidden; }
        .upgrade-card::before { content:''; position:absolute; top:0;left:0;right:0; height:1px; background:linear-gradient(90deg,transparent,var(--fire),transparent); }
        .upgrade-title { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; margin-bottom:10px; }
        .upgrade-sub { color:rgba(245,240,235,.5); font-size:15px; margin-bottom:26px; line-height:1.6; }
        .price { font-family:'Syne',sans-serif; font-size:52px; font-weight:800; background:linear-gradient(135deg,var(--fire),var(--gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .period { display:block; font-size:13px; color:rgba(245,240,235,.3); font-family:'DM Mono',monospace; margin-bottom:26px; }
        .features { display:flex; justify-content:center; gap:22px; flex-wrap:wrap; margin-bottom:26px; }
        .feat { font-size:13px; color:rgba(245,240,235,.6); display:flex; align-items:center; gap:6px; }
        .feat span { color:var(--green); }
        .reset-btn { background:transparent; border:1px solid var(--smoke); color:rgba(245,240,235,.45); padding:12px 28px; border-radius:100px; font-family:'DM Sans',sans-serif; font-size:14px; cursor:pointer; transition:all .2s; display:block; margin:0 auto 48px; }
        .reset-btn:hover { border-color:var(--fire); color:var(--fire); }
        footer { border-top:1px solid var(--smoke); padding:28px 0; text-align:center; color:rgba(245,240,235,.18); font-size:12px; font-family:'DM Mono',monospace; letter-spacing:.05em; }
        @media(max-width:600px){ .score-wrap{flex-direction:column;text-align:center;} .card{padding:26px 18px;} }
      `}</style>

      <div className="wrap">
        <header>
          <div className="badge">🔥 AI-Powered · Brutally Honest</div>
          <h1>Resume<br /><span className="fire-text">Roaster</span></h1>
          <p className="tagline">Your resume probably sucks. Let our AI tear it apart before hiring managers do.</p>
          <div className="stats">
            <div><div className="stat-num">94%</div><div className="stat-label">improved</div></div>
            <div><div className="stat-num">3.2x</div><div className="stat-label">more interviews</div></div>
            <div><div className="stat-num">12s</div><div className="stat-label">avg review time</div></div>
            <div><div className="stat-num">Free</div><div className="stat-label">3 reviews</div></div>
          </div>
        </header>

        {!results && !loading && (
          <div className="card">
            <div
              className={`upload-zone ${dragOver ? 'over' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
              onClick={() => fileRef.current.click()}
            >
              <span className="upload-icon">📄</span>
              <div className="upload-title">Drop your resume here</div>
              <div className="upload-sub">PDF, DOCX, TXT · Max 5MB</div>
              <button className="btn" onClick={e => { e.stopPropagation(); fileRef.current.click() }}>Choose File</button>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files[0])} />
            </div>
            {fileName && <div className="file-chip">✅ {fileName}</div>}

            <div className="divider">OR PASTE TEXT</div>
            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder={`John Doe · Software Engineer · john@email.com\n\nEXPERIENCE\nSenior Developer at TechCorp (2021–present)\n• Did stuff with React\n• Managed team...`}
            />

            <label className="label">TARGET JOB TITLE (optional but recommended)</label>
            <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Product Manager, Frontend Engineer..." />

            {error && <div className="error">⚠ {error}</div>}
            {usageCount > 0 && <div style={{ marginTop: 12, fontSize: 13, color: 'rgba(245,240,235,.35)', fontFamily: "'DM Mono',monospace" }}>
              Free reviews used: {usageCount}/3
            </div>}

            <button className="btn roast-btn" onClick={startRoast} disabled={!resumeText.trim()}>
              🔥 Roast My Resume
            </button>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="flicker">🔥</div>
            <div className="loading-txt">AI is tearing your resume apart...</div>
            <div className="loading-txt" style={{ marginTop: 8, fontSize: 12, opacity: .5 }}>Usually 10–20 seconds</div>
          </div>
        )}

        {results && !results.paywalled && (
          <>
            <ScoreCard data={results} />
            <div className="cats">
              {results.categories?.map((c, i) => <CategoryCard key={i} cat={c} />)}
            </div>
            <div>
              {results.feedback?.map((fb, i) => (
                <div key={i} className={`fb-card ${fb.type}`}>
                  <div className="fb-type">{fb.type === 'critical' ? '🔥' : fb.type === 'warning' ? '⚠️' : '✅'} {fb.type.toUpperCase()}</div>
                  <div className="fb-title">{fb.title}</div>
                  <div className="fb-text">{fb.text}</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ marginBottom: 22 }}>
              <div className="sec-title">🎯 Top Fixes Right Now</div>
              <ul className="action-list">
                {results.actions?.map((a, i) => (
                  <li key={i} className="action-item">
                    <div className="action-num">0{i + 1}</div>
                    <div className="action-txt">{a}</div>
                  </li>
                ))}
              </ul>
            </div>
            <UpgradeCard onUpgrade={handleUpgrade} />
            <button className="reset-btn" onClick={reset}>← Roast another resume</button>
          </>
        )}

        {results?.paywalled && (
          <>
            <div className="card" style={{ textAlign: 'center', padding: '52px 40px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔥</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>You've used all 3 free reviews</h2>
              <p style={{ color: 'rgba(245,240,235,.5)', fontSize: 15, marginBottom: 28 }}>
                Upgrade to get unlimited reviews, ATS scores, line-by-line edits, and cover letter generation.
              </p>
              <button className="btn" style={{ padding: '16px 40px', fontSize: 17 }} onClick={handleUpgrade}>Upgrade — $9.99/mo</button>
              <button className="reset-btn" style={{ marginTop: 14 }} onClick={reset}>Start over</button>
            </div>
          </>
        )}
      </div>
      <footer>Resume Roaster · AI-powered · Not responsible for existential crises</footer>
    </>
  )
}

function ScoreCard({ data }) {
  const score = data.score || 0
  const color = score >= 70 ? '#00ff88' : score >= 50 ? '#FF8C00' : '#FF4500'
  const circumference = 339.3
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="card" style={{ marginBottom: 22 }}>
      <div className="score-wrap">
        <div className="score-ring">
          <svg viewBox="0 0 120 120">
            <circle className="ring-bg" cx="60" cy="60" r="54" />
            <circle className="ring-fill" cx="60" cy="60" r="54"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ stroke: color }} />
          </svg>
          <div className="score-num" style={{ color }}>{score}</div>
          <div className="score-lbl">/ 100</div>
        </div>
        <div className="score-text">
          <h2>{data.verdict}</h2>
          <p>{data.summary}</p>
        </div>
      </div>
    </div>
  )
}

function CategoryCard({ cat }) {
  const color = cat.score >= 70 ? '#00ff88' : cat.score >= 50 ? '#FF8C00' : '#FF4500'
  return (
    <div className="cat-card">
      <div className="cat-name">{cat.name}</div>
      <div className="cat-score" style={{ color }}>{cat.score}</div>
      <div className="cat-bar">
        <div className="cat-fill" style={{ width: `${cat.score}%`, background: color }} />
      </div>
    </div>
  )
}

function UpgradeCard({ onUpgrade }) {
  return (
    <div className="upgrade-card">
      <div className="upgrade-title">Want the Full Roast?</div>
      <div className="upgrade-sub">Unlock unlimited reviews, ATS optimization, line-by-line edits & cover letter generator.</div>
      <div className="price">$9.99</div>
      <span className="period">per month · cancel anytime</span>
      <div className="features">
        {['ATS Score', 'Line-by-line edits', 'Cover letter gen', 'Unlimited reviews', 'Job match %'].map(f => (
          <div key={f} className="feat"><span>✓</span> {f}</div>
        ))}
      </div>
      <button className="btn" style={{ padding: '15px 44px', fontSize: 16 }} onClick={onUpgrade}>
        Upgrade — $9.99/mo
      </button>
    </div>
  )
}
