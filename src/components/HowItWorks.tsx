import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Send your menu",
      desc: "Send your menu on WhatsApp. We configure your catalog, table matrix, and GST rules.",
    },
    {
      num: "02",
      title: "Get table stands",
      desc: "Custom 3mm acrylic QR stands arrive at your restaurant within 48 hours.",
    },
    {
      num: "03",
      title: "Start billing",
      desc: "Place on tables. Take live orders and print bills with zero monthly software fees.",
    },
  ];

  return (
    <section className="section section-subtle" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">HOW IT WORKS</span>
          <h2 className="section-title">
            Live in 3 simple steps.
          </h2>
          <p className="section-desc">
            We handle 100% of the menu digitization and hardware delivery.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="how-it-works-grid"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                padding: "28px 24px",
                border: "1px solid var(--border-hairline)",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: "var(--zinc-400)",
                  }}
                >
                  STEP {step.num}
                </span>

                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "var(--zinc-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                  }}
                >
                  <ArrowUpRight size={13} />
                </div>
              </div>

              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  marginBottom: "6px",
                  color: "var(--zinc-950)",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--zinc-500)",
                  lineHeight: 1.5,
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
