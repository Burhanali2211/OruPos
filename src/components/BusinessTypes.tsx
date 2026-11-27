"use client";

import React from "react";
import Image from "next/image";
import { UtensilsCrossed, Hotel, Coffee, Croissant, Flame, Zap } from "lucide-react";

export default function BusinessTypes() {
  const businesses = [
    {
      icon: UtensilsCrossed,
      title: "Dine-In Restaurants",
      tagline: "Fine & Casual Dining",
      desc: "Family dining, multi-cuisine restaurants, and casual diners with interactive floor management and live KOT routing.",
      image: "/assets/table-service.jpg",
      alt: "Upscale restaurant dining tables set with OruPos contactless QR table ordering stands",
      badge: "High Turnover",
    },
    {
      icon: Coffee,
      title: "Cafes & Bistros",
      tagline: "Artisan Coffee & Snacks",
      desc: "Specialty espresso bars, roasteries, and bistros where diners browse dishes with appetizing photos and customize milk and toppings.",
      image: "/assets/cafe-ambience.jpg",
      alt: "Modern aesthetic cafe and coffee bistro floor utilizing OruPos digital QR menus",
      badge: "Visual Menus",
    },
    {
      icon: Hotel,
      title: "Hotels & Resorts",
      tagline: "In-Room & Banquet Dining",
      desc: "Hotel dining halls, banquet rooms, and in-room room service QR codes mapped directly to individual guest room numbers.",
      image: "/assets/hotel-dining.jpg",
      alt: "Luxury hotel restaurant and banquet dining hall powered by OruPos cloud POS",
      badge: "Room & Table QR",
    },
    {
      icon: Croissant,
      title: "Bakeries & Patisseries",
      tagline: "Gourmet Bakes & Cakes",
      desc: "Live dessert counters and artisan patisseries showcasing custom cake catalogs, fresh bakes, and counter token management.",
      image: "/assets/bakery-display.jpg",
      alt: "Artisan bakery and gourmet dessert showcase integrated with OruPos counter billing",
      badge: "Item Catalogs",
    },
    {
      icon: Flame,
      title: "Traditional High-Volume Dining",
      tagline: "Wazwan, Dhabas & Tandoor",
      desc: "High-speed family restaurants where rapid table order placement keeps hungry crowds satisfied and table turnover high.",
      image: "/assets/tandoor-dining.jpg",
      alt: "Traditional Indian culinary restaurant dining room serving dum biryani and tandoor dishes",
      badge: "Peak Rush Hours",
    },
    {
      icon: Zap,
      title: "QSR & Multi-Outlet Food Courts",
      tagline: "Fast Food & Self-Service",
      desc: "Quick-service food stalls, franchise counters, and food courts eliminating long cashier queues with self-order token slips.",
      image: "/assets/pos-counter.jpg",
      alt: "Quick service restaurant cashier and self-ordering counter with instant UPI payment settlement",
      badge: "Zero Queues",
    },
  ];

  return (
    <section className="section section-subtle" id="establishments">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 48px" }}>
          <span className="section-kicker">Versatile Hospitality POS</span>
          <h2 className="section-title">
            Tailored for every Indian dining & food establishment.
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Whether you operate 4 dining tables or 80 tables across multiple floors, OruPos adapts seamlessly to your floor layout and guest flow.
          </p>
        </div>

        {/* 6 Business Types Grid with Real Photography */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
          className="business-types-grid"
        >
          {businesses.map((biz, idx) => {
            const Icon = biz.icon;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "var(--shadow-card)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 18px 36px -10px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "var(--shadow-card)";
                }}
              >
                {/* Photo Area */}
                <div style={{ position: "relative", width: "100%", height: "190px", backgroundColor: "#0F172A" }}>
                  <Image
                    src={biz.image}
                    alt={biz.alt}
                    title={biz.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#FFFFFF",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={16} color="#FFFFFF" />
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255, 255, 255, 0.75)", display: "block" }}>
                        {biz.tagline}
                      </span>
                      <strong style={{ fontSize: "14px", color: "#FFFFFF" }}>
                        {biz.title}
                      </strong>
                    </div>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(8px)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    {biz.badge}
                  </div>
                </div>

                {/* Description Body */}
                <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--zinc-500)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {biz.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
