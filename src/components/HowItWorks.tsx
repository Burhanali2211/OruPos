import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Send your menu",
      desc: "Send photos of your current menu card or a PDF on WhatsApp. Tell us how many tables you have.",
    },
    {
      num: "02",
      title: "We print & set up",
      desc: "We create your online menu and print your acrylic stands with your logo, table numbers, and QR codes.",
    },
    {
      num: "03",
      title: "Place on tables",
      desc: "Your stands arrive in 48 hours. Place them on your dining tables and guests can scan right away.",
    },
  ];

  return (
    <section className="section section-subtle" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-kicker-pill">
            <div className="kicker-dot" />
            <span className="kicker-text">HOW IT WORKS</span>
          </div>
          <h2 className="section-title">
            Up and running in 3 simple steps.
          </h2>
          <p className="section-desc">
            You send us your menu on WhatsApp. We handle the printing, setup, and doorstep delivery.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="how-it-works-grid"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "clamp(20px, 3vw, 32px)",
                padding: "36px 30px",
                border: "1px solid var(--border-hairline)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "all 0.3s ease",
                boxShadow: "var(--shadow-card)",
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
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    color: "var(--zinc-400)",
                  }}
                >
                  Step {step.num}
                </span>

                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "var(--zinc-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                  }}
                >
                  <ArrowUpRight size={14} />
                </div>
              </div>

              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  marginBottom: "10px",
                  color: "var(--zinc-950)",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--zinc-500)",
                  lineHeight: 1.6,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
