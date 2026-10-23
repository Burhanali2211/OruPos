import React from "react";
import { ShieldCheck, Hash, Smartphone, FileCheck } from "lucide-react";

export default function WhatYouGet() {
  const deliverables = [
    {
      icon: ShieldCheck,
      title: "Heavy Acrylic Stands",
      desc: "Clear, durable stands that won't fall or bend. Easy to wipe clean after every meal.",
    },
    {
      icon: Hash,
      title: "Table Numbers on Both Sides",
      desc: "Large numbers so your waitstaff can spot tables from anywhere across the room.",
    },
    {
      icon: Smartphone,
      title: "Fast Mobile Menu",
      desc: "Opens in 1 second on any phone camera. Clean dish photos, instant search, and veg/non-veg tags.",
    },
    {
      icon: FileCheck,
      title: "Free Menu Setup & Updates",
      desc: "We enter your full menu for you. Need to change prices or add dishes later? Just text us on WhatsApp.",
    },
  ];

  return (
    <section className="section section-white" id="what-you-get">
      <div className="container">
        <div className="section-header">
          <div className="section-kicker-pill">
            <div className="kicker-dot" />
            <span className="kicker-text">WHAT'S INCLUDED</span>
          </div>
          <h2 className="section-title">
            Everything you need for ₹199 per table.
          </h2>
          <p className="section-desc">
            Physical stands + online digital menu. No monthly fees, no commissions on food sales.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
          className="package-items-grid"
        >
          {deliverables.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--zinc-50)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "clamp(20px, 3vw, 32px)",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.25s ease",
                  position: "relative",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                    marginBottom: "20px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    marginBottom: "8px",
                    color: "var(--zinc-950)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.925rem",
                    color: "var(--zinc-500)",
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
