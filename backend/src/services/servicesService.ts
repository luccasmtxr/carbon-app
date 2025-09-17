import { servicesEmissionFactors } from '../data/emissionFactors';

export interface ServicesInput {
  health_usd_per_month?: number;
  finance_usd_per_month?: number;
  recreation_usd_per_month?: number;
  education_usd_per_month?: number;
  vehicle_usd_per_month?: number;
  communications_usd_per_month?: number;
  other_usd_per_month?: number;
}

export class ServicesCalculator {
  constructor(
    private readonly factors = servicesEmissionFactors
  ) {}

  calculate(input: ServicesInput): number {
    let total = 0;

    if (input.health_usd_per_month) {
      total += this.health(input.health_usd_per_month);
    }
    if (input.finance_usd_per_month) {
      total += this.finance(input.finance_usd_per_month);
    }
    if (input.recreation_usd_per_month) {
      total += this.recreation(input.recreation_usd_per_month);
    }
    if (input.education_usd_per_month) {
      total += this.education(input.education_usd_per_month);
    }
    if (input.vehicle_usd_per_month) {
      total += this.vehicle(input.vehicle_usd_per_month);
    }
    if (input.communications_usd_per_month) {
      total += this.communications(input.communications_usd_per_month);
    }
    if (input.other_usd_per_month) {
      total += this.other(input.other_usd_per_month);
    }

    return total;
  }

  private health(usd: number) {
    return usd * 12 * this.factors.health;
  }
  private finance(usd: number) {
    return usd * 12 * this.factors.finance;
  }
  private recreation(usd: number) {
    return usd * 12 * this.factors.recreation;
  }
  private education(usd: number) {
    return usd * 12 * this.factors.education;
  }
  private vehicle(usd: number) {
    return usd * 12 * this.factors.vehicle;
  }
  private communications(usd: number) {
    return usd * 12 * this.factors.communications;
  }
  private other(usd: number) {
    return usd * 12 * this.factors.other;
  }
}
