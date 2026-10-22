"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface HeaderProps {
  onOpenOrder: () => void;
}

export default function Header({ onOpenOrder }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
        }}
      >
        {/* Brand Logo */}
        <Link href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/assets/logo.png"
            alt="OruPos Logo"
            width={130}
            height={40}
            priority
            style={{ height: "38px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              listStyle: "none",
            }}
            className="nav-links"
          >
            <li>
              <a
                href="#designs"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-main)" }}
              >
                Card Designs
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-main)" }}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#what-you-get"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-main)" }}
              >
                Inclusions
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-main)" }}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#faq"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-main)" }}
              >
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href={ORUPOS_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-whatsapp-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "#FFFFFF",
              color: "#111111",
              border: "1px solid var(--color-border)",
              textDecoration: "none",
            }}
          >
            <MessageCircle size={15} color="#25D366" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenOrder}
            style={{ padding: "8px 18px", fontSize: "13px", minHeight: "38px" }}
          >
            Order Stands (₹199)
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              display: "none",
              color: "var(--color-text-main)",
            }}
            className="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#FFFFFF",
            padding: "24px",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <a
            href="#designs"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "17px", fontWeight: 600, padding: "10px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            Card Designs
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "17px", fontWeight: 600, padding: "10px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            How It Works
          </a>
          <a
            href="#what-you-get"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "17px", fontWeight: 600, padding: "10px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            Package Inclusions
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "17px", fontWeight: 600, padding: "10px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            Pricing (₹199 / Table)
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "17px", fontWeight: 600, padding: "10px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            Frequently Asked Questions
          </a>

          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
            >
              Order Table Stands (₹199/table)
            </button>
            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-block btn-lg"
            >
              <MessageCircle size={18} color="#25D366" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
