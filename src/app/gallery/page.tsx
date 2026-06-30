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
    bg: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)", // Pinkish-blue soft gradient
    svg: (
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 35C58.2843 35 65 28.2843 65 20C65 11.7157 58.2843 5 50 5C41.7157 5 35 11.7157 35 20C35 28.2843 41.7157 35 50 35Z" fill="white"/>
        <path d="M30 65C30 55 45 45 50 45C55 45 70 55 70 65V85H30V65Z" fill="white" fillOpacity="0.6"/>
      </svg>
    )
  },
  {
    id: 2,
    category: "Events",
    title: "Family Day Out",
    type: "video",
    src: "/images/promo-hook.mp4",
    bg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
    svg: (
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="30" r="12" fill="white"/>
        <circle cx="65" cy="30" r="12" fill="white"/>
        <path d="M15 75C15 65 25 55 40 55H60C75 55 85 65 85 75V85H15V75Z" fill="white" fillOpacity="0.7"/>
      </svg>
    )
  },
  {
    id: 3,
    category: "Summer Camp",
    title: "Nature Meditation",
    type: "image",
    src: "/images/kids-yoga-3.png",
    bg: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    svg: (
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,15 90,85 10,85" fill="white" fillOpacity="0.8"/>
        <polygon points="50,40 75,90 25,90" fill="white" fillOpacity="0.5"/>
      </svg>
    )
  },
  {
    id: 4,
    category: "Workshops",
    title: "Mindfulness Crafting",
    type: "image",
    src: "/images/kids-yoga-4.png",
    bg: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    svg: (
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="25" width="50" height="50" rx="10" fill="white" fillOpacity="0.7"/>
        <circle cx="50" cy="50" r="10" fill="white"/>
      </svg>
    )
  },
  {
    id: 5,
    category: "Yoga Classes",
    title: "Balance & Play",
    bg: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
    svg: (
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 50L50 20L80 50H20Z" fill="white" fillOpacity="0.8"/>
        <circle cx="50" cy="70" r="15" fill="white" fillOpacity="0.5"/>
      </svg>
    )
  },
  {
    id: 6,
    category: "Summer Camp",
    title: "Joyful Runners",
    bg: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
    svg: (
      <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="50" r="20" fill="white" fillOpacity="0.6"/>
        <circle cx="70" cy="50" r="20" fill="white" fillOpacity="0.4"/>
      </svg>
    )
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
                      background: item.bg,
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
                    {item.src ? (
                      item.type === "video" ? (
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
                        />
                      )
                    ) : (
                      item.svg
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
