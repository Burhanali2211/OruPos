import React from "react";
import {
  Layers,
  ChefHat,
  QrCode,
  Receipt,
} from "lucide-react";

export default function WhatYouGet() {
  const deliverables = [
    {
      icon: Layers,
      title: "Table Management",
      desc: "Live floor plan, table occupancy, and seated timers at a single glance.",
    },
    {
      icon: ChefHat,
      title: "Kitchen KOT Routing",
      desc: "Orders route instantly to the kitchen display with table numbers and chef notes.",
    },
    {
      icon: QrCode,
      title: "Contactless QR Ordering",
      desc: "Diners scan from the table to browse and order in 1 second. Zero app downloads.",
    },
    {
      icon: Receipt,
      title: "GST Billing & Receipts",
      desc: "Automated 5% restaurant GST, split payments, and instant WhatsApp digital bills.",
    },
  ];

  return (
    <section className="section section-white" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">POS CAPABILITIES</span>
          <h2 className="section-title">
            Built for modern restaurant speed.
          </h2>
          <p className="section-desc">
            Everything you need to run your floor and kitchen without monthly software fees.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
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
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    marginBottom: "6px",
                    color: "var(--zinc-950)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
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
