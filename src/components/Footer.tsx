import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, ShieldCheck, Globe, ArrowUpRight } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#FFFFFF",
        padding: "72px 0 36px",
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
            marginBottom: "56px",
          }}
          className="footer-top-grid"
        >
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
              <img
                src="/assets/logo.png"
                alt="OruPOS"
                style={{
                  height: "26px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "var(--zinc-950)",
                }}
              >
                OruPOS
              </span>
            </Link>

            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "var(--zinc-500)",
                lineHeight: 1.6,
                marginBottom: "22px",
                maxWidth: "340px",
              }}
            >
              The complete zero-subscription restaurant POS system. Floor table management, kitchen KOT, contactless QR ordering, and GST billing.
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`mailto:${ORUPOS_CONFIG.contact.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--zinc-600)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 550,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--zinc-950)",
                  }}
                >
                  <Mail size={14} />
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
                  gap: "10px",
                  color: "var(--zinc-600)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 550,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid var(--zinc-200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--emerald-600)",
                  }}
                >
                  <MessageCircle size={14} />
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
                fontWeight: 850,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--zinc-950)",
                marginBottom: "20px",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Get OruPOS", href: "/get-orupos" },
                { label: "Core Features", href: "#features" },
                { label: "Live Interactive Demo", href: "#demo" },
                { label: "Tabletop Hardware", href: "#designs" },
                { label: "OruPOS vs Others", href: "#comparison" },
                { label: "FAQ", href: "#faq" },
                { label: "Guides & Articles", href: "/blog" },
              ].map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "13px",
                      fontWeight: 550,
                      color: "var(--zinc-500)",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--zinc-950)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--zinc-500)")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* POS Features */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 850,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--zinc-950)",
                marginBottom: "20px",
              }}
            >
              Capabilities
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", color: "var(--zinc-500)", fontSize: "13px", fontWeight: 500 }}>
              <li><span>Cloud POS Software</span></li>
              <li><span>Real-Time Kitchen KOT</span></li>
              <li><span>Contactless Table QR Ordering</span></li>
              <li><span>GST Invoicing & WhatsApp Bills</span></li>
              <li><span>3mm Cast Acrylic Stands</span></li>
              <li><span>Zero Monthly Subscription</span></li>
            </ul>
          </div>

          {/* Delivery & Guides */}
          <div>
            <h4
              style={{
                fontSize: "11px",
                fontWeight: 850,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--zinc-950)",
                marginBottom: "20px",
              }}
            >
              Pan-India Delivery
            </h4>
            <p style={{ fontSize: "13px", color: "var(--zinc-500)", lineHeight: 1.6, marginBottom: "14px", fontWeight: 450 }}>
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
                borderRadius: "var(--radius-full)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                color: "var(--zinc-950)",
                marginBottom: "18px",
              }}
            >
              <span>Dispatched within 48 Hours</span>
              <ArrowUpRight size={12} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--zinc-950)", marginBottom: "4px" }}>
                Popular Guides
              </span>
              <Link href="/blog/best-restaurant-pos-software-kashmir-srinagar" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Kashmir & Srinagar POS Guide
              </Link>
              <Link href="/blog/restaurant-billing-machine-vs-pos-software-india-comparison" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Billing Machine vs POS Software
              </Link>
              <Link href="/blog/petpooja-vs-posist-vs-orupos-restaurant-billing-comparison" style={{ fontSize: "12px", color: "var(--zinc-500)", textDecoration: "none", lineHeight: 1.4 }}>
                • Petpooja vs OruPOS Pricing
              </Link>
              <Link href="/blog" style={{ fontSize: "12px", color: "var(--emerald-600)", fontWeight: 700, textDecoration: "none", lineHeight: 1.4, marginTop: "4px" }}>
                → View All 14 Restaurant Guides
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
              <span>3mm Cast Acrylic</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "12px" }}>
              <Globe size={14} color="var(--emerald-600)" />
              <span>Pan-India Shipping</span>
            </span>
          </div>

          <div style={{ color: "var(--zinc-400)", fontWeight: 500, fontSize: "11px" }}>
            © {new Date().getFullYear()} OruPos · A product of{" "}
            <a
              href="https://easyio.tech"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline", fontWeight: 600 }}
              title="Easyio Technologies • Enterprise Software & Platforms"
            >
              Easyio Technologies
            </a>{" "}
            · All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
