"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactElement;
  stats?: { value: string; label: string }[];
}

const benefits: Benefit[] = [
  {
    title: "Streamlined Logistics",
    description:
      "Optimize your supply chain with our advanced logistics solutions.",
    icon: (
      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-cyan-400/10 rounded-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
        {/* Add your icon component here */}
      </div>
    ),
    stats: [
      { value: "45%", label: "Cost Reduction" },
      { value: "2x", label: "Efficiency Increase" },
    ],
  },
  // Add more benefits as needed
];

const BenefitCard: React.FC<{ benefit: Benefit; index: number }> = ({
  benefit,
  index,
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      className={`group flex flex-col md:flex-row items-center gap-8 py-16 rounded-2xl transition-all duration-500 px-6 
        hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] ${
          isEven ? "" : "md:flex-row-reverse"
        }`}
      role="article"
    >
      <div className="flex-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="transform transition-transform duration-300 hover:-translate-y-1"
        >
          {benefit.icon}
          <h3 className="text-2xl font-bold text-white mt-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {benefit.title}
          </h3>
          <p className="text-slate-300 mt-2 leading-relaxed">
            {benefit.description}
          </p>
        </motion.div>

        {benefit.stats && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {benefit.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-gradient-to-br from-navy-dark/80 to-navy-dark rounded-xl 
                  border border-cyan-400/20 transition-all duration-300 transform
                  hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/10"
                role="figure"
                aria-label={`${stat.value} ${stat.label}`}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-navy-dark to-navy-darker relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 to-transparent"
      />
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/5 to-transparent opacity-50"
      />
      <div className="container mx-auto px-6 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-16"
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
