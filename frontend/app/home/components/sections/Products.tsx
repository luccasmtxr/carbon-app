"use client";

import Field from "../../components/Field";
import { UseFormReturn } from "react-hook-form";
import { FootprintForm } from "../../../schemas";

export default function ProductsSection({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field
        id="electrical"
        label="Electrical ($/month)"
        placeholder="e.g. 100"
        registerPath="products.electrical_usd_per_month"
        form={form}
      />
      <Field
        id="household"
        label="Household ($/month)"
        placeholder="e.g. 120"
        registerPath="products.household_usd_per_month"
        form={form}
      />
      <Field
        id="clothes"
        label="Clothes ($/month)"
        placeholder="e.g. 80"
        registerPath="products.clothes_usd_per_month"
        form={form}
      />
      <Field
        id="medical"
        label="Medical ($/month)"
        placeholder="e.g. 60"
        registerPath="products.medical_usd_per_month"
        form={form}
      />
      <Field
        id="recreational"
        label="Recreational ($/month)"
        placeholder="e.g. 70"
        registerPath="products.recreational_usd_per_month"
        form={form}
      />
      <Field
        id="other_prod"
        label="Other ($/month)"
        placeholder="e.g. 50"
        registerPath="products.other_usd_per_month"
        form={form}
      />
    </section>
  );
}
