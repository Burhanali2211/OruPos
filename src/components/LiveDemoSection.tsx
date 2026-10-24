"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Smartphone, ExternalLink, QrCode, ArrowUpRight } from "lucide-react";

interface LiveDemoSectionProps {
  onOpenDemo: () => void;
}

export default function LiveDemoSection({ onOpenDemo }: LiveDemoSectionProps) {
  return (
    <section className="section section-white" id="demo">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center" }}>
          <div className="section-kicker-pill" style={{ justifyContent: "center" }}>
            <div className="kicker-dot" />
            <span className="kicker-text">LIVE DEMO EXPERIENCE</span>
          </div>
          <h2 className="section-title">
            Test the POS table ordering right now on your phone.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Point your mobile camera at the QR code below to experience how your guests order from their table and how orders route into your POS in real time.
          </p>
        </div>

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "clamp(24px, 3.5vw, 40px)",
            border: "1px solid var(--border-hairline)",
            padding: "clamp(28px, 4vw, 48px)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "300px 1fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* QR Box */}
            <div
              style={{
                textAlign: "center",
                backgroundColor: "var(--zinc-50)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "20px",
                padding: "28px 24px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  margin: "0 auto 16px",
                  backgroundColor: "#FFFFFF",
                  padding: "10px",
                  borderRadius: "14px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                  border: "1px solid var(--zinc-200)",
                  position: "relative",
                }}
              >
                <Image
                  src="/assets/demo-qr.png"
                  alt="Scan this QR code with your mobile camera to test Table 04 live ordering"
                  width={160}
                  height={160}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--zinc-950)", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
                <QrCode size={16} />
                <span>Scan With Phone Camera</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--zinc-400)", margin: 0 }}>
                iPhone, Android, Paytm, PhonePe, or WhatsApp
              </p>
            </div>

            {/* Description */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--emerald-600)",
                  backgroundColor: "var(--emerald-50)",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                }}
              >
                Simulated Restaurant · Table 04 Live Connected
              </div>

              <h3 style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)", fontWeight: 850, marginBottom: "12px", color: "var(--zinc-950)", letterSpacing: "-0.03em" }}>
                Instant Dine-In Table Ordering
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--zinc-600)", marginBottom: "24px", lineHeight: 1.6, fontWeight: 500 }}>
                Test the exact workflow your diners experience. Opens in under 1 second without any app download. High-resolution dish photography, Veg/Non-Veg indicators, and direct waiter alert buttons.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {[
                  "1-second instant mobile load (Zero app download required)",
                  "Orders route directly into Kitchen KOT and POS floor table matrix",
                  "Distinct Indian Green (Veg) & Red (Non-Veg) dietary markers",
                  "Active 'Call Waiter' and 'Request Bill' instant staff alerts",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "13.5px",
                      color: "var(--zinc-800)",
                      fontWeight: 600,
                    }}
                  >
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        backgroundColor: "var(--emerald-50)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Check size={12} color="var(--emerald-600)" strokeWidth={3} />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/demo"
                  target="_blank"
                  className="btn-easyio"
                  style={{ height: "48px", padding: "0 20px", fontSize: "13px" }}
                >
                  <span>Open Fullscreen Demo</span>
                  <div className="arrow-circle" style={{ width: "30px", height: "30px" }}>
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
                <button
                  type="button"
                  className="btn-easyio-ghost"
                  onClick={onOpenDemo}
                  style={{ height: "48px", padding: "0 20px", fontSize: "13px" }}
                >
                  <Smartphone size={16} />
                  <span>Preview In Mobile Frame</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
