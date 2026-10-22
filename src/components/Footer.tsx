import React from "react";
import Image from "next/image";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#F9F9F8",
        color: "#666666",
        padding: "56px 0 32px",
        borderTop: "1px solid var(--color-border)",
        fontSize: "0.875rem",
      }}
      className="site-footer"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
          className="footer-top-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <Image src="/assets/logo.png" alt="OruPos Logo" width={120} height={38} />
            </div>
            <p style={{ fontSize: "0.9375rem", color: "#666666", maxWidth: "340px", marginBottom: "20px", lineHeight: 1.6 }}>
              Durable acrylic QR table stands and high-speed digital menu solutions for Indian dining establishments.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <a
                  href={`tel:${ORUPOS_CONFIG.contact.phoneTel}`}
                  style={{ color: "#111111", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 600 }}
                >
                  <Phone size={15} />
                  <span>{ORUPOS_CONFIG.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={ORUPOS_CONFIG.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#111111", display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 600 }}
                >
                  <MessageCircle size={15} color="#25D366" />
                  <span>WhatsApp: {ORUPOS_CONFIG.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ORUPOS_CONFIG.contact.email}`}
                  style={{ color: "#666666", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <Mail size={15} />
                  <span>{ORUPOS_CONFIG.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "#111111",
                fontSize: "0.8125rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><a href="#designs" style={{ color: "#666666" }}>Card Styles & Colors</a></li>
              <li><a href="#how-it-works" style={{ color: "#666666" }}>How It Works</a></li>
              <li><a href="#what-you-get" style={{ color: "#666666" }}>What&apos;s Included</a></li>
              <li><a href="#pricing" style={{ color: "#666666" }}>Pricing & Calculator</a></li>
              <li><a href="#faq" style={{ color: "#666666" }}>Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Delivery & Assurance */}
          <div>
            <h4
              style={{
                color: "#111111",
                fontSize: "0.8125rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
              }}
            >
              The OruPos Standard
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", color: "#666666" }}>
              <li><span>• Flat ₹199 / Table (Zero Subscriptions)</span></li>
              <li><span>• 3mm Heavyweight Optical Cast Acrylic</span></li>
              <li><span>• Done-For-You Menu Digitization</span></li>
              <li><span>• Tracked Doorstep Delivery Across India</span></li>
              <li><span>• Dispatched within 48 business hours</span></li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.8125rem",
            color: "#888888",
          }}
        >
          <div>
            Copyright 2026 {ORUPOS_CONFIG.legalEntity}. All rights reserved.
          </div>
          <div>
            Simple, honest table hardware for Indian restaurants.
          </div>
        </div>
      </div>
    </footer>
  );
}
