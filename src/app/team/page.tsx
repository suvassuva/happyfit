"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Star } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Kalli Gunjan",
    role: "Initiator of Happy Fit Club",
    bio: "Initiator of Happy Fit Club. I am a mother and a banker turned yoga & fitness trainer working with adults & children for over 7 years now. Certified in Yoga, Pilates and personal training and founder of Happy Fit Club. With a background in yoga and creative wellness practices, I design engaging programs that help kids build flexibility, strength, focus and emotional resilience. Through playful yoga, breathwork and movement based sessions, I support children of all abilities - including children with diverse needs - to feel confident, calm and connected. My goal is to make wellness fun, accessible and part of everyday life for families.",
    avatarBg: "var(--accent-pink-light)",
    badges: ["Yoga Cert", "Pilates Cert", "Personal Trainer", "7+ Yrs Exp"],
    img: "/images/kalli-gunjan.jpg",
  },
  {
    name: "Dillippa Hallemani",
    role: "Senior Kids Fitness Coach",
    bio: "Certified fitness and strength trainer with 6+ years of experience helping children develop coordination, physical endurance, and active lifestyles. Dillippa believes in making workouts interactive, energetic, and highly engaging for kids of all levels.",
    avatarBg: "var(--accent-blue-light)",
    badges: ["Fitness Coach", "Strength Trainer", "6+ Yrs Exp"],
    img: "/images/dillippa-hallemani.jpg",
  },
  {
    name: "Sreya Bhar",
    role: "Lead Kids Mindfulness Coach",
    bio: "Passionate educator specializing in kids yoga, storytelling, and emotional regulation. Sreya designs playful, creative sessions that encourage children to express themselves, build focus, and learn healthy breathing habits.",
    avatarBg: "var(--accent-pink-light)",
    badges: ["Mindfulness Coach", "Yoga Educator", "Creative Play"],
    img: "/images/sreya-bhar.jpg",
  },
  {
    name: "Vidhi Bansal",
    role: "Kids Yoga Instructor",
    bio: "Certified children's yoga instructor and movement specialist. Vidhi uses games, music, and mindfulness routines to help kids build body awareness, self-confidence, and a lifelong love for health and wellness.",
    avatarBg: "var(--accent-blue-light)",
    badges: ["Kids Yoga Cert", "Movement Specialist", "Pediatric Wellness"],
    img: "/images/vidhi-bansal.jpg",
  }
];

export default function TeamPage() {
  return (
    <div>
      {/* HEADER SECTION */}
      <section className="section" style={{ paddingBottom: "40px", paddingTop: "60px" }}>
        <div className="container">
          <h1 className="section-title">Meet Our Team</h1>
          <p className="section-subtitle">
            Our team is comprised of passionate, certified educators, pediatric specialists, and mindfulness coaches dedicated to creating a safe and positive space for kids.
          </p>
        </div>
      </section>

      {/* TEAM MEMBERS GRID */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <div className="grid grid-3">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                className="card team-card"
                style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div 
                  className="team-avatar-container"
                  style={{
                    backgroundColor: member.avatarBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    height: "140px",
                    width: "140px",
                    borderRadius: "50%",
                    margin: "0 auto 20px auto",
                    border: "4px solid white",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <span className="team-role">{member.role}</span>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-bio">{member.bio}</p>
                <div className="team-badge-list" style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", width: "100%" }}>
                  {member.badges.map((badge) => (
                    <span key={badge} className="badge badge-blue" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REASSURANCE STATEMENT */}
      <section className="section" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)", borderTop: "1px solid var(--border-color)", paddingBottom: "120px" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <Shield size={36} color="var(--accent-blue)" style={{ marginBottom: "16px" }} />
          <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "16px" }}>Our Safety Standards</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "24px" }}>
            Every instructor at Happy Fit Club undergoes a rigorous child-safety background audit, holds active pediatric CPR & First Aid certifications, and completes 50+ hours of specialized physical training before working with children.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>
              <Star size={16} fill="var(--accent-pink)" color="var(--accent-pink)" /> Safety Certified
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>
              <Star size={16} fill="var(--accent-pink)" color="var(--accent-pink)" /> CPR & First Aid Certified
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: "600", color: "var(--text-primary)" }}>
              <Star size={16} fill="var(--accent-pink)" color="var(--accent-pink)" /> Background Audited
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
