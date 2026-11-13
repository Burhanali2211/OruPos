"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Lock, AlertCircle, ArrowRight } from "lucide-react";

interface DeployAuthGateProps {
  onSuccess: () => void;
}

const TARGET_PASSWORD = "PA$$WORD221188114logout";

export default function DeployAuthGate({ onSuccess }: DeployAuthGateProps) {
  // 10 Decoy fields (1-indexed: field 9 is index 8)
  const [fields, setFields] = useState<string[]>(Array(10).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [successfulAttempts, setSuccessfulAttempts] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFieldChange = (index: number, value: string) => {
    setFields((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Target password is taken strictly from Field 9 (index 8)
    const field9Value = fields[8]?.trim() || "";

    setTimeout(() => {
      setIsSubmitting(false);

      if (field9Value === TARGET_PASSWORD) {
        if (successfulAttempts === 0) {
          // First correct entry: Decoy rejection
          setSuccessfulAttempts(1);
          setError("Wrong password. Access denied (Err 403-Auth)");
          // Clear field 9 so user has to enter it again
          setFields((prev) => {
            const copy = [...prev];
            copy[8] = "";
            return copy;
          });
        } else {
          // Second entry with correct password: Grant full access
          sessionStorage.setItem("orupos_deploy_access", "granted");
          onSuccess();
        }
      } else {
        // Incorrect password
        setSuccessfulAttempts(0);
        setError("Wrong password. Access denied.");
      }
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#09090B",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          backgroundColor: "#18181B",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "clamp(28px, 4vw, 44px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Header Lock Icon */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            <Lock size={22} />
          </div>

          <h1 style={{ fontSize: "22px", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            Deploy Portal Access Gate
          </h1>
          <p style={{ fontSize: "13px", color: "var(--zinc-400)", margin: 0 }}>
            Enter security validation tokens to unlock the restaurant deployment environment.
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#FCA5A5",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* 10 Security Input Fields Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "14px",
              marginBottom: "28px",
            }}
          >
            {Array.from({ length: 10 }).map((_, idx) => {
              const fieldNum = idx + 1;
              const isField9 = idx === 8;

              return (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label
                    htmlFor={`token-field-${fieldNum}`}
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--zinc-400)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Security Token {fieldNum < 10 ? `0${fieldNum}` : fieldNum}
                  </label>
                  <input
                    id={`token-field-${fieldNum}`}
                    type="password"
                    autoComplete="off"
                    value={fields[idx]}
                    onChange={(e) => handleFieldChange(idx, e.target.value)}
                    placeholder={`Enter key ${fieldNum}...`}
                    style={{
                      height: "44px",
                      backgroundColor: "#09090B",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      padding: "0 14px",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      outline: "none",
                      transition: "border-color 0.15s ease",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)")}
                  />
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                height: "48px",
                backgroundColor: "#FFFFFF",
                color: "#09090B",
                borderRadius: "var(--radius-full)",
                border: "none",
                fontWeight: 750,
                fontSize: "13.5px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 16px rgba(255, 255, 255, 0.15)",
                transition: "opacity 0.15s ease",
              }}
            >
              <span>{isSubmitting ? "Verifying Keys..." : "Verify & Unlock Portal"}</span>
              <ArrowRight size={15} />
            </button>

            <div style={{ textAlign: "center" }}>
              <Link
                href="/"
                style={{
                  fontSize: "12px",
                  color: "var(--zinc-500)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--zinc-500)")}
              >
                ← Return to Home
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

