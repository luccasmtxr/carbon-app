"use client";

import Field from "../../components/Field";
import { UseFormReturn } from "react-hook-form";
import { FootprintForm } from "../../../schemas";

export default function FoodSection({
  form,
}: {
  form: UseFormReturn<FootprintForm>;
}) {
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
