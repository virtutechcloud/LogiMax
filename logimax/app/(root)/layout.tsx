"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/webComponents/header";
import HeroSection from "../components/webComponents/hero";
import Benefits from "../components/webComponents/benefits";
import PricingPlans from "../components/webComponents/PricingPlans";
import Footer from "../components/webComponents/footer";

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
      <Footer />
      {children}
    </div>
  );
};

export default Layout;
