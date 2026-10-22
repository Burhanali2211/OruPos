import React from "react";
import { MessageCircle, Phone, Truck, Clock, ShieldCheck, HeartHandshake } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

export default function TrustSection() {
  return (
    <section className="section section-white" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Dedicated Hospitality Concierge</span>
          <h2 className="section-title">Speak Directly With Our Onboarding Team</h2>
          <p className="section-desc">
            We are based in India and proudly serve food establishments nationwide. Reach out to our founders and menu team directly anytime.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            marginTop: "16px",
          }}
          className="trust-grid"
        >
          {/* WhatsApp Support */}
          <div
            className="glass-panel"
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-whatsapp-light)",
                color: "#128C7E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <MessageCircle size={26} />
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px", color: "var(--color-text-main)" }}>
              WhatsApp Concierge
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.55, marginBottom: "20px" }}>
              Snap photos of your current paper menu card or ask custom layout questions directly on WhatsApp.
            </p>
            <div style={{ marginTop: "auto" }}>
              <a
                href={ORUPOS_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-block"
                style={{ fontSize: "0.9375rem" }}
              >
                <MessageCircle size={18} />
                <span>Chat on {ORUPOS_CONFIG.contact.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Direct Phone Call */}
          <div
            className="glass-panel"
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-primary-light)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Phone size={26} />
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px", color: "var(--color-text-main)" }}>
              Direct Phone Support
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.55, marginBottom: "20px" }}>
              Prefer talking on the phone? Connect with our restaurant specialist for table recommendations and bulk quotes.
            </p>
            <div style={{ marginTop: "auto" }}>
              <a
                href={`tel:${ORUPOS_CONFIG.contact.phoneTel}`}
                className="btn btn-secondary btn-block"
                style={{ fontSize: "0.9375rem" }}
              >
                <Phone size={18} color="#047857" />
                <span>Call {ORUPOS_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Pan-India Express Delivery */}
          <div
            className="glass-panel"
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-accent-light)",
                color: "var(--color-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Truck size={26} />
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px", color: "var(--color-text-main)" }}>
              Pan-India Express Delivery
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.55, marginBottom: "20px" }}>
              Stands are individually foam-wrapped and shipped via tracked courier to your restaurant address across all states in India.
            </p>
            <div
              style={{
                marginTop: "auto",
                padding: "10px 14px",
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-main)",
              }}
            >
              <Clock size={16} color="#D97706" />
              <span>Dispatched within 48 business hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
