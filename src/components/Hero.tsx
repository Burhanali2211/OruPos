"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

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
      {/* Active Modern Gradient Wash (Clean, subtle, high-end, zero image clutter) */}
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
            marginBottom: "48px",
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
      </div>
    </section>
  );
}
