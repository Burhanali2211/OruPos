"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CardDesignsGalleryProps {
  onOpenOrder: () => void;
}

export default function CardDesignsGallery({ onOpenOrder }: CardDesignsGalleryProps) {
  const [activeTab, setActiveTab] = useState<"classic" | "cafe" | "bistro">("classic");

  const themes = {
    classic: {
      name: "Classic",
      image: "/assets/card-designs-classic.png",
      alt: "Restaurant table QR card designs in six colors",
    },
    cafe: {
      name: "Cafe",
      image: "/assets/card-designs-cafe.png",
      alt: "Cafe table QR card designs in six colors",
    },
    bistro: {
      name: "Bistro",
      image: "/assets/card-designs-bistro.png",
      alt: "Bistro table QR card designs in six colors",
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

  return (
    <section className="section section-white" id="designs">
      <div className="container">
        <div
          className="section-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <span className="section-kicker">TABLE HARDWARE</span>
            <h2 className="section-title">
              Crafted for your ambiance.
            </h2>
            <p className="section-desc">
              Heavy-duty 3mm optical cast acrylic QR stations mapped directly to your POS tables.
            </p>
          </div>

          {/* Segmented Switcher */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "var(--zinc-100)",
              padding: "3px",
              borderRadius: "9999px",
              border: "1px solid var(--zinc-200)",
              gap: "2px",
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            {[
              { id: "classic", label: "Classic" },
              { id: "cafe", label: "Cafe" },
              { id: "bistro", label: "Bistro" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "classic" | "cafe" | "bistro")}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "9999px",
                    border: "none",
                    backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                    color: isSelected ? "var(--zinc-950)" : "var(--zinc-500)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
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

        {/* Display Frame */}
        <div
          style={{
            border: "1px solid var(--border-hairline)",
            borderRadius: "clamp(16px, 2.5vw, 28px)",
            overflow: "hidden",
            backgroundColor: "var(--zinc-50)",
            padding: "clamp(10px, 1.5vw, 16px)",
            marginBottom: "16px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            style={{
              borderRadius: "clamp(12px, 2vw, 20px)",
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
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
        </div>

        {/* Colorway Strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "12px",
            color: "var(--zinc-500)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--zinc-950)", fontSize: "11px" }}>
              Colors:
            </span>
            {colorways.map((c, idx) => (
              <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: c.color,
                    border: c.border ? `1px solid ${c.border}` : "none",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontWeight: 500 }}>{c.name}</span>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenOrder}
            style={{
              background: "none",
              border: "none",
              color: "var(--zinc-950)",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: 0,
            }}
          >
            <span>Choose styles during setup</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
