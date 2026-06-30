"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, ArrowRight } from "lucide-react";

const FILTERS = ["All Moments", "Yoga Classes", "Events", "Summer Camp", "Workshops"];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Yoga Classes",
    title: "Morning Stretch",
    type: "video",
    src: "/images/promo-studio.mp4",
  },
  {
    id: 2,
    category: "Events",
    title: "Family Day Out",
    type: "video",
    src: "/images/promo-hook.mp4",
  },
  {
    id: 3,
    category: "Summer Camp",
    title: "Nature Meditation",
    type: "image",
    src: "/images/kids-yoga-3.png",
  },
  {
    id: 4,
    category: "Workshops",
    title: "Mindfulness Crafting",
    type: "image",
    src: "/images/kids-yoga-4.png",
  },
  {
    id: 5,
    category: "Yoga Classes",
    title: "Balance & Play",
    type: "image",
    src: "/images/offline-yoga.jpg",
  },
  {
    id: 6,
    category: "Summer Camp",
    title: "Joyful Runners",
    type: "image",
    src: "/images/camp-3.jpg",
  },
  {
    id: 7,
    category: "Yoga Classes",
    title: "Yoga Nest",
    type: "image",
    src: "/images/yoga-nest.jpg",
  },
  {
    id: 8,
    category: "Yoga Classes",
    title: "Solo Fit",
    type: "image",
    src: "/images/solofit.jpg",
  },
  {
    id: 9,
    category: "Yoga Classes",
    title: "Online Sessions",
    type: "image",
    src: "/images/online-yoga-2.jpg",
  },
  {
    id: 10,
    category: "Yoga Classes",
    title: "Online Programs",
    type: "image",
    src: "/images/online-programs-2.jpg",
  },
  {
    id: 11,
    category: "Events",
    title: "Pause Fit",
    type: "image",
    src: "/images/pause-fit.jpg",
  },
  {
    id: 12,
    category: "Events",
    title: "Little Yogis",
    type: "image",
    src: "/images/little-yogis.jpg",
  },
  {
    id: 13,
    category: "Events",
    title: "Kids Yoga Fun",
    type: "image",
    src: "/images/kids-gallery-5.jpg",
  },
  {
    id: 14,
    category: "Summer Camp",
    title: "Camp Fun",
    type: "image",
    src: "/images/camp-1.jpg",
  },
  {
    id: 15,
    category: "Summer Camp",
    title: "Camp Team",
    type: "image",
    src: "/images/camp-2.jpg",
  },
  {
    id: 16,
    category: "Workshops",
    title: "Wellness Workshops",
    type: "image",
    src: "/images/wellness-workshops-2.jpg",
  },
  {
    id: 17,
    category: "Workshops",
    title: "Kids Group Yoga",
    type: "image",
    src: "/images/kids-gallery-6.jpg",
  }
];

const INSTAGRAM_POSTS = [
  { id: 1, color: "var(--accent-pink-light)" },
  { id: 2, color: "var(--accent-blue-light)" },
  { id: 3, color: "#e2f1e8" },
  { id: 4, color: "#faebeb" },
  { id: 5, color: "#f3e8ff" },
  { id: 6, color: "#fffbeb" }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All Moments");

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === "All Moments") return true;
    return item.category === activeFilter;
  });

  return (
    <div>
      {/* HEADER SECTION */}
      <section className="section" style={{ paddingBottom: "20px", paddingTop: "60px" }}>
        <div className="container">
          <h1 className="section-title">Our Joyful Moments</h1>
          <p className="section-subtitle">
            Explore the smiles, growth, and energetic vibes of our little fitters. From mindful yoga classes to high-energy camp workshops.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS & GALLERY GRID */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          {/* Filters */}
          <div className="gallery-filters">
            {FILTERS.map((filt) => (
              <button
                key={filt}
                onClick={() => setActiveFilter(filt)}
                className={`filter-btn ${activeFilter === filt ? "active" : ""}`}
              >
                {filt}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div className="gallery-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  className="card gallery-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="gallery-image-container"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "240px",
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "16px"
                    }}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover"
                        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                        style={{ position: "absolute", top: 0, left: 0 }}
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        textAlign: "center",
                        width: "100%",
                        padding: "0 10px",
                        zIndex: 1
                      }}
                    >
                      <h3 style={{ color: "white", fontSize: "1.2rem", fontWeight: "700", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                        {item.title}
                      </h3>
                      <span style={{ color: "white", fontSize: "0.8rem", fontWeight: "600", textShadow: "0 1px 2px rgba(0,0,0,0.3)", opacity: 0.9 }}>
                        {item.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="gallery-overlay" style={{ zIndex: 2 }}>
                      <span className="gallery-overlay-badge">View Moment</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* INSTAGRAM INTEGRATION */}
      <section className="section instagram-section">
        <div className="container">
          <div className="instagram-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}>
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <h2 className="section-title" style={{ marginBottom: "8px" }}>Follow Our Joyful Journey</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
              Stay updated with daily doses of youth wellness on Instagram @HappyFitClub
            </p>
            <a href="#" className="instagram-link">
              Join the Community <ArrowRight size={14} />
            </a>
          </div>

          <div className="instagram-grid">
            {INSTAGRAM_POSTS.map((post) => (
              <motion.div
                key={post.id}
                className="card instagram-card"
                style={{
                  backgroundColor: post.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--border-color)"
                }}
                whileHover={{ scale: 1.05 }}
              >
                <ImageIcon size={28} style={{ color: "rgba(0,0,0,0.15)" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section" style={{ paddingBottom: "120px" }}>
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-banner-title">Ready to Create Your Own Moments?</h2>
            <p className="cta-banner-desc">
              Join our vibrant community today and watch your child flourish through movement, mindfulness, and play.
            </p>
            <div className="cta-banner-ctas">
              <Link href="/connect" className="btn btn-white">
                Book a Free Session
              </Link>
              <Link href="/programs" className="btn btn-outline">
                View All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
