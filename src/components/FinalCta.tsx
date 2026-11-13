"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function FinalCta() {
  const whatsappUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    customMessage: "Hi OruPos Team! I am ready to switch our restaurant to the 0-Subscription OruPos POS system. Please connect with me.",
  });

  return (
    <section className="section section-white">
      <div className="container">
        <div
          style={{
            borderRadius: "clamp(20px, 3vw, 32px)",
            backgroundColor: "var(--zinc-950)",
            color: "#FFFFFF",
            padding: "clamp(36px, 5vw, 60px) clamp(24px, 4vw, 52px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "28px",
            boxShadow: "0 12px 36px rgba(9, 9, 11, 0.15)",
          }}
        >
          <div style={{ position: "relative", zIndex: 10, maxWidth: "580px" }}>
            <h2
              style={{
                fontSize: "clamp(1.9rem, 3.4vw, 2.7rem)",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.035em",
                lineHeight: 1.16,
                marginBottom: "12px",
              }}
            >
              Ready to stop paying monthly POS rent?
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--zinc-400)",
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 450,
              }}
            >
              Equip your restaurant with full table management, live kitchen KOT routing, contactless QR menus, and direct bank settlement with zero monthly software fees.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/get-orupos"
              style={{
                height: "50px",
                padding: "0 26px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "var(--radius-full)",
                fontWeight: 750,
                fontSize: "13.5px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.15s ease",
                boxShadow: "0 2px 8px rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-100)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              <span>Get OruPOS Today</span>
              <ArrowUpRight size={16} />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "50px",
                padding: "0 20px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                borderRadius: "var(--radius-full)",
                fontWeight: 650,
                fontSize: "13px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <MessageCircle size={16} color="var(--emerald-500)" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
