import { FootprintCalculator } from '../../src/services/footprintService';

describe('FootprintCalculator', () => {
  const calculator = new FootprintCalculator();

  it('calculates housing only', () => {
    const input = { housing: { electricity_kwh: 1000 } };
    const result = calculator.calculate(input);

    // 1000 * 0.417 = 417
    expect(result.breakdown.housing).toBeCloseTo(417);
    expect(result.total).toBeCloseTo(417);
  });

  it('calculates travel only', () => {
    const input = { travel: { vehicle_km: 1000, flying_km: 500 } };
    const result = calculator.calculate(input);

    // vehicle: 1000 * 0.192 = 192
    // flying: 500 * 1.09 * 0.255 = 138.975
    const expected = 192 + 138.975;

    expect(result.breakdown.travel).toBeCloseTo(expected);
    expect(result.total).toBeCloseTo(expected);
  });

  it('calculates food only', () => {
    const input = { food: { red_meat_kcal_per_day: 500 } };
    const result = calculator.calculate(input);

    // 500 * 365 * 0.00027 = 49.275
    expect(result.breakdown.food).toBeCloseTo(49.275, 3);
    expect(result.total).toBeCloseTo(49.275, 3);
  });

  it('calculates products only', () => {
    const input = { products: { clothes_usd_per_month: 100 } };
    const result = calculator.calculate(input);

    // 100 * 12 * 0.8 = 960
    expect(result.breakdown.products).toBeCloseTo(960);
    expect(result.total).toBeCloseTo(960);
  });

  it('calculates services only', () => {
    const input = { services: { health_usd_per_month: 200 } };
    const result = calculator.calculate(input);

    // 200 * 12 * 0.4 = 960
    expect(result.breakdown.services).toBeCloseTo(960);
    expect(result.total).toBeCloseTo(960);
  });

  it('calculates combined footprint (all categories)', () => {
    const input = {
      housing: { electricity_kwh: 1000 },
      travel: { vehicle_km: 1000 },
      food: { red_meat_kcal_per_day: 500 },
      products: { clothes_usd_per_month: 100 },
      services: { health_usd_per_month: 200 },
    };

    const result = calculator.calculate(input);

    const expectedHousing = 1000 * 0.417;
    const expectedTravel = 1000 * 0.192;
    const expectedFood = 500 * 365 * 0.00027;
    const expectedProducts = 100 * 12 * 0.8;
    const expectedServices = 200 * 12 * 0.4;

    const expectedTotal =
      expectedHousing + expectedTravel + expectedFood + expectedProducts + expectedServices;

    expect(result.breakdown.housing).toBeCloseTo(expectedHousing);
    expect(result.breakdown.travel).toBeCloseTo(expectedTravel);
    expect(result.breakdown.food).toBeCloseTo(expectedFood, 3);
    expect(result.breakdown.products).toBeCloseTo(expectedProducts);
    expect(result.breakdown.services).toBeCloseTo(expectedServices);
    expect(result.total).toBeCloseTo(expectedTotal);
  });
});
