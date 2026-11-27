"use client";

import React from "react";
import { RestaurantData } from "@/lib/restaurants";
import { StarIcon, ClockIcon, MapPinIcon } from "@/components/Icons";

interface MenuHeaderProps {
  restaurant: RestaurantData;
}

export default function MenuHeader({ restaurant }: MenuHeaderProps) {
  return (
    <header
      style={{
        backgroundColor: "#FFFFFF",
        padding: "24px 20px 18px",
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {restaurant.name}
        </h1>

        <span
          style={{
            fontSize: "11px",
            color: "#059669",
            backgroundColor: "#ECFDF5",
            padding: "3px 8px",
            borderRadius: "var(--radius-full, 9999px)",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#10B981" }} />
          <span>Open</span>
        </span>
      </div>

      <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "14px", lineHeight: 1.5, margin: "0 0 14px" }}>
        {restaurant.tagline}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", fontSize: "12px" }}>
        <span style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "4px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px", color: "#374151" }}>
          <StarIcon size={12} color="#D97706" />
          <span>{restaurant.rating}</span>
        </span>
        <span style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "4px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px", color: "#374151" }}>
          <ClockIcon size={12} color="#6B7280" />
          <span>{restaurant.prepTime}</span>
        </span>
        <span style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "4px 8px", borderRadius: "6px", display: "inline-flex", alignItems: "center", gap: "4px", color: "#374151" }}>
          <MapPinIcon size={12} color="#6B7280" />
          <span>{restaurant.location}</span>
        </span>
      </div>
    </header>
  );
}
