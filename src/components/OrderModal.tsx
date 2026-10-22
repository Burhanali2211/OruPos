"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, Send, Check } from "lucide-react";
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
        backgroundColor: "rgba(18, 34, 30, 0.75)",
        backdropFilter: "blur(4px)",
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
          maxWidth: "520px",
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
            padding: "20px 24px",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>Get Your Digital Menu</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "var(--color-text-muted)",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 8px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#DCFCE7",
                  color: "#15803D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Check size={36} strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>Request Received!</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-body)", marginBottom: "24px", lineHeight: 1.5 }}>
                {method === "whatsapp"
                  ? `Your order details for ${restaurantName} (${tables} tables) have been generated. We will reply to your WhatsApp within 15 minutes!`
                  : `Thank you ${ownerName || "Restaurant Owner"}! Our team will contact you at ${phone} shortly to collect your menu and confirm your table stand order.`}
              </p>
              <button type="button" className="btn btn-primary" onClick={onClose}>
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
                }}
              >
                {[
                  { num: 1, label: "Tables" },
                  { num: 2, label: "Details" },
                  { num: 3, label: "Proceed" },
                ].map((s) => {
                  const isActive = step === s.num;
                  const isCompleted = step > s.num;
                  return (
                    <div key={s.num} style={{ textAlign: "center", flex: 1 }}>
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: isActive
                            ? "var(--color-primary)"
                            : isCompleted
                            ? "var(--color-success)"
                            : "#FFFFFF",
                          border: isActive
                            ? "2px solid var(--color-primary)"
                            : isCompleted
                            ? "2px solid var(--color-success)"
                            : "2px solid var(--color-border)",
                          color: isActive || isCompleted ? "#FFFFFF" : "var(--color-text-muted)",
                          fontSize: "12px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 4px",
                        }}
                      >
                        {isCompleted ? "✓" : s.num}
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* STEP 1: Table Count */}
              {step === 1 && (
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px" }}>
                    How many dining tables do you have?
                  </label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", margin: "16px 0" }}>
                    <button
                      type="button"
                      onClick={() => tables > 1 && setTables(tables - 1)}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid var(--color-border)",
                        fontSize: "20px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={tables}
                      onChange={(e) => setTables(Math.max(1, Math.min(200, parseInt(e.target.value, 10) || 1)))}
                      style={{
                        width: "90px",
                        height: "48px",
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 700,
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => tables < 200 && setTables(tables + 1)}
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "#FFFFFF",
                        border: "1px solid var(--color-border)",
                        fontSize: "20px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--bg-subtle)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      padding: "14px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "16px 0",
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>Your Estimated Total:</span>
                      <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                        {tables} Tables × ₹{ORUPOS_CONFIG.pricing.pricePerTable} (No Hidden Charges)
                      </div>
                    </div>
                    <strong style={{ fontSize: "1.5rem", color: "var(--color-primary)" }}>
                      ₹{total.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "20px" }}>
                    ✓ Includes physical acrylic stand + QR code + table number for each table.
                  </p>

                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={() => setStep(2)}
                  >
                    Next: Enter Restaurant Details →
                  </button>
                </div>
              )}

              {/* STEP 2: Restaurant & Owner Details */}
              {step === 2 && (
                <div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                      Restaurant / Business Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Punjab Dhaba, Cafe Bliss..."
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                      Owner / Manager Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
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
                        padding: "12px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "14px",
                      }}
                    />
                    <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                      We will send your digital menu preview on this number.
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jaipur, Lucknow, Pune, Bengaluru..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "14px",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={handleStep2Next}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Proceed Methods */}
              {step === 3 && (
                <div>
                  <div
                    style={{
                      background: "var(--bg-page)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      marginBottom: "16px",
                    }}
                  >
                    <div>
                      <strong>Restaurant:</strong> {restaurantName} {city ? `(${city})` : ""}
                    </div>
                    <div>
                      <strong>Contact:</strong> {ownerName ? `${ownerName} • ` : ""}
                      {phone}
                    </div>
                    <div>
                      <strong>Order:</strong> {tables} Tables •{" "}
                      <strong>Total: ₹{total.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  <label style={{ display: "block", fontSize: "14px", fontWeight: 700, marginBottom: "10px" }}>
                    How would you like to proceed?
                  </label>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                    {/* WhatsApp */}
                    <div
                      onClick={() => setMethod("whatsapp")}
                      style={{
                        border: method === "whatsapp" ? "2px solid var(--color-whatsapp)" : "2px solid var(--color-border)",
                        backgroundColor: method === "whatsapp" ? "var(--color-whatsapp-light)" : "#FFFFFF",
                        borderRadius: "var(--radius-md)",
                        padding: "14px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={method === "whatsapp"}
                        onChange={() => setMethod("whatsapp")}
                      />
                      <MessageCircle size={22} color="#15803D" />
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>
                          Send on WhatsApp (Fastest)
                        </h4>
                        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0 }}>
                          Chat directly with our onboarding team & share your menu photos.
                        </p>
                      </div>
                    </div>

                    {/* Phone Call */}
                    <div
                      onClick={() => setMethod("call")}
                      style={{
                        border: method === "call" ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                        backgroundColor: method === "call" ? "var(--color-primary-light)" : "#FFFFFF",
                        borderRadius: "var(--radius-md)",
                        padding: "14px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={method === "call"}
                        onChange={() => setMethod("call")}
                      />
                      <Phone size={22} color="#163832" />
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>
                          Call Me on Phone
                        </h4>
                        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0 }}>
                          Speak directly to our specialist to clarify details.
                        </p>
                      </div>
                    </div>

                    {/* Submit Request */}
                    <div
                      onClick={() => setMethod("submit")}
                      style={{
                        border: method === "submit" ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                        backgroundColor: method === "submit" ? "var(--color-primary-light)" : "#FFFFFF",
                        borderRadius: "var(--radius-md)",
                        padding: "14px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <input
                        type="radio"
                        name="method"
                        checked={method === "submit"}
                        onChange={() => setMethod("submit")}
                      />
                      <Send size={22} color="#163832" />
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>
                          Submit Request Online
                        </h4>
                        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0 }}>
                          We will contact you via WhatsApp / Call within 15 minutes.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={handleFinalSubmit}
                    >
                      Confirm & Proceed
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
