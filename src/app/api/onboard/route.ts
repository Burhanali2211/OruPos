import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lead = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      receivedAt: new Date().toISOString(),
      ...body,
    };

    // Store in data/leads.json (or OS tmp directory as fallback)
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
        } catch {
          leads = [];
        }
      }
      leads.push(lead);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch {
      // Fallback for restricted file systems
      try {
        const tmpLeadsFile = path.join(os.tmpdir(), "orupos-leads.json");
        let leads = [];
        if (fs.existsSync(tmpLeadsFile)) {
          try {
            leads = JSON.parse(fs.readFileSync(tmpLeadsFile, "utf-8"));
          } catch {
            leads = [];
          }
        }
        leads.push(lead);
        fs.writeFileSync(tmpLeadsFile, JSON.stringify(leads, null, 2), "utf-8");
      } catch {
        // Log to stdout
      }
    }

    console.log("New OruPos Onboarding Lead Received:", lead.restaurantName, lead.phone, lead.city);

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: "Onboarding inquiry submitted successfully",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
