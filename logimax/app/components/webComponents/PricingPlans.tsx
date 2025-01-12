"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  recommended?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    monthlyPrice: 49,
    annualPrice: 470,
    features: [
      "Up to 5 vehicles",
      "Real-time tracking",
      "Basic route optimization",
      "Email support",
      "Mobile app access",
    ],
  },
  {
    name: "Professional",
    description: "Ideal for growing fleets with advanced needs",
    monthlyPrice: 99,
    annualPrice: 950,
    features: [
      "Up to 20 vehicles",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Team management",
    ],
    recommended: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    monthlyPrice: 199,
    annualPrice: 1900,
    features: [
      "Unlimited vehicles",
      "24/7 premium support",
      "Custom development",
      "Dedicated account manager",
      "Advanced security features",
      "SLA guarantees",
    ],
  },
];

const PricingPlans: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-20 bg-navy-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <p className="text-slate-400 mb-8">
            Choose the perfect plan for your business
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm ${
                !isAnnual ? "text-white" : "text-slate-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-navy-dark rounded-full p-1 transition-colors duration-200 ease-in-out"
              aria-label={`Switch to ${
                isAnnual ? "monthly" : "annual"
              } billing`}
            >
              <motion.div
                className="w-6 h-6 bg-cyan-400 rounded-full"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`text-sm ${
                isAnnual ? "text-white" : "text-slate-400"
              }`}
            >
              Annual
              <span className="ml-1 text-cyan-400">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative rounded-xl p-8 ${
                plan.recommended
                  ? "bg-navy-dark border-2 border-cyan-400"
                  : "bg-navy-dark/50"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-navy-darker px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-400 mb-6">{plan.description}</p>
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isAnnual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex items-end"
                  >
                    <span className="text-4xl font-bold text-white">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-slate-400 ml-2">
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-slate-300"
                  >
                    <svg
                      className="w-5 h-5 text-cyan-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.recommended
                    ? "bg-cyan-400 text-navy-darker hover:bg-cyan-300"
                    : "bg-navy-dark text-white hover:bg-navy-light"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
