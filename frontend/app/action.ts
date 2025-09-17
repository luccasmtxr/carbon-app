"use server";

export type FootprintResult = {
  total: number;
  breakdown: Record<string, number>;
} | null;

export type FootprintActionState = {
  result: FootprintResult;
  error?: string;
};

export async function submitFootprint(
  _prev: FootprintActionState,
  formData: FormData
): Promise<FootprintActionState> {
  try {
    const raw = formData.get("payload");
    if (typeof raw !== "string") {
      return { result: null, error: "Missing payload" };
    }
    const data = JSON.parse(raw);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7007";

    const res = await fetch(`${baseUrl}/api/v1/footprint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { result: null, error: `API error ${res.status}` };
    }
    const json = await res.json();
    return { result: json };
  } catch (err) {
    if (err instanceof Error) {
      return { result: null, error: err.message };
    }
    else{
      return {result: null, error: "Unknow error"}
    }
  }
}
