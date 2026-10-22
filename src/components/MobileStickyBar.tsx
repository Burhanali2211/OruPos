"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface MobileStickyBarProps {
  onOpenOrder: () => void;
}

export default function MobileStickyBar({ onOpenOrder }: MobileStickyBarProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid var(--color-border)",
        padding: "10px 16px",
        zIndex: 90,
        boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.08)",
      }}
      className="mobile-sticky-bottom-bar"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--color-primary)" }}>
            ₹199 / table
          </span>
          <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
            Acrylic Stand Included
          </span>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href={ORUPOS_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: "8px 14px", fontSize: "13px", minHeight: "40px" }}
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenOrder}
            style={{ padding: "8px 16px", fontSize: "13px", minHeight: "40px" }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
