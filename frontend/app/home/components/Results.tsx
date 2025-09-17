"use client";

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
import { BarChart3 } from "lucide-react";
import { FootprintActionState } from "../../action";
import { categoryColors } from "../HomePage";

export default function Results({
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
