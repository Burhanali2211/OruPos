import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, ShieldCheck, Globe, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#FFFFFF",
        padding: "80px 0 36px",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.8fr 0.8fr 1fr",
            gap: "48px",
            marginBottom: "64px",
          }}
          className="footer-top-grid"
        >
          {/* Brand Column (Easyio style) */}
          <div>
            <Link href="#hero" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "var(--zinc-950)",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "18px",
                }}
              >
                O
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "var(--zinc-950)",
                    textTransform: "uppercase",
                  }}
                >
                  ORUPOS
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "var(--zinc-400)",
                    textTransform: "uppercase",
                    marginTop: "3px",
                  }}
                >
                  QR Stands & Digital Menus
                </span>
              </div>
            </Link>

            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--zinc-500)",
                lineHeight: 1.5,
                marginBottom: "24px",
                maxWidth: "340px",
              }}
            >
              Simple QR stands and digital menus for restaurants and cafes across India.
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={`mailto:${ORUPOS_CONFIG.contact.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "var(--zinc-600)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                  }}
                >
                  <Mail size={15} />
                </div>
                <span>{ORUPOS_CONFIG.contact.email}</span>
              </a>

              <a
                href={ORUPOS_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "var(--zinc-600)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--emerald-600)",
                  }}
                >
                  <MessageCircle size={15} />
                </div>
                <span>WhatsApp: {ORUPOS_CONFIG.contact.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--zinc-950)",
                marginBottom: "24px",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {["Styles", "How It Works", "Pricing", "FAQ"].map((label, idx) => {
                const hrefs = ["#designs", "#how-it-works", "#pricing", "#faq"];
                return (
                  <li key={idx}>
                    <a
                      href={hrefs[idx]}
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        color: "var(--zinc-400)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--zinc-950)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--zinc-400)")}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Hardware Specs */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--zinc-950)",
                marginBottom: "24px",
              }}
            >
              What You Get
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", color: "var(--zinc-500)", fontSize: "13px", fontWeight: 500 }}>
              <li><span>Sturdy acrylic stands</span></li>
              <li><span>Dual-sided table numbers</span></li>
              <li><span>Individual table QR codes</span></li>
              <li><span>Instant mobile digital menu</span></li>
              <li><span>Zero monthly subscription fees</span></li>
            </ul>
          </div>

          {/* Contact / Service Areas */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "var(--zinc-950)",
                marginBottom: "24px",
              }}
            >
              Pan-India Delivery
            </h4>
            <p style={{ fontSize: "13px", color: "var(--zinc-500)", lineHeight: 1.6, marginBottom: "14px", fontWeight: 500 }}>
              Doorstep courier delivery across Delhi NCR, Mumbai, Bangalore, Hyderabad, Srinagar, and all Indian cities.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "var(--zinc-50)",
                border: "1px solid var(--zinc-200)",
                padding: "6px 12px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--zinc-950)",
              }}
            >
              <span>Dispatched in 48 Hours</span>
              <ArrowUpRight size={12} />
            </div>
          </div>
        </div>

        {/* Bottom Trust & Copyright */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "24px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            fontSize: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", color: "var(--zinc-500)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "12px" }}>
              <ShieldCheck size={14} color="var(--emerald-600)" />
              <span>Durable Acrylic</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "12px" }}>
              <Globe size={14} color="var(--emerald-600)" />
              <span>Pan-India Shipping</span>
            </span>
          </div>

          <div style={{ color: "var(--zinc-400)", fontWeight: 500, fontSize: "11px" }}>
            © 2026 {ORUPOS_CONFIG.legalEntity} · All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
