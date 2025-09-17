import { travelEmissionFactors } from '../data/emissionFactors';

export interface TravelInput {
  vehicle_km?: number;
  bus_km?: number;
  metro_km?: number;
  taxi_km?: number;
  rail_km?: number;
  flying_km?: number;
}

export class TravelCalculator {
  constructor(private readonly factors = travelEmissionFactors) {}

  calculate(input: TravelInput): number {
    let total = 0;

    if (input.vehicle_km) total += this.vehicle(input.vehicle_km);
    if (input.bus_km) total += this.bus(input.bus_km);
    if (input.metro_km) total += this.metro(input.metro_km);
    if (input.taxi_km) total += this.taxi(input.taxi_km);
    if (input.rail_km) total += this.rail(input.rail_km);
    if (input.flying_km) total += this.flying(input.flying_km);

    return total;
  }

  private vehicle(km: number) {
    return km * this.factors.vehicle;
  }
  private bus(km: number) {
    return km * this.factors.bus;
  }
  private metro(km: number) {
    return km * this.factors.metro;
  }
  private taxi(km: number) {
    return km * this.factors.taxi;
  }
  private rail(km: number) {
    return km * this.factors.rail;
  }
  private flying(km: number) {
    // flying multiplier 1.09 to account for radiative forcing
    return km * 1.09 * this.factors.flying;
  }
}
