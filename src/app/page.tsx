"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Award, 
  Smile, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Brain, 
  Zap, 
  Users, 
  Sun, 
  CheckCircle 
} from "lucide-react";
import TestimonialCarousel from "@/components/TestimonialCarousel";

// Testimonials data adapted to Happy Fit Club
const TESTIMONIALS = [
  {
    quote: "My daughter loves the Tiny Yoga classes! She is so much more focused and calm at home. The instructors are incredibly patient and warm.",
    author: "Sarah Jenkins",
    role: "Parent of Emily (Ages 3)",
    rating: 5,
  },
  {
    quote: "The Teen Yoga program has been amazing for my son. It built his core strength, helped his sports posture, and gave him tools to manage exam stress.",
    author: "David Miller",
    role: "Parent of Leo (Age 12)",
    rating: 5,
  },
  {
    quote: "Happy Fit Club is our kids' absolute favorite weekend activity. They learn deep breathing and mindfulness while playing games and making friends!",
    author: "Jessica Chen",
    role: "Parent of Chloe & Liam",
    rating: 5,
  },
];

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  } as const;

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div 
            className="hero-content"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mission-tag">Healthy body, happy mind, bright future</span>
            <h1 className="hero-title">
              Nurturing Little Souls Through <span>Movement & Play</span>
            </h1>
            <p className="hero-subtitle">
              We provide a safe, premium space for children and teens to learn, grow, and explore mindfulness, building confidence that lasts a lifetime.
            </p>
            <div className="hero-ctas">
              <Link href="/connect" className="btn btn-primary">
                Book Free Trial
                <ArrowRight size={16} />
              </Link>
              <Link href="/programs" className="btn btn-outline-blue">
                Learn More
              </Link>
            </div>
            <div style={{ marginTop: "24px" }}>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Happy+Fit+Club+Seetharampalya+Bengaluru"
                target="_blank"
                rel="noreferrer"
                className="google-trust-badge"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" style={{ display: "block", flexShrink: 0 }}>
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: "1.2" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} style={{ color: "#fbbf24", fontSize: "0.85rem" }}>{star}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-primary)", fontWeight: "600" }}>
                    5.0 Rating (16 Google Reviews)
                  </span>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image-wrapper"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hero-circle-bg">
              <div className="hero-image-container">
                <Image
                  src="/images/hero_yoga.png"
                  alt="Instructor and kids practicing yoga together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY HAPPY FIT CLUB SECTION */}
      <section className="section" style={{ backgroundColor: "rgba(255,255,255,0.4)" }}>
        <div className="container">
          <h2 className="section-title">Why Happy Fit Club?</h2>
          <p className="section-subtitle">
            We focus on play-based learning and self-expression to make mindfulness exciting and accessible.
          </p>

          <motion.div 
            className="grid grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="card why-card" variants={itemVariants}>
              <div className="why-icon-container why-icon-pink">
                <Award size={24} />
              </div>
              <h3 className="why-card-title">Certified Instructors</h3>
              <p className="why-card-desc">
                Our instructors are certified in kids yoga & child-focused mindfulness practices.
              </p>
            </motion.div>

            <motion.div className="card why-card" variants={itemVariants}>
              <div className="why-icon-container why-icon-blue">
                <Smile size={24} />
              </div>
              <h3 className="why-card-title">Child-Centric Approach</h3>
              <p className="why-card-desc">
                We focus on play-based learning, stories, and healthy self-expression.
              </p>
            </motion.div>

            <motion.div className="card why-card" variants={itemVariants}>
              <div className="why-icon-container why-icon-pink">
                <Shield size={24} />
              </div>
              <h3 className="why-card-title">Safe Environment</h3>
              <p className="why-card-desc">
                Our space is fully child-proofed, sanitized daily, and loaded with soft support mats.
              </p>
            </motion.div>

            <motion.div className="card why-card" variants={itemVariants}>
              <div className="why-icon-container why-icon-blue">
                <Sparkles size={24} />
              </div>
              <h3 className="why-card-title">Fun Sessions</h3>
              <p className="why-card-desc">
                We blend movement, music, games, and storytelling for maximum child engagement.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR MISSION / VALUE PREPOSITION */}
      <section className="section">
        <div className="container mission-grid">
          <motion.div 
            className="mission-image-wrapper"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: "var(--accent-blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Elegant SVG Graphic representing children wellness */}
            <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="120" r="100" fill="white" opacity="0.6"/>
              <path d="M120 70C120 70 85 105 85 130C85 149.33 100.67 165 120 165C139.33 165 155 149.33 155 130C155 105 120 70 120 70Z" fill="var(--accent-pink)" fillOpacity="0.8"/>
              <path d="M120 75C125.523 75 130 70.5228 130 65C130 59.4772 125.523 55 120 55C114.477 55 110 59.4772 110 65C110 70.5228 114.477 75 120 75Z" fill="var(--accent-blue)"/>
              <circle cx="70" cy="120" r="15" fill="var(--accent-blue)" opacity="0.5"/>
              <circle cx="170" cy="120" r="15" fill="var(--accent-blue)" opacity="0.5"/>
            </svg>
          </motion.div>

          <motion.div 
            className="mission-content"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="mission-tag">Made of fun & wellness</span>
            <h2 className="mission-title">Nurturing Healthy Minds, Joyful Bodies</h2>
            <p className="mission-desc">
              Wellness is a lifelong journey. We provide a space for kids to learn, grow, and play in a safe, premium environment.
            </p>
            <ul className="mission-bullets">
              <li className="mission-bullet-item">
                <CheckCircle className="mission-bullet-icon" size={20} color="var(--accent-pink)" />
                <div>
                  <span className="mission-bullet-text">Physical Strength & Flexibility</span>
                  <p className="mission-bullet-desc">Building strong bodies, alignment, and physical resilience early on.</p>
                </div>
              </li>
              <li className="mission-bullet-item">
                <CheckCircle className="mission-bullet-icon" size={20} color="var(--accent-pink)" />
                <div>
                  <span className="mission-bullet-text">Emotional Resilience & Self-Regulation</span>
                  <p className="mission-bullet-desc">Providing breath techniques and mindfulness tools to handle big feelings.</p>
                </div>
              </li>
              <li className="mission-bullet-item">
                <CheckCircle className="mission-bullet-icon" size={20} color="var(--accent-pink)" />
                <div>
                  <span className="mission-bullet-text">Social Connection & Friendship</span>
                  <p className="mission-bullet-desc">Partner yoga poses and group games designed to foster community trust.</p>
                </div>
              </li>
            </ul>
            <Link href="/team" className="mission-link">
              Learn More About Our Team <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. OUR SIGNATURE PROGRAMS PREVIEW */}
      <section className="section" style={{ backgroundColor: "#f1f5f9" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
            <div>
              <h2 className="section-title" style={{ textAlign: "left", marginBottom: "8px" }}>Our Signature Programs</h2>
              <p style={{ color: "var(--text-secondary)" }}>Start your journey today with our popular programs.</p>
            </div>
            <Link href="/programs" className="btn btn-outline desktop-only">
              View All Programs
            </Link>
          </div>

          <div className="grid grid-3">
            {/* Program 1 */}
            <motion.div 
              className="card program-card"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="program-image-container" style={{ backgroundColor: "var(--accent-pink-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 30C58.2843 30 65 23.2843 65 15C65 6.71573 58.2843 0 50 0C41.7157 0 35 6.71573 35 15C35 23.2843 41.7157 30 50 30Z" fill="var(--accent-pink)"/>
                  <path d="M85 75C85 58.4315 71.5685 45 55 45H45C28.4315 45 15 58.4315 15 75V100H85V75Z" fill="var(--accent-blue)" fillOpacity="0.4"/>
                </svg>
              </div>
              <div className="program-info">
                <div className="program-meta">
                  <span className="badge badge-pink">Ages 0 - 2</span>
                  <span className="badge badge-blue">30 Mins</span>
                </div>
                <h3 className="program-card-title">Baby Yoga</h3>
                <p className="program-card-desc">
                  A gentle introduction to yoga through massage, songs, and simple movements to nurture development.
                </p>
                <Link href="/programs" className="mission-link" style={{ fontSize: "0.9rem" }}>
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Program 2 */}
            <motion.div 
              className="card program-card"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="program-image-container" style={{ backgroundColor: "var(--accent-blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 35C30 23.9543 38.9543 15 50 15C61.0457 15 70 23.9543 70 35H30Z" fill="var(--accent-blue)"/>
                  <rect x="20" y="45" width="60" height="40" rx="10" fill="var(--accent-pink)" fillOpacity="0.6"/>
                </svg>
              </div>
              <div className="program-info">
                <div className="program-meta">
                  <span className="badge badge-pink">Ages 5 - 8</span>
                  <span className="badge badge-blue">45 Mins</span>
                </div>
                <h3 className="program-card-title">Kids Yoga</h3>
                <p className="program-card-desc">
                  A playful blend of traditional poses, breathing exercises, and games to build focus, strength, and confidence.
                </p>
                <Link href="/programs" className="mission-link" style={{ fontSize: "0.9rem" }}>
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Program 3 */}
            <motion.div 
              className="card program-card"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="program-image-container" style={{ backgroundColor: "var(--accent-pink-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="30" stroke="var(--accent-pink)" strokeWidth="6"/>
                  <circle cx="50" cy="50" r="10" fill="var(--accent-blue)"/>
                </svg>
              </div>
              <div className="program-info">
                <div className="program-meta">
                  <span className="badge badge-pink">Ages 9 - 12</span>
                  <span className="badge badge-blue">60 Mins</span>
                </div>
                <h3 className="program-card-title">Teen Yoga</h3>
                <p className="program-card-desc">
                  Empowering teens with physical strength, flexibility, and a positive body image during teen developmental years.
                </p>
                <Link href="/programs" className="mission-link" style={{ fontSize: "0.9rem" }}>
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="mobile-only" style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/programs" className="btn btn-outline" style={{ width: "100%" }}>
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS BEYOND THE MAT SECTION */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Benefits Beyond the Mat</h2>
          <p className="section-subtitle">
            Yoga and mindfulness practices benefit children in their physical, emotional, and social lives.
          </p>

          <div className="grid grid-3">
            <div className="card benefit-card">
              <span className="benefit-num">01</span>
              <div>
                <h3 className="benefit-title">Physical Strength</h3>
                <p className="benefit-desc">Builds muscle strength, increases flexibility, and improves overall body balance and posture.</p>
              </div>
            </div>

            <div className="card benefit-card">
              <span className="benefit-num">02</span>
              <div>
                <h3 className="benefit-title">Mindfulness & Focus</h3>
                <p className="benefit-desc">Teaches children how to concentrate, clear their minds, and focus on details and lessons.</p>
              </div>
            </div>

            <div className="card benefit-card">
              <span className="benefit-num">03</span>
              <div>
                <h3 className="benefit-title">Emotional Balance</h3>
                <p className="benefit-desc">Helps kids manage stress, emotional anxiety, big mood swings, and developmental shifts.</p>
              </div>
            </div>

            <div className="card benefit-card">
              <span className="benefit-num">04</span>
              <div>
                <h3 className="benefit-title">Social Skills</h3>
                <p className="benefit-desc">Promotes partner poses, healthy play coordination, and positive peer-to-peer relationships.</p>
              </div>
            </div>

            <div className="card benefit-card">
              <span className="benefit-num">05</span>
              <div>
                <h3 className="benefit-title">Focus & Attention</h3>
                <p className="benefit-desc">Sharpens academic learning skills and cognitive abilities through sensory motor alignment.</p>
              </div>
            </div>

            <div className="card benefit-card">
              <span className="benefit-num">06</span>
              <div>
                <h3 className="benefit-title">Self-Regulation</h3>
                <p className="benefit-desc">Equips children with breath control tools to self-soothe when overwhelmed or hyperactive.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="section" style={{ backgroundColor: "rgba(30, 90, 219, 0.02)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <h2 className="section-title">Word of Our Community</h2>
          <p className="section-subtitle">What parents say about their kids' transformation at Happy Fit Club.</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Happy+Fit+Club+Seetharampalya+Bengaluru"
              target="_blank"
              rel="noreferrer"
              className="google-trust-badge"
              style={{ padding: "6px 14px", borderRadius: "20px" }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Verified on Google <span style={{ color: "#fbbf24", fontWeight: "bold" }}>★ 5.0</span> (16 Reviews)
              </span>
            </a>
          </div>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* 7. CTA BANNER CARD */}
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
