"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = ORUPOS_CONFIG.getWhatsAppUrl({
    customMessage: "Hi OruPos Team! I am interested in getting the 0-Subscription POS system for my restaurant. Please guide me.",
  });

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 100,
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          transition: "all 0.2s ease",
        }}
      >
        <div
          className="header-inner-container"
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
          {/* Minimalist Logo */}
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
                display: "block",
              }}
            />
            <span
              style={{
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--zinc-950)",
                fontSize: "15px",
                textTransform: "uppercase",
              }}
            >
              POS
            </span>
          </Link>

          {/* Minimalist Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden-mobile">
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              {[
                { href: "#features", label: "Features" },
                { href: "#demo", label: "Demo" },
                { href: "#designs", label: "Hardware" },
                { href: "#comparison", label: "Pricing" },
                { href: "#faq", label: "FAQ" },
                { href: "/blog", label: "Guides" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
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

          {/* Minimalist Right Action */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden-mobile"
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--zinc-500)",
                textDecoration: "none",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--zinc-950)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--zinc-500)")}
            >
              WhatsApp
            </a>

            <Link
              href="/get-orupos"
              style={{
                height: "34px",
                padding: "0 14px",
                backgroundColor: "var(--zinc-950)",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 600,
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                transition: "background-color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-800)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--zinc-950)")}
            >
              <span>Get Started</span>
              <ArrowUpRight size={12} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="show-mobile"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "var(--radius-full)",
                border: "none",
                backgroundColor: "transparent",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--zinc-950)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Minimalist Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#FFFFFF",
            zIndex: 99,
            padding: "24px 20px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              { href: "#features", label: "Features" },
              { href: "#demo", label: "Demo" },
              { href: "#designs", label: "Hardware" },
              { href: "#comparison", label: "Pricing" },
              { href: "#faq", label: "FAQ" },
              { href: "/blog", label: "Guides" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "16px",
                  fontWeight: 550,
                  color: "var(--zinc-950)",
                  padding: "12px 4px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={14} color="var(--zinc-400)" />
              </a>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "24px" }}>
            <Link
              href="/get-orupos"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary"
              style={{ width: "100%", height: "44px", fontSize: "13px" }}
            >
              <span>Get Started</span>
              <ArrowUpRight size={14} />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary"
              style={{ width: "100%", height: "44px", fontSize: "13px" }}
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
