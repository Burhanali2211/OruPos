"use client";

import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { ExternalLinkIcon } from "@/components/Icons";

interface DeployHeaderProps {
  onLock: () => void;
}

export default function DeployHeader({ onLock }: DeployHeaderProps) {
  return (
    <header
      style={{
        backgroundColor: "#1E3A2F",
        color: "#FFFFFF",
        padding: "16px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            backgroundColor: "#E5A93C",
            color: "#13271F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: "19px",
          }}
        >
          O
        </div>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.01em" }}>
            OruPos Deployment Portal
          </div>
          <div style={{ fontSize: "11px", color: "#A7F3D0" }}>
            Drop your Svelte / HTML build to launch dedicated subdomains
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          type="button"
          onClick={onLock}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#E2E8F0",
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LogOut size={13} color="#E2E8F0" />
          <span>Lock Portal</span>
        </button>

        <Link
          href="/"
          style={{
            color: "#CBD5E1",
            fontSize: "13px",
            textDecoration: "none",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>orupos.in</span>
          <ExternalLinkIcon size={12} color="#CBD5E1" />
        </Link>
      </div>
    </header>
  );
}
