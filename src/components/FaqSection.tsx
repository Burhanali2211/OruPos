"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do customers need an app to scan?",
      a: "No. Guests simply scan with their phone camera, Google Lens, or Paytm. The menu opens immediately in their mobile browser in under a second.",
    },
    {
      q: "Does each table get its own number and QR code?",
      a: "Yes. Every stand has your restaurant name and table number printed clearly on both sides (e.g. Table 01, Table 02), with a dedicated QR code for each table.",
    },
    {
      q: "What is included in the ₹199 price?",
      a: "The acrylic stand, custom printing with your logo and table numbers, complete digital menu setup by our team, and lifetime hosting.",
    },
    {
      q: "Can I change dish prices or add items later?",
      a: "Yes. Just message us on WhatsApp whenever you want to update prices or add dishes. We update your online menu immediately without any reprint needed.",
    },
    {
      q: "How fast is delivery?",
      a: "We print and dispatch within 48 hours. Doorstep delivery takes 3 to 5 business days across India.",
    },
  ];

  return (
    <section className="section section-white" id="faq">
      <div className="container container-narrow">
        <div className="section-header">
          <div className="section-kicker-pill">
            <div className="kicker-dot" />
            <span className="kicker-text">FAQ</span>
          </div>
          <h2 className="section-title">
            Frequently asked questions.
          </h2>
          <p className="section-desc">
            Simple answers to common questions about OruPos table stands and digital menus.
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
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--zinc-950)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    padding: 0,
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: isOpen ? "var(--zinc-950)" : "var(--zinc-100)",
                      color: isOpen ? "#FFFFFF" : "var(--zinc-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown
                      size={14}
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
                      paddingTop: "12px",
                      fontSize: "0.95rem",
                      color: "var(--zinc-500)",
                      lineHeight: 1.6,
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
