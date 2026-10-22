import React from "react";
import Link from "next/link";

interface RestaurantNotFoundProps {
  slug: string;
}

export default function RestaurantNotFound({ slug }: RestaurantNotFoundProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
        color: "#1F1F1F",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          padding: "36px 28px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          border: "1px solid #ECE7E1",
          textAlign: "center",
        }}
      >
        {/* Lock / Unregistered Domain Badge */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#FDF2E9",
            color: "#9C4124",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            marginBottom: "20px",
            border: "1px solid #F5D9C8",
          }}
        >
          🔒
        </div>

        {/* Subdomain pill */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#F3F4F6",
            color: "#374151",
            fontFamily: "monospace",
            fontSize: "13px",
            fontWeight: 600,
            padding: "5px 12px",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #E5E7EB",
          }}
        >
          {slug}.orupos.in
        </div>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "10px",
            color: "#1E3A2F",
          }}
        >
          Restaurant Domain Not Whitelisted
        </h1>

        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#6B7280",
            marginBottom: "24px",
          }}
        >
          This subdomain has not been registered in OruPos or is currently inactive.
          Only approved restaurant domains can serve live table menus.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            href="/admin"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              backgroundColor: "#1E3A2F",
              color: "#FFFFFF",
              padding: "12px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
              transition: "background-color 0.15s ease",
            }}
          >
            <span>Register & Whitelist Domain in Admin →</span>
          </Link>

          <Link
            href="/r/demo"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F4F6",
              color: "#374151",
              padding: "11px 20px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            Preview Active Demo Menu (The Grand Taj)
          </Link>

          <Link
            href="/"
            style={{
              fontSize: "12px",
              color: "#9CA3AF",
              textDecoration: "none",
              marginTop: "8px",
            }}
          >
            ← Back to OruPos Homepage
          </Link>
        </div>

        <div
          style={{
            marginTop: "28px",
            paddingTop: "16px",
            borderTop: "1px dashed #E5E7EB",
            fontSize: "11px",
            color: "#9CA3AF",
          }}
        >
          Powered by OruPos Multi-Tenant Digital Menu Engine
        </div>
      </div>
    </div>
  );
}
