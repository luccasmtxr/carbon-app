"use client";

import Field from "../../components/Field";
import { UseFormReturn } from "react-hook-form";
import { FootprintForm } from "../../../schemas";

export default function HousingSection({
  form,
}: {
  form: UseFormReturn<FootprintForm>;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field
        id="elec"
        label="Electricity (kWh/yr)"
        placeholder="e.g. 4000"
        registerPath="housing.electricity_kwh"
        form={form}
      />
      <Field
        id="gas"
        label="Natural Gas (therms/yr)"
        placeholder="e.g. 200"
        registerPath="housing.naturalGas_therms"
        form={form}
      />
      <Field
        id="fo"
        label="Fuel Oil (litres/yr)"
        placeholder="e.g. 300"
        registerPath="housing.fuelOil_litres"
        form={form}
      />
      <Field
        id="lpg"
        label="LPG (litres/yr)"
        placeholder="e.g. 150"
        registerPath="housing.lpg_litres"
        form={form}
      />
      <Field
        id="waste"
        label="Waste (kg/week)"
        placeholder="e.g. 5"
        registerPath="housing.waste_kg_per_week"
        form={form}
      />
      <Field
        id="water"
        label="Water (litres/day)"
        placeholder="e.g. 120"
        registerPath="housing.water_litres_per_day"
        form={form}
      />
    </section>
  );
}
