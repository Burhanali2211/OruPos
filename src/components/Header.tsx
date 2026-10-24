"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    customMessage: "Hi OruPos Team! I am interested in getting the 0-Subscription POS system for my restaurant. Please guide me.",
  });

  return (
    <>
      <header
        className="site-sticky-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-hairline)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
          transition: "all 0.2s ease",
        }}
      >
        <div
          className="header-inner-container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo */}
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
              alt="OruPos"
              style={{
                height: "30px",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
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
                POS
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 750,
                  letterSpacing: "0.08em",
                  color: "var(--zinc-400)",
                  textTransform: "uppercase",
                }}
              >
                Zero-Subscription
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Clean & Uncluttered */}
          <nav aria-label="Main Navigation" className="hidden-mobile">
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              {[
                { href: "#how-it-works", label: "How It Works" },
                { href: "#comparison", label: "POS vs Others" },
                { href: "#faq", label: "FAQ" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  style={{
                    fontSize: "13px",
                    fontWeight: 650,
                    letterSpacing: "-0.01em",
                    color: "var(--zinc-600)",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--zinc-950)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--zinc-600)")}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Inquiry"
              className="hidden-mobile"
              style={{
                height: "38px",
                padding: "0 14px",
                borderRadius: "9999px",
                border: "1px solid var(--zinc-200)",
                backgroundColor: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--zinc-700)",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 650,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--zinc-50)";
                e.currentTarget.style.borderColor = "var(--zinc-300)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.borderColor = "var(--zinc-200)";
              }}
            >
              <MessageCircle size={15} color="var(--emerald-600)" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/get-orupos"
              className="header-order-btn"
              style={{
                height: "38px",
                padding: "0 18px",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 700,
                borderRadius: "9999px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(9, 9, 11, 0.1)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-800)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-950)")}
            >
              <span className="hidden-mobile">Get OruPos</span>
              <span className="show-mobile" style={{ display: "none" }}>Get POS</span>
              <ArrowUpRight size={13} />
            </Link>

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
                backgroundColor: "#FFFFFF",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--zinc-950)",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer attached right below sticky header */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "58px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 99,
            padding: "20px 20px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTop: "1px solid var(--zinc-200)",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#comparison", label: "POS vs Others" },
              { href: "#faq", label: "FAQ" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--zinc-950)",
                  letterSpacing: "-0.01em",
                  padding: "15px 4px",
                  borderBottom: "1px solid var(--zinc-100)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={15} color="var(--zinc-400)" />
              </a>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
            <Link
              href="/get-orupos"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-easyio"
              style={{ width: "100%", height: "50px", fontSize: "13px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
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
              onClick={() => setMobileMenuOpen(false)}
              className="btn-easyio-ghost"
              style={{ width: "100%", height: "46px", justifyContent: "center", fontSize: "13px", textDecoration: "none" }}
            >
              <MessageCircle size={16} color="var(--emerald-600)" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
