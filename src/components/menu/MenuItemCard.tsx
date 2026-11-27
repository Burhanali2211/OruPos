"use client";

import React from "react";
import Image from "next/image";
import { MenuItem } from "@/lib/restaurants";

interface MenuItemCardProps {
  dish: MenuItem;
  qty: number;
  onAddItem: (dish: MenuItem) => void;
  onIncrease: (dishId: string) => void;
  onDecrease: (dishId: string) => void;
}

export default function MenuItemCard({
  dish,
  qty,
  onAddItem,
  onIncrease,
  onDecrease,
}: MenuItemCardProps) {
  return (
    <article
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "14px",
        padding: "16px 0",
        borderBottom: "1px solid #F3F4F6",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
          <span className={`food-symbol ${dish.isVeg ? "veg" : "nonveg"}`}>
            <span className="inner-dot" />
          </span>
          {dish.badge && (
            <span
              style={{
                backgroundColor: "#FEF3C7",
                color: "#92400E",
                fontSize: "10px",
                fontWeight: 600,
                padding: "1px 6px",
                borderRadius: "4px",
              }}
            >
              {dish.badge}
            </span>
          )}
        </div>
        <h3 style={{ fontSize: "14.5px", fontWeight: 650, color: "#111827", marginBottom: "3px" }}>
          {dish.name}
        </h3>
        <div style={{ fontSize: "14px", fontWeight: 650, color: "#111827", marginBottom: "4px" }}>
          ₹{dish.price}
        </div>
        <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.5, margin: 0 }}>
          {dish.desc}
        </p>
      </div>

      {/* Right side: Dish image + Add / Quantity Button */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "88px", flexShrink: 0 }}>
        {dish.image ? (
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#F3F4F6",
              border: "1px solid #E5E7EB",
              marginBottom: "8px",
            }}
          >
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="84px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div style={{ height: "8px" }} />
        )}

        {/* Quantity Selector / Add button */}
        {qty > 0 ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "#18181B",
              borderRadius: "var(--radius-full, 9999px)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => onDecrease(dish.id)}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "none",
                width: "26px",
                height: "28px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 600,
                minWidth: "18px",
                textAlign: "center",
              }}
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => onIncrease(dish.id)}
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "none",
                width: "26px",
                height: "28px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onAddItem(dish)}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#111827",
              border: "1px solid #D1D5DB",
              borderRadius: "var(--radius-full, 9999px)",
              padding: "5px 16px",
              fontSize: "11.5px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span>ADD</span>
            <span style={{ fontSize: "13px", lineHeight: 1 }}>+</span>
          </button>
        )}
      </div>
    </article>
  );
}
