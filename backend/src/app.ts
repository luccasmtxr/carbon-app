import express from 'express';

export function createApp() {
  const app = express();

  // enable json body parsing
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  // sample POST endpoint
  app.post('/echo', (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }
    res.status(201).json({ echoed: message });
  });

  return app;
}