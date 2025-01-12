"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Header({
  openModal,
}: {
  openModal: (modalType: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = cn(
    "fixed w-full top-0 z-50 transition-all duration-300",
    {
      "bg-navy-dark/95 backdrop-blur-sm shadow-lg": scrolled,
      "bg-navy-dark/90": !scrolled,
    }
  );

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      className={headerClasses}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto px-6 py-6 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-3xl font-extrabold text-white tracking-tight">
            Logi<span className="text-cyan-400">Max</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-12">
          {["About", "Features", "Pricing", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/90 hover:text-cyan-400 transition-colors text-lg font-medium"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay:
                  0.1 *
                  ["About", "Features", "Pricing", "Contact"].indexOf(item),
              }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            className="px-6 py-2.5 text-cyan-400 border-2 border-cyan-400 rounded-lg hover:bg-cyan-400/10 transition-colors font-medium"
            onClick={() => openModal("signIn")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Sign In
          </motion.button>
          <motion.button
            className="ml-4 px-6 py-2.5 bg-cyan-400 text-navy-dark rounded-lg hover:bg-cyan-300 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Get Started
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
}
