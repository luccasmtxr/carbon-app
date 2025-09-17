"use client";

import { useEffect, useMemo, useState } from "react";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { footprintSchema, type FootprintForm } from "./schemas";
import { useActionState } from "react";
import { submitFootprint, type FootprintActionState } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Home, Car, Utensils, Package, Cog, CheckCircle2 } from "lucide-react";

const STEPS = ["Housing", "Travel", "Food", "Products", "Services"] as const;
type Step = (typeof STEPS)[number];

const initialActionState: FootprintActionState = { result: null };

export default function HomePage() {
  const [step, setStep] = useState<Step>("Housing");

  const form = useForm<FootprintForm>({
    resolver: zodResolver(footprintSchema) as Resolver<FootprintForm>,
    defaultValues: { housing: {}, travel: {}, food: {}, products: {}, services: {} },
    mode: "onChange",
  });

  const watched = useWatch({ control: form.control }); // 👈 tracks all form values
  const [serverState, formAction, pending] = useActionState(submitFootprint, initialActionState);

  // build payload safely from current form values
  const payload = useMemo(() => {
    const v = watched as FootprintForm;
    const clean = (obj: Record<string, any> | undefined) => {
      if (!obj) return undefined;
      const out: Record<string, any> = {};
      for (const [k, val] of Object.entries(obj)) {
        if (val !== undefined && val !== null && val !== "" && !Number.isNaN(val)) out[k] = Number(val);
      }
      return Object.keys(out).length ? out : undefined;
    };
    return JSON.stringify({
      housing: clean(v.housing as any),
      travel: clean(v.travel as any),
      food: clean(v.food as any),
      products: clean(v.products as any),
      services: clean(v.services as any),
    });
  }, [watched]);

  // 🔁 auto-calc after each change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const fd = new FormData();
      fd.append("payload", payload);
      formAction(fd);
    }, 400); // debounce 400ms
    return () => clearTimeout(timer);
  }, [payload, formAction]);

  // step click handler (no Back/Next buttons)
  const stepIndex = STEPS.indexOf(step);
  const goTo = async (target: Step) => {
    // optional: validate current step's fields before leaving
    const fieldsByStep: Record<Step, string[]> = {
      Housing: [
        "housing.electricity_kwh", "housing.naturalGas_therms",
        "housing.fuelOil_litres", "housing.lpg_litres",
        "housing.waste_kg_per_week", "housing.water_litres_per_day",
      ],
      Travel: [
        "travel.vehicle_km", "travel.bus_km", "travel.metro_km",
        "travel.taxi_km", "travel.rail_km", "travel.flying_km",
      ],
      Food: [
        "food.red_meat_kcal_per_day", "food.white_meat_kcal_per_day",
        "food.dairy_kcal_per_day", "food.cereals_kcal_per_day",
        "food.vegetables_kcal_per_day", "food.fruit_kcal_per_day",
        "food.oils_kcal_per_day", "food.snacks_kcal_per_day",
        "food.drinks_kcal_per_day",
      ],
      Products: [
        "products.electrical_usd_per_month", "products.household_usd_per_month",
        "products.clothes_usd_per_month", "products.medical_usd_per_month",
        "products.recreational_usd_per_month", "products.other_usd_per_month",
      ],
      Services: [
        "services.health_usd_per_month", "services.finance_usd_per_month",
        "services.recreation_usd_per_month", "services.education_usd_per_month",
        "services.vehicle_usd_per_month", "services.communications_usd_per_month",
        "services.other_usd_per_month",
      ],
    };
    const ok = await form.trigger(fieldsByStep[STEPS[stepIndex]] as any);
    if (!ok) return;
    setStep(target);
  };

  return (
<main className="flex min-h-screen flex-col items-center p-6 md:p-10">
  <div className="w-full max-w-5xl space-y-6">
    {/* Stepper */}
    <div className="w-full">
      <ol className="flex items-center w-full gap-4 overflow-x-auto">
        {STEPS.map((s) => {
          const Icon = iconForStep(s);
          const isActive = step === s;

          return (
            <li key={s} className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => goTo(s)}
                className={`
                  flex flex-col items-center gap-2 rounded-lg px-4 py-3 shadow-sm transition
                  ${isActive ? "bg-black text-white" : "bg-muted text-foreground/70"}
                  hover:-translate-y-1 hover:shadow-md
                `}
              >
                <div
                  className={`
                    flex items-center justify-center h-14 w-14 rounded-full border-2
                    ${isActive ? "bg-white text-black border-black" : "border-muted-foreground"}
                  `}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold">{s}</span>
              </button>
              {s !== STEPS[STEPS.length - 1] && <Separator className="flex-1" />}
            </li>
          );
        })}
      </ol>
    </div>

    {/* Content + Results aligned */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form card */}
      <Card className="w-full">
        <CardContent className="p-6">
          <form className="space-y-6">
            {step === "Housing" && <SectionHousing form={form} />}
            {step === "Travel" && <SectionTravel form={form} />}
            {step === "Food" && <SectionFood form={form} />}
            {step === "Products" && <SectionProducts form={form} />}
            {step === "Services" && <SectionServices form={form} />}
          </form>
        </CardContent>
      </Card>

      {/* Results card */}
      <Card className="w-full">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your carbon footprint</h3>
          <SectionResults serverState={serverState} pending={pending} />
        </CardContent>
      </Card>
    </div>
  </div>
</main>


  );
}

/* -------------------- Icons -------------------- */
function iconForStep(step: Step) {
  switch (step) {
    case "Housing": return Home;
    case "Travel": return Car;
    case "Food": return Utensils;
    case "Products": return Package;
    case "Services": return Cog;
  }
}

/* -------------------- Field -------------------- */
import type { UseFormReturn } from "react-hook-form";
function Field({
  id, label, placeholder, registerPath, form,
}: {
  id: string;
  label: string;
  placeholder: string;
  registerPath: any; // keeping your any to avoid typing churn
  form: UseFormReturn<FootprintForm>;
}) {
  const { register, formState: { errors } } = form;
  const [root, key] = (registerPath as string).split(".");
  const err = (errors as any)?.[root]?.[key];

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="flex items-center gap-2">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        step="any"
        placeholder={placeholder}
        {...register(registerPath as any, { valueAsNumber: true })}
      />
      {err && <p className="text-sm text-red-600">{(err as any).message as string}</p>}
    </div>
  );
}

/* -------------------- Sections -------------------- */
function SectionHousing({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field id="elec" label="Electricity (kWh/yr)" placeholder="e.g. 4000" registerPath="housing.electricity_kwh" form={form} />
      <Field id="gas" label="Natural Gas (therms/yr)" placeholder="e.g. 200" registerPath="housing.naturalGas_therms" form={form} />
      <Field id="fo" label="Fuel Oil (litres/yr)" placeholder="e.g. 300" registerPath="housing.fuelOil_litres" form={form} />
      <Field id="lpg" label="LPG (litres/yr)" placeholder="e.g. 150" registerPath="housing.lpg_litres" form={form} />
      <Field id="waste" label="Waste (kg/week)" placeholder="e.g. 5" registerPath="housing.waste_kg_per_week" form={form} />
      <Field id="water" label="Water (litres/day)" placeholder="e.g. 120" registerPath="housing.water_litres_per_day" form={form} />
    </section>
  );
}

function SectionTravel({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field id="veh" label="Vehicle (km/yr)" placeholder="e.g. 12000" registerPath="travel.vehicle_km" form={form} />
      <Field id="bus" label="Bus (km/yr)" placeholder="e.g. 2000" registerPath="travel.bus_km" form={form} />
      <Field id="metro" label="Metro (km/yr)" placeholder="e.g. 800" registerPath="travel.metro_km" form={form} />
      <Field id="taxi" label="Taxi (km/yr)" placeholder="e.g. 300" registerPath="travel.taxi_km" form={form} />
      <Field id="rail" label="Rail (km/yr)" placeholder="e.g. 1500" registerPath="travel.rail_km" form={form} />
      <Field id="fly" label="Flying (km/yr)" placeholder="e.g. 2500" registerPath="travel.flying_km" form={form} />
    </section>
  );
}

function SectionFood({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field id="red" label="Red meat (kCal/day)" placeholder="e.g. 400" registerPath="food.red_meat_kcal_per_day" form={form} />
      <Field id="white" label="White meat (kCal/day)" placeholder="e.g. 300" registerPath="food.white_meat_kcal_per_day" form={form} />
      <Field id="dairy" label="Dairy (kCal/day)" placeholder="e.g. 200" registerPath="food.dairy_kcal_per_day" form={form} />
      <Field id="cereals" label="Cereals (kCal/day)" placeholder="e.g. 250" registerPath="food.cereals_kcal_per_day" form={form} />
      <Field id="veg" label="Vegetables (kCal/day)" placeholder="e.g. 350" registerPath="food.vegetables_kcal_per_day" form={form} />
      <Field id="fruit" label="Fruit (kCal/day)" placeholder="e.g. 200" registerPath="food.fruit_kcal_per_day" form={form} />
      <Field id="oils" label="Oils (kCal/day)" placeholder="e.g. 100" registerPath="food.oils_kcal_per_day" form={form} />
      <Field id="snacks" label="Snacks (kCal/day)" placeholder="e.g. 150" registerPath="food.snacks_kcal_per_day" form={form} />
      <Field id="drinks" label="Drinks (kCal/day)" placeholder="e.g. 180" registerPath="food.drinks_kcal_per_day" form={form} />
    </section>
  );
}

function SectionProducts({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field id="electrical" label="Electrical ($/month)" placeholder="e.g. 100" registerPath="products.electrical_usd_per_month" form={form} />
      <Field id="household" label="Household ($/month)" placeholder="e.g. 120" registerPath="products.household_usd_per_month" form={form} />
      <Field id="clothes" label="Clothes ($/month)" placeholder="e.g. 80" registerPath="products.clothes_usd_per_month" form={form} />
      <Field id="medical" label="Medical ($/month)" placeholder="e.g. 60" registerPath="products.medical_usd_per_month" form={form} />
      <Field id="recreational" label="Recreational ($/month)" placeholder="e.g. 70" registerPath="products.recreational_usd_per_month" form={form} />
      <Field id="other_prod" label="Other ($/month)" placeholder="e.g. 50" registerPath="products.other_usd_per_month" form={form} />
    </section>
  );
}

function SectionServices({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field id="health" label="Health ($/month)" placeholder="e.g. 120" registerPath="services.health_usd_per_month" form={form} />
      <Field id="finance" label="Finance ($/month)" placeholder="e.g. 40" registerPath="services.finance_usd_per_month" form={form} />
      <Field id="recreation_srv" label="Recreation ($/month)" placeholder="e.g. 90" registerPath="services.recreation_usd_per_month" form={form} />
      <Field id="education" label="Education ($/month)" placeholder="e.g. 100" registerPath="services.education_usd_per_month" form={form} />
      <Field id="vehicle_srv" label="Vehicle ($/month)" placeholder="e.g. 150" registerPath="services.vehicle_usd_per_month" form={form} />
      <Field id="comms" label="Communications ($/month)" placeholder="e.g. 60" registerPath="services.communications_usd_per_month" form={form} />
      <Field id="other_srv" label="Other ($/month)" placeholder="e.g. 50" registerPath="services.other_usd_per_month" form={form} />
    </section>
  );
}

/* -------------------- Live Results -------------------- */
function SectionResults({ serverState, pending }: { serverState: FootprintActionState; pending: boolean }) {
  return (
    <section className="space-y-4">
      <Separator />

      {pending && <p className="text-sm text-muted-foreground">Calculating…</p>}

      {serverState.error && (
        <p className="text-sm text-red-600">Error: {serverState.error}</p>
      )}

      {serverState.result && (
        <>
          <div className="text-2xl font-bold">
            Total: {serverState.result.total.toFixed(2)} kg CO₂e/yr
          </div>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">kg CO₂e/yr</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(serverState.result.breakdown).map(([k, v]) => (
                  <TableRow key={k}>
                    <TableCell className="capitalize">{k}</TableCell>
                    <TableCell className="text-right">{v.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </section>
  );
}
