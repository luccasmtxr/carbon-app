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
            onChange={(e) => onChange(Number(e.target.value) || 1)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
