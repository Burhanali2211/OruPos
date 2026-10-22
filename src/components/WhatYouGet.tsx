import React from "react";
import Image from "next/image";
import { ShieldCheck, Hash, QrCode, Smartphone, Store, FileText, CheckCircle2 } from "lucide-react";

export default function WhatYouGet() {
  const items = [
    {
      title: "3mm Optical Cast Acrylic T-Stand",
      desc: "Ultra-clear, heavy-duty optical cast acrylic. Spill-resistant, gravy-proof, heat-tolerant, and designed to withstand rough restaurant use.",
      icon: <ShieldCheck size={24} color="#047857" />,
      tag: "Hardware Spec",
    },
    {
      title: "Dual-Sided Table Numbering",
      desc: "Bold high-contrast numbers (Table 01, Table 02...) printed on both sides so floor captains and servers can identify tables from across the dining hall.",
      icon: <Hash size={24} color="#047857" />,
      tag: "Staff Convenience",
    },
    {
      title: "Dedicated QR Code Per Table",
      desc: "Every single dining table receives its own dedicated QR code mapped to that exact table number, eliminating misdirected orders.",
      icon: <QrCode size={24} color="#047857" />,
      tag: "Table Mapping",
    },
    {
      title: "High-Speed Mobile Menu Website",
      desc: "Mobile-first web app with categories, veg/non-veg dietary indicators, dish descriptions, prices, and fast live search bar.",
      icon: <Smartphone size={24} color="#047857" />,
      tag: "Cloud Software",
    },
    {
      title: "Custom Restaurant Branding",
      desc: "Your restaurant logo, establishment name, operational hours, and address featured prominently on both the physical acrylic stands and digital menu.",
      icon: <Store size={24} color="#047857" />,
      tag: "Custom Brand",
    },
    {
      title: "Done-For-You Menu Digitization",
      desc: "You don't type a single word. Simply send us your current menu photos on WhatsApp; our team formats and organizes all your dishes and prices.",
      icon: <FileText size={24} color="#047857" />,
      tag: "Free Service",
    },
  ];

  return (
    <section className="section section-white" id="what-you-get">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Complete Unboxing Experience</span>
          <h2 className="section-title">What You Get In Every Package</h2>
          <p className="section-desc">
            Everything you need to modernize your dining tables. Physical hardware + digital cloud menu in one single bundle.
          </p>
        </div>

        {/* Real Product Showcase Photo */}
        <div
          style={{
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.12)",
            border: "1px solid var(--color-border)",
            marginBottom: "40px",
            position: "relative",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "420px" }}>
            <Image
              src="/assets/stands-lineup.jpg"
              alt="Physical acrylic table QR stands for Table 01, Table 02, and Table 03 neatly lined up"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Overlay Tag */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(8px)",
              color: "#FFFFFF",
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CheckCircle2 size={16} color="#34D399" />
            <span>Actual Delivered Product • Laser-Printed Acrylic T-Stands</span>
          </div>
        </div>

        {/* Inclusions Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="package-items-grid"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "26px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--color-text-muted)",
                    backgroundColor: "var(--bg-subtle)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, marginBottom: "8px", color: "var(--color-text-main)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.55 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
