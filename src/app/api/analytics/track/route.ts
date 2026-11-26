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
    const source = (searchParams.get("source") as any) || (table ? "qr" : "link");
    const referrer = searchParams.get("referrer") || req.headers.get("referer") || undefined;
    const dishId = searchParams.get("dishId") || undefined;
    const dishName = searchParams.get("dishName") || undefined;
    const category = searchParams.get("category") || undefined;
    const query = searchParams.get("query") || undefined;

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
      source,
      referrer,
      dishId,
      dishName,
      category,
      query,
      timestamp: Date.now(),
    });

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
    const eventType = body.eventType || (table ? "scan" : "visit");
    const source = body.source || (table ? "qr" : "link");
    const referrer = body.referrer || req.headers.get("referer") || undefined;
    const dishId = body.dishId || undefined;
    const dishName = body.dishName || undefined;
    const category = body.category || undefined;
    const query = body.query || undefined;
    const orderTotal = typeof body.orderTotal === "number" ? body.orderTotal : undefined;
    const itemsCount = typeof body.itemsCount === "number" ? body.itemsCount : undefined;

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
      source,
      referrer,
      dishId,
      dishName,
      category,
      query,
      orderTotal,
      itemsCount,
      timestamp: body.timestamp || Date.now(),
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ success: false }, { status: 400, headers: corsHeaders });
  }
}
