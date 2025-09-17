import { FoodCalculator } from '../../src/services/foodService';

describe('FoodCalculator', () => {
  const calculator = new FoodCalculator();

  it('calculates red meat emissions', () => {
    const result = calculator.calculate({ red_meat_kcal_per_day: 500 });
    // 500 * 365 * 0.00027 = 49.275
    expect(result).toBeCloseTo(49.28, 1);
  });

  it('calculates white meat emissions', () => {
    const result = calculator.calculate({ white_meat_kcal_per_day: 300 });
    // 300 * 365 * 0.00015 = 16.425
    expect(result).toBeCloseTo(16.43, 1);
  });

  it('calculates dairy emissions', () => {
    const result = calculator.calculate({ dairy_kcal_per_day: 200 });
    // 200 * 365 * 0.00012 = 8.76
    expect(result).toBeCloseTo(8.76, 1);
  });

  it('calculates cereals emissions', () => {
    const result = calculator.calculate({ cereals_kcal_per_day: 400 });
    // 400 * 365 * 0.00005 = 7.3
    expect(result).toBeCloseTo(7.3, 1);
  });

  it('calculates vegetables emissions', () => {
    const result = calculator.calculate({ vegetables_kcal_per_day: 400 });
    // 400 * 365 * 0.00002 = 2.92
    expect(result).toBeCloseTo(2.92, 1);
  });

  it('calculates fruit emissions', () => {
    const result = calculator.calculate({ fruit_kcal_per_day: 250 });
    // 250 * 365 * 0.00003 = 2.7375
    expect(result).toBeCloseTo(2.74, 1);
  });

  it('calculates oils emissions', () => {
    const result = calculator.calculate({ oils_kcal_per_day: 100 });
    // 100 * 365 * 0.00010 = 3.65
    expect(result).toBeCloseTo(3.65, 1);
  });

  it('calculates snacks emissions', () => {
    const result = calculator.calculate({ snacks_kcal_per_day: 150 });
    // 150 * 365 * 0.00020 = 10.95
    expect(result).toBeCloseTo(10.95, 1);
  });

  it('calculates drinks emissions', () => {
    const result = calculator.calculate({ drinks_kcal_per_day: 200 });
    // 200 * 365 * 0.00008 = 5.84
    expect(result).toBeCloseTo(5.84, 1);
  });

  it('calculates combined food footprint', () => {
    const input = {
      red_meat_kcal_per_day: 500,
      white_meat_kcal_per_day: 300,
      dairy_kcal_per_day: 200,
      cereals_kcal_per_day: 400,
      vegetables_kcal_per_day: 400,
      fruit_kcal_per_day: 250,
      oils_kcal_per_day: 100,
      snacks_kcal_per_day: 150,
      drinks_kcal_per_day: 200,
    };

    const result = calculator.calculate(input);

    const expected =
      500 * 365 * 0.00027 +
      300 * 365 * 0.00015 +
      200 * 365 * 0.00012 +
      400 * 365 * 0.00005 +
      400 * 365 * 0.00002 +
      250 * 365 * 0.00003 +
      100 * 365 * 0.00010 +
      150 * 365 * 0.00020 +
      200 * 365 * 0.00008;

    expect(result).toBeCloseTo(expected, 2);
  });
});
