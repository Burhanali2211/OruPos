"use client";

import React from "react";
import { EditIcon, BellIcon, ReceiptIcon } from "@/components/Icons";

interface MenuBottomBarProps {
  totalItemsCount: number;
  tableNumber: string;
  cartSubtotal: number;
  onOpenCart: () => void;
  onEditTable: () => void;
  onShowToast: (msg: string) => void;
}

export default function MenuBottomBar({
  totalItemsCount,
  tableNumber,
  cartSubtotal,
  onOpenCart,
  onEditTable,
  onShowToast,
}: MenuBottomBarProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid #E5E7EB",
        padding: "8px 16px",
        zIndex: 50,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "540px",
          margin: "0 auto",
        }}
      >
        {/* When items are in cart -> show High-priority Order Bar */}
        {totalItemsCount > 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#18181B",
              borderRadius: "var(--radius-full, 9999px)",
              padding: "8px 16px",
              color: "#FFFFFF",
            }}
          >
            <div>
              <div style={{ fontSize: "10.5px", color: "#9CA3AF", textTransform: "uppercase", fontWeight: 600 }}>
                {tableNumber} · {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700 }}>
                ₹{cartSubtotal}
                <span style={{ fontSize: "11px", fontWeight: 400, color: "#9CA3AF", marginLeft: "4px" }}>
                  + GST
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              style={{
                backgroundColor: "#FFFFFF",
                color: "#111827",
                border: "none",
                borderRadius: "var(--radius-full, 9999px)",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>View Order</span>
              <span style={{ fontSize: "14px" }}>→</span>
            </button>
          </div>
        ) : (
          /* Idle Table Bar (Call Waiter / Bill) */
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "10.5px", color: "#9CA3AF", fontWeight: 500 }}>
                Current Table
              </div>
              <button
                type="button"
                onClick={onEditTable}
                style={{
                  fontSize: "14px",
                  fontWeight: 650,
                  color: "#111827",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>{tableNumber}</span>
                <EditIcon size={11} color="#9CA3AF" />
              </button>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                onClick={() => onShowToast(`Staff notified for ${tableNumber}.`)}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#374151",
                  border: "1px solid #D1D5DB",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-full, 9999px)",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <BellIcon size={13} color="#4B5563" />
                <span>Call Staff</span>
              </button>

              <button
                type="button"
                onClick={() => onShowToast(`Bill requested for ${tableNumber}.`)}
                style={{
                  backgroundColor: "#18181B",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full, 9999px)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <ReceiptIcon size={13} color="#FFFFFF" />
                <span>Get Bill</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
