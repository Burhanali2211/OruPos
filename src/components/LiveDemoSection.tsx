import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Smartphone, ExternalLink, QrCode } from "lucide-react";

interface LiveDemoSectionProps {
  onOpenDemo: () => void;
}

export default function LiveDemoSection({ onOpenDemo }: LiveDemoSectionProps) {
  return (
    <section className="section section-white" id="demo">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Interactive Preview</span>
          <h2 className="section-title">Test It On Your Own Phone Right Now</h2>
          <p className="section-desc">
            Point your mobile camera at the QR code below to experience the exact speed and smoothness your customers will enjoy.
          </p>
        </div>

        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            padding: "44px 40px",
            boxShadow: "0 20px 50px -15px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="live-demo-grid"
          >
            {/* QR Box with Scan Corners */}
            <div
              style={{
                textAlign: "center",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 24px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "0 auto 16px",
                  backgroundColor: "#FFFFFF",
                  padding: "10px",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.06)",
                  border: "2px solid rgba(4, 120, 87, 0.15)",
                  position: "relative",
                }}
              >
                <Image
                  src="/assets/demo-qr.png"
                  alt="Scan this QR code with your mobile camera to open live demo menu"
                  width={180}
                  height={180}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--color-primary)", fontWeight: 700, fontSize: "13px", marginBottom: "4px" }}>
                <QrCode size={16} />
                <span>Scan With Any Phone Camera</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0 }}>
                iPhone, Android, Paytm, PhonePe, or WhatsApp
              </p>
            </div>

            {/* Description */}
            <div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  backgroundColor: "var(--color-primary-light)",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              >
                Simulated Restaurant: Royal Biryani & Kebabs
              </div>

              <h3 style={{ fontSize: "1.875rem", marginBottom: "12px", color: "var(--color-text-main)", letterSpacing: "-0.02em" }}>
                Authentic Diner Experience
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--color-text-body)", marginBottom: "24px", lineHeight: 1.6 }}>
                Experience the menu exactly as your guests will on their dining table. Blazing fast loading, crisp food imagery, Veg/Non-Veg indicators, and direct waiter alert.
              </p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {[
                  "Works on 100% of modern smartphones without app download",
                  "Distinct Indian Green (Veg) & Red (Non-Veg) dietary symbols",
                  "Table 04 Header with active 'Call Waiter' & 'Get Bill' alerts",
                  "Instant real-time dish search & category filtering",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      color: "var(--color-text-main)",
                      fontWeight: 500,
                    }}
                  >
                    <Check size={18} color="#047857" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link href="/demo" target="_blank" className="btn btn-primary btn-lg">
                  <span>Open Fullscreen Menu</span>
                  <ExternalLink size={18} />
                </Link>
                <button type="button" className="btn btn-secondary btn-lg" onClick={onOpenDemo}>
                  <Smartphone size={18} color="#047857" />
                  <span>Preview In Device Simulator</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
