"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Eye } from "lucide-react";

interface HeroProps {
  onOpenOrder: () => void;
  onOpenDemo: () => void;
}

export default function Hero({ onOpenOrder, onOpenDemo }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        paddingTop: "clamp(84px, 9vw, 108px)",
        paddingBottom: "60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        {/* Crisp Headline */}
        <h1
          style={{
            fontSize: "clamp(2.1rem, 5vw, 3.8rem)",
            fontWeight: 850,
            color: "var(--zinc-950)",
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            maxWidth: "840px",
            margin: "0 auto 16px",
          }}
        >
          Run your restaurant on a modern POS. Zero monthly fees.
        </h1>

        {/* Minimal 1-Sentence Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.18rem)",
            color: "var(--zinc-500)",
            fontWeight: 500,
            maxWidth: "600px",
            margin: "0 auto 28px",
            lineHeight: 1.55,
          }}
        >
          Live table management, instant kitchen KOTs, contactless QR ordering, and GST billing on any device. No recurring software subscriptions.
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
            style={{ height: "48px", fontSize: "13.5px", padding: "0 22px" }}
          >
            <span>Get OruPos POS</span>
            <div className="arrow-circle">
              <ArrowUpRight size={16} />
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-easyio-ghost"
            style={{ height: "48px", padding: "0 20px", fontSize: "13.5px" }}
          >
            <Eye size={15} />
            <span>See Live Demo</span>
          </button>
        </div>

        {/* High-End Clean Hardware & POS Showcase Image */}
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            borderRadius: "clamp(16px, 3vw, 32px)",
            border: "1px solid var(--border-hairline)",
            backgroundColor: "#FFFFFF",
            padding: "clamp(8px, 1.5vw, 14px)",
            boxShadow: "var(--shadow-float)",
            position: "relative",
          }}
        >
          <div
            style={{
              borderRadius: "clamp(12px, 2.5vw, 24px)",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "var(--zinc-50)",
            }}
          >
            <Image
              src="/assets/hero-table-stand.jpg"
              alt="OruPos restaurant POS table hardware station"
              width={1400}
              height={780}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "12px",
                backgroundColor: "rgba(9, 9, 11, 0.85)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "#FFFFFF",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--emerald-500)" }} />
              <span>Table 04 Connected · Live POS Synced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
