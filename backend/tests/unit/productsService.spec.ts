import { ProductsCalculator } from '../../src/services/productsService';

describe('ProductsCalculator', () => {
  const calculator = new ProductsCalculator();

  it('calculates electrical spending emissions', () => {
    const result = calculator.calculate({ electrical_usd_per_month: 100 });
    // 100 * 12 * 0.6 = 720
    expect(result).toBeCloseTo(720);
  });

  it('calculates household spending emissions', () => {
    const result = calculator.calculate({ household_usd_per_month: 200 });
    // 200 * 12 * 0.4 = 960
    expect(result).toBeCloseTo(960);
  });

  it('calculates clothes spending emissions', () => {
    const result = calculator.calculate({ clothes_usd_per_month: 50 });
    // 50 * 12 * 0.8 = 480
    expect(result).toBeCloseTo(480);
  });

  it('calculates medical spending emissions', () => {
    const result = calculator.calculate({ medical_usd_per_month: 150 });
    // 150 * 12 * 0.5 = 900
    expect(result).toBeCloseTo(900);
  });

  it('calculates recreational spending emissions', () => {
    const result = calculator.calculate({ recreational_usd_per_month: 80 });
    // 80 * 12 * 0.7 = 672
    expect(result).toBeCloseTo(672);
  });

  it('calculates other spending emissions', () => {
    const result = calculator.calculate({ other_usd_per_month: 40 });
    // 40 * 12 * 0.3 = 144
    expect(result).toBeCloseTo(144);
  });

  it('calculates combined products footprint', () => {
    const input = {
      electrical_usd_per_month: 100,
      household_usd_per_month: 200,
      clothes_usd_per_month: 50,
      medical_usd_per_month: 150,
      recreational_usd_per_month: 80,
      other_usd_per_month: 40,
    };

    const result = calculator.calculate(input);

    const expected =
      100 * 12 * 0.6 +
      200 * 12 * 0.4 +
      50 * 12 * 0.8 +
      150 * 12 * 0.5 +
      80 * 12 * 0.7 +
      40 * 12 * 0.3;

    expect(result).toBeCloseTo(expected);
  });
});
