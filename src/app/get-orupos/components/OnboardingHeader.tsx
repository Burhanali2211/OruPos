"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function OnboardingHeader() {
  return (
    <header
      style={{
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
          }}
        >
          <img
            src="/assets/logo.png"
            alt="OruPOS"
            style={{
              height: "24px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              fontWeight: 800,
              color: "var(--zinc-950)",
              fontSize: "17px",
              letterSpacing: "-0.03em",
            }}
          >
            OruPOS
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/"
            style={{
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--zinc-500)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>

          <a
            href={ORUPOS_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: "34px",
              padding: "0 14px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "var(--zinc-100)",
              border: "1px solid var(--border-light)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 650,
              color: "var(--zinc-800)",
              textDecoration: "none",
            }}
          >
            <MessageCircle size={14} />
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </header>
  );
}
