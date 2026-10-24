"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import HowItWorks from "@/components/HowItWorks";
import CardDesignsGallery from "@/components/CardDesignsGallery";
import PricingComparison from "@/components/PricingComparison";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import MobileStickyBar from "@/components/MobileStickyBar";

export default function HomePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      {/* Ambient Radial Canvas and 80px Grid Lines */}
      <div className="ambient-bg-grid" />
      <div className="ambient-grid-lines" />

      {/* Floating Island Header */}
      <Header />

      <main style={{ position: "relative", zIndex: 10 }}>
        <Hero onOpenDemo={() => setDemoModalOpen(true)} />

        <WhatYouGet />

        <HowItWorks />

        <CardDesignsGallery />

        <PricingComparison />

        <FaqSection />

        <FinalCta />
      </main>

      <Footer />

      {/* Floating Sticky Bar on Mobile */}
      <MobileStickyBar />

      {/* Live Interactive Demo Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </>
  );
}
