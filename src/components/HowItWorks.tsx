import React from "react";
import { Camera, Laptop, PackageCheck, ArrowRight, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      timeline: "Day 1",
      title: "Send Us Your Current Menu",
      icon: <Camera size={26} color="#047857" />,
      bg: "rgba(16, 185, 129, 0.12)",
      desc: "Take quick photos of your existing paper menu card or send a PDF on WhatsApp. Tell us how many dining tables you have.",
      tip: "No computer typing required. We handle data entry.",
    },
    {
      num: "02",
      timeline: "Day 2",
      title: "We Build & Laser-Print Everything",
      icon: <Laptop size={26} color="#D97706" />,
      bg: "rgba(245, 158, 11, 0.12)",
      desc: "Our design team creates your mobile digital menu with categories, photos, and prices. We manufacture your acrylic table stands with individual table numbers.",
      tip: "We send you a preview link to review and approve.",
    },
    {
      num: "03",
      timeline: "Day 3–4",
      title: "Place On Tables & Start Dining",
      icon: <PackageCheck size={26} color="#0284C7" />,
      bg: "rgba(14, 165, 233, 0.12)",
      desc: "Receive your pre-assembled package via tracked courier. Place Stand 01 on Table 1, Stand 02 on Table 2, and guests can start scanning instantly.",
      tip: "Plug & play. Ready to use out of the delivery box.",
    },
  ];

  return (
    <section className="section section-subtle" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Zero Technical Hassle</span>
          <h2 className="section-title">How To Get Started In 3 Easy Steps</h2>
          <p className="section-desc">
            You don&apos;t need to know coding or design. We handle the entire digital menu creation, stand printing, and shipping.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            position: "relative",
          }}
          className="how-it-works-grid"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                backgroundColor: "#FFFFFF",
              }}
            >
              {/* Header row with Step number and Timeline pill */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: step.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {step.icon}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      backgroundColor: "var(--color-primary-light)",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {step.timeline}
                  </span>
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--color-text-muted)",
                      opacity: 0.5,
                    }}
                  >
                    {step.num}
                  </span>
                </div>
              </div>

              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "10px", color: "var(--color-text-main)" }}>
                {step.title}
              </h3>

              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-body)", lineHeight: 1.6, marginBottom: "20px" }}>
                {step.desc}
              </p>

              {/* Bottom Pro Tip Box */}
              <div
                style={{
                  marginTop: "auto",
                  padding: "12px 14px",
                  backgroundColor: "var(--bg-subtle)",
                  borderRadius: "var(--radius-sm)",
                  borderLeft: "3px solid var(--color-primary)",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  fontWeight: 600,
                }}
              >
                💡 {step.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "0.9375rem", color: "var(--color-text-body)", fontWeight: 500 }}>
            Ready to send your menu photos?
          </span>
          <a
            href={ORUPOS_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#128C7E",
              fontWeight: 700,
              fontSize: "0.9375rem",
              textDecoration: "underline",
            }}
          >
            <MessageCircle size={16} />
            Send on WhatsApp for instant quote →
          </a>
        </div>
      </div>
    </section>
  );
}
