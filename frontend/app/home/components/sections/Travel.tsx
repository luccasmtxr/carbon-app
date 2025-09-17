"use client";

import Field from "../../components/Field";
import { UseFormReturn } from "react-hook-form";
import { FootprintForm } from "../../../schemas";

export default function TravelSection({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field
        id="veh"
        label="Vehicle (km/yr)"
        placeholder="e.g. 12000"
        registerPath="travel.vehicle_km"
        form={form}
      />
      <Field
        id="bus"
        label="Bus (km/yr)"
        placeholder="e.g. 2000"
        registerPath="travel.bus_km"
        form={form}
      />
      <Field
        id="metro"
        label="Metro (km/yr)"
        placeholder="e.g. 800"
        registerPath="travel.metro_km"
        form={form}
      />
      <Field
        id="taxi"
        label="Taxi (km/yr)"
        placeholder="e.g. 300"
        registerPath="travel.taxi_km"
        form={form}
      />
      <Field
        id="rail"
        label="Rail (km/yr)"
        placeholder="e.g. 1500"
        registerPath="travel.rail_km"
        form={form}
      />
      <Field
        id="fly"
        label="Flying (km/yr)"
        placeholder="e.g. 2500"
        registerPath="travel.flying_km"
        form={form}
      />
    </section>
  );
}
