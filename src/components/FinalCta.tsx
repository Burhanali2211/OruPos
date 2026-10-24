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
            borderRadius: "clamp(20px, 3vw, 36px)",
            backgroundColor: "var(--zinc-950)",
            color: "#FFFFFF",
            padding: "clamp(32px, 5vw, 56px) clamp(20px, 4vw, 48px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            boxShadow: "0 16px 40px rgba(9, 9, 11, 0.2)",
          }}
        >
          <div style={{ position: "relative", zIndex: 10, maxWidth: "560px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "var(--zinc-400)",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "10px",
              }}
            >
              GET STARTED TODAY
            </span>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.18,
                marginBottom: "10px",
              }}
            >
              Your 0 Subscription POS System is ready.
            </h2>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--zinc-400)",
                lineHeight: 1.55,
                margin: 0,
                fontWeight: 500,
              }}
            >
              Manage live tables, route kitchen KOTs, offer QR menus, and settle payments directly to your bank account with zero monthly software fees.
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
                height: "48px",
                padding: "0 24px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "13px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-100)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              <span>Get OruPos POS</span>
              <ArrowUpRight size={15} />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "48px",
                padding: "0 18px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                borderRadius: "9999px",
                fontWeight: 700,
                fontSize: "12.5px",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <MessageCircle size={15} color="var(--emerald-500)" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
