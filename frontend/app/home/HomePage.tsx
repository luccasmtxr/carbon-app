"use client";

import { useState, useEffect, useTransition } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { footprintSchema, type FootprintForm } from "../schemas";
import { submitFootprint, type FootprintActionState } from "../action";
import {
    Stepper,
    Settings,
    Results,
    HousingSection,
    TravelSection,
    FoodSection,
    ProductsSection,
    ServicesSection,
} from "./components";
import { Card, CardContent } from "@/components/ui/card";
import { CalculationProvider } from "./context/CalculationContext";

export const categoryColors: Record<string, string> = {
    housing: "#3b82f6", // blue
    travel: "#22c55e", // green
    food: "#ef4444", // red
    products: "#f59e0b", // amber
    services: "#8b5cf6", // violet
};

const STEPS = ["Housing", "Travel", "Food", "Products", "Services"] as const;
type Step = (typeof STEPS)[number];

const initialActionState: FootprintActionState = { result: null };

export default function HomePage() {
    const [step, setStep] = useState<Step>("Housing");
    const [householdSize, setHouseholdSize] = useState(1);
    const [serverState, setServerState] = useState<FootprintActionState>(
        initialActionState
    );
    const [isPending, startTransition] = useTransition();

    const form = useForm<FootprintForm>({
        resolver: zodResolver(footprintSchema) as Resolver<FootprintForm>,
        defaultValues: {
            housing: {},
            travel: {},
            food: {},
            products: {},
            services: {},
        },
        mode: "onBlur", // validate only on blur
    });

    // run calculation on demand
    const triggerCalculation = () => {
        startTransition(async () => {
            try {
                const fd = new FormData();
                fd.append(
                    "payload",
                    JSON.stringify({
                        ...form.getValues(),
                        householdSize,
                    })
                );
                const result = await submitFootprint(serverState, fd);
                setServerState(result);
            } catch (err: any) {
                setServerState({ error: err.message, result: null });
            }
        });
    };

    // recalc when household size changes
    useEffect(() => {
        triggerCalculation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [householdSize]);

    return (
        <main className="flex min-h-screen flex-col items-center p-4 md:p-6">
            <div className="w-full max-w-7xl space-y-8">
                {/* Page Title */}
                <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">
                    Personal Carbon Footprint Calculator
                </h1>

                <CalculationProvider triggerCalculation={triggerCalculation}>
                    <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
                        {/* Left column: Stepper + Inputs + Settings */}
                        <div className="space-y-6">
                            <Stepper steps={STEPS} currentStep={step} onStepChange={setStep} />

                            <Card className="w-full">
                                <CardContent className="p-6">
                                    {step === "Housing" && (
                                        <HousingSection form={form} />
                                    )}
                                    {step === "Travel" && (
                                        <TravelSection form={form} />
                                    )}
                                    {step === "Food" && (
                                        <FoodSection form={form} />
                                    )}
                                    {step === "Products" && (
                                        <ProductsSection form={form} />
                                    )}
                                    {step === "Services" && (
                                        <ServicesSection form={form} />
                                    )}
                                </CardContent>
                            </Card>

                            <Settings
                                householdSize={householdSize}
                                onChange={setHouseholdSize}
                            />
                        </div>

                        {/* Right column: Results */}
                        <Card className="w-full h-fit md:sticky md:top-6">
                            <CardContent className="p-6">
                                <Results
                                    serverState={serverState}
                                    pending={isPending}
                                    householdSize={householdSize}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </CalculationProvider>
            </div>
        </main>
    );
}
