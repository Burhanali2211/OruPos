"use client";

import React from "react";
import Link from "next/link";
import { ExternalLinkIcon } from "@/components/Icons";

interface MenuTopBarProps {
  tableNumber: string;
  onEditTable: () => void;
}

export default function MenuTopBar({ tableNumber, onEditTable }: MenuTopBarProps) {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "var(--color-text-main, #111827)",
        padding: "8px 16px",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 60,
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <button
        type="button"
        onClick={onEditTable}
        style={{
          background: "#F3F4F6",
          border: "1px solid #E5E7EB",
          borderRadius: "var(--radius-full, 9999px)",
          color: "var(--color-text-main, #111827)",
          fontSize: "12px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          padding: "4px 10px",
          fontWeight: 600,
        }}
        title="Click to change table"
      >
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981", display: "inline-block" }} />
        <span>{tableNumber}</span>
        <span style={{ fontSize: "11px", color: "#6B7280", fontWeight: 400 }}>· Change</span>
      </button>

      <Link
        href="/"
        target="_blank"
        style={{
          color: "#6B7280",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "11.5px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>OruPos</span>
        <ExternalLinkIcon size={10} color="#9CA3AF" />
      </Link>
    </div>
  );
}
