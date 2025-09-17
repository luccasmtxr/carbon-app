import { HousingCalculator } from '../../src/services/housingService';

describe('HousingCalculator', () => {
  const calculator = new HousingCalculator();

  it('calculates electricity emissions', () => {
    const result = calculator.calculate({ electricity_kwh: 1000 });
    expect(result).toBeCloseTo(417); // 1000 * 0.417
  });

  it('calculates natural gas emissions', () => {
    const result = calculator.calculate({ naturalGas_therms: 10 });
    expect(result).toBeCloseTo(53); // 10 * 5.3
  });

  it('calculates fuel oil emissions', () => {
    const result = calculator.calculate({ fuelOil_litres: 100 });
    expect(result).toBeCloseTo(252); // 100 * 2.52
  });

  it('calculates lpg emissions', () => {
    const result = calculator.calculate({ lpg_litres: 50 });
    expect(result).toBeCloseTo(75.5); // 50 * 1.51
  });

  it('calculates waste emissions (annualized from weekly)', () => {
    const result = calculator.calculate({ waste_kg_per_week: 5 });
    expect(result).toBeCloseTo(5 * 52 * 1.8); // ~468
  });

  it('calculates water emissions (annualized from daily)', () => {
    const result = calculator.calculate({ water_litres_per_day: 100 });
    expect(result).toBeCloseTo(100 * 365 * 0.0015); // ~54.75
  });

  it('calculates combined housing footprint', () => {
    const input = {
      electricity_kwh: 1000,
      naturalGas_therms: 10,
      fuelOil_litres: 100,
      lpg_litres: 50,
      waste_kg_per_week: 5,
      water_litres_per_day: 100,
    };

    const result = calculator.calculate(input);

    // expected total = sum of all above
    const expected = 417 + 53 + 252 + 75.5 + 5 * 52 * 1.8 + 100 * 365 * 0.0015;

    expect(result).toBeCloseTo(expected);
  });
});
