"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FootprintForm } from "../../schemas";
import { useCalculation } from "../context/CalculationContext";

export default function Field({
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
  const { register, formState: { errors } } = form;
  const { triggerCalculation } = useCalculation();

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
        onBlur={triggerCalculation}  
      />
      {err && <p className="text-sm text-red-600">{(err as any).message}</p>}
    </div>
  );
}
