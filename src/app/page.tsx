"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import HowItWorks from "@/components/HowItWorks";
import CardDesignsGallery from "@/components/CardDesignsGallery";
import PricingComparison from "@/components/PricingComparison";
import PricingCalculator from "@/components/PricingCalculator";
import FaqSection from "@/components/FaqSection";
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
      {/* Ambient Radial Canvas and 80px Grid Lines */}
      <div className="ambient-bg-grid" />
      <div className="ambient-grid-lines" />

      {/* Floating Island Header */}
      <Header onOpenOrder={() => handleOpenOrder(10)} />

      <main style={{ position: "relative", zIndex: 10 }}>
        <Hero
          onOpenOrder={() => handleOpenOrder(10)}
          onOpenDemo={handleOpenDemo}
        />

        <WhatYouGet />

        <HowItWorks />

        <CardDesignsGallery onOpenOrder={() => handleOpenOrder(10)} />

        <PricingComparison onOpenOrder={() => handleOpenOrder(10)} />

        <PricingCalculator onOpenOrder={handleOpenOrder} />

        <FaqSection />

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
