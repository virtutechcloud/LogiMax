"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { circuitBoard } from "hero-patterns";

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("Efficient Logistics Partner");
  const fullText = "Efficient Logistics Partner";
  const typingSpeed = 100;

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      setText("");
      let i = 0;
      const typeWriter = () => {
        setText(fullText.substring(0, i + 1));
        i++;
        if (i < fullText.length) {
          setTimeout(typeWriter, typingSpeed);
        }
      };
      typeWriter();
    }
  }, [mounted]);

  const sectionStyle = {
    backgroundImage: `${circuitBoard("#64ffda", 0.1)}`,
    backgroundSize: "24px 24px",
    backgroundColor: "#0a192f",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-between px-8 py-16 bg-navy-dark"
      style={sectionStyle}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-label="Hero Section"
    >
      <motion.div className="max-w-2xl" variants={containerVariants}>
        <motion.h1
          className="text-5xl font-bold text-white mb-4"
          variants={itemVariants}
          aria-live="polite"
        >
          {text}
        </motion.h1>
        <motion.p
          className="text-xl text-slate-300 mb-8"
          variants={itemVariants}
        >
          Streamline your operations with our innovative platform.
        </motion.p>
        <motion.button
          className="px-8 py-3 bg-cyan-400 text-navy-dark rounded-md hover:bg-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Start Free Trial"
        >
          Start Free Trial
        </motion.button>
      </motion.div>
      <motion.div
        className="flex-1 flex justify-center"
        variants={itemVariants}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Add your SVG or animated illustration here */}
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
