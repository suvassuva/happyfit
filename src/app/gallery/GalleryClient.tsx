"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FILTERS = ["All Moments", "Yoga Classes", "Events", "Summer Camp", "Workshops"];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Yoga Classes",
    title: "Morning Stretch",
    type: "video",
    src: "/images/Children's_yoga_studio_interior_202607091317.mp4",
  },
  {
    id: 2,
    category: "Events",
    title: "Family Day Out",
    type: "video",
    src: "/images/Kid_holding_tablet,_doing_yoga_202607091315.mp4",
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
  },
  {
    id: 18,
    category: "Yoga Classes",
    title: "Joyful Cat Stretch",
    type: "video",
    src: "/images/Girl_stretching_like_cat_laughing_202607091322.mp4",
  },
  {
    id: 19,
    category: "Workshops",
    title: "Mindful Breathing Buddies",
    type: "video",
    src: "/images/Children_relaxing_on_yoga_mats_202607091323.mp4",
  }
];

const INSTAGRAM_POSTS = [
  { id: 1, img: "/images/insta-1.jpg" },
  { id: 2, img: "/images/insta-2.jpg" },
  { id: 3, img: "/images/insta-3.jpg" },
  { id: 4, img: "/images/insta-5.jpg" },
  { id: 5, img: "/images/insta-6.jpg" },
  { id: 6, img: "/images/insta-4.jpg" }
];

export default function GalleryClient() {
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
                        preload="metadata"
                        loop
                        muted
                        playsInline
                        className="object-cover"
                        style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
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
              Stay updated with daily doses of youth wellness on Instagram @happyfitclubblr
            </p>
            <a 
              href="https://www.instagram.com/happyfitclubblr?utm_source=qr&igsh=MWxmOXhxbG9idHE3aw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="instagram-link"
            >
              Join the Community <ArrowRight size={14} />
            </a>
          </div>

          <div className="instagram-grid">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href="https://www.instagram.com/happyfitclubblr?utm_source=qr&igsh=MWxmOXhxbG9idHE3aw=="
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block" }}
              >
                <motion.div
                  className="card instagram-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-sm)",
                    border: "1px solid var(--border-color)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={post.img}
                    alt={`Instagram Post ${post.id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 30vw, 15vw"
                  />
                </motion.div>
              </a>
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
