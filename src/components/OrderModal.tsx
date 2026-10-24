"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, Send, Check, X, Minus, Plus } from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTables?: number;
}

export default function OrderModal({ isOpen, onClose, initialTables = 10 }: OrderModalProps) {
  const [step, setStep] = useState<number>(1);
  const [tables, setTables] = useState<number>(initialTables);
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [method, setMethod] = useState<"whatsapp" | "call" | "submit">("whatsapp");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTables(initialTables);
      setStep(1);
      setSubmitted(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, initialTables]);

  if (!isOpen) return null;

  const total = tables * ORUPOS_CONFIG.pricing.pricePerTable;

  const handleStep2Next = () => {
    if (!restaurantName.trim()) {
      alert("Please enter your Restaurant or Food Business Name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      alert("Please enter a valid 10-digit Phone or WhatsApp Number.");
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = () => {
    const orderData = {
      tables,
      restaurantName,
      ownerName,
      phone,
      city,
    };

    if (method === "whatsapp") {
      const url = ORUPOS_CONFIG.getWhatsAppUrl(orderData);
      window.open(url, "_blank");
      setSubmitted(true);
    } else if (method === "call") {
      window.location.href = `tel:${ORUPOS_CONFIG.contact.phoneTel}`;
      setSubmitted(true);
    } else {
      setSubmitted(true);
    }
  };

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
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          maxWidth: "480px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-modal)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid var(--color-border-subtle)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>Get OruPos POS System</h3>
            <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Zero Monthly Subscription · Hardware Included</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 8px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#ECFDF5",
                  color: "#059669",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Check size={28} strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 650, marginBottom: "8px" }}>POS Request Received</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-body)", marginBottom: "24px", lineHeight: 1.6 }}>
                {method === "whatsapp"
                  ? `Your POS onboarding summary for ${restaurantName} (${tables} tables) has been prepared. Our team will message you back on WhatsApp shortly to configure your restaurant!`
                  : `Thank you ${ownerName || "Restaurant Owner"}! Our restaurant POS specialist will reach out to you at ${phone} to complete your setup.`}
              </p>
              <button type="button" className="btn btn-primary" onClick={onClose} style={{ minWidth: "120px" }}>
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Step Progress Indicators */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                  position: "relative",
                  borderBottom: "1px solid var(--color-border-subtle)",
                  paddingBottom: "14px",
                }}
              >
                {[
                  { num: 1, label: "Tables" },
                  { num: 2, label: "Details" },
                  { num: 3, label: "Confirm" },
                ].map((s) => {
                  const isActive = step === s.num;
                  const isCompleted = step > s.num;
                  return (
                    <div key={s.num} style={{ textAlign: "center", flex: 1 }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: isActive ? 650 : 500,
                          color: isActive
                            ? "var(--color-text-main)"
                            : isCompleted
                            ? "var(--color-whatsapp)"
                            : "var(--color-text-light)",
                        }}
                      >
                        {isCompleted ? "✓ " : `${s.num}. `}{s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* STEP 1: Table Count */}
              {step === 1 && (
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px", color: "var(--color-text-main)" }}>
                    How many dining tables do you have?
                  </label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", margin: "20px 0" }}>
                    <button
                      type="button"
                      onClick={() => tables > 1 && setTables(tables - 1)}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-text-main)",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={tables}
                      onChange={(e) => setTables(Math.max(1, Math.min(200, parseInt(e.target.value, 10) || 1)))}
                      style={{
                        width: "80px",
                        height: "42px",
                        textAlign: "center",
                        fontSize: "1.25rem",
                        fontWeight: 650,
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => tables < 200 && setTables(tables + 1)}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "var(--radius-full)",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid var(--color-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-text-main)",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--color-border-subtle)",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "18px 0",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "13px", color: "var(--color-text-body)" }}>Estimated Total:</span>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                        {tables} Tables × ₹{ORUPOS_CONFIG.pricing.pricePerTable} (Pay once)
                      </div>
                    </div>
                    <strong style={{ fontSize: "1.35rem", color: "var(--color-text-main)", fontWeight: 700 }}>
                      ₹{total.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Check size={13} color="var(--color-whatsapp)" />
                    <span>Includes Cloud POS Software + Kitchen KOT + Custom Acrylic Stands.</span>
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={() => setStep(2)}
                  >
                    <span>Next: Restaurant Details</span>
                  </button>
                </div>
              )}

              {/* STEP 2: Restaurant & Owner Details */}
              {step === 2 && (
                <div>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-text-main)" }}>
                      Restaurant / Business Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Spice, Cafe Bistro..."
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-text-main)" }}>
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-text-main)" }}>
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "14px",
                      }}
                    />
                    <div style={{ fontSize: "11.5px", color: "var(--color-text-muted)", marginTop: "3px" }}>
                      We will share your digital menu link here.
                    </div>
                  </div>

                  <div style={{ marginBottom: "22px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-text-main)" }}>
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Delhi, Bengaluru..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={handleStep2Next}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Proceed Methods */}
              {step === 3 && (
                <div>
                  <div
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--color-border-subtle)",
                      borderRadius: "var(--radius-sm)",
                      padding: "12px 14px",
                      fontSize: "12.5px",
                      lineHeight: 1.6,
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <strong>Restaurant:</strong> {restaurantName} {city ? `(${city})` : ""}
                    </div>
                    <div>
                      <strong>Contact:</strong> {ownerName ? `${ownerName} · ` : ""}{phone}
                    </div>
                    <div>
                      <strong>Order:</strong> {tables} Tables · <strong>Total: ₹{total.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "10px", color: "var(--color-text-main)" }}>
                    How would you like to connect?
                  </label>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                    {/* WhatsApp */}
                    <div
                      onClick={() => setMethod("whatsapp")}
                      style={{
                        border: method === "whatsapp" ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                        backgroundColor: method === "whatsapp" ? "var(--bg-subtle)" : "#FFFFFF",
                        borderRadius: "var(--radius-sm)",
                        padding: "12px 14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={method === "whatsapp"}
                        onChange={() => setMethod("whatsapp")}
                      />
                      <MessageCircle size={18} color="#059669" />
                      <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 600, margin: 0, color: "var(--color-text-main)" }}>
                          Connect on WhatsApp (Fastest)
                        </h4>
                        <p style={{ fontSize: "11.5px", color: "var(--color-text-muted)", margin: 0 }}>
                          Chat directly with our POS specialists to start your restaurant onboarding.
                        </p>
                      </div>
                    </div>

                    {/* Phone Call */}
                    <div
                      onClick={() => setMethod("call")}
                      style={{
                        border: method === "call" ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                        backgroundColor: method === "call" ? "var(--bg-subtle)" : "#FFFFFF",
                        borderRadius: "var(--radius-sm)",
                        padding: "12px 14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={method === "call"}
                        onChange={() => setMethod("call")}
                      />
                      <Phone size={18} color="var(--color-text-main)" />
                      <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 600, margin: 0, color: "var(--color-text-main)" }}>
                          Request a Phone Call
                        </h4>
                        <p style={{ fontSize: "11.5px", color: "var(--color-text-muted)", margin: 0 }}>
                          Speak directly to our specialist.
                        </p>
                      </div>
                    </div>

                    {/* Submit Request */}
                    <div
                      onClick={() => setMethod("submit")}
                      style={{
                        border: method === "submit" ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                        backgroundColor: method === "submit" ? "var(--bg-subtle)" : "#FFFFFF",
                        borderRadius: "var(--radius-sm)",
                        padding: "12px 14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={method === "submit"}
                        onChange={() => setMethod("submit")}
                      />
                      <Send size={18} color="var(--color-text-main)" />
                      <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 600, margin: 0, color: "var(--color-text-main)" }}>
                          Submit Online Inquiry
                        </h4>
                        <p style={{ fontSize: "11.5px", color: "var(--color-text-muted)", margin: 0 }}>
                          We will reach out to your phone within 15 minutes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={handleFinalSubmit}
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
