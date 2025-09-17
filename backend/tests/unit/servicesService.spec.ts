import { ServicesCalculator } from '../../src/services/servicesService';

describe('ServicesCalculator', () => {
  const calculator = new ServicesCalculator();

  it('calculates health services emissions', () => {
    const result = calculator.calculate({ health_usd_per_month: 200 });
    // 200 * 12 * 0.4 = 960
    expect(result).toBeCloseTo(960);
  });

  it('calculates finance services emissions', () => {
    const result = calculator.calculate({ finance_usd_per_month: 100 });
    // 100 * 12 * 0.3 = 360
    expect(result).toBeCloseTo(360);
  });

  it('calculates recreation services emissions', () => {
    const result = calculator.calculate({ recreation_usd_per_month: 150 });
    // 150 * 12 * 0.6 = 1080
    expect(result).toBeCloseTo(1080);
  });

  it('calculates education services emissions', () => {
    const result = calculator.calculate({ education_usd_per_month: 250 });
    // 250 * 12 * 0.2 = 600
    expect(result).toBeCloseTo(600);
  });

  it('calculates vehicle services emissions', () => {
    const result = calculator.calculate({ vehicle_usd_per_month: 300 });
    // 300 * 12 * 0.5 = 1800
    expect(result).toBeCloseTo(1800);
  });

  it('calculates communications services emissions', () => {
    const result = calculator.calculate({ communications_usd_per_month: 80 });
    // 80 * 12 * 0.25 = 240
    expect(result).toBeCloseTo(240);
  });

  it('calculates other services emissions', () => {
    const result = calculator.calculate({ other_usd_per_month: 50 });
    // 50 * 12 * 0.3 = 180
    expect(result).toBeCloseTo(180);
  });

  it('calculates combined services footprint', () => {
    const input = {
      health_usd_per_month: 200,
      finance_usd_per_month: 100,
      recreation_usd_per_month: 150,
      education_usd_per_month: 250,
      vehicle_usd_per_month: 300,
      communications_usd_per_month: 80,
      other_usd_per_month: 50,
    };

    const result = calculator.calculate(input);

    const expected =
      200 * 12 * 0.4 +
      100 * 12 * 0.3 +
      150 * 12 * 0.6 +
      250 * 12 * 0.2 +
      300 * 12 * 0.5 +
      80 * 12 * 0.25 +
      50 * 12 * 0.3;

    expect(result).toBeCloseTo(expected);
  });
});
