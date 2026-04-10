require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

app.post("/api/generate-news", async (req, res) => {
  console.log("\n⭐⭐⭐ API ENDPOINT HIT ⭐⭐⭐");
  console.log("Body:", JSON.stringify(req.body).substring(0, 100));
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GROQ_API_KEY environment variable." });
  }

  try {
    const prompt = req.body.prompt;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
        temperature: 1.5,
        top_p: 0.95,
        n: 1
      })
    });
    console.log("📡 Fetch completed, status:", response.status);

    const data = await response.json();
    console.log("🔥 Status:", response.status, "Response:", JSON.stringify(data).substring(0, 200));
    if (!response.ok) {
      console.log("❌ Groq error:", data);
      return res.status(response.status).json({ error: data });
    }

    res.json({ text: data.choices?.[0]?.message?.content ?? "" });
  } catch (error) {
    console.error("❌ FETCH ERROR:", error.message);
    res.status(500).json({ error: error.message || "AI request failed" });
  }
});

app.use(express.static(path.join(__dirname, "../Frontend")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});

// Error handling middleware (must have 4 params)
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.message);
  res.status(err.status || 400).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});