import { housingEmissionFactors } from '../data/emissionFactors';

export interface HousingInput {
  electricity_kwh?: number;      // per year
  naturalGas_therms?: number;    // per year
  fuelOil_litres?: number;       // per year
  lpg_litres?: number;           // per year
  waste_kg_per_week?: number;    // per week
  water_litres_per_day?: number; // per day
}

export class HousingCalculator {
  constructor(
    private readonly factors = housingEmissionFactors // default: JSON from data
  ) {}

  calculate(input: HousingInput): number {
    let total = 0;

    if (input.electricity_kwh) {
      total += this.electricity(input.electricity_kwh);
    }

    if (input.naturalGas_therms) {
      total += this.naturalGas(input.naturalGas_therms);
    }

    if (input.fuelOil_litres) {
      total += this.fuelOil(input.fuelOil_litres);
    }

    if (input.lpg_litres) {
      total += this.lpg(input.lpg_litres);
    }

    if (input.waste_kg_per_week) {
      total += this.waste(input.waste_kg_per_week);
    }

    if (input.water_litres_per_day) {
      total += this.water(input.water_litres_per_day);
    }

    return total;
  }

  private electricity(kwhPerYear: number): number {
    return kwhPerYear * this.factors.electricity;
  }

  private naturalGas(thermsPerYear: number): number {
    return thermsPerYear * this.factors.naturalGas;
  }

  private fuelOil(litresPerYear: number): number {
    return litresPerYear * this.factors.fuelOil;
  }

  private lpg(litresPerYear: number): number {
    return litresPerYear * this.factors.lpg;
  }

  private waste(kgPerWeek: number): number {
    return kgPerWeek * 52 * this.factors.waste;
  }

  private water(litresPerDay: number): number {
    return litresPerDay * 365 * this.factors.water;
  }
}
