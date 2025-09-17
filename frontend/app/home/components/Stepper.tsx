"use client";

import { Separator } from "@/components/ui/separator";
import { Home, Car, Utensils, Package, Cog } from "lucide-react";

export const categoryColors: Record<string, string> = {
  housing: "#3b82f6", // blue
  travel: "#22c55e", // green
  food: "#ef4444", // red
  products: "#f59e0b", // amber
  services: "#8b5cf6", // violet
};

type Step = "Housing" | "Travel" | "Food" | "Products" | "Services";

export default function Stepper({
  steps,
  currentStep,
  onStepChange,
}: {
  steps: readonly Step[];
  currentStep: Step;
  onStepChange: (step: Step) => void;
}) {
  return (
    <div className="w-full">
      <ol className="flex items-center w-full gap-4 overflow-x-auto">
        {steps.map((s) => {
          const Icon = iconForStep(s);
          const isActive = currentStep === s;
          const color = categoryColors[s.toLowerCase()];

          return (
            <li key={s} className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => onStepChange(s)}
                className={`
                  flex flex-col items-center gap-2 rounded-lg px-4 py-3 shadow-sm transition cursor-pointer
                  ${isActive ? "text-white" : "text-foreground/70"}
                  hover:-translate-y-1 hover:shadow-md
                `}
                style={{
                  backgroundColor: isActive ? color : "var(--muted)",
                }}
              >
                <div
                  className="flex items-center justify-center h-14 w-14 rounded-full border-2"
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
              {s !== steps[steps.length - 1] && <Separator className="flex-1" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

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
