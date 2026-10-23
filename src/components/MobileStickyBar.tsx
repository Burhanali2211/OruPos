"use client";

import React from "react";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface MobileStickyBarProps {
  onOpenOrder: () => void;
}

export default function MobileStickyBar({ onOpenOrder }: MobileStickyBarProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 28px)",
        maxWidth: "460px",
        backgroundColor: "rgba(9, 9, 11, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "9999px",
        padding: "8px 12px 8px 20px",
        zIndex: 90,
        boxShadow: "0 12px 36px rgba(9, 9, 11, 0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}
      className="mobile-sticky-bottom-bar"
    >
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
          <span style={{ fontSize: "16px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            ₹199
          </span>
          <span style={{ fontSize: "11px", color: "var(--zinc-400)", fontWeight: 600 }}>
            / table
          </span>
        </div>
        <span style={{ fontSize: "10px", color: "var(--emerald-500)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Acrylic Stand + Menu Included
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <a
          href={ORUPOS_CONFIG.getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--emerald-500)",
            textDecoration: "none",
          }}
        >
          <MessageCircle size={16} />
        </a>

        <button
          type="button"
          onClick={onOpenOrder}
          style={{
            height: "38px",
            padding: "0 16px",
            backgroundColor: "#FFFFFF",
            color: "var(--zinc-950)",
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
          }}
        >
          <span>Order Now</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}
