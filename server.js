const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/api/insights', async (req, res) => {
  console.log('📩 Request received!');
  try {
    const userMessage = req.body.messages[0].content;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 1000
      })
    });

    const data = await response.json();
    console.log('✅ Groq responded!');
    const text = data.choices?.[0]?.message?.content || "Could not get insights.";
    res.json({ content: [{ text }] });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));