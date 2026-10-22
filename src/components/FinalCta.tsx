"use client";

import React from "react";
import { MessageCircle, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface FinalCtaProps {
  onOpenOrder: () => void;
}

export default function FinalCta({ onOpenOrder }: FinalCtaProps) {
  return (
    <section className="section section-subtle">
      <div className="container">
        <div
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(229, 169, 60, 0.15) 0%, transparent 70%), linear-gradient(135deg, #13271F 0%, #1E3A2F 100%)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-2xl)",
            padding: "64px 36px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 25px 60px -15px rgba(19, 39, 31, 0.35)",
          }}
        >
          {/* Subtle Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              fontSize: "12px",
              fontWeight: 700,
              color: "#A7F3D0",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <Sparkles size={14} />
            <span>Ready To Upgrade Your Dining Tables?</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
              marginBottom: "16px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            Give Your Guests The Modern Menu They Expect
          </h2>

          <p
            style={{
              fontSize: "1.125rem",
              color: "#E2E8F0",
              maxWidth: "620px",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            Join forward-thinking restaurants across India. Order your custom acrylic table stands and high-speed digital menu for just ₹199 per table.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            <button
              type="button"
              className="btn btn-accent btn-lg"
              onClick={onOpenOrder}
              style={{ fontSize: "1.0625rem" }}
            >
              <span>Get Your Digital Menu</span>
              <ArrowRight size={18} />
            </button>
            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
              style={{ fontSize: "1.0625rem" }}
            >
              <MessageCircle size={20} />
              <span>WhatsApp Direct Query</span>
            </a>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              fontSize: "13px",
              color: "#CBD5E1",
              flexWrap: "wrap",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34D399" />
              100% Done-For-You Menu Setup
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34D399" />
              No App Download For Diners
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="#34D399" />
              Pan-India Express Shipping
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
