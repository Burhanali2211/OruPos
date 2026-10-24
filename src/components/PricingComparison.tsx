import React from "react";
import { Check, X, ArrowUpRight } from "lucide-react";

interface PricingComparisonProps {
  onOpenOrder: () => void;
}

export default function PricingComparison({ onOpenOrder }: PricingComparisonProps) {
  const comparisonRows = [
    {
      feature: "Monthly Software Fee",
      orupos: "₹0 forever",
      others: "₹1,500 – ₹4,000 / month",
    },
    {
      feature: "Floor Table Management",
      orupos: "Included natively",
      others: "Paid enterprise add-on",
    },
    {
      feature: "Kitchen KOT Routing",
      orupos: "Included with chef notes",
      others: "Extra module fee",
    },
    {
      feature: "Food Sales Commission",
      orupos: "0% commission",
      others: "2% to 5% platform cut",
    },
    {
      feature: "Table Hardware",
      orupos: "3mm acrylic stands included",
      others: "None (restaurateur prints DIY)",
    },
    {
      feature: "Device Lock-In",
      orupos: "Runs on any phone, tablet, or PC",
      others: "Locks into ₹25,000 billing hardware",
    },
  ];

  return (
    <section className="section section-white" id="comparison">
      <div className="container">
        <div className="section-header" style={{ textAlign: "center" }}>
          <span className="section-kicker">COMPARISON</span>
          <h2 className="section-title">
            Why switch to zero-subscription POS?
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Compare OruPos against traditional monthly restaurant POS software.
          </p>
        </div>

        {/* Comparison Box with Mobile Horizontal Scroll */}
        <div
          style={{
            maxWidth: "880px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid var(--border-hairline)",
            borderRadius: "clamp(16px, 2.5vw, 28px)",
            overflow: "hidden",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="comparison-scroll-box">
            <div style={{ minWidth: "560px" }}>
              {/* Table Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1.1fr 1fr",
                  padding: "16px 20px",
                  backgroundColor: "var(--zinc-50)",
                  borderBottom: "1px solid var(--border-subtle)",
                  fontWeight: 800,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <div style={{ color: "var(--zinc-400)" }}>Feature</div>
                <div style={{ color: "var(--zinc-950)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--emerald-500)" }} />
                  <span>OruPos (₹0 Monthly)</span>
                </div>
                <div style={{ color: "var(--zinc-400)" }}>Legacy POS Apps</div>
              </div>

              {/* Table Body */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {comparisonRows.map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1.1fr 1fr",
                      padding: "14px 20px",
                      borderBottom: idx < comparisonRows.length - 1 ? "1px solid var(--border-subtle)" : "none",
                      alignItems: "center",
                      fontSize: "13px",
                      backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "rgba(250, 250, 250, 0.4)",
                    }}
                  >
                    <div style={{ fontWeight: 650, color: "var(--zinc-800)" }}>
                      {row.feature}
                    </div>
                    <div style={{ fontWeight: 700, color: "var(--zinc-950)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Check size={15} color="var(--emerald-600)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span>{row.orupos}</span>
                    </div>
                    <div style={{ color: "var(--zinc-400)", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
                      <X size={14} color="var(--zinc-300)" strokeWidth={2} style={{ flexShrink: 0 }} />
                      <span>{row.others}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Footer Banner */}
          <div
            style={{
              padding: "18px 20px",
              backgroundColor: "var(--zinc-950)",
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800 }}>
                Save over ₹25,000 every year in POS software rent
              </div>
              <div style={{ fontSize: "12px", color: "var(--zinc-400)", marginTop: "2px" }}>
                Zero monthly fees forever. Cloud POS software + hardware included.
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenOrder}
              style={{
                height: "42px",
                padding: "0 20px",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "12px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--butter-yellow)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              <span>Get OruPos POS</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
