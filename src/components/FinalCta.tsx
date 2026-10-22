"use client";

import React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface FinalCtaProps {
  onOpenOrder: () => void;
}

export default function FinalCta({ onOpenOrder }: FinalCtaProps) {
  return (
    <section className="section section-white">
      <div className="container container-narrow" style={{ textAlign: "center" }}>
        <span className="section-kicker">Get Started</span>
        <h2 className="section-title">Ready to put your menu online?</h2>
        <p className="section-desc" style={{ margin: "0 auto 32px" }}>
          Get durable acrylic table stands and an instant mobile digital menu for just ₹199 per table.
          Complete menu digitization included.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={onOpenOrder}
          >
            <span>Order Your Stands</span>
            <ArrowRight size={16} />
          </button>

          <a
            href={ORUPOS_CONFIG.getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-lg"
          >
            <MessageCircle size={16} color="#25D366" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
          Dispatched within 48 hours • Doorstep delivery across all Indian states
        </div>
      </div>
    </section>
  );
}
