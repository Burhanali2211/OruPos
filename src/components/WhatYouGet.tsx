"use client";

import React from "react";
import {
  QrCode,
  CreditCard,
  ChefHat,
  LayoutGrid,
  Receipt,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export default function WhatYouGet() {
  const featureList = [
    {
      icon: QrCode,
      title: "QR-Based Digital Menu",
      desc: "Fast, visual mobile menu loaded in 1 second when diners scan the table QR. Zero app download required, with high-res food photos, dietary tags, and instant price updates.",
      points: ["1-second instant loading", "High-res food photography", "Real-time out-of-stock toggling"],
    },
    {
      icon: CreditCard,
      title: "Direct-to-Vendor Payment Settlement",
      desc: "Diner payments via UPI, Google Pay, PhonePe, Paytm, or cards deposit directly into your restaurant bank account. Zero middleman holds and zero settlement delay.",
      points: ["Instant direct UPI settlement", "Zero wallet lock-in", "Automated daily payment reconciliation"],
    },
    {
      icon: ChefHat,
      title: "Kitchen Management & KOT",
      desc: "Orders punch instantly to your kitchen display (KDS) and thermal KOT printers. Shows exact table number, seated time, and custom cooking instructions for your chefs.",
      points: ["Real-time Kitchen Display System", "Thermal KOT printer support", "Custom chef cooking notes"],
    },
    {
      icon: LayoutGrid,
      title: "Table & Floor Management",
      desc: "Interactive bird's-eye view of your restaurant floor. Track live table status (Occupied, Dining, Billed), manage running table tabs, and transfer or merge tables effortlessly.",
      points: ["Live visual table occupancy", "Seated timer & turnover tracking", "Split & merge table tabs"],
    },
    {
      icon: Receipt,
      title: "GST Compliance & Invoicing",
      desc: "Compliant restaurant GST invoicing. Automatically splits CGST & SGST (5%), supports custom service charges, and prints 2-inch/3-inch thermal receipts or sends via WhatsApp.",
      points: ["Automated 5% restaurant GST", "Thermal bill & digital WhatsApp receipts", "Daily GST sales reports"],
    },
    {
      icon: Smartphone,
      title: "Mobile App, Desktop App & Web App",
      desc: "Run your entire restaurant operations on whatever hardware you already own. Native support for Android phones, iPhones, iPads, Windows desktop billing PCs, and Macs.",
      points: ["Android & iOS mobile apps", "Windows & Mac desktop apps", "Offline sync mode during internet drops"],
    },
  ];

  return (
    <section className="section section-white" id="features">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 44px" }}>
          <h2 className="section-title">
            Everything your restaurant needs. Zero subscription.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A complete, enterprise-grade restaurant operating system built for front-of-house speed and back-of-house kitchen precision.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
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
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "20px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.borderColor = "var(--zinc-300)";
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--zinc-50)";
                  e.currentTarget.style.borderColor = "var(--border-hairline)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                    marginBottom: "18px",
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </div>

                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 850,
                    marginBottom: "8px",
                    color: "var(--zinc-950)",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--zinc-500)",
                    lineHeight: 1.55,
                    margin: "0 0 18px 0",
                    fontWeight: 500,
                    flexGrow: 1,
                  }}
                >
                  {item.desc}
                </p>

                <div
                  style={{
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {item.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "12.5px",
                        color: "var(--zinc-700)",
                        fontWeight: 600,
                      }}
                    >
                      <CheckCircle2 size={14} color="var(--emerald-600)" style={{ flexShrink: 0 }} />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
