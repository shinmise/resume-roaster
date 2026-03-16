import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { resume, jobTitle } = req.body
  if (!resume) return res.status(400).json({ error: 'No resume provided' })

  const prompt = `You are Resume Roaster — a brutally honest, world-class resume expert. Analyze this resume and return ONLY valid JSON (no markdown, no backticks, no explanation).

Resume:
"""
${resume.substring(0, 4000)}
"""
${jobTitle ? `\nTarget Job: ${jobTitle}` : ''}

Return this exact JSON:
{
  "score": <integer 0-100>,
  "verdict": "<3-6 word honest verdict>",
  "summary": "<2-3 sentence direct, honest assessment>",
  "categories": [
    {"name": "Impact & Metrics", "score": <0-100>},
    {"name": "Clarity & Format", "score": <0-100>},
    {"name": "Keywords & ATS", "score": <0-100>},
    {"name": "Experience Depth", "score": <0-100>}
  ],
  "feedback": [
    {"type": "critical", "title": "<issue>", "text": "<2-3 sentence explanation>"},
    {"type": "critical", "title": "<issue>", "text": "<2-3 sentence explanation>"},
    {"type": "warning", "title": "<issue>", "text": "<explanation>"},
    {"type": "good", "title": "<strength>", "text": "<what works>"}
  ],
  "actions": [
    "<specific fix 1>",
    "<specific fix 2>",
    "<specific fix 3>",
    "<specific fix 4>",
    "<specific fix 5>"
  ]
}`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    const data = JSON.parse(clean)
    return res.status(200).json(data)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Failed to analyze resume' })
  }
}
