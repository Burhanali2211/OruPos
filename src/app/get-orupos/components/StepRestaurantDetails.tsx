"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react";

interface StepRestaurantDetailsProps {
  restaurantName: string;
  setRestaurantName: (val: string) => void;
  outletType: string;
  setOutletType: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  tables: number;
  setTables: (val: number) => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onNext: () => void;
  onBack: () => void;
}

export default function StepRestaurantDetails({
  restaurantName,
  setRestaurantName,
  outletType,
  setOutletType,
  city,
  setCity,
  address,
  setAddress,
  tables,
  setTables,
  errors,
  setErrors,
  onNext,
  onBack,
}: StepRestaurantDetailsProps) {
  const concepts = [
    "Dine-in Restaurant",
    "Cafe & Roastery",
    "Fast Food / QSR",
    "Cloud Kitchen",
    "Bakery & Sweets",
    "Bar & Bistro",
    "Hotel / Resort",
  ];

  const citySuggestions = [
    "Srinagar",
    "Anantnag",
    "Baramulla",
    "Jammu",
    "Delhi NCR",
    "Bengaluru",
    "Mumbai",
  ];

  const tablePresets = [5, 10, 15, 20, 30, 50];

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
          Restaurant Details & Table Setup
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--zinc-500)", margin: 0 }}>
          Tell us about your restaurant concept, location, and seating layout.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Restaurant Name */}
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
            Restaurant / Business Name <span style={{ color: "var(--emerald-600)" }}>*</span>
          </label>
          <input
            type="text"
            value={restaurantName}
            onChange={(e) => {
              setRestaurantName(e.target.value);
              if (errors.restaurantName) setErrors({ ...errors, restaurantName: "" });
            }}
            placeholder="e.g. Mughal Darbar or Cafe Chai Shai"
            style={{
              width: "100%",
              height: "46px",
              padding: "0 16px",
              borderRadius: "12px",
              border: errors.restaurantName ? "1px solid #EF4444" : "1px solid var(--zinc-300)",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#FFFFFF",
              color: "var(--zinc-950)",
            }}
          />
          {errors.restaurantName && (
            <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "4px", display: "block" }}>
              {errors.restaurantName}
            </span>
          )}
        </div>

        {/* Outlet Concept */}
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
            Restaurant Concept
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {concepts.map((concept) => {
              const isSelected = outletType === concept;
              return (
                <button
                  key={concept}
                  type="button"
                  onClick={() => setOutletType(concept)}
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
                  {concept}
                </button>
              );
            })}
          </div>
        </div>

        {/* City / State */}
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
            City & State <span style={{ color: "var(--emerald-600)" }}>*</span>
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (errors.city) setErrors({ ...errors, city: "" });
            }}
            placeholder="e.g. Srinagar, Kashmir or Bengaluru, Karnataka"
            style={{
              width: "100%",
              height: "46px",
              padding: "0 16px",
              borderRadius: "12px",
              border: errors.city ? "1px solid #EF4444" : "1px solid var(--zinc-300)",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#FFFFFF",
              color: "var(--zinc-950)",
            }}
          />
          {errors.city && (
            <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "4px", display: "block" }}>
              {errors.city}
            </span>
          )}
          {/* Quick suggestions */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
            {citySuggestions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCity(c);
                  if (errors.city) setErrors({ ...errors, city: "" });
                }}
                style={{
                  fontSize: "11px",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--zinc-100)",
                  border: "1px solid var(--zinc-200)",
                  color: "var(--zinc-600)",
                  cursor: "pointer",
                }}
              >
                + {c}
              </button>
            ))}
          </div>
        </div>

        {/* Full Street Address */}
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
            Street / Outlet Address <span style={{ color: "var(--zinc-400)", fontWeight: 500 }}>(For Hardware Delivery)</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. Residency Road, Opposite Polo View"
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

        {/* Tables Setup Stepper */}
        <div
          style={{
            padding: "20px",
            borderRadius: "18px",
            backgroundColor: "var(--zinc-50)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--zinc-950)" }}>
                Number of Dining Tables
              </span>
              <div style={{ fontSize: "11.5px", color: "var(--zinc-500)" }}>
                Each table receives a custom QR table stand.
              </div>
            </div>

            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--emerald-600)" }}>
              ₹199 / table (one-time)
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "14px" }}>
            <button
              type="button"
              onClick={() => setTables(Math.max(1, tables - 1))}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid var(--zinc-200)",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Minus size={15} />
            </button>

            <div style={{ minWidth: "90px", textAlign: "center" }}>
              <span style={{ fontSize: "2rem", fontWeight: 900, color: "var(--zinc-950)" }}>
                {tables}
              </span>
              <span style={{ display: "block", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "var(--zinc-400)" }}>
                Tables
              </span>
            </div>

            <button
              type="button"
              onClick={() => setTables(Math.min(200, tables + 1))}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid var(--zinc-200)",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Plus size={15} />
            </button>
          </div>

          {/* Quick Presets */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap" }}>
            {tablePresets.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setTables(num)}
                style={{
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  border: tables === num ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                  backgroundColor: tables === num ? "var(--zinc-950)" : "#FFFFFF",
                  color: tables === num ? "#FFFFFF" : "var(--zinc-600)",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {num} Tables
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation CTAs */}
      <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "var(--zinc-600)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="btn-primary"
          style={{ height: "46px", fontSize: "13.5px", padding: "0 24px", gap: "8px" }}
        >
          <span>Next: Operations & POS</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
