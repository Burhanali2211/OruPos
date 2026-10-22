"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItem, RestaurantData } from "@/data/menu";

interface RestaurantMenuViewProps {
  restaurant: RestaurantData;
  initialTable?: string;
}

export default function RestaurantMenuView({ restaurant, initialTable }: RestaurantMenuViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayTable = initialTable ? `Table ${initialTable}` : restaurant.tableNumber || "Table 01";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const filteredItems = useMemo(() => {
    return restaurant.items.filter((item: MenuItem) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesVeg && matchesSearch;
    });
  }, [restaurant.items, activeCategory, vegOnly, searchQuery]);

  return (
    <div style={{ backgroundColor: "#F8F6F2", minHeight: "100vh", paddingBottom: "110px" }}>
      {/* Top Brand Bar */}
      <div
        style={{
          backgroundColor: "#13271F",
          color: "#FFFFFF",
          padding: "8px 16px",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 60,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34D399", display: "inline-block" }} />
          <strong>{displayTable}</strong> • Live Digital Menu
        </div>
        <Link
          href="https://orupos.in"
          target="_blank"
          style={{ color: "#E5A93C", textDecoration: "none", fontWeight: 700, fontSize: "11px" }}
        >
          Powered by OruPos ↗
        </Link>
      </div>

      <div style={{ maxWidth: "540px", margin: "0 auto", backgroundColor: "#FFFFFF", minHeight: "100vh", boxShadow: "0 0 30px rgba(0,0,0,0.06)" }}>
        {/* Restaurant Header */}
        <header
          style={{
            background: "linear-gradient(180deg, #13271F 0%, #1E3A2F 100%)",
            color: "#FFFFFF",
            padding: "24px 20px 22px",
            borderBottomLeftRadius: "22px",
            borderBottomRightRadius: "22px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(4px)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#4ADE80", display: "inline-block" }} />
              {displayTable}
            </div>
            <div style={{ fontSize: "12px", color: "#CBD5E1", display: "flex", alignItems: "center", gap: "4px" }}>
              🟢 Kitchen Open & Taking Orders
            </div>
          </div>

          <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "4px", color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            {restaurant.name}
          </h1>
          <p style={{ fontSize: "13px", color: "#CBD5E1", marginBottom: "14px" }}>
            {restaurant.tagline}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "12px" }}>
            <span style={{ background: "rgba(255,255,255,0.12)", padding: "4px 10px", borderRadius: "6px" }}>
              ⭐ {restaurant.rating}
            </span>
            <span style={{ background: "rgba(255,255,255,0.12)", padding: "4px 10px", borderRadius: "6px" }}>
              ⏱️ {restaurant.prepTime}
            </span>
            <span style={{ background: "rgba(255,255,255,0.12)", padding: "4px 10px", borderRadius: "6px" }}>
              📍 {restaurant.location}
            </span>
          </div>
        </header>

        {/* Controls: Search & Veg Filter */}
        <div
          style={{
            padding: "16px 20px 10px",
            backgroundColor: "#FFFFFF",
            position: "sticky",
            top: "35px",
            zIndex: 40,
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              type="text"
              placeholder="Search dishes (e.g. Paneer, Biryani, Coffee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 16px",
                border: "1px solid #D1D5DB",
                borderRadius: "10px",
                fontSize: "14px",
                backgroundColor: "#F9FAFB",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              type="button"
              onClick={() => setVegOnly(!vegOnly)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 600,
                border: vegOnly ? "1.5px solid #16A34A" : "1px solid #D1D5DB",
                backgroundColor: vegOnly ? "#ECFDF5" : "#FFFFFF",
                color: vegOnly ? "#065F46" : "#374151",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span className="food-symbol veg" style={{ width: "13px", height: "13px", borderWidth: "1px" }}>
                <span className="inner-dot" style={{ width: "6px", height: "6px" }} />
              </span>
              Pure Veg Only
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  fontSize: "12px",
                  color: "#6B7280",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Tabs */}
        <nav
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            padding: "10px 20px",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            gap: "8px",
          }}
          aria-label="Menu categories"
        >
          {restaurant.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: activeCategory === cat.id ? "#1E3A2F" : "#F3F4F6",
                color: activeCategory === cat.id ? "#FFFFFF" : "#4B5563",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Menu Items List */}
        <main style={{ padding: "16px 20px" }}>
          {filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
              <p style={{ fontSize: "16px", fontWeight: 700 }}>No dishes found</p>
              <p style={{ fontSize: "13px" }}>Try searching for a different dish name or reset the veg filter.</p>
            </div>
          ) : (
            filteredItems.map((dish: MenuItem) => (
              <article
                key={dish.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "16px 0",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span className={`food-symbol ${dish.isVeg ? "veg" : "nonveg"}`}>
                      <span className="inner-dot" />
                    </span>
                    {dish.badge && (
                      <span
                        style={{
                          backgroundColor: "#FEF3C7",
                          color: "#92400E",
                          fontSize: "10px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "2px 7px",
                          borderRadius: "4px",
                        }}
                      >
                        {dish.badge}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
                    {dish.name}
                  </h3>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E3A2F", marginBottom: "6px" }}>
                    ₹{dish.price}
                  </div>
                  <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>
                    {dish.desc}
                  </p>
                </div>

                {dish.image && (
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      position: "relative",
                      flexShrink: 0,
                      backgroundColor: "#F3F4F6",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                    }}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="90px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
              </article>
            ))
          )}
        </main>

        {/* Footer Credit & Get Digital Menu CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "24px 20px 16px",
            borderTop: "1px dashed #E5E7EB",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          <p style={{ marginBottom: "6px" }}>
            Want a digital menu and QR acrylic stands for your restaurant?
          </p>
          <Link
            href="https://orupos.in"
            target="_blank"
            style={{ color: "#1E3A2F", fontWeight: 700, textDecoration: "underline" }}
          >
            Get OruPos for ₹199/table →
          </Link>
        </div>

        {/* Floating Table Bottom Bar */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #E5E7EB",
            padding: "12px 20px",
            zIndex: 50,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              maxWidth: "540px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, textTransform: "uppercase" }}>
                Active Session
              </div>
              <div style={{ fontSize: "16px", fontWeight: 800, color: "#1E3A2F" }}>
                {displayTable}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => showToast(`🔔 Waiter alerted for ${displayTable}! Staff on the way.`)}
                style={{
                  backgroundColor: "#F3F4F6",
                  color: "#374151",
                  border: "1px solid #D1D5DB",
                  padding: "9px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span>🔔</span>
                <span>Call Waiter</span>
              </button>

              <button
                type="button"
                onClick={() => showToast(`🧾 Bill request sent for ${displayTable}. Cashier notified.`)}
                style={{
                  backgroundColor: "#1E3A2F",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>🧾</span>
                <span>Get Bill</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#111827",
            color: "#FFFFFF",
            padding: "10px 22px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: 600,
            zIndex: 100,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
