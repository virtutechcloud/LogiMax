"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  companyLogo: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "LogiMax transformed our supply chain operations. The real-time tracking and analytics have reduced our delivery times by 40%.",
    author: "Sarah Chen",
    role: "Operations Director",
    company: "Global Logistics Co",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/DHL_Express_logo.svg/320px-DHL_Express_logo.svg.png",
  },
  {
    id: 2,
    quote:
      "The route optimization feature alone saved us thousands in fuel costs. It's been a game-changer for our fleet management.",
    author: "Michael Rodriguez",
    role: "Fleet Manager",
    company: "FastTrack Delivery",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&h=200",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/320px-United_Parcel_Service_logo_2014.svg.png",
  },
  {
    id: 3,
    quote:
      "Customer satisfaction has improved dramatically since implementing LogiMax. The customer portal is intuitive and powerful.",
    author: "Emma Thompson",
    role: "Customer Success Manager",
    company: "Express Shipping Ltd",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FedEx_Express.svg/320px-FedEx_Express.svg.png",
  },
];

const TestimonialsCarousel: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-20 bg-navy-darker" aria-label="Client Testimonials">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          What Our Clients Say
        </motion.h2>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-navy-dark rounded-xl p-8 relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-6">
                  <Image
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    fill
                    className="rounded-full object-cover"
                    priority={currentIndex === 0}
                    onLoad={() => setImagesLoaded(true)}
                  />
                </div>
                <blockquote className="text-xl text-slate-200 mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-white">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-cyan-400">
                    {testimonials[currentIndex].role}
                  </p>
                  <div className="mt-4 h-12 relative w-32">
                    <Image
                      src={testimonials[currentIndex].companyLogo}
                      alt={`${testimonials[currentIndex].company} logo`}
                      fill
                      className="object-contain"
                      priority={currentIndex === 0}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={previousSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-white hover:text-cyan-400 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-white hover:text-cyan-400 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8" role="tablist">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-cyan-400" : "bg-slate-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
