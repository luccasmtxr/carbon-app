import { HousingCalculator, HousingInput } from './housingService';
import { TravelCalculator, TravelInput } from './travelService';
import { FoodCalculator, FoodInput } from './foodService';
import { ProductsCalculator, ProductsInput } from './productsService';
import { ServicesCalculator, ServicesInput } from './servicesService';

export interface FootprintInput {
  housing?: HousingInput;
  travel?: TravelInput;
  food?: FoodInput;
  products?: ProductsInput;
  services?: ServicesInput;
}

export class FootprintCalculator {
  private housingCalc = new HousingCalculator();
  private travelCalc = new TravelCalculator();
  private foodCalc = new FoodCalculator();
  private productsCalc = new ProductsCalculator();
  private servicesCalc = new ServicesCalculator();

  calculate(input: FootprintInput) {
    let total = 0;
    const breakdown: Record<string, number> = {};

    if (input.housing) {
      breakdown.housing = this.housingCalc.calculate(input.housing);
      total += breakdown.housing;
    }
    if (input.travel) {
      breakdown.travel = this.travelCalc.calculate(input.travel);
      total += breakdown.travel;
    }
    if (input.food) {
      breakdown.food = this.foodCalc.calculate(input.food);
      total += breakdown.food;
    }
    if (input.products) {
      breakdown.products = this.productsCalc.calculate(input.products);
      total += breakdown.products;
    }
    if (input.services) {
      breakdown.services = this.servicesCalc.calculate(input.services);
      total += breakdown.services;
    }

    return { total, breakdown };
  }
}
