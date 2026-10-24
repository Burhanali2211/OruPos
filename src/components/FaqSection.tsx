"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is OruPos a complete Restaurant POS system?",
      a: "Yes. OruPos handles table management, live kitchen KOT routing, 5% restaurant GST billing, sales analytics, and contactless table ordering with zero monthly software fees.",
    },
    {
      q: "Why is there zero monthly subscription?",
      a: "Legacy POS software charges ₹1,500 to ₹4,000 every month in recurring rent. OruPos charges a one-time setup of ₹199 per table for hardware and onboarding, with zero monthly retainers.",
    },
    {
      q: "Do I need special billing machines or monitors?",
      a: "No. OruPos runs in the cloud on any device you already have — Android phones, iPhones, iPads, Android tablets, laptops, or desktop computers.",
    },
    {
      q: "How does the Kitchen KOT work?",
      a: "When an order is placed from a table or by staff, the KOT appears immediately on your kitchen display, tablet, or WhatsApp with table numbers and chef notes.",
    },
    {
      q: "Are physical acrylic table stands included?",
      a: "Yes. Every table gets a heavy-duty 3mm optical cast acrylic QR station printed with your logo, table number, and dedicated table QR, delivered to your door.",
    },
  ];

  return (
    <section className="section section-white" id="faq">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: "center" }}>
          <span className="section-kicker">FAQ</span>
          <h2 className="section-title">
            Frequently asked questions.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Answers about our zero-subscription POS software and table hardware.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  padding: "16px 0",
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
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    color: "var(--zinc-950)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    padding: 0,
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: isOpen ? "var(--zinc-950)" : "var(--zinc-100)",
                      color: isOpen ? "#FFFFFF" : "var(--zinc-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s ease",
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown
                      size={13}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.15s ease",
                      }}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div
                    style={{
                      paddingTop: "10px",
                      fontSize: "0.9rem",
                      color: "var(--zinc-500)",
                      lineHeight: 1.55,
                      fontWeight: 500,
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
