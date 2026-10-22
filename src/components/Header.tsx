"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface HeaderProps {
  onOpenOrder: () => void;
}

export default function Header({ onOpenOrder }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--color-border)",
        boxShadow: scrolled ? "0 4px 20px -2px rgba(15, 23, 42, 0.08)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "74px",
        }}
      >
        {/* Brand Logo & Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/assets/logo.png"
              alt="OruPos Logo"
              width={140}
              height={44}
              priority
              style={{ height: "42px", width: "auto", objectFit: "contain" }}
            />
          </Link>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--color-primary)",
              backgroundColor: "var(--color-primary-light)",
              padding: "2px 8px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            🇮🇳 Made For India
          </span>
        </div>

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
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-body)" }}
              >
                Card Designs
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-body)" }}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#what-you-get"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-body)" }}
              >
                What You Get
              </a>
            </li>
            <li>
              <a
                href="#demo"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-body)" }}
              >
                Live Demo
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-body)" }}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#faq"
                style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-text-body)" }}
              >
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href={ORUPOS_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-whatsapp-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "var(--color-whatsapp-light)",
              color: "#128C7E",
              border: "1px solid rgba(37, 211, 102, 0.3)",
              textDecoration: "none",
            }}
          >
            <MessageCircle size={16} />
            <span>WhatsApp Us</span>
          </a>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenOrder}
            style={{ padding: "8px 20px", fontSize: "14px", minHeight: "42px" }}
          >
            <span>Get Started</span>
            <ArrowRight size={15} />
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
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "74px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            padding: "24px",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "18px", fontWeight: 600, padding: "12px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            How It Works
          </a>
          <a
            href="#what-you-get"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "18px", fontWeight: 600, padding: "12px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            What You Get
          </a>
          <a
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "18px", fontWeight: 600, padding: "12px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            Customer Demo
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "18px", fontWeight: 600, padding: "12px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            Pricing & Table Calculator
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: "18px", fontWeight: 600, padding: "12px 0", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-main)" }}
          >
            Frequently Asked Questions
          </a>

          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
            >
              Get Your Digital Menu
            </button>
            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-block btn-lg"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
