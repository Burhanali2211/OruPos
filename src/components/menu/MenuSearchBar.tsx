"use client";

import React from "react";

interface MenuSearchBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  vegOnly: boolean;
  setVegOnly: (val: boolean) => void;
}

export default function MenuSearchBar({
  searchQuery,
  setSearchQuery,
  vegOnly,
  setVegOnly,
}: MenuSearchBarProps) {
  return (
    <div
      style={{
        padding: "12px 20px 10px",
        backgroundColor: "#FFFFFF",
        position: "sticky",
        top: "37px",
        zIndex: 40,
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search dishes (e.g. Paneer, Biryani, Coffee)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "9px 14px",
            border: "1px solid #E5E7EB",
            borderRadius: "var(--radius-full, 9999px)",
            fontSize: "13.5px",
            backgroundColor: "#F9FAFB",
            outline: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between" }}>
        <button
          type="button"
          onClick={() => setVegOnly(!vegOnly)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 12px",
            borderRadius: "var(--radius-full, 9999px)",
            fontSize: "12px",
            fontWeight: 500,
            border: vegOnly ? "1px solid #10B981" : "1px solid #E5E7EB",
            backgroundColor: vegOnly ? "#ECFDF5" : "#FFFFFF",
            color: vegOnly ? "#065F46" : "#4B5563",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <span className="food-symbol veg" style={{ width: "12px", height: "12px", borderWidth: "1.5px" }}>
            <span className="inner-dot" style={{ width: "5px", height: "5px" }} />
          </span>
          <span>Pure Veg Only</span>
        </button>

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            style={{
              fontSize: "11.5px",
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
  );
}
