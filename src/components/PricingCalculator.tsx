"use client";

import React, { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface PricingCalculatorProps {
  onOpenOrder: (tablesCount: number) => void;
}

export default function PricingCalculator({ onOpenOrder }: PricingCalculatorProps) {
  const [tables, setTables] = useState<number>(10);
  const pricePerTable = ORUPOS_CONFIG.pricing.pricePerTable;

  const presets = [5, 10, 15, 20, 30, 50];

  const handleMinus = () => {
    if (tables > 1) setTables(tables - 1);
  };

  const handlePlus = () => {
    if (tables < 150) setTables(tables + 1);
  };

  const total = tables * pricePerTable;

  return (
    <section className="section section-subtle" id="pricing">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: "center" }}>
          <div className="section-kicker-pill" style={{ justifyContent: "center" }}>
            <div className="kicker-dot" />
            <span className="kicker-text">PRICING</span>
          </div>
          <h2 className="section-title">
            ₹199 per table. Pay once, use forever.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            No monthly fees. No commissions on your food sales. Pay only for the tables you have.
          </p>
        </div>

        {/* Pricing Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-hairline)",
            borderRadius: "clamp(24px, 4vw, 40px)",
            padding: "clamp(28px, 4vw, 44px)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Rate Display */}
          <div
            style={{
              textAlign: "center",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--zinc-950)" }}>₹</span>
              <span
                style={{
                  fontSize: "clamp(3.2rem, 6vw, 4.2rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "var(--zinc-950)",
                  letterSpacing: "-0.04em",
                }}
              >
                199
              </span>
              <span style={{ fontSize: "1.1rem", color: "var(--zinc-400)", fontWeight: 600 }}>
                / table
              </span>
            </div>

            <p style={{ fontSize: "0.925rem", color: "var(--zinc-500)", margin: 0, fontWeight: 500 }}>
              Acrylic Stand + Table Number + QR Code + Digital Menu Setup
            </p>
          </div>

          {/* Stepper Control */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--zinc-400)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Select number of tables
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                marginBottom: "24px",
              }}
            >
              <button
                type="button"
                onClick={handleMinus}
                aria-label="Decrease tables"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  border: "1px solid var(--zinc-200)",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--zinc-950)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <Minus size={16} />
              </button>

              <div style={{ minWidth: "100px", textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "2.75rem",
                    fontWeight: 900,
                    color: "var(--zinc-950)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {tables}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "var(--zinc-400)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    marginTop: "4px",
                  }}
                >
                  Tables
                </span>
              </div>

              <button
                type="button"
                onClick={handlePlus}
                aria-label="Increase tables"
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "50%",
                  border: "1px solid var(--zinc-200)",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--zinc-950)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Quick Presets Pills */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              {presets.map((num) => {
                const isSelected = tables === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTables(num)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "9999px",
                      border: isSelected ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                      backgroundColor: isSelected ? "var(--zinc-950)" : "#FFFFFF",
                      color: isSelected ? "#FFFFFF" : "var(--zinc-600)",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {num} Tables
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimalist Summary Strip */}
          <div
            style={{
              padding: "18px 24px",
              backgroundColor: "var(--zinc-50)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div>
              <span style={{ fontWeight: 800, color: "var(--zinc-950)", fontSize: "15px" }}>
                {tables} Table Stands
              </span>
              <div style={{ fontSize: "12px", color: "var(--zinc-400)", fontWeight: 500 }}>
                One-time payment · Free lifetime menu hosting
              </div>
            </div>

            <strong style={{ fontSize: "1.65rem", color: "var(--zinc-950)", fontWeight: 900 }}>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="btn-easyio"
            onClick={() => onOpenOrder(tables)}
            style={{ width: "100%", height: "54px", fontSize: "14px" }}
          >
            <span>Order {tables} Stands — ₹{total.toLocaleString("en-IN")}</span>
            <div className="arrow-circle">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
