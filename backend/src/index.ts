import express from 'express';

const app = express();

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 7007;
app.listen(PORT, () => {
  console.log(`🚀 server running at http://localhost:${PORT}`);
});