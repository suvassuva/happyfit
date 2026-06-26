"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Heart, Shield, Star, Users, Sparkles } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Sarah Jenkins",
    role: "Founder & Lead Kids Instructor",
    bio: "A certified kids yoga specialist with 8+ years of teaching experience. Sarah blends storytelling, music, and yoga postures to make wellness an exciting and magical adventure for toddlers and school-age children.",
    avatarBg: "var(--accent-pink-light)",
    badges: ["RYT-200", "Kids Yoga Cert", "8+ Yrs Exp"],
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="35" r="18" fill="var(--accent-pink)"/>
        <path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80V90H15V80Z" fill="var(--accent-pink)" fillOpacity="0.4"/>
      </svg>
    )
  },
  {
    name: "Dr. Marcus Vance",
    role: "Pediatric Physical Therapist & Advisor",
    bio: "Marcus has spent a decade in pediatric ergonomics. He advises on postural alignment and structural safety, ensuring that all our poses are supportive, strengthening, and safe for growing bones and joints.",
    avatarBg: "var(--accent-blue-light)",
    badges: ["DPT", "Pediatric Specialist", "Clinical Advisor"],
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="35" r="18" fill="var(--accent-blue)"/>
        <path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80V90H15V80Z" fill="var(--accent-blue)" fillOpacity="0.4"/>
      </svg>
    )
  },
  {
    name: "Emily Chen",
    role: "Mindfulness & Sensory Coach",
    bio: "Holding a master's degree in child psychology, Emily specializes in sensory regulation. She develops play-based activities and deep breathing exercises that help kids recognize and manage big emotions.",
    avatarBg: "var(--accent-pink-light)",
    badges: ["MS Child Psych", "Mindfulness Coach", "Sensory Specialist"],
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="35" r="18" fill="var(--accent-pink)"/>
        <path d="M15 80C15 65 30 55 50 55C70 55 85 65 85 80V90H15V80Z" fill="var(--accent-blue)" fillOpacity="0.3"/>
      </svg>
    )
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
                  }}
                >
                  {member.svg}
                </div>
                <span className="team-role">{member.role}</span>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-bio">{member.bio}</p>
                <div className="team-badge-list">
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
