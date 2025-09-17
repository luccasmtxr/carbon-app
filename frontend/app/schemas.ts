import { z } from "zod";

export const optionalNumber = z.preprocess((v) => {
  if (v === "" || v === null || typeof v === "undefined") return undefined;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
}, z.number().nonnegative().optional());

export const housingSchema = z.object({
  electricity_kwh: optionalNumber,
  naturalGas_therms: optionalNumber,
  fuelOil_litres: optionalNumber,
  lpg_litres: optionalNumber,
  waste_kg_per_week: optionalNumber,
  water_litres_per_day: optionalNumber,
});

export const travelSchema = z.object({
  vehicle_km: optionalNumber,
  bus_km: optionalNumber,
  metro_km: optionalNumber,
  taxi_km: optionalNumber,
  rail_km: optionalNumber,
  flying_km: optionalNumber,
});

export const foodSchema = z.object({
  red_meat_kcal_per_day: optionalNumber,
  white_meat_kcal_per_day: optionalNumber,
  dairy_kcal_per_day: optionalNumber,
  cereals_kcal_per_day: optionalNumber,
  vegetables_kcal_per_day: optionalNumber,
  fruit_kcal_per_day: optionalNumber,
  oils_kcal_per_day: optionalNumber,
  snacks_kcal_per_day: optionalNumber,
  drinks_kcal_per_day: optionalNumber,
});

export const productsSchema = z.object({
  electrical_usd_per_month: optionalNumber,
  household_usd_per_month: optionalNumber,
  clothes_usd_per_month: optionalNumber,
  medical_usd_per_month: optionalNumber,
  recreational_usd_per_month: optionalNumber,
  other_usd_per_month: optionalNumber,
});

export const servicesSchema = z.object({
  health_usd_per_month: optionalNumber,
  finance_usd_per_month: optionalNumber,
  recreation_usd_per_month: optionalNumber,
  education_usd_per_month: optionalNumber,
  vehicle_usd_per_month: optionalNumber,
  communications_usd_per_month: optionalNumber,
  other_usd_per_month: optionalNumber,
});

export const footprintSchema = z.object({
  housing: housingSchema.optional(),
  travel: travelSchema.optional(),
  food: foodSchema.optional(),
  products: productsSchema.optional(),
  services: servicesSchema.optional(),
});

export type FootprintForm = z.infer<typeof footprintSchema>;
