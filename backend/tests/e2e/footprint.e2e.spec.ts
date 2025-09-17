import request from 'supertest';
import { createApp } from '../../src/app';

describe('Footprint API (e2e)', () => {
  const app = createApp();

  it('calculates footprint with only housing', async () => {
    const res = await request(app)
      .post('/api/v1/footprint')
      .send({ housing: { electricity_kwh: 1000 } })
      .expect(200);

    expect(res.body.breakdown.housing).toBeCloseTo(417);
    expect(res.body.total).toBeCloseTo(417);
  });

  it('calculates footprint with multiple categories', async () => {
    const input = {
      housing: { electricity_kwh: 1000 },
      travel: { vehicle_km: 1000 },
      food: { red_meat_kcal_per_day: 500 },
      products: { clothes_usd_per_month: 100 },
      services: { health_usd_per_month: 200 }
    };

    const res = await request(app)
      .post('/api/v1/footprint')
      .send(input)
      .expect(200);

    const expectedHousing = 1000 * 0.417;
    const expectedTravel = 1000 * 0.192;
    const expectedFood = 500 * 365 * 0.00027;
    const expectedProducts = 100 * 12 * 0.8;
    const expectedServices = 200 * 12 * 0.4;

    const expectedTotal =
      expectedHousing +
      expectedTravel +
      expectedFood +
      expectedProducts +
      expectedServices;

    expect(res.body.breakdown.housing).toBeCloseTo(expectedHousing);
    expect(res.body.breakdown.travel).toBeCloseTo(expectedTravel);
    expect(res.body.breakdown.food).toBeCloseTo(expectedFood, 3);
    expect(res.body.breakdown.products).toBeCloseTo(expectedProducts);
    expect(res.body.breakdown.services).toBeCloseTo(expectedServices);
    expect(res.body.total).toBeCloseTo(expectedTotal);
  });

  it('returns 400 for invalid input', async () => {
    const res = await request(app)
      .post('/api/v1/footprint')
      .send("invalid-data")
      .expect(400);

    expect(res.body.error).toBeDefined();
  });
});
