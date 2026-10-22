"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface PricingCalculatorProps {
  onOpenOrder: (tablesCount: number) => void;
}

export default function PricingCalculator({ onOpenOrder }: PricingCalculatorProps) {
  const [tables, setTables] = useState<number>(10);
  const pricePerTable = ORUPOS_CONFIG.pricing.pricePerTable;

  const presets = [5, 10, 15, 25, 40, 60];

  const handleMinus = () => {
    if (tables > 1) setTables(tables - 1);
  };

  const handlePlus = () => {
    if (tables < 200) setTables(tables + 1);
  };

  const total = tables * pricePerTable;

  return (
    <section className="section section-white" id="pricing">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: "center" }}>
          <span className="section-kicker">Honest Pricing</span>
          <h2 className="section-title">₹199 per table. Pay once, use forever.</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            No monthly subscription traps. No commissions on your food sales.
            You only pay for the number of dining tables you need.
          </p>
        </div>

        {/* Minimalist Pricing Box */}
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: "40px 32px",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Rate Header */}
          <div
            style={{
              textAlign: "center",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--color-border)",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: "6px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-primary)" }}>₹</span>
              <span
                style={{
                  fontSize: "4.5rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "var(--color-text-main)",
                  letterSpacing: "-0.04em",
                }}
              >
                199
              </span>
              <span style={{ fontSize: "1.125rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                / table
              </span>
            </div>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)", margin: 0 }}>
              Physical Acrylic Stand + Table Number + QR Code + Digital Menu + Complete Setup
            </p>
          </div>

          {/* Stepper */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-main)", display: "block", marginBottom: "16px" }}>
              Select Number of Dining Tables:
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
                marginBottom: "20px",
              }}
            >
              <button
                type="button"
                onClick={handleMinus}
                aria-label="Decrease tables"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                −
              </button>

              <div style={{ minWidth: "100px", textAlign: "center" }}>
                <span style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--color-text-main)", lineHeight: 1 }}>
                  {tables}
                </span>
                <span style={{ display: "block", fontSize: "12px", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                  Tables
                </span>
              </div>

              <button
                type="button"
                onClick={handlePlus}
                aria-label="Increase tables"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            {/* Slider */}
            <div style={{ maxWidth: "420px", margin: "0 auto 24px" }}>
              <input
                type="range"
                min="1"
                max="80"
                value={tables}
                onChange={(e) => setTables(parseInt(e.target.value, 10))}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "3px",
                  background: "#E8E8E6",
                  outline: "none",
                  cursor: "pointer",
                  accentColor: "var(--color-primary)",
                }}
              />
            </div>

            {/* Quick Presets */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
              {presets.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTables(num)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    border: tables === num ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                    backgroundColor: tables === num ? "var(--color-primary)" : "#FFFFFF",
                    color: tables === num ? "#FFFFFF" : "var(--color-text-main)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {num} Tables
                </button>
              ))}
            </div>
          </div>

          {/* Minimalist Summary */}
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "var(--bg-subtle)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              fontSize: "15px",
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: "var(--color-text-main)" }}>
                {tables} Stands & Digital Menu Setup
              </span>
              <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                Zero Monthly Fees • Lifetime QR Hosting Included
              </div>
            </div>

            <strong style={{ fontSize: "1.75rem", color: "var(--color-primary)", fontWeight: 800 }}>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          {/* Order Button */}
          <button
            type="button"
            className="btn btn-primary btn-block btn-lg"
            onClick={() => onOpenOrder(tables)}
          >
            <span>Proceed to Order — ₹{total.toLocaleString("en-IN")}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
