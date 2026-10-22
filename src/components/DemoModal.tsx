"use client";

import React, { useEffect } from "react";
import Link from "next/link";

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
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "440px",
          height: "90vh",
          maxHeight: "750px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "#1E3A2F",
            color: "#FFFFFF",
            padding: "12px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
          }}
        >
          <span style={{ fontWeight: 600 }}>Live Customer Menu Preview</span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Link href="/demo" target="_blank" style={{ color: "#E5A93C", textDecoration: "underline", fontWeight: 600 }}>
              Open Fullscreen
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close demo preview"
              style={{
                background: "none",
                border: "none",
                color: "#FFFFFF",
                fontSize: "20px",
                cursor: "pointer",
                padding: "0 4px",
              }}
            >
              &times;
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
