import { NextRequest, NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
    const slug = searchParams.get("slug") || "unknown";
    const table = searchParams.get("table") || undefined;
    const path = searchParams.get("path") || "/";
    const eventType = (searchParams.get("eventType") as any) || "visit";

    const userAgent = req.headers.get("user-agent") || "";
    let device: "mobile" | "desktop" | "tablet" = "desktop";
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      device = "tablet";
    } else if (/mobile|iphone|android|touch/i.test(userAgent)) {
      device = "mobile";
    }

    recordAnalyticsEvent({
      slug,
      table,
      path,
      device,
      eventType,
      timestamp: Date.now(),
    });

    // Return a 1x1 transparent GIF or JSON
    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ success: false }, { status: 400, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const slug = body.slug || "unknown";
    const table = body.table || undefined;
    const path = body.path || "/";
    const eventType = body.eventType || "visit";

    const userAgent = req.headers.get("user-agent") || "";
    let device: "mobile" | "desktop" | "tablet" = "desktop";
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      device = "tablet";
    } else if (/mobile|iphone|android|touch/i.test(userAgent)) {
      device = "mobile";
    }

    recordAnalyticsEvent({
      slug,
      table,
      path,
      device,
      eventType,
      timestamp: Date.now(),
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ success: false }, { status: 400, headers: corsHeaders });
  }
}

