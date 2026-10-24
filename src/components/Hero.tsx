"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface HeroProps {
  onOpenDemo?: () => void;
}

export default function Hero({ onOpenDemo }: HeroProps) {
  const whatsappUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    customMessage: "Hi OruPos Team! I am interested in your 0 Subscription POS System for my restaurant. Please guide me on getting started.",
  });

  return (
    <section
      id="hero"
      style={{
        paddingTop: "clamp(88px, 9vw, 112px)",
        paddingBottom: "60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        {/* Crisp Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--zinc-100)",
            border: "1px solid var(--zinc-200)",
            padding: "6px 14px",
            borderRadius: "9999px",
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--zinc-800)",
            marginBottom: "20px",
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--emerald-500)" }} />
          <span>Zero Monthly Fees · Web, Mobile & Desktop Apps</span>
        </div>

        {/* Crisp Headline: Your 0 Subscription POS System */}
        <h1
          style={{
            fontSize: "clamp(2.3rem, 5.5vw, 4.2rem)",
            fontWeight: 900,
            color: "var(--zinc-950)",
            lineHeight: 1.12,
            letterSpacing: "-0.04em",
            maxWidth: "880px",
            margin: "0 auto 18px",
          }}
        >
          Your 0 Subscription POS System
        </h1>

        {/* Concise Value-Packed Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            color: "var(--zinc-500)",
            fontWeight: 500,
            maxWidth: "680px",
            margin: "0 auto 32px",
            lineHeight: 1.55,
          }}
        >
          QR-based digital menus, direct-to-vendor payment settlement, instant kitchen KOT routing, live table management, and GST billing on your existing devices.
        </p>

        {/* Two Requested Action Buttons: Contact Us Now & Learn More */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "44px",
          }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-easyio"
            style={{
              height: "50px",
              fontSize: "14px",
              padding: "0 24px",
              textDecoration: "none",
            }}
          >
            <MessageCircle size={17} style={{ marginRight: "4px" }} />
            <span>Contact Us Now</span>
            <div className="arrow-circle">
              <ArrowUpRight size={16} />
            </div>
          </a>

          <a
            href="#features"
            className="btn-easyio-ghost"
            style={{
              height: "50px",
              padding: "0 22px",
              fontSize: "14px",
              textDecoration: "none",
              color: "var(--zinc-800)",
            }}
          >
            <span>Learn More</span>
            <ArrowDown size={15} />
          </a>
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
              alt="OruPos 0-Subscription Restaurant POS Hardware and Table Station"
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
