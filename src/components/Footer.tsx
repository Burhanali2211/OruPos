import React from "react";
import Image from "next/image";
import { MessageCircle, Phone, Mail, ShieldCheck, MapPin } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#142921",
        color: "#94A3B8",
        padding: "56px 0 28px",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
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
            <div style={{ marginBottom: "16px", filter: "brightness(0) invert(1)" }}>
              <Image src="/assets/logo.png" alt="OruPos Logo" width={130} height={40} />
            </div>
            <p style={{ fontSize: "0.9375rem", color: "#CBD5E1", maxWidth: "340px", marginBottom: "20px", lineHeight: 1.6 }}>
              Physical QR table stands and high-speed digital menu solutions engineered for Indian restaurants, cafes, dhabas, bakeries, and hotels.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <a
                  href={`tel:${ORUPOS_CONFIG.contact.phoneTel}`}
                  style={{ color: "#E2E8F0", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <Phone size={16} color="#34D399" />
                  <span>{ORUPOS_CONFIG.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={ORUPOS_CONFIG.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#E2E8F0", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <MessageCircle size={16} color="#25D366" />
                  <span>WhatsApp: {ORUPOS_CONFIG.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ORUPOS_CONFIG.contact.email}`}
                  style={{ color: "#E2E8F0", display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  <Mail size={16} color="#38BDF8" />
                  <span>{ORUPOS_CONFIG.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "16px",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><a href="#how-it-works" style={{ color: "#94A3B8" }}>How It Works</a></li>
              <li><a href="#what-you-get" style={{ color: "#94A3B8" }}>Hardware & Software Bundle</a></li>
              <li><a href="#demo" style={{ color: "#94A3B8" }}>Interactive Live Demo</a></li>
              <li><a href="#pricing" style={{ color: "#94A3B8" }}>Pricing Calculator</a></li>
              <li><a href="#faq" style={{ color: "#94A3B8" }}>Frequently Asked Questions</a></li>
              <li><a href="#contact" style={{ color: "#94A3B8" }}>Contact Support</a></li>
            </ul>
          </div>

          {/* Service Terms */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "0.875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "16px",
              }}
            >
              The OruPos Guarantee
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", color: "#CBD5E1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} color="#34D399" />
                <span>Flat ₹199 / Table (Zero Subscriptions)</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} color="#34D399" />
                <span>Done-For-You Menu Digitization</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} color="#34D399" />
                <span>Tracked Pan-India Delivery</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={16} color="#34D399" />
                <span>Dispatched within 48 Hours</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.8125rem",
          }}
        >
          <div>
            © 2026 {ORUPOS_CONFIG.legalEntity}. All rights reserved.
          </div>
          <div style={{ color: "#64748B" }}>
            Engineered for modern Indian hospitality & dining establishments.
          </div>
        </div>
      </div>
    </footer>
  );
}
