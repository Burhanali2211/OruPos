"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ExternalLink } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "440px",
          height: "90vh",
          maxHeight: "760px",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-modal)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            backgroundColor: "#FFFFFF",
            color: "var(--color-text-main)",
            padding: "12px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <span style={{ fontWeight: 600 }}>Live Menu Preview</span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link
              href="/demo"
              target="_blank"
              style={{
                color: "var(--color-text-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              <span>Fullscreen</span>
              <ExternalLink size={12} />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close demo preview"
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <iframe
          src="/demo"
          title="Digital Menu Fullscreen Preview"
          style={{ width: "100%", flex: 1, border: "none" }}
        />
      </div>
    </div>
  );
}
