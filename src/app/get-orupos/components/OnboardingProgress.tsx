"use client";

import React from "react";
import { Check, User, Building2, UtensilsCrossed } from "lucide-react";

interface OnboardingProgressProps {
  step: number;
}

export default function OnboardingProgress({ step }: OnboardingProgressProps) {
  const steps = [
    { s: 1, label: "Personal Info", icon: User },
    { s: 2, label: "Restaurant Details", icon: Building2 },
    { s: 3, label: "Operations & POS", icon: UtensilsCrossed },
  ];

  return (
    <div
      style={{
        maxWidth: "580px",
        margin: "0 auto 36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Background Connecting Line */}
      <div
        style={{
          position: "absolute",
          top: "17px",
          left: "40px",
          right: "40px",
          height: "1px",
          backgroundColor: "var(--zinc-200)",
          zIndex: 1,
        }}
      />
      {/* Active Connecting Line */}
      <div
        style={{
          position: "absolute",
          top: "17px",
          left: "40px",
          width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
          height: "1px",
          backgroundColor: "var(--zinc-950)",
          zIndex: 2,
          transition: "width 0.25s ease",
        }}
      />

      {steps.map((item) => {
        const isCompleted = step > item.s;
        const isActive = step === item.s;
        const Icon = item.icon;
        return (
          <div
            key={item.s}
            style={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: isActive
                  ? "var(--zinc-950)"
                  : isCompleted
                  ? "var(--zinc-900)"
                  : "#FFFFFF",
                border: isActive || isCompleted ? "none" : "1px solid var(--zinc-300)",
                color: isActive || isCompleted ? "#FFFFFF" : "var(--zinc-400)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                transition: "all 0.2s ease",
              }}
            >
              {isCompleted ? <Check size={14} strokeWidth={2.8} /> : <Icon size={14} />}
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: isActive ? 750 : 550,
                color: isActive ? "var(--zinc-950)" : "var(--zinc-400)",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
