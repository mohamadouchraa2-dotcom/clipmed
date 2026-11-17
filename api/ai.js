// Vercel Serverless Function: POST /api/ai  { prompt } -> { reply }
// Model list can be changed in Vercel > Settings > Environment Variables (GEMINI_MODEL, comma-separated)
const MODELS = (process.env.GEMINI_MODEL || 'gemini-3.8-flash,gemini-2.5-flash')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const prompt = body && typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });
  if (prompt.length > 2000) return res.status(413).json({ error: 'Prompt is too long' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key is missing' });

  let lastError = 'Gemini API error';
  for (const model of MODELS) {
    try {
      const apiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await apiResponse.json();

      if (data.error) {
        lastError = `${model}: ${data.error.message || 'Gemini API error'}`;
        if (apiResponse.status === 404) continue; // model not available -> try the next one
        return res.status(502).json({ error: lastError });
      }

      const parts = data.candidates?.[0]?.content?.parts || [];
      const reply = parts.map((p) => p.text || '').join('').trim();
      if (!reply) return res.status(502).json({ error: 'Empty response from AI' });
      return res.status(200).json({ reply });
    } catch (error) {
      lastError = error.message || 'Server connection failed';
    }
  }
  return res.status(502).json({ error: lastError });
}
