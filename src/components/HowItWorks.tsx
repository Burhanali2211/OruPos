"use client";

import React from "react";
import {
  FileText,
  Globe,
  QrCode,
  CheckCheck,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Share Your Menu",
      desc: "Send your current menu via WhatsApp or PDF. We configure your dishes, categories, modifiers, and GST rates for you.",
    },
    {
      num: "02",
      icon: Globe,
      title: "Get Your Dedicated POS",
      desc: "Your cloud restaurant POS and digital menu web application are deployed instantly with zero hosting or server fees.",
    },
    {
      num: "03",
      icon: QrCode,
      title: "Receive Table QR Stands",
      desc: "Place heavy-duty, crystal-clear table QR stands at your dining tables and billing counter for customer scanning.",
    },
    {
      num: "04",
      icon: CheckCheck,
      title: "Take Orders & Get Paid",
      desc: "Guests scan to browse and pay. KOTs fire straight to your kitchen, and payments deposit directly into your bank account.",
    },
  ];

  return (
    <section className="section section-white" id="how-it-works">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 44px" }}>
          <span className="section-kicker">Simple Setup</span>
          <h2 className="section-title">
            Up and running in 4 clear steps.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            We handle menu digitization, tax configuration, and table stand delivery so you can start billing immediately.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
          className="how-it-works-grid"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "32px 24px",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--shadow-card)",
                  position: "relative",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--zinc-300)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.transform = "none";
                }}
              >
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
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "var(--zinc-100)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--zinc-950)",
                    }}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </div>

                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      color: "var(--zinc-400)",
                    }}
                  >
                    STEP {step.num}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    marginBottom: "8px",
                    color: "var(--zinc-950)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--zinc-500)",
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 450,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
