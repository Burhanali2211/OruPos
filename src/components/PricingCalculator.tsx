"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Zap, ArrowRight, Sparkles } from "lucide-react";
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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTables(parseInt(e.target.value, 10));
  };

  const total = tables * pricePerTable;
  const paperReprintSavings = Math.max(8000, tables * 950);

  return (
    <section className="section section-subtle" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Radically Transparent</span>
          <h2 className="section-title">One Simple Price. Zero Subscription Traps.</h2>
          <p className="section-desc">
            No monthly software fees. No percentage commissions on your food sales.
            You pay only for the number of dining tables you need.
          </p>
        </div>

        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 25px 60px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.8)",
            overflow: "hidden",
          }}
        >
          {/* Top Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #13271F 0%, #1E3A2F 100%)",
              color: "#FFFFFF",
              padding: "36px 32px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(229, 169, 60, 0.15)",
                border: "1px solid rgba(229, 169, 60, 0.4)",
                padding: "4px 14px",
                borderRadius: "var(--radius-full)",
                fontSize: "12px",
                fontWeight: 700,
                color: "#FCE7C8",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <Sparkles size={14} color="#E5A93C" />
              <span>Flat Lifetime Rate • Zero Recurring Fees</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "2rem", fontWeight: 700, color: "#E5A93C" }}>₹</span>
              <span
                style={{
                  fontSize: "4rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "#FFFFFF",
                  letterSpacing: "-0.04em",
                }}
              >
                199
              </span>
              <span style={{ fontSize: "1.125rem", fontWeight: 600, color: "#CBD5E1" }}>
                / per table
              </span>
            </div>

            <p style={{ fontSize: "0.9375rem", color: "#E2E8F0", maxWidth: "540px", margin: "0 auto" }}>
              Includes 3mm Optical Acrylic Stand + Custom Table QR + Full Mobile Digital Menu + Done-For-You Digitization
            </p>
          </div>

          {/* Calculator Body */}
          <div style={{ padding: "40px 36px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <label
                htmlFor="table-slider"
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "var(--color-text-main)",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                How Many Dining Tables Do You Have?
              </label>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                Move the slider or tap a quick preset count
              </p>
            </div>

            {/* Stepper & Counter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "28px",
              }}
            >
              <button
                type="button"
                onClick={handleMinus}
                aria-label="Decrease tables"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-subtle)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-main)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                }}
              >
                −
              </button>

              <div
                style={{
                  minWidth: "120px",
                  textAlign: "center",
                  padding: "10px 20px",
                  backgroundColor: "var(--color-primary-light)",
                  border: "1px solid rgba(4, 120, 87, 0.2)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <span
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "var(--color-primary)",
                  }}
                >
                  {tables}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--color-primary)",
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
                  width: "50px",
                  height: "50px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-subtle)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-main)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                }}
              >
                +
              </button>
            </div>

            {/* Range Slider */}
            <div style={{ maxWidth: "540px", margin: "0 auto 28px" }}>
              <input
                id="table-slider"
                type="range"
                min="1"
                max="80"
                value={tables}
                onChange={handleSliderChange}
                style={{
                  width: "100%",
                  height: "8px",
                  borderRadius: "4px",
                  background: `linear-gradient(to right, #1E3A2F ${((tables - 1) / 79) * 100}%, #E2E8F0 ${((tables - 1) / 79) * 100}%)`,
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "11px",
                  color: "var(--color-text-muted)",
                  marginTop: "6px",
                  fontWeight: 600,
                }}
              >
                <span>1 Table (Small Cafe)</span>
                <span>25 Tables</span>
                <span>50 Tables</span>
                <span>80+ Tables (Large Hall)</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "36px",
              }}
            >
              {presets.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTables(num)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: tables === num ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                    backgroundColor: tables === num ? "var(--color-primary)" : "var(--bg-subtle)",
                    color: tables === num ? "#FFFFFF" : "var(--color-text-body)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {num} Tables
                </button>
              ))}
            </div>

            {/* Live Pricing Breakdown Card */}
            <div
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 28px",
                border: "1px solid var(--color-border)",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "14px",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-body)",
                }}
              >
                <span>{tables} × Acrylic Stands & Dedicated QR Codes (₹199 each)</span>
                <span style={{ fontWeight: 700, color: "var(--color-text-main)" }}>₹{total}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-body)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Check size={16} color="#047857" strokeWidth={3} />
                  <span>Full Digital Menu Setup by Our Team</span>
                </span>
                <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>FREE (₹1,500 value)</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-body)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Check size={16} color="#047857" strokeWidth={3} />
                  <span>Cloud Menu Hosting & CDN Bandwidth</span>
                </span>
                <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>LIFETIME FREE</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "16px",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--color-text-main)",
                }}
              >
                <span>Total Investment:</span>
                <span style={{ fontSize: "1.875rem", color: "var(--color-primary)" }}>₹{total}</span>
              </div>
            </div>

            {/* ROI Savings Banner */}
            <div
              style={{
                backgroundColor: "var(--color-accent-light)",
                border: "1px solid rgba(217, 119, 6, 0.3)",
                borderRadius: "var(--radius-md)",
                padding: "12px 18px",
                marginBottom: "32px",
                textAlign: "center",
                fontSize: "13px",
                color: "#92400E",
                fontWeight: 600,
              }}
            >
              💰 <strong>Estimated Print Savings:</strong> Saves your restaurant ~₹{paperReprintSavings.toLocaleString("en-IN")}/year on reprinting dirty laminated paper menus.
            </div>

            {/* CTA Button */}
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              onClick={() => onOpenOrder(tables)}
              style={{ fontSize: "1.125rem", height: "56px" }}
            >
              <span>Order For {tables} Tables (₹{total})</span>
              <ArrowRight size={20} />
            </button>

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                fontSize: "12px",
                color: "var(--color-text-muted)",
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <ShieldCheck size={15} color="#047857" />
                No credit card required to order
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Zap size={15} color="#047857" />
                Dispatched in 48 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
