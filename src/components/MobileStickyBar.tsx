"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function MobileStickyBar() {
  const whatsappUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    customMessage: "Hi OruPos Team! I am interested in getting the 0-Subscription POS system for my restaurant. Please guide me.",
  });

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: "420px",
        backgroundColor: "rgba(9, 9, 11, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "var(--radius-full)",
        padding: "6px 8px 6px 18px",
        zIndex: 90,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
      className="mobile-sticky-bottom-bar"
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
          OruPOS
        </span>
        <span style={{ fontSize: "11px", color: "var(--zinc-400)", fontWeight: 500 }}>
          ₹0 / month
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--emerald-500)",
            textDecoration: "none",
          }}
        >
          <MessageCircle size={14} />
        </a>

        <Link
          href="/get-orupos"
          style={{
            height: "32px",
            padding: "0 13px",
            backgroundColor: "#FFFFFF",
            color: "var(--zinc-950)",
            fontSize: "11px",
            fontWeight: 650,
            borderRadius: "var(--radius-full)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            whiteSpace: "nowrap",
          }}
        >
          <span>Get Started</span>
          <ArrowUpRight size={11} />
        </Link>
      </div>
    </div>
  );
}
