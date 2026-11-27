"use client";

import React from "react";
import Link from "next/link";
import { Check, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface OnboardingSuccessProps {
  fullName: string;
  restaurantName: string;
  tables: number;
  city: string;
  phone: string;
  totalHardwareSetup: number;
  whatsappUrl: string;
}

export default function OnboardingSuccess({
  fullName,
  restaurantName,
  tables,
  city,
  phone,
  totalHardwareSetup,
  whatsappUrl,
}: OnboardingSuccessProps) {
  const displayPhone = phone.replace(/^(\+?91|0)/, "").trim();

  return (
    <div
      style={{
        maxWidth: "680px",
        margin: "20px auto 0",
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--border-hairline)",
        borderRadius: "clamp(24px, 4vw, 36px)",
        padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
        boxShadow: "var(--shadow-float)",
        textAlign: "center",
      }}
    >
      {/* Confirmation Mark */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "var(--zinc-100)",
          border: "1px solid var(--zinc-300)",
          color: "var(--zinc-950)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <Check size={28} strokeWidth={2.4} />
      </div>

      <h2
        style={{
          fontSize: "clamp(1.7rem, 3.2vw, 2.2rem)",
          fontWeight: 900,
          color: "var(--zinc-950)",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          margin: "0 0 12px",
        }}
      >
        Application Received, {fullName || "Partner"}
      </h2>

      <p
        style={{
          fontSize: "0.96rem",
          color: "var(--zinc-500)",
          lineHeight: 1.6,
          maxWidth: "500px",
          margin: "0 auto 26px",
        }}
      >
        We received your onboarding submission for{" "}
        <strong style={{ color: "var(--zinc-950)" }}>{restaurantName || "your restaurant"}</strong> ({tables} Tables in {city || "India"}).
        Our team will verify your menu catalog and dispatch table stands.
      </p>

      {/* Application Summary Box */}
      <div
        style={{
          backgroundColor: "var(--zinc-50)",
          borderRadius: "16px",
          padding: "20px",
          border: "1px solid var(--border-light)",
          textAlign: "left",
          marginBottom: "26px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontSize: "13px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--zinc-200)", paddingBottom: "8px" }}>
          <span style={{ color: "var(--zinc-500)" }}>Restaurant</span>
          <strong style={{ color: "var(--zinc-950)" }}>{restaurantName}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--zinc-200)", paddingBottom: "8px" }}>
          <span style={{ color: "var(--zinc-500)" }}>Software Fee</span>
          <strong style={{ color: "var(--zinc-950)" }}>₹0 / month (Zero Monthly Rental)</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--zinc-200)", paddingBottom: "8px" }}>
          <span style={{ color: "var(--zinc-500)" }}>Hardware Stands</span>
          <strong style={{ color: "var(--zinc-950)" }}>{tables} Table Stands (₹{totalHardwareSetup.toLocaleString("en-IN")})</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--zinc-500)" }}>Contact Number</span>
          <strong style={{ color: "var(--zinc-950)" }}>+91 {displayPhone}</strong>
        </div>
      </div>

      {/* Instant WhatsApp Action */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            height: "48px",
            fontSize: "13.5px",
            padding: "0 28px",
            textDecoration: "none",
            width: "100%",
            maxWidth: "380px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <MessageCircle size={16} />
          <span>Connect on WhatsApp</span>
          <ArrowRight size={15} />
        </a>

        <a
          href={`tel:${ORUPOS_CONFIG.contact.phoneTel}`}
          style={{
            fontSize: "12.5px",
            fontWeight: 600,
            color: "var(--zinc-500)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "6px",
          }}
        >
          <Phone size={13} />
          <span>Or call directly at {ORUPOS_CONFIG.contact.phoneDisplay}</span>
        </a>

        <Link
          href="/"
          style={{
            fontSize: "12px",
            color: "var(--zinc-400)",
            textDecoration: "none",
            marginTop: "12px",
          }}
        >
          Return to home
        </Link>
      </div>
    </div>
  );
}
