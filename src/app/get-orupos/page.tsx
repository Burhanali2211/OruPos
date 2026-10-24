"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  MessageCircle,
  Phone,
  Building2,
  User,
  Layers,
  IndianRupee,
  UtensilsCrossed,
  ShieldCheck,
  Minus,
  Plus,
} from "lucide-react";
import { ORUPOS_CONFIG } from "@/data/config";

function OnboardingForm() {
  const searchParams = useSearchParams();
  const initialTablesParam = searchParams.get("tables");
  const parsedTables = initialTablesParam ? parseInt(initialTablesParam, 10) : 10;

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 1: Personal Info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Owner / Proprietor");

  // Step 2: Restaurant Details
  const [restaurantName, setRestaurantName] = useState("");
  const [outletType, setOutletType] = useState("Dine-in Restaurant");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [tables, setTables] = useState(isNaN(parsedTables) || parsedTables < 1 ? 10 : parsedTables);

  // Step 3: Operations & Current System
  const [isUsingPos, setIsUsingPos] = useState("Yes");
  const [currentSystem, setCurrentSystem] = useState("Petpooja");
  const [currentCost, setCurrentCost] = useState("₹1,500 – ₹3,000 / month");
  const [dailyOrders, setDailyOrders] = useState("50 to 100 orders/day");
  const [averageOrderValue, setAverageOrderValue] = useState("₹400 – ₹800");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, submitted]);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name";
    const cleanedPhone = phone.replace(/\D/g, "");
    if (!cleanedPhone || cleanedPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit WhatsApp/phone number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!restaurantName.trim()) errs.restaurantName = "Please enter your restaurant name";
    if (!city.trim()) errs.city = "Please enter your city/state";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      fullName,
      phone,
      email,
      role,
      restaurantName,
      outletType,
      city,
      address,
      tables,
      isUsingPos,
      currentSystem: isUsingPos === "Yes" ? currentSystem : "None",
      currentCost: isUsingPos === "Yes" ? currentCost : "₹0",
      dailyOrders,
      averageOrderValue,
      notes,
    };

    try {
      await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // Continue even if network fails so user is not blocked
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const totalHardwareSetup = tables * ORUPOS_CONFIG.pricing.pricePerTable;

  // Generate personalized WhatsApp message with full details
  const getPersonalizedWhatsAppUrl = () => {
    let msg = `Namaste OruPos Team!\nI have submitted my restaurant onboarding details:\n\n`;
    msg += `👤 Contact: ${fullName} (${role})\n`;
    msg += `📞 Phone/WhatsApp: ${phone}\n`;
    if (email) msg += `✉️ Email: ${email}\n`;
    msg += `\n🍽️ Restaurant: ${restaurantName}\n`;
    msg += `📍 Location: ${city} ${address ? `(${address})` : ""}\n`;
    msg += `🏢 Outlet Type: ${outletType}\n`;
    msg += `🪑 Tables: ${tables} tables (Hardware: ₹${totalHardwareSetup.toLocaleString("en-IN")})\n`;
    msg += `\n⚙️ Current POS: ${isUsingPos === "Yes" ? `${currentSystem} (paying ~${currentCost})` : isUsingPos}\n`;
    msg += `📊 Daily Volume: ${dailyOrders} | Avg Ticket: ${averageOrderValue}\n`;
    if (notes) msg += `📝 Notes: ${notes}\n`;
    msg += `\nPlease guide me on deploying OruPos 0-Subscription POS and receiving our custom acrylic stands.`;

    return `https://wa.me/${ORUPOS_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-page)", position: "relative" }}>
      {/* Top Floating Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border-hairline)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <img
              src="/assets/logo.png"
              alt="OruPos"
              style={{
                height: "28px",
                width: "auto",
                objectFit: "contain",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span
                style={{
                  fontWeight: 900,
                  color: "var(--zinc-950)",
                  fontSize: "16px",
                  letterSpacing: "-0.03em",
                }}
              >
                POS
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 750,
                  letterSpacing: "0.08em",
                  color: "var(--zinc-400)",
                  textTransform: "uppercase",
                }}
              >
                Zero-Subscription
              </span>
            </div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/"
              style={{
                fontSize: "12.5px",
                fontWeight: 650,
                color: "var(--zinc-600)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <ArrowLeft size={14} />
              <span className="hidden-mobile">Back to Home</span>
            </Link>

            <a
              href={ORUPOS_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: "36px",
                padding: "0 14px",
                borderRadius: "9999px",
                backgroundColor: "var(--zinc-100)",
                border: "1px solid var(--zinc-200)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--zinc-800)",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={14} color="var(--emerald-600)" />
              <span>Need Help?</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ padding: "40px 20px 80px", maxWidth: "1000px", margin: "0 auto" }}>
        {!submitted ? (
          <div>
            {/* Title & Value Pitch */}
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 36px" }}>
              <h1
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  color: "var(--zinc-950)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.035em",
                  margin: "0 0 12px",
                }}
              >
                Get your 0-subscription POS system
              </h1>
              <p style={{ fontSize: "1rem", color: "var(--zinc-500)", margin: 0, lineHeight: 1.55 }}>
                Fill in your details below so we can configure your menu, tables, and tax settings for rapid deployment.
              </p>
            </div>

            {/* Stepper Progress Bar */}
            <div
              style={{
                maxWidth: "620px",
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
                  top: "18px",
                  left: "40px",
                  right: "40px",
                  height: "2px",
                  backgroundColor: "var(--zinc-200)",
                  zIndex: 1,
                }}
              />
              {/* Active Connecting Line */}
              <div
                style={{
                  position: "absolute",
                  top: "18px",
                  left: "40px",
                  width: step === 1 ? "0%" : step === 2 ? "50%" : "85%",
                  height: "2px",
                  backgroundColor: "var(--zinc-950)",
                  zIndex: 2,
                  transition: "width 0.3s ease",
                }}
              />

              {[
                { s: 1, label: "Personal Info", icon: User },
                { s: 2, label: "Restaurant Details", icon: Building2 },
                { s: 3, label: "Operations & POS", icon: UtensilsCrossed },
              ].map((item) => {
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
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: isActive
                          ? "var(--zinc-950)"
                          : isCompleted
                          ? "var(--emerald-600)"
                          : "#FFFFFF",
                        border: isActive || isCompleted ? "none" : "2px solid var(--zinc-300)",
                        color: isActive || isCompleted ? "#FFFFFF" : "var(--zinc-500)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 800,
                        boxShadow: isActive ? "0 4px 12px rgba(9, 9, 11, 0.2)" : "none",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {isCompleted ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
                    </div>
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: isActive ? 800 : 600,
                        color: isActive ? "var(--zinc-950)" : "var(--zinc-500)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Two-Column Form & Summary Layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "28px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "clamp(20px, 3vw, 32px)",
                  padding: "clamp(24px, 4vw, 40px)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <form onSubmit={handleSubmit}>
                  {/* STEP 1: PERSONAL INFO */}
                  {step === 1 && (
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
                          onClick={handleNext}
                          className="btn-easyio"
                          style={{ height: "48px", fontSize: "13.5px", padding: "0 24px" }}
                        >
                          <span>Next: Restaurant Details</span>
                          <div className="arrow-circle">
                            <ArrowRight size={16} />
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: RESTAURANT DETAILS */}
                  {step === 2 && (
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
                            {[
                              "Dine-in Restaurant",
                              "Cafe & Roastery",
                              "Fast Food / QSR",
                              "Cloud Kitchen",
                              "Bakery & Sweets",
                              "Bar & Bistro",
                              "Hotel / Resort",
                            ].map((concept) => {
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
                            {["Srinagar", "Anantnag", "Baramulla", "Jammu", "Delhi NCR", "Bengaluru", "Mumbai"].map((c) => (
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
                            Street / Outlet Address <span style={{ color: "var(--zinc-400)", fontWeight: 500 }}>(For Acrylic Hardware Delivery)</span>
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
                                Each table receives a custom 3mm optical cast acrylic QR station.
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
                              onClick={() => setTables(Math.min(150, tables + 1))}
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
                            {[5, 10, 15, 20, 30, 50].map((num) => (
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
                          onClick={handleBack}
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
                          onClick={handleNext}
                          className="btn-easyio"
                          style={{ height: "48px", fontSize: "13.5px", padding: "0 24px" }}
                        >
                          <span>Next: Operations & POS</span>
                          <div className="arrow-circle">
                            <ArrowRight size={16} />
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: OPERATIONS & CURRENT SYSTEM */}
                  {step === 3 && (
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
                                {[
                                  "Petpooja",
                                  "Posist / Restroworks",
                                  "SlickPOS",
                                  "Vyapar / Tally",
                                  "Excel / Handwritten",
                                  "Other POS",
                                ].map((sys) => {
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
                                {[
                                  "₹1,000 – ₹2,500 / month",
                                  "₹2,500 – ₹5,000 / month",
                                  "₹30,000 – ₹50,000 / year",
                                  "₹50,000+ / year",
                                  "Don't know / Not sure",
                                ].map((fee) => {
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
                            {[
                              "Under 30 orders/day",
                              "30 to 75 orders/day",
                              "75 to 150 orders/day",
                              "150 to 300+ orders/day",
                            ].map((o) => {
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
                            {[
                              "Under ₹300",
                              "₹300 – ₹600",
                              "₹600 – ₹1,200",
                              "₹1,200 – ₹2,500+",
                            ].map((rate) => {
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
                            <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--emerald-500)" }}>
                              Your OruPos Agreement
                            </span>
                            <div style={{ fontSize: "15px", fontWeight: 850, marginTop: "2px" }}>
                              ₹0 Monthly Software Subscription Forever
                            </div>
                            <div style={{ fontSize: "12px", color: "var(--zinc-400)", marginTop: "2px" }}>
                              One-time {tables} Acrylic Stands & Full Menu Setup: ₹{totalHardwareSetup.toLocaleString("en-IN")}
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: "rgba(16, 185, 129, 0.15)",
                              border: "1px solid rgba(16, 185, 129, 0.3)",
                              padding: "8px 14px",
                              borderRadius: "10px",
                              textAlign: "right",
                            }}
                          >
                            <span style={{ fontSize: "10.5px", color: "var(--emerald-400)", fontWeight: 700, display: "block" }}>
                              Estimated Software Rent Saved
                            </span>
                            <strong style={{ fontSize: "14px", color: "#FFFFFF" }}>
                              ₹25,000 – ₹45,000 / year
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Final Navigation Actions */}
                      <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={handleBack}
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
                          className="btn-easyio"
                          style={{
                            height: "50px",
                            fontSize: "14px",
                            padding: "0 28px",
                            opacity: isSubmitting ? 0.7 : 1,
                          }}
                        >
                          <span>{isSubmitting ? "Submitting Application..." : "Submit & Deploy Restaurant"}</span>
                          <div className="arrow-circle">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* SUCCESS CONFIRMATION SCREEN */
          <div
            style={{
              maxWidth: "680px",
              margin: "20px auto 0",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--border-hairline)",
              borderRadius: "clamp(24px, 4vw, 36px)",
              padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)",
              boxShadow: "var(--shadow-float)",
              textAlign: "center",
            }}
          >
            {/* Green Badge */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "var(--emerald-50)",
                border: "2px solid var(--emerald-500)",
                color: "var(--emerald-600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <CheckCircle2 size={38} strokeWidth={2.4} />
            </div>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 900,
                color: "var(--zinc-950)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                margin: "0 0 14px",
              }}
            >
              Thank you, {fullName || "Partner"}!
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--zinc-600)",
                lineHeight: 1.6,
                maxWidth: "520px",
                margin: "0 auto 28px",
              }}
            >
              We have received your onboarding details for{" "}
              <strong style={{ color: "var(--zinc-950)" }}>{restaurantName || "your restaurant"}</strong> ({tables} Tables in {city || "India"}).
              Our deployment specialist is preparing your digital catalog.
            </p>

            {/* Application Summary Box */}
            <div
              style={{
                backgroundColor: "var(--zinc-50)",
                borderRadius: "18px",
                padding: "20px",
                border: "1px solid var(--border-subtle)",
                textAlign: "left",
                marginBottom: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "13px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--zinc-200)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--zinc-500)" }}>Restaurant</span>
                <strong style={{ color: "var(--zinc-950)" }}>{restaurantName}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--zinc-200)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--zinc-500)" }}>Software Fee</span>
                <strong style={{ color: "var(--emerald-600)" }}>₹0 / month (Zero Subscription)</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--zinc-200)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--zinc-500)" }}>Hardware Stands</span>
                <strong style={{ color: "var(--zinc-950)" }}>{tables} Acrylic Stands (₹{totalHardwareSetup.toLocaleString("en-IN")})</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--zinc-500)" }}>Contact Number</span>
                <strong style={{ color: "var(--zinc-950)" }}>+91 {phone}</strong>
              </div>
            </div>

            {/* Instant WhatsApp Action */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
              <a
                href={getPersonalizedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-easyio"
                style={{
                  height: "52px",
                  fontSize: "14px",
                  padding: "0 28px",
                  textDecoration: "none",
                  width: "100%",
                  maxWidth: "420px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} style={{ marginRight: "8px" }} />
                <span>Connect on WhatsApp to Activate</span>
                <div className="arrow-circle">
                  <ArrowRight size={16} />
                </div>
              </a>

              <a
                href={`tel:${ORUPOS_CONFIG.contact.phoneTel}`}
                style={{
                  fontSize: "13px",
                  fontWeight: 650,
                  color: "var(--zinc-600)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "6px",
                }}
              >
                <Phone size={14} />
                <span>Or call us directly at {ORUPOS_CONFIG.contact.phoneDisplay}</span>
              </a>

              <Link
                href="/"
                style={{
                  fontSize: "12px",
                  color: "var(--zinc-400)",
                  textDecoration: "underline",
                  marginTop: "14px",
                }}
              >
                Return to homepage
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function GetOruPosPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "80px 20px", textAlign: "center", color: "var(--zinc-500)" }}>
          Loading OruPos Onboarding...
        </div>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}
