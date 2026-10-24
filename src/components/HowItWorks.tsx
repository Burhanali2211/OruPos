"use client";

import React from "react";
import {
  Rocket,
  Globe,
  QrCode,
  Smartphone,
  ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Rocket,
      title: "Onboard with OruPos & Deploy",
      desc: "Send us your current menu. Our specialists configure your dishes, taxes, categories, and deploy your complete cloud restaurant POS system immediately.",
    },
    {
      num: "02",
      icon: Globe,
      title: "Get Your Free Website",
      desc: "Get your own dedicated, modern digital menu website (e.g. yourname.orupos.in) with zero hosting costs, tailored branding, and instant mobile responsiveness.",
    },
    {
      num: "03",
      icon: QrCode,
      title: "Provide QR to Users",
      desc: "Place heavy-duty, crystal-clear 3mm acrylic QR stands at your dining tables and billing counter for seamless customer scanning.",
    },
    {
      num: "04",
      icon: Smartphone,
      title: "Diners See Digital Menu & Order",
      desc: "Diners scan the table QR code to view your visual digital menu, browse appetizing photos, customize orders, and pay with instant kitchen KOT routing.",
    },
  ];

  return (
    <section className="section section-subtle" id="how-it-works">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 40px" }}>
          <h2 className="section-title">
            How it works
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            From your paper menu to a fully deployed digital restaurant in 4 seamless steps.
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
                  borderRadius: "22px",
                  padding: "30px 24px",
                  border: "1px solid var(--border-hairline)",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--shadow-card)",
                  position: "relative",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--zinc-300)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hairline)";
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
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
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
                      fontWeight: 850,
                      letterSpacing: "0.08em",
                      color: "var(--zinc-400)",
                    }}
                  >
                    STEP {step.num}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.18rem",
                    fontWeight: 850,
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
                    lineHeight: 1.55,
                    margin: 0,
                    fontWeight: 500,
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
