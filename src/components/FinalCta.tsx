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
        {/* Minimalist Dark Banner */}
        <div
          style={{
            borderRadius: "clamp(24px, 4vw, 44px)",
            backgroundColor: "var(--zinc-950)",
            color: "#FFFFFF",
            padding: "clamp(36px, 6vw, 64px) clamp(24px, 5vw, 56px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px",
            boxShadow: "0 25px 60px rgba(9, 9, 11, 0.25)",
          }}
        >
          {/* Subtle Ambient Corner Glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "350px",
              height: "350px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              filter: "blur(100px)",
              marginRight: "-100px",
              marginTop: "-100px",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 10, maxWidth: "560px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
              }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--emerald-500)" }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--zinc-400)",
                  textTransform: "uppercase",
                }}
              >
                GET STARTED
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                marginBottom: "14px",
              }}
            >
              Ready to upgrade your dining tables?
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--zinc-400)",
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 500,
              }}
            >
              Custom acrylic QR stands and a fast mobile menu for just ₹199 per table. Delivered to your doorstep across India.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={onOpenOrder}
              style={{
                height: "52px",
                padding: "0 28px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.25s ease",
                boxShadow: "0 8px 24px rgba(255, 255, 255, 0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--butter-yellow)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span>Order Yours Today</span>
              <ArrowUpRight size={16} />
            </button>

            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "52px",
                padding: "0 22px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                borderRadius: "9999px",
                fontWeight: 700,
                fontSize: "13px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <MessageCircle size={16} color="var(--emerald-500)" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
