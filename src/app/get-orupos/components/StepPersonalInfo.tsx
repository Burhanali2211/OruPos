"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface StepPersonalInfoProps {
  fullName: string;
  setFullName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  role: string;
  setRole: (val: string) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onNext: () => void;
}

export default function StepPersonalInfo({
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
  role,
  setRole,
  errors,
  setErrors,
  onNext,
}: StepPersonalInfoProps) {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "1.45rem",
            fontWeight: 850,
            color: "var(--zinc-950)",
            letterSpacing: "-0.02em",
            margin: "4px 0 6px",
          }}
        >
          Personal & Contact Information
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--zinc-500)", margin: 0 }}>
          Who should our onboarding specialist coordinate with to setup your POS?
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Full Name */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "6px",
            }}
          >
            Full Name <span style={{ color: "var(--emerald-600)" }}>*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors({ ...errors, fullName: "" });
            }}
            placeholder="e.g. Faheem Ahmad"
            style={{
              width: "100%",
              height: "46px",
              padding: "0 16px",
              borderRadius: "12px",
              border: errors.fullName ? "1px solid #EF4444" : "1px solid var(--zinc-300)",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#FFFFFF",
              color: "var(--zinc-950)",
            }}
          />
          {errors.fullName && (
            <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "4px", display: "block" }}>
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "6px",
            }}
          >
            WhatsApp / Phone Number <span style={{ color: "var(--emerald-600)" }}>*</span>
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                height: "46px",
                padding: "0 14px",
                backgroundColor: "var(--zinc-100)",
                border: "1px solid var(--zinc-300)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--zinc-700)",
              }}
            >
              +91
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              placeholder="98765 43210"
              style={{
                flexGrow: 1,
                height: "46px",
                padding: "0 16px",
                borderRadius: "12px",
                border: errors.phone ? "1px solid #EF4444" : "1px solid var(--zinc-300)",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#FFFFFF",
                color: "var(--zinc-950)",
              }}
            />
          </div>
          {errors.phone && (
            <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "4px", display: "block" }}>
              {errors.phone}
            </span>
          )}
          <span style={{ fontSize: "11px", color: "var(--zinc-400)", marginTop: "4px", display: "block" }}>
            We will send your POS credentials and hardware delivery status here.
          </span>
        </div>

        {/* Email */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "6px",
            }}
          >
            Email Address <span style={{ color: "var(--zinc-400)", fontWeight: 500 }}>(Optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@yourrestaurant.com"
            style={{
              width: "100%",
              height: "46px",
              padding: "0 16px",
              borderRadius: "12px",
              border: "1px solid var(--zinc-300)",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#FFFFFF",
              color: "var(--zinc-950)",
            }}
          />
        </div>

        {/* Role Selector */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "8px",
            }}
          >
            Your Role
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              "Owner / Proprietor",
              "Managing Partner",
              "General Manager",
              "Chef / Kitchen Lead",
              "Other",
            ].map((r) => {
              const isSelected = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    border: isSelected ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                    backgroundColor: isSelected ? "var(--zinc-950)" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "var(--zinc-700)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={onNext}
          className="btn-primary"
          style={{ height: "46px", fontSize: "13.5px", padding: "0 24px", gap: "8px" }}
        >
          <span>Next: Restaurant Details</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
