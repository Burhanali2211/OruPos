import React from "react";
import { Check, X, ShieldCheck } from "lucide-react";

interface PricingComparisonProps {
  onOpenOrder: () => void;
}

export default function PricingComparison({ onOpenOrder }: PricingComparisonProps) {
  const comparisonRows = [
    {
      feature: "Monthly Software Fee",
      orupos: "₹0 (Zero forever)",
      others: "₹1,500 – ₹4,000 / month",
      isAdvantage: true,
    },
    {
      feature: "Commission on Orders",
      orupos: "0% Commission",
      others: "2% to 5% or platform cuts",
      isAdvantage: true,
    },
    {
      feature: "Physical Table QR Stands Included",
      orupos: "Yes, 3mm solid acrylic stands",
      others: "No (DIY paper printouts)",
      isAdvantage: true,
    },
    {
      feature: "Menu Setup & Typing",
      orupos: "Done for you via WhatsApp",
      others: "Manual data entry by owner",
      isAdvantage: true,
    },
    {
      feature: "Price Updates Later",
      orupos: "Free on WhatsApp anytime",
      others: "Reprint paper or extra fee",
      isAdvantage: true,
    },
    {
      feature: "Guest App Download Needed",
      orupos: "No app required (instant scan)",
      others: "Often requires app or login",
      isAdvantage: true,
    },
    {
      feature: "Annual Cost for 10 Tables",
      orupos: "₹1,990 one-time",
      others: "₹18,000 – ₹48,000 every year",
      isAdvantage: true,
    },
  ];

  return (
    <section className="section section-white" id="comparison">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center" }}>
          <div className="section-kicker-pill" style={{ justifyContent: "center" }}>
            <div className="kicker-dot" />
            <span className="kicker-text">PRICING COMPARISON</span>
          </div>
          <h2 className="section-title">
            Why OruPos is the best choice for your restaurant.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            See how our ₹0 subscription model compares to traditional POS systems that charge hefty monthly fees.
          </p>
        </div>

        {/* Comparison Table Box */}
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-hairline)",
            borderRadius: "clamp(20px, 3vw, 36px)",
            overflow: "hidden",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr 1fr",
              padding: "20px 24px",
              backgroundColor: "var(--zinc-50)",
              borderBottom: "1px solid var(--border-subtle)",
              fontWeight: 800,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <div style={{ color: "var(--zinc-500)" }}>Feature</div>
            <div style={{ color: "var(--zinc-950)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--emerald-500)" }} />
              <span>OruPos (0 Subscription)</span>
            </div>
            <div style={{ color: "var(--zinc-400)" }}>Traditional POS Apps</div>
          </div>

          {/* Table Body */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.3fr 1fr 1fr",
                  padding: "18px 24px",
                  borderBottom: idx < comparisonRows.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  alignItems: "center",
                  fontSize: "14px",
                  backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "rgba(250, 250, 250, 0.5)",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--zinc-800)" }}>
                  {row.feature}
                </div>
                <div style={{ fontWeight: 700, color: "var(--zinc-950)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Check size={16} color="var(--emerald-600)" strokeWidth={2.5} />
                  <span>{row.orupos}</span>
                </div>
                <div style={{ color: "var(--zinc-500)", fontWeight: 500, display: "flex", alignItems: "center", gap: "8px" }}>
                  <X size={15} color="var(--zinc-400)" strokeWidth={2} />
                  <span>{row.others}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer Banner */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "var(--zinc-950)",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800 }}>
                Save over ₹25,000 every single year
              </div>
              <div style={{ fontSize: "12px", color: "var(--zinc-400)", marginTop: "2px" }}>
                Pay ₹199 per table once. Zero renewal fees forever.
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenOrder}
              style={{
                height: "46px",
                padding: "0 24px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--butter-yellow)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Order Yours Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
