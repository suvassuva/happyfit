"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Heart, Sparkles, Smile, Shield, CheckCircle, ArrowRight } from "lucide-react";

export default function AboutClient() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="section" style={{ paddingBottom: "40px", paddingTop: "60px" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center" }}
          >
            <span className="mission-tag">Nurturing Healthy Minds, Joyful Bodies</span>
            <h1 className="section-title" style={{ marginTop: "8px" }}>About Happy Fit Club</h1>
            <p className="section-subtitle">
              Discover our mission to guide children and teens toward physical strength, emotional balance, and mindfulness through play-based yoga and movement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <div className="mission-grid">
            <motion.div
              className="mission-image-wrapper"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/images/kids-yoga-3.png"
                alt="Kids practicing mindfulness in Happy Fit Club"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              className="mission-content"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="mission-tag">Play. Pause. Prosper.</span>
              <h2 className="mission-title" style={{ textAlign: "left" }}>Our Play-Based Philosophy</h2>
              <p className="mission-desc">
                Happy Fit Club was founded in Seetharampalya, Bengaluru, with a simple yet powerful goal: to build a modern wellness sanctuary where children and teens can thrive. We believe physical fitness and mental relaxation should be exciting adventures, not chores.
              </p>
              <p className="mission-desc">
                By blending traditional yoga postures with interactive stories, music, partner games, and child-safe sensory tools, we teach children how to build body awareness, improve their posture, align their focus, and navigate daily stresses.
              </p>
              <ul className="mission-bullets">
                <li className="mission-bullet-item">
                  <CheckCircle className="mission-bullet-icon" size={20} color="var(--accent-pink)" />
                  <div>
                    <span className="mission-bullet-text">Child-Proofed & Premium Studio</span>
                    <p className="mission-bullet-desc">A safe, beautifully sanitized environment in Hoodi, Mahadevapura.</p>
                  </div>
                </li>
                <li className="mission-bullet-item">
                  <CheckCircle className="mission-bullet-icon" size={20} color="var(--accent-pink)" />
                  <div>
                    <span className="mission-bullet-text">Tailored for Ages 3 to 17</span>
                    <p className="mission-bullet-desc">Custom sequences matched to toddler motor development and teen exam stress.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER SECTION (GUNJAN) */}
      <section className="section" style={{ backgroundColor: "rgba(30, 90, 219, 0.02)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="mission-grid">
            <motion.div
              className="mission-content"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mission-tag">Meet the Founder</span>
              <h2 className="mission-title" style={{ textAlign: "left" }}>Gunjan</h2>
              <span style={{ fontSize: "1rem", color: "var(--accent-pink)", fontWeight: "600", display: "block", marginBottom: "20px" }}>
                Founder, Director & Lead Instructor
              </span>
              
              <p className="mission-desc">
                Gunjan created Happy Fit Club out of a profound passion for pediatric development and emotional self-regulation. Recognizing the increasing academic demands and screen-time challenges that kids face today, she wanted to construct a dedicated, screen-free haven.
              </p>
              
              <p className="mission-desc">
                As a certified kids yoga and mindfulness teacher, Gunjan specializes in creating immersive class flows where kids connect, breathe, and strengthen their muscles. Her patient, warm, and highly engaging teaching style makes children look forward to every single session.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
                <span className="badge badge-pink" style={{ padding: "6px 12px", fontSize: "0.8rem", fontWeight: "600" }}>
                  Certified Kids Yoga Teacher
                </span>
                <span className="badge badge-blue" style={{ padding: "6px 12px", fontSize: "0.8rem", fontWeight: "600" }}>
                  Mindfulness Coach
                </span>
                <span className="badge badge-pink" style={{ padding: "6px 12px", fontSize: "0.8rem", fontWeight: "600" }}>
                  Pediatric Wellness Expert
                </span>
              </div>

              <Link href="/connect" className="btn btn-primary">
                Book a Session with Gunjan
                <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              className="mission-image-wrapper"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <video
                src="/images/promo-instructor.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES / PILLARS */}
      <section className="section" style={{ paddingBottom: "120px" }}>
        <div className="container">
          <h2 className="section-title">Our Core Pillars</h2>
          <p className="section-subtitle">How we help your child play, pause, and prosper on and off the mat.</p>

          <motion.div 
            className="grid grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card why-card" variants={itemVariants} style={{ height: "100%" }}>
              <div className="why-icon-container why-icon-pink" style={{ marginBottom: "20px" }}>
                <Smile size={24} />
              </div>
              <h3 className="why-card-title" style={{ marginBottom: "10px" }}>Playful Movement</h3>
              <p className="why-card-desc">
                We design energetic sequences using animal imitation and game-based poses that develop body alignment, core stability, and motor coordination.
              </p>
            </motion.div>

            <motion.div className="card why-card" variants={itemVariants} style={{ height: "100%" }}>
              <div className="why-icon-container why-icon-blue" style={{ marginBottom: "20px" }}>
                <Sparkles size={24} />
              </div>
              <h3 className="why-card-title" style={{ marginBottom: "10px" }}>Self-Regulation</h3>
              <p className="why-card-desc">
                Kids learn deep abdominal breathing (pranayama) and sensory relaxation exercises that give them the power to identify and self-soothe big emotions.
              </p>
            </motion.div>

            <motion.div className="card why-card" variants={itemVariants} style={{ height: "100%" }}>
              <div className="why-icon-container why-icon-pink" style={{ marginBottom: "20px" }}>
                <Smile size={24} />
              </div>
              <h3 className="why-card-title" style={{ marginBottom: "10px" }}>Social Connection</h3>
              <p className="why-card-desc">
                Through partner poses and group trust games, we foster community connection, peer empathy, cooperative play, and positive communication skills.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
