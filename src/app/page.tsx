"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CardDesignsGallery from "@/components/CardDesignsGallery";
import CustomerExperience from "@/components/CustomerExperience";
import HowItWorks from "@/components/HowItWorks";
import WhatYouGet from "@/components/WhatYouGet";
import Benefits from "@/components/Benefits";
import BusinessTypes from "@/components/BusinessTypes";
import PricingCalculator from "@/components/PricingCalculator";
import LiveDemoSection from "@/components/LiveDemoSection";
import FaqSection from "@/components/FaqSection";
import TrustSection from "@/components/TrustSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import DemoModal from "@/components/DemoModal";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function HomePage() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderTablesCount, setOrderTablesCount] = useState(10);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleOpenOrder = (tablesCount = 10) => {
    setOrderTablesCount(tablesCount);
    setOrderModalOpen(true);
  };

  const handleOpenDemo = () => {
    setDemoModalOpen(true);
  };

  return (
    <>
      <Header onOpenOrder={() => handleOpenOrder(10)} />

      <main>
        <Hero
          onOpenOrder={() => handleOpenOrder(10)}
          onOpenDemo={handleOpenDemo}
        />

        <CardDesignsGallery onOpenOrder={() => handleOpenOrder(10)} />

        <CustomerExperience onOpenDemo={handleOpenDemo} />

        <HowItWorks />

        <WhatYouGet />

        <Benefits />

        <BusinessTypes />

        <PricingCalculator onOpenOrder={handleOpenOrder} />

        <LiveDemoSection onOpenDemo={handleOpenDemo} />

        <FaqSection />

        <TrustSection />

        <FinalCta onOpenOrder={() => handleOpenOrder(10)} />
      </main>

      <Footer />

      {/* Floating & Modal Overlays */}
      <MobileStickyBar onOpenOrder={() => handleOpenOrder(10)} />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialTables={orderTablesCount}
      />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </>
  );
}
