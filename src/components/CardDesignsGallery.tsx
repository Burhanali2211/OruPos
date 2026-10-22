"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Palette, Sparkles, ArrowRight } from "lucide-react";

interface CardDesignsGalleryProps {
  onOpenOrder: () => void;
}

export default function CardDesignsGallery({ onOpenOrder }: CardDesignsGalleryProps) {
  const [activeTab, setActiveTab] = useState<"classic" | "cafe" | "bistro">("classic");

  const themes = {
    classic: {
      name: "Signature Dining",
      concept: "Spice Route Kitchen & Bar",
      styleNote: "Clean bold typography, monogram circle emblem, prominent pill table number",
      image: "/assets/card-designs-classic.png",
      alt: "Spice Route restaurant table QR card designs in Charcoal, Forest, Ivory, Teal, Terracotta, and Saffron",
      idealFor: "Family restaurants, North Indian & Biryani houses, Multi-cuisine dining halls",
    },
    cafe: {
      name: "Modern Cafe & Bakery",
      concept: "Bean & Bun Artisan Cafe",
      styleNote: "Playful modern aesthetics, action pills (Menu • Order • Pay), bold circular table badge",
      image: "/assets/card-designs-cafe.png",
      alt: "Bean & Bun cafe table QR card designs in Charcoal, Forest, Ivory, Terracotta, Teal, and Saffron",
      idealFor: "Cafes, coffee roasters, bakeries, waffle bars, and casual brunch spots",
    },
    bistro: {
      name: "Heritage Bistro & Fine Dine",
      concept: "Maison Alba Continental",
      styleNote: "Classic double-line border framing, elegant editorial serif, Roman numeral table styling",
      image: "/assets/card-designs-bistro.png",
      alt: "Maison Alba bistro table QR card designs in Charcoal, Forest, Ivory, Teal, Terracotta, and Saffron",
      idealFor: "Fine dining, continental bistros, cocktail lounges, and boutique hotels",
    },
  };

  const currentTheme = themes[activeTab];

  const colorways = [
    { name: "Forest Green", color: "#1E3A2F", tag: "Earthy & Organic" },
    { name: "Warm Saffron", color: "#E5A93C", tag: "Indian Vibrant" },
    { name: "Charcoal Black", color: "#1F1F1F", tag: "Sleek & Modern" },
    { name: "Warm Ivory", color: "#FAF6F0", border: "#D8D2C5", tag: "Clean Minimalist" },
    { name: "Terracotta Rust", color: "#A14324", tag: "Warm Tuscan" },
    { name: "Sage Teal", color: "#13534B", tag: "Coastal Fresh" },
  ];

  return (
    <section className="section section-white" id="designs">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Palette size={14} />
            <span>Custom Table Card Artwork</span>
          </span>
          <h2 className="section-title">Designed To Match Your Restaurant Interior</h2>
          <p className="section-desc">
            We don&apos;t do generic black-and-white printouts. Every table stand is custom crafted with your logo, brand colors, and clear table numbers.
          </p>
        </div>

        {/* Style Selection Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "classic", label: "🍛 Signature Dining Style", sub: "Bold & Classic" },
            { id: "cafe", label: "☕ Modern Cafe Style", sub: "Casual & Playful" },
            { id: "bistro", label: "🍷 Heritage Bistro Style", sub: "Elegant Serif" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as "classic" | "cafe" | "bistro")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "var(--radius-lg)",
                  border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                  backgroundColor: isSelected ? "var(--color-primary-light)" : "var(--bg-surface)",
                  color: isSelected ? "var(--color-primary)" : "var(--color-text-main)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 4px 12px rgba(30, 58, 47, 0.1)" : "var(--shadow-subtle)",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 700 }}>{tab.label}</span>
                <span style={{ fontSize: "12px", color: isSelected ? "var(--color-primary)" : "var(--color-text-muted)" }}>
                  {tab.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Visual Showcase Box */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            padding: "36px",
            boxShadow: "0 20px 45px -10px rgba(30, 58, 47, 0.08)",
            maxWidth: "1160px",
            margin: "0 auto",
          }}
        >
          {/* Active Style Info Strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--color-border)",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-text-main)", margin: 0 }}>
                  {currentTheme.name}
                </h3>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--color-primary)",
                    backgroundColor: "var(--color-primary-light)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  Featured Example: {currentTheme.concept}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: 0 }}>
                {currentTheme.styleNote} • <strong>Best for:</strong> {currentTheme.idealFor}
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenOrder}
              style={{ fontSize: "13px", padding: "8px 18px", minHeight: "40px" }}
            >
              <span>Get This Style</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Real Full-Width Layout Image */}
          <div
            style={{
              position: "relative",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              backgroundColor: "#FAF8F5",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              marginBottom: "28px",
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

          {/* Colorway Inclusions Strip */}
          <div
            style={{
              backgroundColor: "var(--bg-subtle)",
              borderRadius: "var(--radius-md)",
              padding: "18px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-main)" }}>
                Available In 6 Signature Colorways:
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              {colorways.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                  }}
                >
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: c.color,
                      border: c.border ? `1px solid ${c.border}` : "none",
                      display: "inline-block",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    }}
                  />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: 700 }}>
              ✓ All Colors Included At ₹199 / Table
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
