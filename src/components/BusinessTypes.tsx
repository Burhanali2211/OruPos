import React from "react";
import { UtensilsCrossed, Hotel, Coffee, Croissant, Flame, Zap } from "lucide-react";

export default function BusinessTypes() {
  const businesses = [
    {
      icon: <UtensilsCrossed size={26} color="#047857" />,
      bg: "rgba(16, 185, 129, 0.12)",
      title: "Dine-In Restaurants",
      desc: "Family dining, casual & fine dining establishments with multi-cuisine menus.",
      badge: "High Turnover",
    },
    {
      icon: <Coffee size={26} color="#D97706" />,
      bg: "rgba(245, 158, 11, 0.12)",
      title: "Cafés & Bistros",
      desc: "Artisanal coffees, pastries, sandwiches & continental specials.",
      badge: "Visual Menu",
    },
    {
      icon: <Hotel size={26} color="#0284C7" />,
      bg: "rgba(14, 165, 233, 0.12)",
      title: "Hotels & Resorts",
      desc: "Banquet dining halls, in-room dining services & poolside cafes.",
      badge: "Room & Hall QR",
    },
    {
      icon: <Croissant size={26} color="#E11D48" />,
      bg: "rgba(225, 29, 72, 0.12)",
      title: "Bakeries & Patisseries",
      desc: "Showcase customized cakes, live dessert counters, and baked snacks.",
      badge: "Item Photos",
    },
    {
      icon: <Flame size={26} color="#EA580C" />,
      bg: "rgba(234, 88, 12, 0.12)",
      title: "Highway Dhabas",
      desc: "Fast, high-volume dining where speed of viewing dishes keeps tables moving.",
      badge: "Rush Hours",
    },
    {
      icon: <Zap size={26} color="#D97706" />,
      bg: "rgba(217, 119, 6, 0.12)",
      title: "QSR & Food Courts",
      desc: "Quick-service counters, franchise outlets, and self-order pickup points.",
      badge: "Zero Queues",
    },
  ];

  return (
    <section className="section section-white" id="business-types">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Versatile Hospitality Engine</span>
          <h2 className="section-title">Built For Every Indian Food Establishment</h2>
          <p className="section-desc">
            Whether you operate 4 dining tables or 80 tables, OruPos adapts seamlessly to your floor layout and guest flow.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
          className="business-types-grid"
        >
          {businesses.map((biz, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: biz.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {biz.icon}
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--color-primary)",
                    backgroundColor: "var(--color-primary-light)",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  {biz.badge}
                </span>
              </div>

              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "8px", color: "var(--color-text-main)" }}>
                {biz.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
                {biz.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
