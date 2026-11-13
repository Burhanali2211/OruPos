"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Smartphone, QrCode, ArrowUpRight } from "lucide-react";

interface LiveDemoSectionProps {
  onOpenDemo: () => void;
}

export default function LiveDemoSection({ onOpenDemo }: LiveDemoSectionProps) {
  return (
    <section className="section section-subtle" id="demo">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 48px" }}>
          <span className="section-kicker">Interactive Product Test</span>
          <h2 className="section-title">
            Test table ordering right now on your phone.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Scan the QR code below with your phone camera or any UPI app. Experience how your guests view your menu, place orders, and pay at the table.
          </p>
        </div>

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "clamp(20px, 3vw, 32px)",
            border: "1px solid var(--border-light)",
            padding: "clamp(24px, 4vw, 44px)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "40px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* QR Station Box */}
            <div
              style={{
                textAlign: "center",
                backgroundColor: "var(--zinc-50)",
                border: "1px solid var(--border-light)",
                borderRadius: "20px",
                padding: "28px 20px",
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
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
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
                <QrCode size={15} />
                <span>Scan With Phone Camera</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--zinc-500)", margin: 0 }}>
                Compatible with iOS, Android, Paytm & GPay
              </p>
            </div>

            {/* Description & Capabilities */}
            <div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--zinc-500)",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Live Simulated Restaurant · Table 04
              </p>

              <h3 style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)", fontWeight: 800, marginBottom: "12px", color: "var(--zinc-950)", letterSpacing: "-0.025em" }}>
                Frictionless Table Ordering & Payment
              </h3>
              <p style={{ fontSize: "0.98rem", color: "var(--zinc-600)", marginBottom: "22px", lineHeight: 1.6, fontWeight: 450 }}>
                Test the actual guest experience. Opens in under 1 second without downloading any app. Features high-res photography, dietary tags, and waiter alert buttons.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {[
                  "1-second mobile load time with zero app download",
                  "Orders route directly into Kitchen KOT and POS floor table matrix",
                  "Indian Veg (Green) & Non-Veg (Red) dietary indicators",
                  "One-tap 'Call Waiter' and 'Request Bill' staff notifications",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "13.5px",
                      color: "var(--zinc-800)",
                      fontWeight: 550,
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
                  className="btn-primary"
                  style={{ height: "46px", padding: "0 22px", fontSize: "13px" }}
                >
                  <span>Open Fullscreen Demo</span>
                  <ArrowUpRight size={14} />
                </Link>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={onOpenDemo}
                  style={{ height: "46px", padding: "0 20px", fontSize: "13px" }}
                >
                  <Smartphone size={15} />
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
