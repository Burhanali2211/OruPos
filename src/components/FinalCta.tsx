"use client";

import React from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface FinalCtaProps {
  onOpenOrder: () => void;
}

export default function FinalCta({ onOpenOrder }: FinalCtaProps) {
  return (
    <section className="section section-white">
      <div className="container">
        <div
          style={{
            borderRadius: "clamp(20px, 3vw, 36px)",
            backgroundColor: "var(--zinc-950)",
            color: "#FFFFFF",
            padding: "clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            boxShadow: "0 16px 40px rgba(9, 9, 11, 0.2)",
          }}
        >
          <div style={{ position: "relative", zIndex: 10, maxWidth: "520px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "var(--zinc-400)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "10px",
              }}
            >
              GET STARTED
            </span>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.18,
                marginBottom: "10px",
              }}
            >
              Switch to a zero-subscription POS.
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--zinc-400)",
                lineHeight: 1.55,
                margin: 0,
                fontWeight: 500,
              }}
            >
              Run your floor, kitchen KOTs, and GST billing on your existing devices with zero monthly software fees.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={onOpenOrder}
              style={{
                height: "48px",
                padding: "0 24px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "12.5px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--butter-yellow)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              <span>Get OruPos POS</span>
              <ArrowUpRight size={15} />
            </button>

            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "48px",
                padding: "0 18px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                borderRadius: "9999px",
                fontWeight: 700,
                fontSize: "12.5px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <MessageCircle size={15} color="var(--emerald-500)" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
