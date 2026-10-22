"use client";

import React from "react";
import Link from "next/link";
import { QrCode, Zap, Smartphone, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";

interface CustomerExperienceProps {
  onOpenDemo: () => void;
}

export default function CustomerExperience({ onOpenDemo }: CustomerExperienceProps) {
  return (
    <section className="section section-white" id="customer-experience">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Frictionless Dining Experience</span>
          <h2 className="section-title">See What Your Diners Experience</h2>
          <p className="section-desc">
            Your customer sits at the table, points their phone camera at the acrylic QR stand, and your full menu loads instantly.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "56px",
            alignItems: "center",
          }}
          className="product-showcase-grid"
        >
          {/* Explanation Text */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-primary)",
                fontWeight: 700,
                fontSize: "13px",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <Zap size={16} />
              <span>Zero App Download • Zero Logins</span>
            </div>

            <h3 style={{ fontSize: "2rem", marginBottom: "16px", color: "var(--color-text-main)", letterSpacing: "-0.02em" }}>
              Instant Mobile Menu In 1 Second Flat
            </h3>
            <p style={{ fontSize: "1.0625rem", color: "var(--color-text-body)", marginBottom: "32px", lineHeight: 1.6 }}>
              Customers sit at their table and point their camera or any UPI app at the QR stand.
              Your full food menu appears with high-resolution photos, clear prices, and dietary tags.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "36px" }}>
              {/* Step 1 */}
              <div style={{ display: "flex", gap: "18px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-primary)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(4, 120, 87, 0.25)",
                  }}
                >
                  1
                </div>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-main)" }}>
                    Scan QR Stand on the Dining Table
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                    Works with any default smartphone camera (iPhone & Android), Google Lens, Paytm, PhonePe, or WhatsApp scanner.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: "flex", gap: "18px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-primary)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(4, 120, 87, 0.25)",
                  }}
                >
                  2
                </div>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-main)" }}>
                    Instant Cloud Menu Opens Automatically
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                    No phone number required, zero OTP verification, and zero app downloads. Pure, clean, ultra-fast browsing.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: "flex", gap: "18px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    backgroundColor: "var(--color-primary)",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 10px rgba(4, 120, 87, 0.25)",
                  }}
                >
                  3
                </div>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "4px", color: "var(--color-text-main)" }}>
                    Browse Veg / Non-Veg & Alert Waiter
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                    Official Indian green & red dietary indicators, search bar, chef special badges, and direct waiter alert button.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/demo" target="_blank" className="btn btn-primary btn-lg">
                <span>Open Live Demo in New Window</span>
                <ExternalLink size={18} />
              </Link>
              <button type="button" className="btn btn-secondary btn-lg" onClick={onOpenDemo}>
                <Smartphone size={18} color="#047857" />
                <span>Interact in Screen Modal</span>
              </button>
            </div>
          </div>

          {/* Interactive Phone Mockup */}
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }} className="phone-mockup-wrapper">
            {/* Ambient Shadow Glow */}
            <div
              style={{
                position: "absolute",
                width: "280px",
                height: "560px",
                background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />

            {/* Phone Body */}
            <div
              style={{
                width: "330px",
                height: "630px",
                backgroundColor: "#0F172A",
                borderRadius: "44px",
                padding: "12px",
                boxShadow: "0 30px 70px -15px rgba(15, 23, 42, 0.35), 0 0 0 4px #334155, 0 0 0 7px #0F172A",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Dynamic Island Pill */}
              <div
                style={{
                  width: "110px",
                  height: "24px",
                  backgroundColor: "#000000",
                  position: "absolute",
                  top: "16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "20px",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 8px",
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#1E293B" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#047857" }} className="pulse-dot" />
              </div>

              {/* Screen Canvas */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "34px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <iframe
                  src="/demo"
                  title="Interactive Restaurant Digital Menu Demo"
                  style={{ width: "100%", height: "100%", border: "none" }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Floating Live Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-14px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(4, 120, 87, 0.25)",
                padding: "8px 18px",
                borderRadius: "var(--radius-full)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--color-primary)",
                zIndex: 2,
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} className="pulse-dot" />
              <span>Interactive Simulator: Tap dishes to test</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
