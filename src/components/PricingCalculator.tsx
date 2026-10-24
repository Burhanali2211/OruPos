"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Minus, Plus, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function PricingCalculator() {
  const [tables, setTables] = useState<number>(10);
  const pricePerTable = ORUPOS_CONFIG.pricing.pricePerTable;
  const presets = [5, 10, 15, 20, 30];

  const handleMinus = () => {
    if (tables > 1) setTables(tables - 1);
  };

  const handlePlus = () => {
    if (tables < 150) setTables(tables + 1);
  };

  const total = tables * pricePerTable;

  const orderWhatsAppUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    tables,
    customMessage: `Hi OruPos Team! I am interested in onboarding my restaurant with OruPos 0-Subscription POS for ${tables} tables (₹${total.toLocaleString("en-IN")} one-time hardware setup). Please guide me on getting started.`,
  });

  return (
    <section className="section section-subtle" id="pricing">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: "center" }}>
          <span className="section-kicker">PRICING</span>
          <h2 className="section-title">
            Zero monthly software fees.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            The cloud POS software is 100% free forever. Pay only a one-time ₹199/table for custom acrylic hardware and complete menu onboarding.
          </p>
        </div>

        {/* Pricing Card */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-hairline)",
            borderRadius: "clamp(20px, 3vw, 32px)",
            padding: "clamp(20px, 3.5vw, 36px)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Rate Display */}
          <div
            style={{
              textAlign: "center",
              paddingBottom: "20px",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                justifyContent: "center",
                gap: "3px",
                marginBottom: "4px",
              }}
            >
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--zinc-950)" }}>₹</span>
              <span
                style={{
                  fontSize: "clamp(2.8rem, 5vw, 3.8rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "var(--zinc-950)",
                  letterSpacing: "-0.04em",
                }}
              >
                199
              </span>
              <span style={{ fontSize: "1rem", color: "var(--zinc-400)", fontWeight: 600 }}>
                / table (one-time)
              </span>
            </div>

            <p style={{ fontSize: "0.875rem", color: "var(--zinc-500)", margin: 0, fontWeight: 500 }}>
              Free Lifetime POS License + 3mm Cast Acrylic Stand + Full Menu Setup
            </p>
          </div>

          {/* Stepper Control */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--zinc-400)",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Number of tables
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <button
                type="button"
                onClick={handleMinus}
                aria-label="Decrease tables"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid var(--zinc-200)",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--zinc-950)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <Minus size={15} />
              </button>

              <div style={{ minWidth: "80px", textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "2.4rem",
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
                    fontSize: "10.5px",
                    color: "var(--zinc-400)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    marginTop: "2px",
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
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid var(--zinc-200)",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--zinc-950)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Quick Presets */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "24px",
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
                      padding: "5px 14px",
                      borderRadius: "9999px",
                      border: isSelected ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                      backgroundColor: isSelected ? "var(--zinc-950)" : "#FFFFFF",
                      color: isSelected ? "#FFFFFF" : "var(--zinc-600)",
                      fontSize: "11.5px",
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

          {/* Minimal Summary Strip */}
          <div
            style={{
              padding: "14px 18px",
              backgroundColor: "var(--zinc-50)",
              borderRadius: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div>
              <span style={{ fontWeight: 800, color: "var(--zinc-950)", fontSize: "14px" }}>
                {tables} Tables Setup
              </span>
              <div style={{ fontSize: "11px", color: "var(--zinc-400)", fontWeight: 500 }}>
                One-time hardware setup · ₹0 monthly fee forever
              </div>
            </div>

            <strong style={{ fontSize: "1.5rem", color: "var(--zinc-950)", fontWeight: 900 }}>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          {/* Action Buttons: Link to /get-orupos and WhatsApp alternative */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href={`/get-orupos?tables=${tables}`}
              className="btn-easyio"
              style={{
                width: "100%",
                height: "50px",
                fontSize: "13.5px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Get OruPos POS for {tables} Tables</span>
              <div className="arrow-circle">
                <ArrowUpRight size={16} />
              </div>
            </Link>

            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12.5px",
                color: "var(--zinc-500)",
                fontWeight: 650,
                textAlign: "center",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "6px 0",
              }}
            >
              <MessageCircle size={14} color="var(--emerald-600)" />
              <span>Or quick order directly via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
