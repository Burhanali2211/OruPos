"use client";

import React from "react";
import {
  QrCode,
  CreditCard,
  ChefHat,
  LayoutGrid,
  Receipt,
  Smartphone,
} from "lucide-react";

export default function WhatYouGet() {
  const featureList = [
    {
      icon: QrCode,
      title: "Instant QR Digital Menus",
      desc: "Loads in under a second with zero app downloads. High-resolution dish photography, Veg and Non-Veg indicators, and 1-tap item availability toggling.",
    },
    {
      icon: CreditCard,
      title: "Direct Bank UPI Settlement",
      desc: "Guest payments via UPI, Google Pay, PhonePe, or cards deposit straight into your merchant bank account. No middleman holds and zero commission cuts.",
    },
    {
      icon: ChefHat,
      title: "Kitchen KOT & Display Routing",
      desc: "Orders punch immediately to your kitchen display screens and thermal KOT printers with table numbers, elapsed timers, and custom chef cooking notes.",
    },
    {
      icon: LayoutGrid,
      title: "Floor & Table Management",
      desc: "Interactive bird's-eye view of your restaurant floor. Track live table status (Occupied, Dining, Billed), split or merge tabs, and monitor table turnover.",
    },
    {
      icon: Receipt,
      title: "GST Invoicing & WhatsApp Bills",
      desc: "Automatic 5% restaurant GST calculation. Print 2-inch or 3-inch thermal bills or send digital invoices straight to customer WhatsApp in one click.",
    },
    {
      icon: Smartphone,
      title: "Runs on Any Device You Own",
      desc: "Operate your entire restaurant on existing Android phones, iPhones, iPads, Windows desktop PCs, or laptops with offline sync during internet drops.",
    },
  ];

  return (
    <section className="section section-white" id="features">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 44px" }}>
          <span className="section-kicker">Core System</span>
          <h2 className="section-title">
            Everything your restaurant needs.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A fast, cloud restaurant operating system built for front-of-house speed and back-of-house kitchen precision.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
          className="package-items-grid"
        >
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "var(--zinc-50)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "18px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.borderColor = "var(--zinc-300)";
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--zinc-50)";
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
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
                  <Icon size={18} strokeWidth={2.2} />
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
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--zinc-500)",
                    lineHeight: 1.55,
                    margin: 0,
                    fontWeight: 450,
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
