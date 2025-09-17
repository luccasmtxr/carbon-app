"use client";

import { createContext, useContext } from "react";

type CalculationContextType = {
  triggerCalculation: () => void;
};

const CalculationContext = createContext<CalculationContextType | undefined>(undefined);

export function CalculationProvider({
  children,
  triggerCalculation,
}: {
  children: React.ReactNode;
  triggerCalculation: () => void;
}) {
  return (
    <CalculationContext.Provider value={{ triggerCalculation }}>
      {children}
    </CalculationContext.Provider>
  );
}

export function useCalculation() {
  const context = useContext(CalculationContext);
  if (!context) {
    throw new Error("useCalculation must be used within CalculationProvider");
  }
  return context;
}
