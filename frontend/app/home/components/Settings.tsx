"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCog } from "lucide-react";

export default function Settings({
  householdSize,
  onChange,
}: {
  householdSize: number;
  onChange: (size: number) => void;
}) {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <UserCog className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>
        <div className="grid gap-1.5 max-w-xs">
          <Label htmlFor="household">Number of persons in household</Label>
          <Input
            id="household"
            type="number"
            min={1}
            value={householdSize}
            onChange={(e) => onChange(Number(e.target.value) || 1)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
