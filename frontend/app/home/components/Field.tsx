"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  UseFormReturn,
  Path,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { FootprintForm } from "../../schemas";
import { useCalculation } from "../context/CalculationContext";

type FieldProps<T extends FieldValues> = {
  id: string;
  label: string;
  placeholder: string;
  registerPath: Path<T>;
  form: UseFormReturn<T>;
};

function Field<T extends FootprintForm>({
  id,
  label,
  placeholder,
  registerPath,
  form,
}: FieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;
  const { triggerCalculation } = useCalculation();

  // safely resolve error
  const pathParts = (registerPath as string).split(".");
  const root = pathParts[0] as keyof FieldErrors<T>;
  const key = pathParts[1];
  const rootErrors = errors[root] as Record<string, { message?: string }> | undefined;
  const errMsg = rootErrors?.[key]?.message;

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        step="any"
        placeholder={placeholder}
        {...register(registerPath, { valueAsNumber: true })}
        onBlur={triggerCalculation}
      />
      {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
    </div>
  );
}

Field.displayName = "Field";

export default Field;
