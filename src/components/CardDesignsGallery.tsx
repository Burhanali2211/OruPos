"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CardDesignsGalleryProps {
  onOpenOrder: () => void;
}

export default function CardDesignsGallery({ onOpenOrder }: CardDesignsGalleryProps) {
  const [activeTab, setActiveTab] = useState<"classic" | "cafe" | "bistro">("classic");

  const themes = {
    classic: {
      name: "Signature Dining",
      concept: "Spice Route Kitchen & Bar",
      styleNote: "Bold typography, circular monogram emblem, high-contrast table number pill.",
      image: "/assets/card-designs-classic.png",
      alt: "Spice Route restaurant table QR card designs in Charcoal, Forest, Ivory, Teal, Terracotta, and Saffron",
    },
    cafe: {
      name: "Modern Cafe & Bakery",
      concept: "Bean & Bun Artisan Cafe",
      styleNote: "Casual layout, action pills (Menu • Order • Pay), circular table number badge.",
      image: "/assets/card-designs-cafe.png",
      alt: "Bean & Bun cafe table QR card designs in Charcoal, Forest, Ivory, Terracotta, Teal, and Saffron",
    },
    bistro: {
      name: "Heritage Bistro & Fine Dine",
      concept: "Maison Alba Continental",
      styleNote: "Double-line border framing, vintage serif typography, Roman numeral table styling.",
      image: "/assets/card-designs-bistro.png",
      alt: "Maison Alba bistro table QR card designs in Charcoal, Forest, Ivory, Teal, Terracotta, and Saffron",
    },
  };

  const currentTheme = themes[activeTab];

  const colorways = [
    { name: "Forest Green", color: "#1E3A2F" },
    { name: "Warm Saffron", color: "#E5A93C" },
    { name: "Charcoal Black", color: "#1F1F1F" },
    { name: "Warm Ivory", color: "#FAF6F0", border: "#D8D2C5" },
    { name: "Terracotta Rust", color: "#A14324" },
    { name: "Sage Teal", color: "#13534B" },
  ];

  return (
    <section className="section section-white" id="designs">
      <div className="container">
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <span className="section-kicker">Card Styles & Colorways</span>
            <h2 className="section-title">Three styles. Six colorways.</h2>
            <p className="section-desc">
              Custom-printed with your restaurant name, logo, table numbers, and high-contrast scannable QR.
            </p>
          </div>

          {/* Minimalist Tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "classic", label: "Signature Dining" },
              { id: "cafe", label: "Modern Cafe" },
              { id: "bistro", label: "Heritage Bistro" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "classic" | "cafe" | "bistro")}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    border: isSelected ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                    backgroundColor: isSelected ? "var(--color-primary)" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "var(--color-text-main)",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Image Container */}
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            backgroundColor: "#FAF9F8",
            marginBottom: "20px",
          }}
        >
          <Image
            src={currentTheme.image}
            alt={currentTheme.alt}
            width={1600}
            height={360}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>

        {/* Info & Colorway Strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "13px",
            color: "var(--color-text-muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, color: "var(--color-text-main)" }}>Available Colorways:</span>
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
                  }}
                />
                <span>{c.name}</span>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenOrder}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-primary)",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: 0,
            }}
          >
            <span>Choose your style at checkout</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
