"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ORUPOS_CONFIG } from "@/data/config";
import OnboardingHeader from "./components/OnboardingHeader";
import OnboardingProgress from "./components/OnboardingProgress";
import StepPersonalInfo from "./components/StepPersonalInfo";
import StepRestaurantDetails from "./components/StepRestaurantDetails";
import StepOperationsPos from "./components/StepOperationsPos";
import OnboardingSuccess from "./components/OnboardingSuccess";

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
    let msg = `Hi OruPOS Team,\nI have submitted my restaurant onboarding details:\n\n`;
    msg += `👤 Contact: ${fullName.trim()}${role ? ` (${role})` : ""}\n`;
    msg += `📞 Phone/WhatsApp: ${phone.trim()}\n`;
    if (email.trim()) msg += `✉️ Email: ${email.trim()}\n`;
    msg += `\n🍽️ Restaurant: ${restaurantName.trim()}\n`;
    msg += `📍 Location: ${city.trim()}${address.trim() ? ` (${address.trim()})` : ""}\n`;
    msg += `🏢 Outlet Type: ${outletType}\n`;
    msg += `🪑 Tables: ${tables} tables (Hardware Setup: ₹${totalHardwareSetup.toLocaleString("en-IN")})\n`;

    let posStatusText = "";
    if (isUsingPos === "Yes") {
      posStatusText = `${currentSystem} (paying ~${currentCost})`;
    } else if (isUsingPos === "Manual") {
      posStatusText = "No POS (Pen & paper / manual register)";
    } else {
      posStatusText = "Planning a new restaurant launch";
    }
    msg += `\n⚙️ Current POS: ${posStatusText}\n`;
    msg += `📊 Daily Volume: ${dailyOrders} | Avg Ticket: ${averageOrderValue}\n`;
    if (notes.trim()) msg += `📝 Notes: ${notes.trim()}\n`;
    msg += `\nPlease guide me on deploying OruPOS 0-Subscription POS and receiving our custom table stands.`;

    return `https://wa.me/${ORUPOS_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-page)", position: "relative" }}>
      <OnboardingHeader />

      <main style={{ padding: "40px 20px 80px", maxWidth: "960px", margin: "0 auto" }}>
        {!submitted ? (
          <div>
            <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 36px" }}>
              <h1
                style={{
                  fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)",
                  fontWeight: 900,
                  color: "var(--zinc-950)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.035em",
                  margin: "0 0 10px",
                }}
              >
                Setup Your Restaurant POS
              </h1>
              <p style={{ fontSize: "0.96rem", color: "var(--zinc-500)", margin: 0, lineHeight: 1.55 }}>
                Enter your outlet details to configure dining tables, menu catalog, and billing preferences.
              </p>
            </div>

            <OnboardingProgress step={step} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "28px" }}>
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
                  {step === 1 && (
                    <StepPersonalInfo
                      fullName={fullName}
                      setFullName={setFullName}
                      phone={phone}
                      setPhone={setPhone}
                      email={email}
                      setEmail={setEmail}
                      role={role}
                      setRole={setRole}
                      errors={errors}
                      setErrors={setErrors}
                      onNext={handleNext}
                    />
                  )}

                  {step === 2 && (
                    <StepRestaurantDetails
                      restaurantName={restaurantName}
                      setRestaurantName={setRestaurantName}
                      outletType={outletType}
                      setOutletType={setOutletType}
                      city={city}
                      setCity={setCity}
                      address={address}
                      setAddress={setAddress}
                      tables={tables}
                      setTables={setTables}
                      errors={errors}
                      setErrors={setErrors}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}

                  {step === 3 && (
                    <StepOperationsPos
                      isUsingPos={isUsingPos}
                      setIsUsingPos={setIsUsingPos}
                      currentSystem={currentSystem}
                      setCurrentSystem={setCurrentSystem}
                      currentCost={currentCost}
                      setCurrentCost={setCurrentCost}
                      dailyOrders={dailyOrders}
                      setDailyOrders={setDailyOrders}
                      averageOrderValue={averageOrderValue}
                      setAverageOrderValue={setAverageOrderValue}
                      notes={notes}
                      setNotes={setNotes}
                      tables={tables}
                      totalHardwareSetup={totalHardwareSetup}
                      isSubmitting={isSubmitting}
                      onBack={handleBack}
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
        ) : (
          <OnboardingSuccess
            fullName={fullName}
            restaurantName={restaurantName}
            tables={tables}
            city={city}
            phone={phone}
            totalHardwareSetup={totalHardwareSetup}
            whatsappUrl={getPersonalizedWhatsAppUrl()}
          />
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
