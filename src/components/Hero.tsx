"use client";

import React from "react";
import Image from "next/image";
import { Check, ArrowRight, Smartphone, Sparkles, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onOpenOrder: () => void;
  onOpenDemo: () => void;
}

export default function Hero({ onOpenOrder, onOpenDemo }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        padding: "64px 0 80px",
        background: "radial-gradient(ellipse at 50% -10%, rgba(16, 185, 129, 0.08) 0%, rgba(255, 255, 255, 0) 70%), linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        borderBottom: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "52px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Content Column */}
          <div>
            {/* Announcement / Price Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(4, 120, 87, 0.2)",
                borderRadius: "var(--radius-full)",
                padding: "6px 16px 6px 6px",
                marginBottom: "24px",
                boxShadow: "0 2px 8px rgba(4, 120, 87, 0.08)",
              }}
            >
              <span
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "0 2px 6px rgba(4, 120, 87, 0.3)",
                }}
              >
                ₹199 / Table
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-main)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>Acrylic Table Stand + Custom Digital Menu</span>
                <span style={{ color: "var(--color-accent)" }}>★</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                lineHeight: 1.15,
                marginBottom: "20px",
                color: "var(--color-text-main)",
                letterSpacing: "-0.035em",
                fontWeight: 800,
              }}
              className="hero-headline"
            >
              Turn Every Dining Table Into an{" "}
              <span
                style={{
                  color: "var(--color-primary)",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                Instant Digital Menu
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--color-text-body)",
                marginBottom: "28px",
                maxWidth: "560px",
                lineHeight: 1.6,
              }}
            >
              Give your diners an effortless contactless menu on their own smartphone.
              Durable physical acrylic QR stands delivered to your doorstep, with complete menu setup done for you.
            </p>

            {/* Everything Included Feature Chips */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "16px 20px",
                marginBottom: "32px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
                maxWidth: "560px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                  letterSpacing: "0.8px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Sparkles size={14} color="#047857" />
                <span>Everything Included In Your One-Time Package:</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "3mm Optical Acrylic Stand",
                  "Table-Specific Numbers",
                  "High-Speed Mobile Menu",
                  "Restaurant Branding",
                  "100% Done-For-You Setup",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: "#F1F5F9",
                      color: "var(--color-text-main)",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "5px 12px",
                      borderRadius: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                    }}
                  >
                    <Check size={13} color="#047857" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "28px",
                flexWrap: "wrap",
              }}
              className="hero-cta-group"
            >
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onOpenOrder}
                style={{ fontSize: "1.05rem" }}
              >
                <span>Get Your Digital Menu</span>
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onOpenDemo}
                style={{ fontSize: "1.05rem" }}
              >
                <Smartphone size={18} color="#047857" />
                <span>See Live Demo</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                fontSize: "13px",
                color: "var(--color-text-muted)",
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Zap size={16} color="#047857" />
                <strong>0 App Download</strong> needed for diners
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={16} color="#047857" />
                <strong>Pan-India Express</strong> delivery
              </span>
            </div>
          </div>

          {/* High-Impact Visual Column */}
          <div style={{ position: "relative" }}>
            {/* Ambient Background Glow */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "10%",
                right: "10%",
                bottom: "10%",
                background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />

            {/* Main Showcase Card */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "0 25px 60px -15px rgba(2, 44, 34, 0.2), 0 0 0 1px rgba(226, 232, 240, 0.8)",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Image
                src="/assets/hero-table-stand.jpg"
                alt="Physical acrylic QR code table stand showing Table 04 on dining table"
                width={700}
                height={525}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />

              {/* Bottom Glass Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(180deg, transparent 0%, rgba(2, 44, 34, 0.92) 100%)",
                  color: "#FFFFFF",
                  padding: "32px 24px 18px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#34D399",
                      display: "inline-block",
                    }}
                    className="pulse-dot"
                  />
                  <p style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#FFFFFF" }}>
                    Actual Physical Acrylic Stand & Table QR Code
                  </p>
                </div>
                <span style={{ fontSize: "13px", color: "#E2E8F0" }}>
                  Custom printed with your table number & high-resolution restaurant QR
                </span>
              </div>
            </div>

            {/* Floating Glass Pill (Top Right) */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                right: "-12px",
                zIndex: 2,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--color-primary-dark)",
              }}
              className="float-animation"
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} className="pulse-dot" />
              <span>Table 04 Active • Fast 0.4s Scan</span>
            </div>

            {/* Floating Glass Stat (Bottom Left) */}
            <div
              style={{
                position: "absolute",
                bottom: "32px",
                left: "-20px",
                zIndex: 2,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "10px 16px",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#34D399",
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase", fontWeight: 600 }}>
                  Menu Loading Speed
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
                  Instant on 4G / 5G
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
