require("dotenv").config();

const express = require("express");
const path = requir.message?.content ?? "" });
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
