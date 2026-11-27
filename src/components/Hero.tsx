"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, QrCode, ChefHat, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onOpenDemo?: () => void;
}

export default function Hero({ onOpenDemo }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        paddingTop: "clamp(120px, 14vw, 175px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Active Modern Gradient Wash */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1280px",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "15%",
            width: "550px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0) 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "12%",
            width: "520px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, rgba(245, 158, 11, 0) 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "35%",
            width: "480px",
            height: "380px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        {/* Subtle, Crisp Kicker */}
        <p
          style={{
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--zinc-500)",
            marginBottom: "18px",
          }}
        >
          Zero Monthly Subscriptions · 0% Commission
        </p>

        {/* Clean, Striking Headline */}
        <h1
          style={{
            fontSize: "clamp(2.75rem, 6vw, 4.8rem)",
            fontWeight: 850,
            color: "var(--zinc-950)",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            maxWidth: "880px",
            margin: "0 auto 22px",
          }}
        >
          Restaurant POS with zero monthly subscriptions.
        </h1>

        {/* Concise Subtitle */}
        <p
          style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "var(--zinc-500)",
            fontWeight: 450,
            maxWidth: "640px",
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          Fast QR table ordering, direct UPI bank settlements, live kitchen KOT routing, and GST billing on devices you already own.
        </p>

        {/* Focused, Minimal Action Pair */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "36px",
          }}
        >
          <Link
            href="/get-orupos"
            className="btn-primary"
            style={{
              height: "48px",
              fontSize: "13.5px",
              padding: "0 24px",
            }}
          >
            <span>Get Started</span>
            <ArrowUpRight size={15} />
          </Link>

          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-secondary"
            style={{
              height: "48px",
              fontSize: "13.5px",
              padding: "0 20px",
              gap: "8px",
            }}
          >
            <Play size={13} fill="currentColor" />
            <span>Test Live Demo</span>
          </button>
        </div>

        {/* Clean, Lightweight Proof Row */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(16px, 3.5vw, 36px)",
            flexWrap: "wrap",
            padding: "14px 28px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "rgba(250, 250, 250, 0.75)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            fontSize: "12.5px",
            color: "var(--zinc-600)",
            marginBottom: "52px",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontWeight: 800, color: "var(--zinc-950)", fontSize: "14px" }}>₹0</span>
            <span>Monthly Fee</span>
          </div>
          <span style={{ width: "1px", height: "14px", backgroundColor: "var(--zinc-200)", display: "inline-block" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontWeight: 800, color: "var(--zinc-950)", fontSize: "14px" }}>0%</span>
            <span>Platform Commission</span>
          </div>
          <span style={{ width: "1px", height: "14px", backgroundColor: "var(--zinc-200)", display: "inline-block" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontWeight: 800, color: "var(--zinc-950)", fontSize: "14px" }}>Instant</span>
            <span>Direct Bank UPI</span>
          </div>
          <span style={{ width: "1px", height: "14px", backgroundColor: "var(--zinc-200)", display: "inline-block" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontWeight: 800, color: "var(--zinc-950)", fontSize: "14px" }}>Any Device</span>
            <span>Android, iOS, PC</span>
          </div>
        </div>

        {/* Real Visual Showcase with Rich SEO Semantics */}
        <figure
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            borderRadius: "clamp(18px, 2.5vw, 28px)",
            overflow: "hidden",
            boxShadow: "0 28px 65px -15px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.06)",
            backgroundColor: "#0B1311",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "clamp(260px, 42vw, 540px)" }}>
            <Image
              src="/assets/hero-table-stand.jpg"
              alt="Luxury hotel and restaurant dining room equipped with OruPos contactless QR table ordering stands and cloud POS"
              title="OruPos Cloud Restaurant Management & Contactless Ordering"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center 45%" }}
              sizes="(max-width: 1200px) 100vw, 1100px"
            />
            {/* Subtle Gradient Overlays for readability and depth */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(11, 19, 17, 0.85) 0%, rgba(11, 19, 17, 0.2) 50%, rgba(11, 19, 17, 0.4) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Bottom Showcase Content Bar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "clamp(16px, 3vw, 28px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "16px",
                textAlign: "left",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                    color: "#34D399",
                    fontSize: "12px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  <CheckCircle2 size={13} />
                  <span>Deployed in Indian Restaurants & Cafes</span>
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.2rem, 2.4vw, 1.75rem)",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    margin: "0 0 4px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Modern Table Ordering & Instant Kitchen Flow
                </h2>
                <figcaption
                  style={{
                    fontSize: "clamp(12px, 1.4vw, 14px)",
                    color: "rgba(255, 255, 255, 0.8)",
                    margin: 0,
                  }}
                >
                  Guests scan the table stand with their smartphone to view photos and order. Orders route immediately to the kitchen KOT.
                </figcaption>
              </div>

              {/* Floating Feature Pills */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    fontSize: "12.5px",
                    fontWeight: 650,
                  }}
                >
                  <QrCode size={16} color="#34D399" />
                  <span>1s Menu Load</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 14px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    fontSize: "12.5px",
                    fontWeight: 650,
                  }}
                >
                  <ChefHat size={16} color="#FBBF24" />
                  <span>Instant KOT</span>
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
