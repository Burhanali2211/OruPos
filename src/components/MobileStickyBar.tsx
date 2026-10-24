"use client";

import React from "react";
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
            ₹0
          </span>
          <span style={{ fontSize: "11px", color: "var(--zinc-400)", fontWeight: 600 }}>
            monthly fee
          </span>
        </div>
        <span style={{ fontSize: "10px", color: "var(--emerald-500)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          0-Subscription POS
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          style={{
            height: "38px",
            padding: "0 18px",
            backgroundColor: "#FFFFFF",
            color: "var(--zinc-950)",
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            borderRadius: "9999px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)",
          }}
        >
          <MessageCircle size={15} color="var(--emerald-600)" />
          <span>Contact Us Now</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}
