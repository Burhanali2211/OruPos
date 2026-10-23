"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface HeaderProps {
  onOpenOrder: () => void;
}

export default function Header({ onOpenOrder }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: "calc(100% - 24px)",
          maxWidth: "1140px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(228, 228, 231, 0.7)",
          borderRadius: "9999px",
          padding: "10px 18px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo (Easyio style) */}
          <Link
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(9, 9, 11, 0.15)",
              }}
            >
              O
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span
                style={{
                  fontWeight: 900,
                  letterSpacing: "-0.035em",
                  color: "var(--zinc-950)",
                  fontSize: "17px",
                  textTransform: "uppercase",
                }}
              >
                ORUPOS
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--zinc-400)",
                  textTransform: "uppercase",
                }}
              >
                QR Stands & Digital Menus
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pill Capsule */}
          <nav aria-label="Main Navigation" className="hidden-mobile">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(244, 244, 245, 0.65)",
                padding: "4px",
                borderRadius: "9999px",
                border: "1px solid rgba(228, 228, 231, 0.5)",
                backdropFilter: "blur(8px)",
                gap: "2px",
              }}
            >
              {[
                { href: "#designs", label: "Styles" },
                { href: "#how-it-works", label: "How It Works" },
                { href: "#comparison", label: "Comparison" },
                { href: "#pricing", label: "Pricing" },
                { href: "#faq", label: "FAQ" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  style={{
                    padding: "7px 16px",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    color: "var(--zinc-600)",
                    backgroundColor: "transparent",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--zinc-950)";
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--zinc-600)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right Action Buttons (Easyio style) */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Inquiry"
              className="hidden-mobile"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1px solid var(--zinc-200)",
                backgroundColor: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--emerald-600)",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-50)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              <MessageCircle size={15} />
            </a>

            <button
              type="button"
              onClick={onOpenOrder}
              style={{
                height: "38px",
                padding: "0 18px",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 8px 16px rgba(9, 9, 11, 0.12)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-800)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-950)")}
            >
              <span>Order Stands</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="show-mobile"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1px solid var(--zinc-200)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--zinc-950)",
                cursor: "pointer",
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Easyio style) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            zIndex: 95,
            padding: "90px 24px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "#designs", label: "Styles" },
              { href: "#how-it-works", label: "How It Works" },
              { href: "#pricing", label: "Pricing (₹199 / Table)" },
              { href: "#faq", label: "FAQ" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--zinc-950)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--zinc-100)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="btn-easyio"
              style={{ width: "100%", height: "54px" }}
            >
              <span>Order Table Stands — ₹199 / Table</span>
              <div className="arrow-circle">
                <ArrowUpRight size={18} />
              </div>
            </button>

            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-easyio-ghost"
              style={{ width: "100%", height: "48px", justifyContent: "center" }}
            >
              <MessageCircle size={16} color="var(--emerald-600)" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
