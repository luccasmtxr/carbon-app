"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Resolver, useForm, useWatch, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { footprintSchema, type FootprintForm } from "./schemas";
import { submitFootprint, type FootprintActionState } from "./action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Home, Car, Utensils, Package, Cog, UserCog, BarChart3 } from "lucide-react";

const STEPS = ["Housing", "Travel", "Food", "Products", "Services"] as const;
type Step = (typeof STEPS)[number];

export const categoryColors: Record<string, string> = {
  housing: "#3b82f6", // blue
  travel: "#22c55e", // green
  food: "#ef4444", // red
  products: "#f59e0b", // amber
  services: "#8b5cf6", // violet
};

export default function HomePage() {
  const [step, setStep] = useState<Step>("Housing");
  const [householdSize, setHouseholdSize] = useState(1);

  const form = useForm<FootprintForm>({
    resolver: zodResolver(footprintSchema) as Resolver<FootprintForm>,
    defaultValues: {
      housing: {},
      travel: {},
      food: {},
      products: {},
      services: {},
    },
    mode: "onBlur",
  });

  const watched = useWatch({ control: form.control });

  // build payload safely, including household size
  const payload = useMemo(() => {
    const v = watched as FootprintForm;
    const clean = (obj: Record<string, any> | undefined) => {
      if (!obj) return undefined;
      const out: Record<string, any> = {};
      for (const [k, val] of Object.entries(obj)) {
        if (val !== undefined && val !== null && val !== "" && !Number.isNaN(val)) {
          out[k] = Number(val);
        }
      }
      return Object.keys(out).length ? out : undefined;
    };
    return JSON.stringify({
      housing: clean(v.housing as any),
      travel: clean(v.travel as any),
      food: clean(v.food as any),
      products: clean(v.products as any),
      services: clean(v.services as any),
      householdSize, // new field
    });
  }, [watched, householdSize]);

  const [serverState, setServerState] = useState<FootprintActionState>({
    result: null,
  });
  const [isPending, startTransition] = useTransition();

  // auto-calc after changes
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          const fd = new FormData();
          fd.append("payload", payload);
          const result = await submitFootprint(serverState, fd); // call server action directly
          setServerState(result);
        } catch (err: any) {
          setServerState({ error: err.message, result: null });
        }
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [payload]);

  const goTo = (target: Step) => setStep(target);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-7xl space-y-8">
        {/* Page Title */}
        <h1 className="text-center text-3xl font-bold tracking-tight md:text-left">
          Personal Carbon Footprint Calculator
        </h1>

        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          {/* Left column: Stepper + Inputs + Settings */}
          <div className="space-y-6">
            {/* Stepper */}
            <div className="w-full">
              <ol className="flex w-full items-center gap-4 overflow-x-auto">
                {STEPS.map((s) => {
                  const Icon = iconForStep(s);
                  const isActive = step === s;
                  const color = categoryColors[s.toLowerCase()];

                  return (
                    <li key={s} className="flex flex-shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => goTo(s)}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg px-4 py-3 shadow-sm transition ${isActive ? "text-white" : "text-foreground/70"} hover:-translate-y-1 hover:shadow-md`}
                        style={{
                          backgroundColor: isActive ? color : "var(--muted)",
                        }}
                      >
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                          style={{
                            borderColor: color,
                            backgroundColor: isActive ? "white" : "transparent",
                            color: isActive ? color : color,
                          }}
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

            {/* Step content */}
            <Card className="w-full">
              <CardContent className="p-6">
                {step === "Housing" && <SectionHousing form={form} />}
                {step === "Travel" && <SectionTravel form={form} />}
                {step === "Food" && <SectionFood form={form} />}
                {step === "Products" && <SectionProducts form={form} />}
                {step === "Services" && <SectionServices form={form} />}
              </CardContent>
            </Card>

            {/* Settings card */}
            <Card className="w-full">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-2">
                  <UserCog className="text-muted-foreground h-5 w-5" />
                  <h2 className="text-lg font-semibold">Settings</h2>
                </div>
                <div className="grid max-w-xs gap-1.5">
                  <Label htmlFor="household">Number of persons in household</Label>
                  <Input
                    id="household"
                    type="number"
                    min={1}
                    value={householdSize}
                    onChange={(e) => setHouseholdSize(Number(e.target.value) || 1)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Results */}
          <div className="w-full">
            <Card className="h-fit w-full md:sticky md:top-6">
              <CardContent className="p-6">
                <SectionResults
                  serverState={serverState}
                  pending={isPending}
                  householdSize={householdSize}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

/* -------------------- Step Icons -------------------- */
function iconForStep(step: Step) {
  switch (step) {
    case "Housing":
      return Home;
    case "Travel":
      return Car;
    case "Food":
      return Utensils;
    case "Products":
      return Package;
    case "Services":
      return Cog;
  }
}

/* -------------------- Field -------------------- */
function Field({
  id,
  label,
  placeholder,
  registerPath,
  form,
}: {
  id: string;
  label: string;
  placeholder: string;
  registerPath: any;
  form: UseFormReturn<FootprintForm>;
}) {
  const {
    register,
    formState: { errors },
  } = form;
  const [root, key] = (registerPath as string).split(".");
  const err = (errors as any)?.[root]?.[key];

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
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

/* -------------------- Step Sections -------------------- */
function SectionHousing({ form }: { form: UseFormReturn<FootprintForm> }) {
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

function SectionTravel({ form }: { form: UseFormReturn<FootprintForm> }) {
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

function SectionFood({ form }: { form: UseFormReturn<FootprintForm> }) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Field
        id="red"
        label="Red meat (kCal/day)"
        placeholder="e.g. 400"
        registerPath="food.red_meat_kcal_per_day"
        form={form}
      />
      <Field
        id="white"
        label="White meat (kCal/day)"
        placeholder="e.g. 300"
        registerPath="food.white_meat_kcal_per_day"
        form={form}
      />
      <Field
        id="dairy"
        label="Dairy (kCal/day)"
        placeholder="e.g. 200"
        registerPath="food.dairy_kcal_per_day"
        form={form}
      />
      <Field
        id="cereals"
        label="Cereals (kCal/day)"
        placeholder="e.g. 250"
        registerPath="food.cereals_kcal_per_day"
        form={form}
      />
      <Field
        id="veg"
        label="Vegetables (kCal/day)"
        placeholder="e.g. 350"
        registerPath="food.vegetables_kcal_per_day"
        form={form}
      />
      <Field
        id="fruit"
        label="Fruit (kCal/day)"
        placeholder="e.g. 200"
        registerPath="food.fruit_kcal_per_day"
        form={form}
      />
      <Field
        id="oils"
        label="Oils (kCal/day)"
        placeholder="e.g. 100"
        registerPath="food.oils_kcal_per_day"
        form={form}
      />
      <Field
        id="snacks"
        label="Snacks (kCal/day)"
        placeholder="e.g. 150"
        registerPath="food.snacks_kcal_per_day"
        form={form}
      />
      <Field
        id="drinks"
        label="Drinks (kCal/day)"
        placeholder="e.g. 180"
        registerPath="food.drinks_kcal_per_day"
        form={form}
      />
    </section>
  );
}

function SectionProducts({ form }: { form: UseFormReturn<FootprintForm> }) {
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

function SectionServices({ form }: { form: UseFormReturn<FootprintForm> }) {
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

/* -------------------- Results Section -------------------- */
function SectionResults({
  serverState,
  pending,
  householdSize,
}: {
  serverState: FootprintActionState;
  pending: boolean;
  householdSize: number;
}) {
  if (pending) {
    return <p className="text-muted-foreground text-sm">Calculating…</p>;
  }

  if (serverState.error) {
    return <p className="text-sm text-red-600">Error: {serverState.error}</p>;
  }

  if (!serverState.result) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-16 text-center">
        <BarChart3 className="mb-4 h-12 w-12 opacity-40" />
        <p className="text-base font-medium">No data yet</p>
        <p className="text-sm">
          Fill in your household, travel, food, and other info to see your footprint.
        </p>
      </div>
    );
  }

  const factor = householdSize || 1;
  const scaledBreakdown = Object.entries(serverState.result.breakdown).map(([key, value]) => ({
    category: key,
    emissions: value * factor,
    fill: categoryColors[key.toLowerCase()] ?? "#6b7280",
  }));
  const scaledTotal = serverState.result.total * factor;

  return (
    <div className="space-y-6">
      {/* Header with icon */}
      <div className="flex items-center gap-2">
        <BarChart3 className="text-primary h-6 w-6" />
        <h3 className="text-lg font-semibold">Your carbon footprint</h3>
      </div>

      <div className="text-2xl font-bold">Total: {scaledTotal.toFixed(2)} kg CO₂e/yr</div>

      {/* Chart */}
      <ChartContainer
        config={{ emissions: { label: "kg CO₂e/yr" } }}
        className="mx-auto aspect-square max-h-[400px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={scaledBreakdown}
            dataKey="emissions"
            nameKey="category"
            innerRadius={30}
            strokeWidth={5}
            label
          >
            {scaledBreakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ChartContainer>

      {/* Table */}
      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">kg CO₂e/yr</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scaledBreakdown.map((row) => (
              <TableRow key={row.category}>
                <TableCell className="flex items-center gap-2 capitalize">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: row.fill }}
                  />
                  {row.category}
                </TableCell>
                <TableCell className="text-right">{row.emissions.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
