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
                  Zero-Subscription POS
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
              The complete zero-subscription restaurant POS system. Floor table management, kitchen KOT, contactless QR ordering, and GST billing.
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
              POS Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "POS Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "POS vs Others", href: "#comparison" },
                { label: "Pricing", href: "#pricing" },
                { label: "Blog & Guides", href: "/blog" },
                { label: "FAQ", href: "#faq" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
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
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hardware & Software Specs */}
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
              The POS Package
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", color: "var(--zinc-500)", fontSize: "13px", fontWeight: 500 }}>
              <li><span>Full Cloud POS Software</span></li>
              <li><span>Real-Time Kitchen KOT Engine</span></li>
              <li><span>Contactless Table QR Ordering</span></li>
              <li><span>GST Invoicing & WhatsApp Bills</span></li>
              <li><span>3mm Cast Acrylic Table Stations</span></li>
              <li><span>Zero Monthly Subscription</span></li>
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
                marginBottom: "20px",
              }}
            >
              <span>Dispatched in 48 Hours</span>
              <ArrowUpRight size={12} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--zinc-950)", marginBottom: "4px" }}>
                Restaurant Guides
              </span>
              <Link href="/blog/best-restaurant-pos-software-kashmir-srinagar" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Kashmir & Srinagar POS Guide
              </Link>
              <Link href="/blog/how-to-open-a-cafe-in-srinagar-kashmir-cost-licenses-setup" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Open a Cafe in Srinagar Guide
              </Link>
              <Link href="/blog/restaurant-billing-machine-vs-pos-software-india-comparison" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Billing Machine vs POS Software
              </Link>
              <Link href="/blog/petpooja-vs-posist-vs-orupos-restaurant-billing-comparison" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Petpooja vs OruPOS Pricing
              </Link>
              <Link href="/blog/how-restaurants-prevent-staff-theft-billing-leaks-india" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Stop Counter Theft & Fraud
              </Link>
              <Link href="/blog" style={{ fontSize: "12px", color: "var(--emerald-600)", fontWeight: 700, textDecoration: "none", lineHeight: 1.4, marginTop: "2px" }}>
                → Explore All 14 Guides
              </Link>
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
