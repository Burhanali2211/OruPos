import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/analytics";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "all";
    const rawPeriod = searchParams.get("period") || "day";
    const period = ["day", "week", "month", "year"].includes(rawPeriod)
      ? (rawPeriod as "day" | "week" | "month" | "year")
      : "day";

    const summary = getAnalyticsSummary(slug, period);

    return NextResponse.json(
      {
        success: true,
        data: summary,
      },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to load analytics" },
      { status: 500, headers: corsHeaders }
    );
  }
}

