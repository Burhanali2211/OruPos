"use client";

import React from "react";

interface MenuEditTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  tempTableInput: string;
  setTempTableInput: (val: string) => void;
  onSaveTable: () => void;
}

export default function MenuEditTableModal({
  isOpen,
  onClose,
  tempTableInput,
  setTempTableInput,
  onSaveTable,
}: MenuEditTableModalProps) {
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
        zIndex: 130,
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
          maxWidth: "340px",
          width: "100%",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          border: "1px solid #E5E7EB",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ fontSize: "15px", fontWeight: 650, color: "#111827", marginBottom: "6px" }}>
          Select Table Number
        </h3>
        <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "14px" }}>
          Dishes and bill requests are mapped to this table.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", marginBottom: "14px" }}>
          {Array.from({ length: 8 }, (_, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isSelected = tempTableInput === num;

            return (
              <button
                key={num}
                type="button"
                onClick={() => setTempTableInput(num)}
                style={{
                  padding: "7px 0",
                  borderRadius: "6px",
                  border: isSelected ? "1.5px solid #18181B" : "1px solid #E5E7EB",
                  backgroundColor: isSelected ? "#F4F4F5" : "#FFFFFF",
                  color: isSelected ? "#111827" : "#4B5563",
                  fontSize: "12px",
                  fontWeight: isSelected ? 650 : 500,
                  cursor: "pointer",
                }}
              >
                T-{num}
              </button>
            );
          })}
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={{ fontSize: "11px", fontWeight: 600, color: "#4B5563", display: "block", marginBottom: "4px" }}>
            Or Custom Table / Room:
          </label>
          <input
            type="text"
            value={tempTableInput}
            onChange={(e) => setTempTableInput(e.target.value)}
            placeholder="e.g. 04, VIP 2, Balcony"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #E5E7EB",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: "var(--radius-full, 9999px)",
              border: "1px solid #E5E7EB",
              backgroundColor: "#FFFFFF",
              color: "#4B5563",
              fontSize: "12.5px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSaveTable}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: "var(--radius-full, 9999px)",
              border: "none",
              backgroundColor: "#18181B",
              color: "#FFFFFF",
              fontSize: "12.5px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Set Table
          </button>
        </div>
      </div>
    </div>
  );
}
