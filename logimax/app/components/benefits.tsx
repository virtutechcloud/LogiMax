"use client";

import React, { useState, useEffect, ReactElement } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// @ts-ignore
import {
  UndrawDeliveryTruck,
  UndrawAnalytics,
} from "react-undraw-illustrations";

interface Benefit {
  title: string;
  description: string;
  icon: ReactElement;
  stats?: { value: string; label: string }[];
}

const benefits: Benefit[] = [
  {
    title: "Real-Time Tracking",
    description:
      "Monitor your shipments in real-time with precise GPS tracking and instant status updates.",
    icon: (
      <svg
        className="w-12 h-12 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
    stats: [
      { value: "99.9%", label: "Tracking Accuracy" },
      { value: "24/7", label: "Real-time Updates" },
    ],
  },
  {
    title: "Smart Analytics",
    description:
      "Make data-driven decisions with comprehensive analytics and predictive insights.",
    icon: (
      <svg
        className="w-12 h-12 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    stats: [
      { value: "45%", label: "Cost Reduction" },
      { value: "2x", label: "Efficiency Boost" },
    ],
  },
  {
    title: "Route Optimization",
    description:
      "Optimize delivery routes automatically using AI-powered algorithms to save time and fuel costs.",
    icon: (
      <svg
        className="w-12 h-12 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
    stats: [
      { value: "30%", label: "Fuel Savings" },
      { value: "2.5x", label: "Delivery Speed" },
    ],
  },
  {
    title: "Inventory Management",
    description:
      "Keep track of your inventory levels in real-time with automated alerts and reordering capabilities.",
    icon: (
      <svg
        className="w-12 h-12 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    stats: [
      { value: "99%", label: "Stock Accuracy" },
      { value: "-40%", label: "Storage Costs" },
    ],
  },
  {
    title: "Customer Portal",
    description:
      "Provide your customers with a dedicated portal for tracking shipments and managing orders.",
    icon: (
      <svg
        className="w-12 h-12 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    stats: [
      { value: "95%", label: "Customer Satisfaction" },
      { value: "-60%", label: "Support Queries" },
    ],
  },
];

const BenefitCard: React.FC<{ benefit: Benefit; index: number }> = ({
  benefit,
  index,
}) => {
  const [mounted, setMounted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const isEven = index % 2 === 0;

  // Only render illustrations after client-side mount
  const getIllustration = (title: string) => {
    if (!mounted) return null;

    switch (title) {
      case "Real-Time Tracking":
        return <UndrawDeliveryTruck height={250} />;
      case "Smart Analytics":
        return <UndrawAnalytics height={250} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center gap-8 py-16 ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className="flex-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {benefit.icon}
          <h3 className="text-2xl font-bold text-white mt-4">
            {benefit.title}
          </h3>
          <p className="text-slate-300 mt-2">{benefit.description}</p>
        </motion.div>

        {benefit.stats && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {benefit.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="text-center p-4 bg-navy-dark/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-cyan-400">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Illustration */}
      <motion.div
        className="flex-1 h-64 bg-navy-dark/50 rounded-lg overflow-hidden p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {getIllustration(benefit.title)}
      </motion.div>
    </motion.div>
  );
};

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-navy-dark">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Why Choose LogiMax
        </motion.h2>
        <div className="space-y-20">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
