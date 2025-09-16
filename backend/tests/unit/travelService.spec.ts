import { TravelCalculator } from '../../src/services/travelService';

describe('TravelCalculator', () => {
  const calculator = new TravelCalculator();

  it('calculates vehicle emissions', () => {
    const result = calculator.calculate({ vehicle_km: 1000 });
    expect(result).toBeCloseTo(192); // 1000 * 0.192
  });

  it('calculates bus emissions', () => {
    const result = calculator.calculate({ bus_km: 1000 });
    expect(result).toBeCloseTo(105); // 1000 * 0.105
  });

  it('calculates metro emissions', () => {
    const result = calculator.calculate({ metro_km: 1000 });
    expect(result).toBeCloseTo(60); // 1000 * 0.060
  });

  it('calculates taxi emissions', () => {
    const result = calculator.calculate({ taxi_km: 500 });
    expect(result).toBeCloseTo(100); // 500 * 0.200
  });

  it('calculates rail emissions', () => {
    const result = calculator.calculate({ rail_km: 1000 });
    expect(result).toBeCloseTo(41); // 1000 * 0.041
  });

  it('calculates flying emissions (with 1.09 multiplier)', () => {
    const result = calculator.calculate({ flying_km: 1000 });
    expect(result).toBeCloseTo(277.95); // 1000 * 1.09 * 0.255
  });

  it('calculates combined travel footprint', () => {
    const input = {
      vehicle_km: 1000,
      bus_km: 1000,
      metro_km: 1000,
      taxi_km: 500,
      rail_km: 1000,
      flying_km: 1000,
    };

    const result = calculator.calculate(input);

    const expected =
      192 + 105 + 60 + 100 + 41 + 277.95;

    expect(result).toBeCloseTo(expected);
  });
});
