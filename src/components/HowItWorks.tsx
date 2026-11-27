"use client";

import React from "react";
import Image from "next/image";
import {
  FileText,
  Globe,
  QrCode,
  CheckCheck,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: FileText,
      title: "Share Your Menu",
      image: "/assets/dish-paneer.jpg",
      alt: "Restaurant food menu item digitization with high-resolution photography and pricing",
      desc: "Send your current menu via WhatsApp or PDF. We configure your dishes, categories, modifiers, and GST rates for you.",
    },
    {
      num: "02",
      icon: Globe,
      title: "Get Your Dedicated POS",
      image: "/assets/hero-table-stand.jpg",
      alt: "Cloud restaurant point of sale software deployed on custom restaurant subdomain with zero monthly subscription",
      desc: "Your cloud restaurant POS and digital menu web application are deployed instantly with zero hosting or server fees.",
    },
    {
      num: "03",
      icon: QrCode,
      title: "Receive Table QR Stands",
      image: "/assets/customer-scanning.jpg",
      alt: "Durable tabletop QR stands placed at restaurant dining tables for instant phone scanning",
      desc: "Place heavy-duty, crystal-clear table QR stands at your dining tables and billing counter for customer scanning.",
    },
    {
      num: "04",
      icon: CheckCheck,
      title: "Take Orders & Get Paid",
      image: "/assets/pos-counter.jpg",
      alt: "Restaurant orders routed to kitchen KOT with instant contactless UPI direct bank settlement",
      desc: "Guests scan to browse and pay. KOTs fire straight to your kitchen, and payments deposit directly into your bank account.",
    },
  ];

  return (
    <section className="section section-white" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 44px" }}>
          <span className="section-kicker">Simple 4-Step Setup</span>
          <h2 className="section-title">
            Up and running in 4 clear steps.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            We handle menu digitization, tax configuration, and table stand delivery so you can start billing immediately.
          </p>
        </div>

        {/* 4 Steps Grid with Rich Real Photography and SEO alt tags */}
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
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "var(--shadow-card)",
                  position: "relative",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--zinc-300)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {/* Visual Thumbnail */}
                <div style={{ position: "relative", width: "100%", height: "150px", backgroundColor: "#0F172A" }}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    title={step.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      backgroundColor: "rgba(0,0,0,0.75)",
                      backdropFilter: "blur(6px)",
                      color: "#FFFFFF",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    STEP {step.num}
                  </span>
                </div>

                {/* Content Body */}
                <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: "var(--zinc-100)",
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
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--zinc-500)",
                      lineHeight: 1.55,
                      margin: 0,
                      fontWeight: 450,
                      flex: 1,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
