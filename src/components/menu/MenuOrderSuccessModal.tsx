"use client";

import React from "react";
import { MenuItem } from "@/lib/restaurants";
import { CheckIcon } from "@/components/Icons";

interface OrderPlacedData {
  items: { item: MenuItem; quantity: number }[];
  total: number;
  table: string;
  note: string;
}

interface MenuOrderSuccessModalProps {
  orderPlacedData: OrderPlacedData | null;
  onClose: () => void;
}

export default function MenuOrderSuccessModal({
  orderPlacedData,
  onClose,
}: MenuOrderSuccessModalProps) {
  if (!orderPlacedData) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          maxWidth: "380px",
          width: "100%",
          padding: "24px 20px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          border: "1px solid #E5E7EB",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#ECFDF5",
            color: "#059669",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          <CheckIcon size={22} color="#059669" strokeWidth={2.5} />
        </div>

        <h3 style={{ fontSize: "17px", fontWeight: 650, color: "#111827", marginBottom: "4px" }}>
          Order Received
        </h3>
        <p style={{ fontSize: "12.5px", color: "#6B7280", marginBottom: "16px" }}>
          Serving to <strong>{orderPlacedData.table}</strong> · Approx 15-20 mins
        </p>

        <div
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: "10px",
            padding: "10px 14px",
            border: "1px solid #E5E7EB",
            textAlign: "left",
            fontSize: "12px",
            marginBottom: "16px",
          }}
        >
          {orderPlacedData.items.map((i) => (
            <div key={i.item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span>{i.quantity}x {i.item.name}</span>
              <span style={{ fontWeight: 600 }}>₹{i.item.price * i.quantity}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #E5E7EB", marginTop: "6px", paddingTop: "6px", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "13px", color: "#111827" }}>
            <span>Total Amount</span>
            <span>₹{orderPlacedData.total}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            width: "100%",
            backgroundColor: "#18181B",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "var(--radius-full, 9999px)",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Done / Return to Menu
        </button>
      </div>
    </div>
  );
}
