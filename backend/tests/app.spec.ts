import request from 'supertest';
import { createApp } from '../src/app';

describe('App (e2e)', () => {
  const app = createApp();

  it('GET /health should return ok', async () => {
    const res = await request(app).get('/health').expect(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('POST /echo should echo message', async () => {
    const res = await request(app)
      .post('/echo')
      .send({ message: 'hello world' })
      .expect(201);

    expect(res.body).toEqual({ echoed: 'hello world' });
  });

  it('POST /echo without message should fail', async () => {
    const res = await request(app).post('/echo').send({}).expect(400);
    expect(res.body.error).toBe('message is required');
  });
});
