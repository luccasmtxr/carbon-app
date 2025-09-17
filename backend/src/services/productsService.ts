import { productsEmissionFactors } from '../data/emissionFactors';

export interface ProductsInput {
  electrical_usd_per_month?: number;
  household_usd_per_month?: number;
  clothes_usd_per_month?: number;
  medical_usd_per_month?: number;
  recreational_usd_per_month?: number;
  other_usd_per_month?: number;
}

export class ProductsCalculator {
  constructor(
    private readonly factors = productsEmissionFactors
  ) {}

  calculate(input: ProductsInput): number {
    let total = 0;

    if (input.electrical_usd_per_month) {
      total += this.electrical(input.electrical_usd_per_month);
    }
    if (input.household_usd_per_month) {
      total += this.household(input.household_usd_per_month);
    }
    if (input.clothes_usd_per_month) {
      total += this.clothes(input.clothes_usd_per_month);
    }
    if (input.medical_usd_per_month) {
      total += this.medical(input.medical_usd_per_month);
    }
    if (input.recreational_usd_per_month) {
      total += this.recreational(input.recreational_usd_per_month);
    }
    if (input.other_usd_per_month) {
      total += this.other(input.other_usd_per_month);
    }

    return total;
  }

  private electrical(usdPerMonth: number) {
    return usdPerMonth * 12 * this.factors.electrical;
  }
  private household(usdPerMonth: number) {
    return usdPerMonth * 12 * this.factors.household;
  }
  private clothes(usdPerMonth: number) {
    return usdPerMonth * 12 * this.factors.clothes;
  }
  private medical(usdPerMonth: number) {
    return usdPerMonth * 12 * this.factors.medical;
  }
  private recreational(usdPerMonth: number) {
    return usdPerMonth * 12 * this.factors.recreational;
  }
  private other(usdPerMonth: number) {
    return usdPerMonth * 12 * this.factors.other;
  }
}
