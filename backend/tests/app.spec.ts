import request from 'supertest';
import express from 'express';

describe('health endpoint', () => {
  it('returns ok', async () => {
    const app = express();
    app.get('/health', (_req, res) => res.json({ ok: true }));

    const res = await request(app).get('/health').expect(200);
    expect(res.body).toEqual({ ok: true });
  });
});