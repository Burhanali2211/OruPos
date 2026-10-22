"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface HeroProps {
  onOpenOrder: () => void;
  onOpenDemo: () => void;
}

export default function Hero({ onOpenOrder, onOpenDemo }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        padding: "72px 0 80px",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left: Big Bold Typography & Minimal Copy */}
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--color-primary)",
                display: "inline-block",
                marginBottom: "16px",
              }}
            >
              OruPos — Table Hardware & Digital Menus
            </span>

            <h1
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
                lineHeight: 1.05,
                fontWeight: 800,
                color: "var(--color-text-main)",
                letterSpacing: "-0.04em",
                marginBottom: "20px",
              }}
            >
              Digital menus. <br />
              Physical QR stands. <br />
              <span style={{ color: "var(--color-primary)" }}>₹199 per table.</span>
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                marginBottom: "32px",
                maxWidth: "520px",
                fontWeight: 400,
              }}
            >
              Heavy-duty acrylic table stands with individual QR codes for every dining table, plus an instant mobile menu for your guests. No app required. No recurring subscriptions.
            </p>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "36px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onOpenOrder}
              >
                <span>Order Stands (₹199/table)</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={ORUPOS_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                <MessageCircle size={16} color="#25D366" />
                <span>WhatsApp Inquiry</span>
              </a>

              <button
                type="button"
                onClick={onOpenDemo}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-text-main)",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: "8px 12px",
                }}
              >
                See Live Demo →
              </button>
            </div>

            {/* Minimalist Feature List */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "18px",
                fontSize: "13px",
                color: "var(--color-text-muted)",
                borderTop: "1px solid var(--color-border-subtle)",
                paddingTop: "20px",
              }}
            >
              <span>• 3mm Optical Cast Acrylic</span>
              <span>• Individual Table Numbers</span>
              <span>• Full Menu Setup Included</span>
              <span>• Doorstep Delivery Across India</span>
            </div>
          </div>

          {/* Right: Clean, Crisp Physical Stand Showcase */}
          <div>
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                backgroundColor: "#F9F9F8",
              }}
            >
              <Image
                src="/assets/hero-table-stand.jpg"
                alt="Physical acrylic QR code table stand showing Table 04 on dining table"
                width={700}
                height={525}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  borderTop: "1px solid var(--color-border)",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--color-text-main)" }}>
                  Actual Physical Table Stand (Table 04)
                </span>
                <span>Ready to use out of the box</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
