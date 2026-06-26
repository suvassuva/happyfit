"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="card testimonial-container" style={{ position: "relative", minHeight: "260px" }}>
      <div className="testimonial-quote-icon">“</div>
      
      <div style={{ overflow: "hidden", minHeight: "180px", position: "relative" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Stars */}
            <div className="testimonial-stars">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={16} className="testimonial-star" />
              ))}
            </div>

            {/* Text */}
            <p className="testimonial-text">"{current.quote}"</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Author and Controls Row */}
      <div className="testimonial-author-info" style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
        <div>
          <div className="testimonial-author-name">{current.author}</div>
          <div className="testimonial-author-role">{current.role}</div>
        </div>

        <div className="testimonial-controls">
          <button
            onClick={handlePrev}
            className="testimonial-btn"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="testimonial-btn"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
