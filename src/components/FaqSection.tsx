"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do customers need to download an app or register?",
      a: "No, absolutely not. Customers do not download any application or type phone numbers. They simply scan the QR stand using their regular phone camera (iPhone or Android), Google Lens, Paytm, PhonePe, or WhatsApp. The menu opens immediately in their mobile browser in under 1 second.",
    },
    {
      q: "Does every table get a separate QR code?",
      a: "Yes. Every single dining table gets its own dedicated QR stand with its specific table number clearly printed on both sides (e.g. Table 01, Table 02, Table 03). The QR code is tied directly to that table, so wait staff always know where the order or call is coming from.",
    },
    {
      q: "What does the ₹199 per table package include?",
      a: "The ₹199 per table package includes: your heavy-duty 3mm optical cast acrylic stand, dual-sided table number, unique high-res QR code, high-speed mobile digital menu website, custom restaurant branding (logo, colors, address), and 100% complete menu digitization done by our team.",
    },
    {
      q: "Do I receive physical acrylic stands delivered to my restaurant?",
      a: "Yes! You receive real, high-quality, transparent acrylic T-stands delivered securely to your doorstep anywhere in India. They are water-resistant, gravy-spill proof, heat-tolerant, and designed specifically for daily restaurant table use.",
    },
    {
      q: "Can I change dish prices or items later without reprinting?",
      a: "Yes, that is the biggest superpower of OruPos! Whenever item prices change or a seasonal dish is added, your digital menu updates online in seconds. You never have to reprint the physical acrylic table stands or waste money on paper menu booklets.",
    },
    {
      q: "How does the ordering and setup process work?",
      a: "It takes under 3 minutes: Click 'Get Your Digital Menu', pick your number of tables, enter your restaurant name and phone number, and share photos of your current paper menu card on WhatsApp. Our team formats all dishes and ships your stands within 48 hours.",
    },
    {
      q: "Can I test the customer experience before purchasing?",
      a: "Yes! Scroll to the Live Demo section above and point your phone camera at the test QR code, or click 'See Live Demo' to interact with our live simulated restaurant right now.",
    },
  ];

  return (
    <section className="section section-subtle" id="faq">
      <div className="container container-narrow">
        <div className="section-header">
          <span className="section-tag">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Everything you need to know about OruPos table stands, digital menus, and pan-India delivery.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: isOpen ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: isOpen ? "0 4px 15px rgba(4, 120, 87, 0.08)" : "var(--shadow-subtle)",
                  transition: "all 0.2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: isOpen ? "var(--color-primary)" : "var(--color-text-main)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: isOpen ? "var(--color-primary-light)" : "var(--bg-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ChevronDown
                      size={18}
                      color={isOpen ? "#047857" : "#64748B"}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 22px",
                      fontSize: "0.9375rem",
                      color: "var(--color-text-body)",
                      lineHeight: 1.65,
                      borderTop: "1px dashed var(--color-border)",
                      marginTop: "4px",
                      paddingTop: "16px",
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
