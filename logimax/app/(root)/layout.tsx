"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/header";
import HeroSection from "../components/hero";
import Benefits from "../components/benefits";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import PricingPlans from "../components/PricingPlans";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (modalType: string) => {
    // Implement modal opening logic here
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Header openModal={openModal} />
      <HeroSection />
      <Benefits />
      <PricingPlans />
      {children}
    </div>
  );
};

export default Layout;
