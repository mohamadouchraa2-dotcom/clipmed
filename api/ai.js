export default async function handler(req, res) {
  // السماح بطلبات POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = "AQ.Ab8RN6JMfpoOhcwyxbsPi5cQKn7CGBqum4ezFRVh8_lSgm3Bxg";

  try {
    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await apiResponse.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'Gemini API Error' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from AI';
    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server connection failed' });
  }
}
