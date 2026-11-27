"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepOperationsPosProps {
  isUsingPos: string;
  setIsUsingPos: (val: string) => void;
  currentSystem: string;
  setCurrentSystem: (val: string) => void;
  currentCost: string;
  setCurrentCost: (val: string) => void;
  dailyOrders: string;
  setDailyOrders: (val: string) => void;
  averageOrderValue: string;
  setAverageOrderValue: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  tables: number;
  totalHardwareSetup: number;
  isSubmitting: boolean;
  onBack: () => void;
}

export default function StepOperationsPos({
  isUsingPos,
  setIsUsingPos,
  currentSystem,
  setCurrentSystem,
  currentCost,
  setCurrentCost,
  dailyOrders,
  setDailyOrders,
  averageOrderValue,
  setAverageOrderValue,
  notes,
  setNotes,
  tables,
  totalHardwareSetup,
  isSubmitting,
  onBack,
}: StepOperationsPosProps) {
  const billingSoftwareList = [
    "Petpooja",
    "Posist / Restroworks",
    "SlickPOS",
    "Vyapar / Tally",
    "Excel / Handwritten",
    "Other POS",
  ];

  const currentCostList = [
    "₹1,000 – ₹2,500 / month",
    "₹2,500 – ₹5,000 / month",
    "₹30,000 – ₹50,000 / year",
    "₹50,000+ / year",
    "Don't know / Not sure",
  ];

  const dailyOrderOptions = [
    "Under 30 orders/day",
    "30 to 75 orders/day",
    "75 to 150 orders/day",
    "150 to 300+ orders/day",
  ];

  const aovOptions = [
    "Under ₹300",
    "₹300 – ₹600",
    "₹600 – ₹1,200",
    "₹1,200 – ₹2,500+",
  ];

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
          Current Operations & POS Analysis
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--zinc-500)", margin: 0 }}>
          Help us understand your current workflow so we can migrate your data with zero downtime.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {/* Question 1: Are you currently using any POS? */}
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
            Are you currently using any POS or billing system?
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
            {[
              { id: "Yes", label: "Yes, currently using POS software" },
              { id: "Manual", label: "No, using pen & paper / manual register" },
              { id: "New", label: "Planning a new restaurant launch" },
            ].map((opt) => {
              const isSelected = isUsingPos === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setIsUsingPos(opt.id)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                    backgroundColor: isSelected ? "var(--zinc-50)" : "#FFFFFF",
                    color: "var(--zinc-950)",
                    fontSize: "12px",
                    fontWeight: isSelected ? 800 : 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* If Using POS: What system? */}
        {isUsingPos === "Yes" && (
          <>
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
                Which billing software are you currently using?
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {billingSoftwareList.map((sys) => {
                  const isSelected = currentSystem === sys;
                  return (
                    <button
                      key={sys}
                      type="button"
                      onClick={() => setCurrentSystem(sys)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        border: isSelected ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                        backgroundColor: isSelected ? "var(--zinc-950)" : "#FFFFFF",
                        color: isSelected ? "#FFFFFF" : "var(--zinc-700)",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {sys}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current System Cost */}
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
                What is that system&apos;s current monthly/annual fee?
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {currentCostList.map((fee) => {
                  const isSelected = currentCost === fee;
                  return (
                    <button
                      key={fee}
                      type="button"
                      onClick={() => setCurrentCost(fee)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        border: isSelected ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                        backgroundColor: isSelected ? "var(--zinc-950)" : "#FFFFFF",
                        color: isSelected ? "#FFFFFF" : "var(--zinc-700)",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {fee}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Daily Orders */}
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
            Average Daily Orders
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {dailyOrderOptions.map((o) => {
              const isSelected = dailyOrders === o;
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setDailyOrders(o)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    border: isSelected ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                    backgroundColor: isSelected ? "var(--zinc-950)" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "var(--zinc-700)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </div>

        {/* Average Order Value / Ticket Size */}
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
            Average Order Value (AOV / Bill Size)
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {aovOptions.map((rate) => {
              const isSelected = averageOrderValue === rate;
              return (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setAverageOrderValue(rate)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    border: isSelected ? "1px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                    backgroundColor: isSelected ? "var(--zinc-950)" : "#FFFFFF",
                    color: isSelected ? "#FFFFFF" : "var(--zinc-700)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {rate}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes / Special Requests */}
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
            Special Notes or Questions <span style={{ color: "var(--zinc-400)", fontWeight: 500 }}>(Optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Tell us if you need thermal printer integration, multi-counter billing, bar setup, or menu customization..."
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--zinc-300)",
              fontSize: "13.5px",
              outline: "none",
              backgroundColor: "#FFFFFF",
              color: "var(--zinc-950)",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        {/* Cost & Savings Summary Box */}
        <div
          style={{
            padding: "18px 20px",
            borderRadius: "16px",
            backgroundColor: "var(--zinc-950)",
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
          }}
        >
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--zinc-400)" }}>
              Software Terms
            </span>
            <div style={{ fontSize: "15px", fontWeight: 800, marginTop: "2px" }}>
              ₹0 / Month Software Fee
            </div>
            <div style={{ fontSize: "12px", color: "var(--zinc-400)", marginTop: "2px" }}>
              {tables} Table QR Stands & Menu Digitization: ₹{totalHardwareSetup.toLocaleString("en-IN")}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "8px 14px",
              borderRadius: "10px",
              textAlign: "right",
            }}
          >
            <span style={{ fontSize: "10.5px", color: "var(--zinc-400)", fontWeight: 600, display: "block" }}>
              Monthly Software Savings
            </span>
            <strong style={{ fontSize: "14px", color: "#FFFFFF" }}>
              ₹2,500 – ₹4,000 / mo
            </strong>
          </div>
        </div>
      </div>

      {/* Final Navigation Actions */}
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
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{
            height: "48px",
            fontSize: "13.5px",
            padding: "0 28px",
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          <span>{isSubmitting ? "Submitting Application..." : "Submit & Activate POS"}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
