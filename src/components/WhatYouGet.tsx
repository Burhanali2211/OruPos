import React from "react";

export default function WhatYouGet() {
  const deliverables = [
    {
      num: "01",
      title: "3mm Optical Cast Acrylic Stand",
      desc: "Heavy-duty transparent T-stand. Water-resistant, gravy-spill proof, and built for daily restaurant wipe-downs.",
    },
    {
      num: "02",
      title: "Dual-Sided Table Numbers",
      desc: "High-contrast bold numbers (Table 01, Table 02...) printed on both sides so staff spot tables across the hall.",
    },
    {
      num: "03",
      title: "Individual Per-Table QR Code",
      desc: "Each stand is mapped directly to that specific table, ensuring accurate waiter alerts and ordering.",
    },
    {
      num: "04",
      title: "Fast Mobile Menu Website",
      desc: "Clean mobile menu with Indian Veg (green) & Non-Veg (red) dietary symbols, instant search, and categories.",
    },
    {
      num: "05",
      title: "Custom Restaurant Branding",
      desc: "Your restaurant name, logo, operational hours, and address formatted cleanly on the stands and digital menu.",
    },
    {
      num: "06",
      title: "Full Menu Setup Included",
      desc: "You don't type anything. Just share photos of your current paper menu card; our team enters all dishes and prices.",
    },
  ];

  return (
    <section className="section section-subtle" id="what-you-get">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Package Inclusions</span>
          <h2 className="section-title">Everything included in your ₹199 package.</h2>
          <p className="section-desc">
            Physical hardware plus cloud digital menu. No hidden setup costs. No monthly subscriptions.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="package-items-grid"
        >
          {deliverables.map((item, idx) => (
            <div
              key={idx}
              className="minimal-card"
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {item.num}
              </div>

              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "var(--color-text-main)",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
