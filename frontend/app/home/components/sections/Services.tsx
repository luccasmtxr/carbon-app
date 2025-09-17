"use client";

import Field from "../../components/Field";
import { UseFormReturn } from "react-hook-form";
import { FootprintForm } from "../../../schemas";

export default function ServicesSection({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field
        id="health"
        label="Health ($/month)"
        placeholder="e.g. 120"
        registerPath="services.health_usd_per_month"
        form={form}
      />
      <Field
        id="finance"
        label="Finance ($/month)"
        placeholder="e.g. 40"
        registerPath="services.finance_usd_per_month"
        form={form}
      />
      <Field
        id="recreation_srv"
        label="Recreation ($/month)"
        placeholder="e.g. 90"
        registerPath="services.recreation_usd_per_month"
        form={form}
      />
      <Field
        id="education"
        label="Education ($/month)"
        placeholder="e.g. 100"
        registerPath="services.education_usd_per_month"
        form={form}
      />
      <Field
        id="vehicle_srv"
        label="Vehicle ($/month)"
        placeholder="e.g. 150"
        registerPath="services.vehicle_usd_per_month"
        form={form}
      />
      <Field
        id="comms"
        label="Communications ($/month)"
        placeholder="e.g. 60"
        registerPath="services.communications_usd_per_month"
        form={form}
      />
      <Field
        id="other_srv"
        label="Other ($/month)"
        placeholder="e.g. 50"
        registerPath="services.other_usd_per_month"
        form={form}
      />
    </section>
  );
}
