import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Send your menu photos",
      desc: "Take quick photos of your existing paper menu card or send a PDF on WhatsApp. Tell us how many dining tables you have.",
    },
    {
      num: "02",
      title: "We format & laser-print",
      desc: "Our team digitizes all your food items, prices, and categories. We laser-print your acrylic table stands with individual table numbers.",
    },
    {
      num: "03",
      title: "Place on tables & start",
      desc: "Delivered directly to your restaurant door. Put Stand 1 on Table 1, Stand 2 on Table 2, and guests scan right away.",
    },
  ];

  return (
    <section className="section section-white" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Simple 3-Step Process</span>
          <h2 className="section-title">Three steps. Ready in 48 hours.</h2>
          <p className="section-desc">
            No technical skills or computer typing needed. We handle data entry, stand printing, and shipping.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
          }}
          className="how-it-works-grid"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                borderTop: "2px solid var(--color-primary)",
                paddingTop: "24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--color-primary)",
                  marginBottom: "12px",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "var(--color-text-main)",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  margin: 0,
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
