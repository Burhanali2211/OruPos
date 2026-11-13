"use client";

import React from "react";
import Link from "next/link";
import { Check, X, ArrowUpRight } from "lucide-react";

export default function PricingComparison() {
  const comparisonRows = [
    {
      feature: "Monthly Software Fee",
      orupos: "₹0 forever (Zero Subscription)",
      others: "₹1,500 – ₹4,000 / month recurring",
    },
    {
      feature: "Floor & Table Management",
      orupos: "Included free (Unlimited tables)",
      others: "Paid enterprise add-on / higher tier",
    },
    {
      feature: "Kitchen KOT Routing & KDS",
      orupos: "Included with chef notes & printing",
      others: "Extra monthly charge per terminal",
    },
    {
      feature: "Payment Settlement",
      orupos: "Instant direct to your UPI / bank account",
      others: "T+1 or T+2 delay with gateway cuts",
    },
    {
      feature: "Device Freedom",
      orupos: "Runs on any phone, tablet, PC or Mac",
      others: "Locks into expensive ₹25,000+ proprietary machines",
    },
    {
      feature: "Custom Table QR Stations",
      orupos: "Custom 3mm optical cast acrylic included",
      others: "None (restaurateur prints DIY paper slips)",
    },
    {
      feature: "Dedicated Digital Menu Web App",
      orupos: "Included free with zero hosting costs",
      others: "Paid website builder add-ons",
    },
  ];

  return (
    <section className="section section-white" id="comparison">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 40px" }}>
          <span className="section-kicker">Honest Comparison</span>
          <h2 className="section-title">
            OruPOS vs Petpooja & Legacy POS
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Compare zero-subscription OruPOS against Petpooja, Dine In, and traditional recurring restaurant software.
          </p>
        </div>

        {/* Comparison Box with Mobile Horizontal Scroll */}
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-light)",
            borderRadius: "clamp(18px, 2.5vw, 28px)",
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
                <div style={{ color: "var(--zinc-500)" }}>Feature / Capability</div>
                <div style={{ color: "var(--zinc-950)", fontWeight: 800 }}>
                  <span>OruPOS (0 Subscription)</span>
                </div>
                <div style={{ color: "var(--zinc-400)" }}>Petpooja & Legacy POS</div>
              </div>

              {/* Table Body */}
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
                    <div style={{ color: "var(--zinc-400)", fontWeight: 450, display: "flex", alignItems: "center", gap: "8px" }}>
                      <X size={15} color="var(--zinc-300)" strokeWidth={2} style={{ flexShrink: 0 }} />
                      <span>{row.others}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Footer Banner */}
          <div
            style={{
              padding: "22px 28px",
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
                Save ₹24,000 to ₹48,000 every year in POS software rent
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--zinc-400)", marginTop: "4px" }}>
                Zero monthly fees forever. Full cloud POS, kitchen KOT, and table hardware.
              </div>
            </div>

            <Link
              href="/get-orupos"
              style={{
                height: "44px",
                padding: "0 22px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "var(--radius-full)",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(255, 255, 255, 0.2)",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              <span>Get OruPOS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
