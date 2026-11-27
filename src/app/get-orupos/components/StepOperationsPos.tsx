"use client";

import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  MessageSquare,
  FileText,
  Monitor,
  Store,
  Info,
} from "lucide-react";

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
    { id: "Petpooja", name: "Petpooja", desc: "Standard Indian POS" },
    { id: "Posist / Restroworks", name: "Posist / Restroworks", desc: "Enterprise cloud POS" },
    { id: "Vyapar / Tally", name: "Vyapar / Tally", desc: "Accounting & GST billing" },
    { id: "SlickPOS", name: "SlickPOS", desc: "Tablet billing" },
    { id: "Other Software", name: "Other Software", desc: "Custom or local POS" },
    { id: "Not Sure", name: "Not Sure", desc: "We'll check on WhatsApp" },
  ];

  const currentCostList = [
    "Under ₹1,500 / month",
    "₹1,500 – ₹3,500 / month",
    "₹30,000+ / year",
    "Not sure / Skip",
  ];

  const dailyOrderOptions = [
    { label: "Under 50 orders/day", sub: "Small cafe or starter outlet" },
    { label: "50 to 100 orders/day", sub: "Medium dine-in restaurant" },
    { label: "100 to 250+ orders/day", sub: "Busy restaurant or rush hours" },
    { label: "Not sure / Just starting", sub: "New launch or flexible" },
  ];

  const aovOptions = [
    { label: "Under ₹300", sub: "Chai, quick bites, snacks" },
    { label: "₹300 – ₹700", sub: "Standard dine-in & casual" },
    { label: "₹700 – ₹1,500+", sub: "Fine dining, family dining" },
    { label: "Not sure / Skip", sub: "We'll configure later" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <h2
            style={{
              fontSize: "1.45rem",
              fontWeight: 850,
              color: "var(--zinc-950)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Billing & Operations Setup
          </h2>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              backgroundColor: "var(--zinc-100)",
              color: "var(--zinc-600)",
              padding: "2px 8px",
              borderRadius: "6px",
            }}
          >
            Optional
          </span>
        </div>
        <p style={{ fontSize: "0.88rem", color: "var(--zinc-500)", margin: 0, lineHeight: 1.5 }}>
          Quick details to help us customize your digital menu and printer setup. Don&apos;t worry if you&apos;re not sure—you can skip or update anything later on WhatsApp.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Question 1: How do you handle billing right now? */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "8px",
            }}
          >
            How do you handle orders & billing right now?
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              {
                id: "Manual",
                title: "Pen, Paper or Register",
                icon: FileText,
                desc: "Paper slips, kacha bills, counter notebook, or basic calculator",
              },
              {
                id: "Yes",
                title: "Computer / Billing Software",
                icon: Monitor,
                desc: "Currently using Petpooja, Vyapar, Posist, Excel, or another POS",
              },
              {
                id: "New",
                title: "Opening a New Outlet",
                icon: Store,
                desc: "Setting up fresh for an upcoming launch or renovation",
              },
            ].map((opt) => {
              const isSelected = isUsingPos === opt.id;
              const OptionIcon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setIsUsingPos(opt.id)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: isSelected ? "2px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                    backgroundColor: isSelected ? "var(--zinc-50)" : "#FFFFFF",
                    color: "var(--zinc-950)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      <OptionIcon size={16} color={isSelected ? "var(--zinc-950)" : "var(--zinc-500)"} />
                      <span style={{ fontSize: "13.5px", fontWeight: isSelected ? 800 : 700 }}>
                        {opt.title}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 size={16} color="var(--zinc-950)" />}
                  </div>
                  <span style={{ fontSize: "11.5px", color: "var(--zinc-500)", lineHeight: 1.4 }}>
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* If using software: Which one? */}
        {isUsingPos === "Yes" && (
          <div
            style={{
              padding: "16px",
              borderRadius: "16px",
              backgroundColor: "var(--zinc-50)",
              border: "1px solid var(--zinc-200)",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 750,
                    color: "var(--zinc-900)",
                    margin: 0,
                  }}
                >
                  Which software are you using?
                </label>
                <span style={{ fontSize: "11px", color: "var(--zinc-400)" }}>Tap to select</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px" }}>
                {billingSoftwareList.map((sys) => {
                  const isSelected = currentSystem === sys.id;
                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => setCurrentSystem(sys.id)}
                      style={{
                        padding: "10px 12px",
                        minHeight: "48px",
                        borderRadius: "12px",
                        border: isSelected ? "2px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                        backgroundColor: isSelected ? "#FFFFFF" : "#FFFFFF",
                        color: isSelected ? "var(--zinc-950)" : "var(--zinc-700)",
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "2px",
                        boxShadow: isSelected ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span style={{ fontSize: "12.5px", fontWeight: isSelected ? 800 : 600 }}>
                        {sys.name}
                      </span>
                      <span style={{ fontSize: "10.5px", color: isSelected ? "var(--zinc-600)" : "var(--zinc-400)" }}>
                        {sys.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Software Cost (Optional) */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--zinc-700)",
                  marginBottom: "8px",
                }}
              >
                Approximate monthly fee you currently pay <span style={{ color: "var(--zinc-400)", fontWeight: 500 }}>(To calculate your savings)</span>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
                {currentCostList.map((fee) => {
                  const isSelected = currentCost === fee;
                  return (
                    <button
                      key={fee}
                      type="button"
                      onClick={() => setCurrentCost(fee)}
                      style={{
                        padding: "10px 12px",
                        minHeight: "44px",
                        borderRadius: "10px",
                        border: isSelected ? "2px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                        backgroundColor: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                        color: isSelected ? "var(--zinc-950)" : "var(--zinc-700)",
                        fontSize: "12px",
                        fontWeight: isSelected ? 800 : 600,
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      {fee}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Question 2: Daily Order Volume */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "4px",
            }}
          >
            Roughly how many orders or tables do you serve daily?
          </label>
          <span style={{ display: "block", fontSize: "11.5px", color: "var(--zinc-500)", marginBottom: "8px" }}>
            Helps us recommend the best kitchen printer or display setup. An estimate is totally fine.
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px" }}>
            {dailyOrderOptions.map((opt) => {
              const isSelected = dailyOrders === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setDailyOrders(opt.label)}
                  style={{
                    padding: "12px 14px",
                    minHeight: "56px",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                    backgroundColor: isSelected ? "var(--zinc-50)" : "#FFFFFF",
                    color: "var(--zinc-950)",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "12.5px", fontWeight: isSelected ? 800 : 700 }}>
                    {opt.label}
                  </span>
                  <span style={{ fontSize: "10.5px", color: "var(--zinc-500)" }}>
                    {opt.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Average Bill Value */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "4px",
            }}
          >
            Average bill amount per table
          </label>
          <span style={{ display: "block", fontSize: "11.5px", color: "var(--zinc-500)", marginBottom: "8px" }}>
            Helps us configure recommended combo items & smart upselling for your menu.
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px" }}>
            {aovOptions.map((opt) => {
              const isSelected = averageOrderValue === opt.label;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setAverageOrderValue(opt.label)}
                  style={{
                    padding: "12px 14px",
                    minHeight: "56px",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid var(--zinc-950)" : "1px solid var(--zinc-200)",
                    backgroundColor: isSelected ? "var(--zinc-50)" : "#FFFFFF",
                    color: "var(--zinc-950)",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "12.5px", fontWeight: isSelected ? 800 : 700 }}>
                    {opt.label}
                  </span>
                  <span style={{ fontSize: "10.5px", color: "var(--zinc-500)" }}>
                    {opt.sub}
                  </span>
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
              fontSize: "13px",
              fontWeight: 750,
              color: "var(--zinc-900)",
              marginBottom: "6px",
            }}
          >
            Special Notes or Requests <span style={{ color: "var(--zinc-400)", fontWeight: 500 }}>(Optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="e.g., We need thermal printer KOT integration, multi-counter billing, bar setup, or help uploading our PDF menu..."
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--zinc-300)",
              fontSize: "13px",
              outline: "none",
              backgroundColor: "#FFFFFF",
              color: "var(--zinc-950)",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--zinc-500)", marginTop: "4px" }}>
            <Info size={13} style={{ flexShrink: 0 }} />
            <span>You can leave this blank if you don&apos;t have any specific questions right now.</span>
          </span>
        </div>

        {/* What Happens Next Guidance Box */}
        <div
          style={{
            padding: "16px 18px",
            borderRadius: "14px",
            backgroundColor: "rgba(229, 169, 60, 0.08)",
            border: "1px solid rgba(229, 169, 60, 0.25)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={18} color="#C4881A" />
            <strong style={{ fontSize: "13px", color: "var(--zinc-900)" }}>
              What happens after you click Submit?
            </strong>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <Zap size={15} color="#C4881A" style={{ marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "var(--zinc-700)", lineHeight: 1.4 }}>
                <strong>Zero upfront cost:</strong> No subscription fee, no credit card required to start.
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <MessageSquare size={15} color="#C4881A" style={{ marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "var(--zinc-700)", lineHeight: 1.4 }}>
                <strong>WhatsApp connection:</strong> Our team shares your login credentials & live preview on WhatsApp.
              </span>
            </div>
          </div>
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
              Pricing Breakdown
            </span>
            <div style={{ fontSize: "16px", fontWeight: 800, marginTop: "2px" }}>
              ₹0 / Month Software Fee (Lifetime)
            </div>
            <div style={{ fontSize: "12px", color: "var(--zinc-400)", marginTop: "2px" }}>
              {tables} Custom QR Table Stations + Setup: ₹{totalHardwareSetup.toLocaleString("en-IN")} one-time
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
              Your Annual Software Savings
            </span>
            <strong style={{ fontSize: "14px", color: "#FFFFFF" }}>
              ₹30,000 – ₹50,000 / year
            </strong>
          </div>
        </div>
      </div>

      {/* Final Navigation Actions */}
      <div
        style={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "1px solid var(--zinc-200)",
            borderRadius: "12px",
            color: "var(--zinc-700)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "12px 18px",
            minHeight: "48px",
          }}
        >
          <ArrowLeft size={15} />
          <span>Back to Restaurant Details</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{
            height: "50px",
            fontSize: "14px",
            padding: "0 28px",
            borderRadius: "12px",
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span>{isSubmitting ? "Saving & Setting Up..." : "Submit & Activate Zero-Subscription POS"}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
