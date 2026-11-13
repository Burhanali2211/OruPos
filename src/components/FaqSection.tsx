"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is OruPOS a complete restaurant POS system?",
      a: "Yes. OruPOS handles table floor management, live kitchen KOT routing, 5% restaurant GST billing, sales analytics, and contactless table ordering with zero monthly software fees.",
    },
    {
      q: "Why is there zero monthly subscription?",
      a: "Most legacy POS companies charge ₹1,500 to ₹4,000 every month in software rent. We believe in software ownership. You pay a one-time onboarding fee for your custom table QR stands, and keep the software forever with zero recurring fees.",
    },
    {
      q: "Do I need special billing machines or monitors?",
      a: "No. OruPOS runs in the cloud on any device you already own — Android phones, iPhones, iPads, Android tablets, laptops, or Windows desktop computers.",
    },
    {
      q: "How does the Kitchen KOT work?",
      a: "When an order is placed from a table QR or by waitstaff, the KOT appears immediately on your kitchen display tablet, screen, or prints directly to thermal KOT printers with table numbers and chef notes.",
    },
    {
      q: "Are physical acrylic table stands included?",
      a: "Yes. Every table gets a heavy-duty 3mm optical cast acrylic QR station printed with your logo, table number, and dedicated table QR, delivered to your door.",
    },
    {
      q: "Do you take any commission on customer orders?",
      a: "Zero. We take 0% commission on all orders. Customer UPI and card payments deposit directly into your own bank account.",
    },
  ];

  return (
    <section className="section section-white" id="faq">
      <div className="container container-narrow">
        <div className="section-header" style={{ textAlign: "center" }}>
          <span className="section-kicker">Frequently Asked Questions</span>
          <h2 className="section-title">
            Everything you need to know.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Direct answers about zero-subscription POS software and tabletop hardware.
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
                  padding: "18px 0",
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
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    color: "var(--zinc-950)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "14px",
                    padding: 0,
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
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
                      size={14}
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
                      paddingTop: "12px",
                      fontSize: "0.93rem",
                      color: "var(--zinc-500)",
                      lineHeight: 1.6,
                      fontWeight: 450,
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
