import React from "react";
import { RefreshCw, Users, QrCode, Sparkles, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Eliminate Paper Reprinting Costs Forever",
      highlight: "Save ₹15,000+ Annually in Printing",
      desc: "Vegetable and ingredient prices change constantly. Instead of spending ₹3,000 to ₹5,000 on new laminated card sets every few months, update your digital menu online instantly without touching the table stands.",
      icon: <RefreshCw size={24} color="#047857" />,
      bg: "rgba(16, 185, 129, 0.12)",
      stat: "₹0 Reprint Cost",
      statLabel: "Lifetime updates",
    },
    {
      title: "Zero Waiting Time for Hungry Guests",
      highlight: "Table Turnover Up by 22%",
      desc: "During busy weekend dinner rushes, customers hate waving their hands waiting for staff to bring a menu booklet. With OruPos, diners sit down and scan right away to browse appetisers and mains immediately.",
      icon: <Clock size={24} color="#D97706" />,
      bg: "rgba(245, 158, 11, 0.12)",
      stat: "0.4s",
      statLabel: "Average scan speed",
    },
    {
      title: "Individual Table Precision Mapping",
      highlight: "Stand 01 = Table 1 • Stand 02 = Table 2",
      desc: "Each acrylic stand features bold dual-sided numbering and a unique QR code tied specifically to that dining table. Staff and kitchen managers immediately know which table is placing orders or calling for service.",
      icon: <QrCode size={24} color="#0284C7" />,
      bg: "rgba(14, 165, 233, 0.12)",
      stat: "100%",
      statLabel: "Table accuracy",
    },
    {
      title: "Spill-Proof, Gravy-Proof & Pristine",
      highlight: "Heavy-Duty 3mm Optical Cast Acrylic",
      desc: "Paper menus get grease stains, curry splashes, and dog-eared corners. Our heavy-duty acrylic stands stay upright beside salt shakers, wipe clean with a wet cloth, and maintain a 5-star restaurant look.",
      icon: <Sparkles size={24} color="#E5A93C" />,
      bg: "rgba(229, 169, 60, 0.15)",
      stat: "100%",
      statLabel: "Water & spill resistant",
    },
  ];

  return (
    <section className="section section-subtle" id="benefits">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Tangible Restaurant ROI</span>
          <h2 className="section-title">Why Smart Restaurant Owners Switch</h2>
          <p className="section-desc">
            Direct, practical operational improvements designed for real Indian restaurant rush hours.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "28px",
          }}
          className="benefits-grid"
        >
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: b.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {b.icon}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    backgroundColor: "var(--bg-subtle)",
                    border: "1px solid var(--color-border)",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-primary)" }}>
                    {b.stat}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-muted)", fontWeight: 600 }}>
                    {b.statLabel}
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "6px", color: "var(--color-text-main)" }}>
                {b.title}
              </h3>

              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <CheckCircle2 size={16} />
                <span>{b.highlight}</span>
              </div>

              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-body)", lineHeight: 1.6, margin: 0 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
