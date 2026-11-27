"use client";

import React from "react";
import { MenuItem, RestaurantData } from "@/lib/restaurants";
import { CloseIcon, WhatsAppIcon, OrderIcon } from "@/components/Icons";

interface MenuCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantData;
  tableNumber: string;
  cartItems: { item: MenuItem; quantity: number }[];
  cartSubtotal: number;
  gstAmount: number;
  grandTotal: number;
  cookingNote: string;
  setCookingNote: (val: string) => void;
  onIncrease: (dishId: string) => void;
  onDecrease: (dishId: string) => void;
  onSendWhatsAppOrder: () => void;
  onPlaceDirectOrder: () => void;
}

export default function MenuCartDrawer({
  isOpen,
  onClose,
  restaurant,
  tableNumber,
  cartItems,
  cartSubtotal,
  gstAmount,
  grandTotal,
  cookingNote,
  setCookingNote,
  onIncrease,
  onDecrease,
  onSendWhatsAppOrder,
  onPlaceDirectOrder,
}: MenuCartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(17, 24, 39, 0.5)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          maxWidth: "540px",
          width: "100%",
          margin: "0 auto",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.12)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #F3F4F6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 650, color: "#111827", margin: 0 }}>
              Order Summary
            </h2>
            <div style={{ fontSize: "12px", color: "#6B7280" }}>
              {tableNumber} · {restaurant.name}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#F3F4F6",
              border: "none",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close order details"
          >
            <CloseIcon size={13} color="#4B5563" />
          </button>
        </div>

        {/* Itemized Order List */}
        <div style={{ padding: "16px 20px", overflowY: "auto", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {cartItems.map(({ item, quantity }) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #F3F4F6",
                }}
              >
                <div style={{ flex: 1, paddingRight: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span className={`food-symbol ${item.isVeg ? "veg" : "nonveg"}`}>
                      <span className="inner-dot" />
                    </span>
                    <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#111827" }}>
                      {item.name}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginLeft: "20px" }}>
                    ₹{item.price} each
                  </div>
                </div>

                {/* Stepper */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "#F4F4F5",
                    borderRadius: "var(--radius-full, 9999px)",
                    marginRight: "12px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => onDecrease(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      width: "24px",
                      height: "24px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, minWidth: "16px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrease(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      width: "24px",
                      height: "24px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{ fontSize: "13.5px", fontWeight: 650, color: "#111827", minWidth: "50px", textAlign: "right" }}>
                  ₹{item.price * quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Special Cooking Note */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
              Cooking Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Less spicy, no onion..."
              value={cookingNote}
              onChange={(e) => setCookingNote(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: "var(--radius-sm, 8px)",
                fontSize: "12.5px",
                backgroundColor: "#F9FAFB",
                outline: "none",
              }}
            />
          </div>

          {/* Bill Breakdown */}
          <div
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: "10px",
              padding: "12px 14px",
              border: "1px solid #E5E7EB",
              fontSize: "12.5px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", color: "#4B5563" }}>
              <span>Items Subtotal</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#4B5563" }}>
              <span>GST (5%)</span>
              <span>₹{gstAmount}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "6px",
                borderTop: "1px solid #E5E7EB",
                fontSize: "14.5px",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons in Drawer */}
        <div
          style={{
            padding: "12px 20px 20px",
            borderTop: "1px solid #F3F4F6",
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={onSendWhatsAppOrder}
            style={{
              backgroundColor: "#059669",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "var(--radius-full, 9999px)",
              padding: "11px 20px",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
            }}
          >
            <WhatsAppIcon size={16} color="#FFFFFF" />
            <span>Send Order via WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onPlaceDirectOrder}
            style={{
              backgroundColor: "#18181B",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "var(--radius-full, 9999px)",
              padding: "11px 20px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <OrderIcon size={14} color="#FFFFFF" />
            <span>Place Table Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
