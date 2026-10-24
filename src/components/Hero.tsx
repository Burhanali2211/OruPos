"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
        {/* Crisp Headline: Your 0 Subscription POS System */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
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
            margin: "0 auto 36px",
            lineHeight: 1.55,
          }}
        >
          QR-based digital menus, direct-to-vendor payment settlement, instant kitchen KOT routing, live table management, and GST billing on your existing devices.
        </p>

        {/* Action Buttons: Get OruPos POS, Contact Us Now & Learn More */}
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
          <Link
            href="/get-orupos"
            className="btn-easyio"
            style={{
              height: "50px",
              fontSize: "14px",
              padding: "0 24px",
              textDecoration: "none",
            }}
          >
            <span>Get OruPos POS</span>
            <div className="arrow-circle">
              <ArrowUpRight size={16} />
            </div>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-easyio-ghost"
            style={{
              height: "50px",
              padding: "0 22px",
              fontSize: "14px",
              textDecoration: "none",
              color: "var(--zinc-800)",
            }}
          >
            <MessageCircle size={16} color="var(--emerald-600)" />
            <span>Contact Us Now</span>
          </a>

          <a
            href="#features"
            style={{
              height: "50px",
              padding: "0 18px",
              fontSize: "13.5px",
              fontWeight: 700,
              textDecoration: "none",
              color: "var(--zinc-500)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>Learn More</span>
            <ArrowDown size={14} />
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
          </div>
        </div>
      </div>
    </section>
  );
}
