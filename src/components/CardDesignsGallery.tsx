"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ShieldCheck, QrCode, Layers, RefreshCw, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function CardDesignsGallery() {
  const [activeTab, setActiveTab] = useState<"classic" | "cafe" | "bistro">("classic");

  const themes = {
    classic: {
      name: "Classic Dining",
      subtitle: "Sophisticated minimalism for fine dine and family restaurants",
      image: "/assets/card-designs-classic.png",
      alt: "Restaurant table QR acrylic card designs in six color schemes",
    },
    cafe: {
      name: "Modern Cafe & Bistro",
      subtitle: "Vibrant and aesthetic branding for quick-serve and modern cafes",
      image: "/assets/card-designs-cafe.png",
      alt: "Cafe table QR acrylic card designs in six color schemes",
    },
    bistro: {
      name: "Contemporary Bar & Lounge",
      subtitle: "Bold high-contrast typographic layouts for bars, lounges, and roasteries",
      image: "/assets/card-designs-bistro.png",
      alt: "Bistro and lounge table QR acrylic card designs in six color schemes",
    },
  };

  const currentTheme = themes[activeTab];

  const colorways = [
    { name: "Forest", color: "#1E3A2F" },
    { name: "Saffron", color: "#E5A93C" },
    { name: "Charcoal", color: "#1F1F1F" },
    { name: "Ivory", color: "#FAF6F0", border: "#D8D2C5" },
    { name: "Terracotta", color: "#A14324" },
    { name: "Teal", color: "#13534B" },
  ];

  const hardwareSpecs = [
    {
      icon: Layers,
      title: "3mm Optical Cast Acrylic",
      desc: "Industrial-grade, shatter-resistant crystal acrylic engineered for heavy daily restaurant usage.",
    },
    {
      icon: ShieldCheck,
      title: "100% Spill & Grease Proof",
      desc: "Waterproof, oil-proof, and heat-resistant. Simply wipe down with a damp cloth in seconds.",
    },
    {
      icon: QrCode,
      title: "Dual-Sided QR & Table Matrix",
      desc: "High-contrast table numbers printed on both sides so diners can scan easily from any seat.",
    },
    {
      icon: RefreshCw,
      title: "Permanent Cloud POS Sync",
      desc: "Codes never expire. Table 04 scanned always syncs straight to Table 04 in your POS and kitchen KOT.",
    },
  ];

  const hardwareInquiryUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    customMessage: "Hi OruPos Team! I am interested in custom branded acrylic table QR stands for my restaurant. Please share design samples and options.",
  });

  return (
    <section className="section section-white" id="designs">
      <div className="container">
        {/* Section Header */}
        <div
          className="section-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <h2 className="section-title">
              Crafted for your dining ambiance.
            </h2>
            <p className="section-desc">
              Heavy-duty optical cast acrylic stations customized with your restaurant logo, brand colors, and permanent table numbering.
            </p>
          </div>

          {/* Theme Selector Tabs */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "var(--zinc-100)",
              padding: "4px",
              borderRadius: "9999px",
              border: "1px solid var(--zinc-200)",
              gap: "2px",
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            {[
              { id: "classic", label: "Classic" },
              { id: "cafe", label: "Cafe & QSR" },
              { id: "bistro", label: "Bar & Bistro" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "classic" | "cafe" | "bistro")}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                    color: isSelected ? "var(--zinc-950)" : "var(--zinc-500)",
                    fontSize: "12.5px",
                    fontWeight: 750,
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Hardware Showcase Frame */}
        <div
          style={{
            border: "1px solid var(--border-hairline)",
            borderRadius: "clamp(20px, 3vw, 32px)",
            overflow: "hidden",
            backgroundColor: "var(--zinc-50)",
            padding: "clamp(12px, 2vw, 20px)",
            marginBottom: "28px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              borderRadius: "clamp(14px, 2.5vw, 24px)",
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border-subtle)",
              position: "relative",
            }}
          >
            <Image
              src={currentTheme.image}
              alt={currentTheme.alt}
              width={1600}
              height={380}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>

          {/* Colorway & Details Strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              padding: "16px 8px 4px 8px",
              fontSize: "12.5px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <span style={{ fontWeight: 850, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--zinc-950)", fontSize: "11px" }}>
                Brand Colors:
              </span>
              {colorways.map((c, idx) => (
                <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: c.color,
                      border: c.border ? `1px solid ${c.border}` : "none",
                      display: "inline-block",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <span style={{ fontWeight: 600, color: "var(--zinc-700)" }}>{c.name}</span>
                </span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <Link
                href="/get-orupos"
                style={{
                  color: "var(--zinc-950)",
                  fontWeight: 750,
                  fontSize: "12.5px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--zinc-200)",
                  transition: "all 0.15s ease",
                }}
              >
                <span>Get Custom Stands</span>
                <ArrowUpRight size={13} />
              </Link>

              <a
                href={hardwareInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--zinc-600)",
                  fontWeight: 650,
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  textDecoration: "none",
                  padding: "6px 12px",
                }}
              >
                <MessageCircle size={14} color="var(--emerald-600)" />
                <span>WhatsApp Design Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Premium Hardware Engineering Specs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {hardwareSpecs.map((spec, sIdx) => {
            const Icon = spec.icon;
            return (
              <div
                key={sIdx}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "18px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
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
                  }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>
                <h4
                  style={{
                    fontSize: "0.98rem",
                    fontWeight: 800,
                    color: "var(--zinc-950)",
                    margin: 0,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {spec.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--zinc-500)",
                    margin: 0,
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {spec.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
