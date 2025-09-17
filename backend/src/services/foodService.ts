import { foodEmissionFactors } from '../data/emissionFactors';

export interface FoodInput {
  red_meat_kcal_per_day?: number;
  white_meat_kcal_per_day?: number;
  dairy_kcal_per_day?: number;
  cereals_kcal_per_day?: number;
  vegetables_kcal_per_day?: number;
  fruit_kcal_per_day?: number;
  oils_kcal_per_day?: number;
  snacks_kcal_per_day?: number;
  drinks_kcal_per_day?: number;
}

export class FoodCalculator {
  constructor(private readonly factors = foodEmissionFactors) {}

  calculate(input: FoodInput): number {
    let total = 0;

    if (input.red_meat_kcal_per_day) {
      total += this.redMeat(input.red_meat_kcal_per_day);
    }
    if (input.white_meat_kcal_per_day) {
      total += this.whiteMeat(input.white_meat_kcal_per_day);
    }
    if (input.dairy_kcal_per_day) {
      total += this.dairy(input.dairy_kcal_per_day);
    }
    if (input.cereals_kcal_per_day) {
      total += this.cereals(input.cereals_kcal_per_day);
    }
    if (input.vegetables_kcal_per_day) {
      total += this.vegetables(input.vegetables_kcal_per_day);
    }
    if (input.fruit_kcal_per_day) {
      total += this.fruit(input.fruit_kcal_per_day);
    }
    if (input.oils_kcal_per_day) {
      total += this.oils(input.oils_kcal_per_day);
    }
    if (input.snacks_kcal_per_day) {
      total += this.snacks(input.snacks_kcal_per_day);
    }
    if (input.drinks_kcal_per_day) {
      total += this.drinks(input.drinks_kcal_per_day);
    }

    return total;
  }

  private redMeat(kcal: number) {
    return kcal * 365 * this.factors.red_meat;
  }
  private whiteMeat(kcal: number) {
    return kcal * 365 * this.factors.white_meat;
  }
  private dairy(kcal: number) {
    return kcal * 365 * this.factors.dairy;
  }
  private cereals(kcal: number) {
    return kcal * 365 * this.factors.cereals;
  }
  private vegetables(kcal: number) {
    return kcal * 365 * this.factors.vegetables;
  }
  private fruit(kcal: number) {
    return kcal * 365 * this.factors.fruit;
  }
  private oils(kcal: number) {
    return kcal * 365 * this.factors.oils;
  }
  private snacks(kcal: number) {
    return kcal * 365 * this.factors.snacks;
  }
  private drinks(kcal: number) {
    return kcal * 365 * this.factors.drinks;
  }
}
