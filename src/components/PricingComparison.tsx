"use client";

import React from "react";
import Link from "next/link";
import { Check, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function PricingComparison() {
  const comparisonRows = [
    {
      feature: "Monthly Software Fee",
      orupos: "₹0 forever (Zero Subscription)",
      others: "₹1,500 – ₹4,000 / month recurring",
    },
    {
      feature: "Floor Table Management",
      orupos: "Included natively (Unlimited tables)",
      others: "Paid enterprise add-on / higher tier",
    },
    {
      feature: "Kitchen KOT Routing & KDS",
      orupos: "Included with live chef notes & printing",
      others: "Extra module fee per terminal",
    },
    {
      feature: "Direct Vendor Payment Settlement",
      orupos: "Instant direct to your UPI / bank account",
      others: "Third-party gateway fees & delayed payouts",
    },
    {
      feature: "Device Flexibility",
      orupos: "Web, Mobile & Desktop on any phone or PC",
      others: "Locks into expensive ₹25,000+ POS hardware",
    },
    {
      feature: "Table QR Hardware Stations",
      orupos: "Custom 3mm optical cast acrylic included",
      others: "None (restaurateur prints DIY paper slips)",
    },
    {
      feature: "Custom Branded Website",
      orupos: "Free dedicated digital menu website",
      others: "Paid website builder & domain add-ons",
    },
  ];

  const switchInquiryUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    customMessage: "Hi OruPos Team! I would like to switch my restaurant to the OruPos 0-Subscription POS System. Please guide me on onboarding.",
  });

  return (
    <section className="section section-white" id="comparison">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 36px" }}>
          <h2 className="section-title">
            OruPos vs Petpooja & Legacy POS
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Compare zero-subscription OruPos against Petpooja, Dine In, and traditional recurring restaurant software.
          </p>
        </div>

        {/* Comparison Box with Mobile Horizontal Scroll */}
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-hairline)",
            borderRadius: "clamp(18px, 2.8vw, 30px)",
            overflow: "hidden",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="comparison-scroll-box">
            <div style={{ minWidth: "620px" }}>
              {/* Table Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1.2fr 1fr",
                  padding: "18px 24px",
                  backgroundColor: "var(--zinc-50)",
                  borderBottom: "1px solid var(--border-subtle)",
                  fontWeight: 800,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <div style={{ color: "var(--zinc-400)" }}>Feature / Capability</div>
                <div style={{ color: "var(--zinc-950)", fontWeight: 800 }}>
                  <span>OruPos (0 Subscription)</span>
                </div>
                <div style={{ color: "var(--zinc-400)" }}>Petpooja & Legacy POS</div>
              </div>

              {/* Table Body (NO COMMISSION LINE) */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {comparisonRows.map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1.2fr 1fr",
                      padding: "16px 24px",
                      borderBottom: idx < comparisonRows.length - 1 ? "1px solid var(--border-subtle)" : "none",
                      alignItems: "center",
                      fontSize: "13.5px",
                      backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "rgba(250, 250, 250, 0.4)",
                    }}
                  >
                    <div style={{ fontWeight: 650, color: "var(--zinc-800)" }}>
                      {row.feature}
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--zinc-950)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Check size={16} color="var(--emerald-600)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span>{row.orupos}</span>
                    </div>
                    <div style={{ color: "var(--zinc-400)", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                      <X size={15} color="var(--zinc-300)" strokeWidth={2} style={{ flexShrink: 0 }} />
                      <span>{row.others}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Footer Banner with Contact Us Now CTA */}
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "var(--zinc-950)",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "14.5px", fontWeight: 800 }}>
                Save ₹25,000 to ₹48,000 every year in POS software rent
              </div>
              <div style={{ fontSize: "12px", color: "var(--zinc-400)", marginTop: "3px" }}>
                Zero monthly subscriptions forever. Complete cloud POS, KOT, and table hardware.
              </div>
            </div>

            <Link
              href="/get-orupos"
              style={{
                height: "44px",
                padding: "0 22px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "12.5px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              <span>Get OruPos POS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
