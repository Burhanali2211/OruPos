"use client";

import React from "react";
import Image from "next/image";
import {
  QrCode,
  CreditCard,
  ChefHat,
  LayoutGrid,
  Receipt,
  Smartphone,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function WhatYouGet() {
  const visualPillars = [
    {
      title: "Contactless Tabletop Ordering",
      tagline: "Front of House",
      image: "/assets/customer-scanning.jpg",
      alt: "Restaurant customer scanning contactless QR menu stand at dining table using smartphone camera",
      desc: "Diners scan the table QR stand with their smartphone to view dishes with high-res photos, veg/non-veg tags, and prices. Zero app downloads required.",
      badge: "0.4s Scan Speed",
    },
    {
      title: "Kitchen KOT & Display Routing",
      tagline: "Back of House",
      image: "/assets/kitchen-kot.jpg",
      alt: "Commercial restaurant kitchen head chef preparing orders with real-time digital kitchen order tickets",
      desc: "Orders punch straight to your kitchen display tablet or thermal KOT printer with clear table numbers, timers, and customer notes in under 2 seconds.",
      badge: "Zero Paper Lost",
    },
    {
      title: "Direct UPI & Fast Invoicing",
      tagline: "Billing Counter",
      image: "/assets/pos-counter.jpg",
      alt: "Restaurant cashier counter processing instant contactless UPI payments and GST thermal receipts",
      desc: "Payments deposit directly into your merchant bank account via PhonePe, Paytm, or GPay with 0% commission. Generate 5% GST bills in one click.",
      badge: "0% Commission",
    },
  ];

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
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 44px" }}>
          <span className="section-kicker">Core System Architecture</span>
          <h2 className="section-title">
            Everything your restaurant needs to operate at peak speed.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A unified, zero-subscription restaurant operating system engineered for front-of-house speed and back-of-house kitchen precision.
          </p>
        </div>

        {/* 3-Pillar Real Photo Visual Showcase with SEO alt tags */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {visualPillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid var(--border-light)",
                backgroundColor: "#FFFFFF",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 18px 36px -10px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "var(--shadow-card)";
              }}
            >
              {/* Photo Area */}
              <div style={{ position: "relative", width: "100%", height: "210px", backgroundColor: "#0F172A" }}>
                <Image
                  src={pillar.image}
                  alt={pillar.alt}
                  title={pillar.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(8px)",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {pillar.tagline}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(16, 185, 129, 0.9)",
                    color: "#FFFFFF",
                    fontSize: "11.5px",
                    fontWeight: 750,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircle2 size={12} />
                  <span>{pillar.badge}</span>
                </div>
              </div>

              {/* Text Area */}
              <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    color: "var(--zinc-950)",
                    margin: "0 0 8px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--zinc-500)",
                    lineHeight: 1.55,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Matrix Grid */}
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
                  padding: "26px 22px",
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
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                    marginBottom: "14px",
                  }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
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
                    fontSize: "0.88rem",
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
