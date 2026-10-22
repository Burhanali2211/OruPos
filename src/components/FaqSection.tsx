"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do customers need to download an app or register?",
      a: "No. Customers scan the QR stand with their regular phone camera (iPhone or Android), Google Lens, Paytm, PhonePe, or WhatsApp. The menu opens immediately in their mobile browser in under 1 second without any app or login.",
    },
    {
      q: "Does every table get an individual QR code?",
      a: "Yes. Every single dining table gets its own physical stand with its specific table number clearly printed (e.g. Table 01, Table 02, Table 03). The QR code is tied directly to that table number.",
    },
    {
      q: "What does the ₹199 per table price include?",
      a: "Everything is included: the 3mm optical cast acrylic stand, dual-sided table number, unique high-contrast QR code, mobile digital menu website, custom restaurant branding, and 100% complete menu digitization done by our team.",
    },
    {
      q: "Can I update dish prices or items later without reprinting stands?",
      a: "Yes. Whenever item prices change or a seasonal dish is added, your digital menu updates online in seconds. You never have to reprint the physical acrylic table stands or waste money reprinting paper booklets.",
    },
    {
      q: "How does the ordering and delivery process work?",
      a: "It takes under 3 minutes: Click 'Order Stands', select your number of tables, enter your restaurant details, and share photos of your current paper menu card on WhatsApp. Our team formats your dishes and ships your stands within 48 hours.",
    },
    {
      q: "Can I have my own custom subdomain like myrestaurant.orupos.in?",
      a: "Yes! Every restaurant gets its own dedicated address (e.g. yourrestaurant.orupos.in), so diners can bookmark or access your menu directly anytime.",
    },
  ];

  return (
    <section className="section section-subtle" id="faq">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="section-kicker">Frequent Questions</span>
          <h2 className="section-title">Questions & answers.</h2>
          <p className="section-desc">
            Everything you need to know about OruPos table stands, digital menus, and pan-India delivery.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  borderTop: "1px solid var(--color-border)",
                  padding: "20px 0",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--color-text-main)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    padding: 0,
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    color="#767676"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.15s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {isOpen && (
                  <div
                    style={{
                      paddingTop: "12px",
                      fontSize: "0.9375rem",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
