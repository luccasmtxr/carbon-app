import express from 'express';
import housingRoutes from './routes/housing';
import travelRoutes from './routes/travel';

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

  app.use('/api/v1/housing', housingRoutes);
  app.use('/api/v1/travel', travelRoutes);

  return app;
}