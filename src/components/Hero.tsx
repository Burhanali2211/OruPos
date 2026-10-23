"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Eye } from "lucide-react";

interface HeroProps {
  onOpenOrder: () => void;
  onOpenDemo: () => void;
}

export default function Hero({ onOpenOrder, onOpenDemo }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        paddingTop: "120px",
        paddingBottom: "72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        {/* Clean, Bold Minimalist Headline */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            fontWeight: 850,
            color: "var(--zinc-950)",
            lineHeight: 1.12,
            letterSpacing: "-0.035em",
            maxWidth: "840px",
            margin: "0 auto 18px",
          }}
        >
          ₹0 subscription POS for your restaurant.
        </h1>

        {/* Crisp One-Sentence Subtitle */}
        <p
          style={{
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "var(--zinc-500)",
            fontWeight: 500,
            maxWidth: "520px",
            margin: "0 auto 32px",
            lineHeight: 1.55,
          }}
        >
          Acrylic QR table stands + instant mobile menu. No monthly fees. Pay ₹199 per table once, use forever.
        </p>

        {/* Two Clean Action Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <button
            type="button"
            className="btn-easyio"
            onClick={onOpenOrder}
            style={{ height: "52px", fontSize: "14px", padding: "0 24px" }}
          >
            <span>Order Yours Today</span>
            <div className="arrow-circle">
              <ArrowUpRight size={17} />
            </div>
          </button>

          <a
            href="https://wa.me/917006871031?text=Hi%20OruPos%20team,%20I%20want%20to%20get%20the%20zero%20subscription%20POS%20system%20for%20my%20restaurant."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-easyio-ghost"
            style={{ height: "52px", padding: "0 22px", textDecoration: "none" }}
          >
            <span>Contact Us Now</span>
          </a>

          <a
            href="#how-it-works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "0 12px",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--zinc-400)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--zinc-950)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--zinc-400)")}
          >
            <span>Know More ↓</span>
          </a>
        </div>

        {/* Stand Photo Showcase */}
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            borderRadius: "clamp(20px, 3.5vw, 36px)",
            border: "1px solid var(--border-hairline)",
            backgroundColor: "#FFFFFF",
            padding: "clamp(10px, 1.8vw, 16px)",
            boxShadow: "var(--shadow-float)",
            position: "relative",
          }}
        >
          <div
            style={{
              borderRadius: "clamp(16px, 2.8vw, 28px)",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "var(--zinc-50)",
            }}
          >
            <Image
              src="/assets/hero-table-stand.jpg"
              alt="OruPos acrylic QR table stand"
              width={1400}
              height={780}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                backgroundColor: "rgba(9, 9, 11, 0.88)",
                backdropFilter: "blur(10px)",
                color: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "12px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--emerald-500)" }} />
              <span>Table 04 stand · Ready to use</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
