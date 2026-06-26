"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, Smile, Sparkles, Compass, MapPin } from "lucide-react";
import Accordion from "@/components/Accordion";

const PROGRAMS = [
  {
    title: "Tiny Yoga",
    age: "Ages 2 - 4 Years",
    duration: "30 Mins",
    description: "Nurturing deep breaths & happy hearts through play, stories, and sensory imitation.",
    color: "pink",
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="35" r="15" fill="var(--accent-pink)"/>
        <path d="M20 70C20 60 30 50 50 50C70 50 80 60 80 70V80H20V70Z" fill="var(--accent-blue)" fillOpacity="0.4"/>
      </svg>
    )
  },
  {
    title: "Kids Yoga",
    age: "Ages 5 - 9 Years",
    duration: "45 Mins",
    description: "A playful blend of traditional poses, breathing exercises, and mindfulness games to build focus, strength, and confidence.",
    color: "blue",
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 40C58.2843 40 65 33.2843 65 25C65 16.7157 58.2843 10 50 10C41.7157 10 35 16.7157 35 25C35 33.2843 41.7157 40 50 40Z" fill="var(--accent-blue)"/>
        <path d="M25 80C25 65 35 55 50 55C65 55 75 65 75 80V90H25V80Z" fill="var(--accent-pink)" fillOpacity="0.6"/>
      </svg>
    )
  },
  {
    title: "Teen Yoga",
    age: "Ages 10 - 14 Years",
    duration: "60 Mins",
    description: "Empowering teens with physical strength, flexibility, and a positive body image during transitional developmental years.",
    color: "pink",
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15C50 15 20 45 20 65C20 81.5685 33.4315 95 50 95C66.5685 95 80 81.5685 80 65C80 45 50 15 50 15Z" fill="var(--accent-pink)"/>
        <circle cx="50" cy="65" r="12" fill="white"/>
      </svg>
    )
  },
  {
    title: "Family Yoga",
    age: "Ages 3 & Up",
    duration: "45 Mins",
    description: "Connect with your family and others through partner poses, cooperative stretching, and team-building exercises.",
    color: "blue",
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="30" r="12" fill="var(--accent-blue)"/>
        <circle cx="65" cy="30" r="12" fill="var(--accent-pink)"/>
        <path d="M15 75C15 65 25 55 40 55H60C75 55 85 65 85 75V85H15V75Z" fill="var(--accent-blue)" fillOpacity="0.4"/>
      </svg>
    )
  },
  {
    title: "Weekend Retreat",
    age: "Ages 5 & Up",
    duration: "Half-Day",
    description: "Interactive workshops for kids and parents, including theme-based yoga, mindfulness crafts, and healthy snack preparation.",
    color: "pink",
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="12" fill="var(--accent-pink)" fillOpacity="0.2" stroke="var(--accent-pink)" strokeWidth="6"/>
        <circle cx="50" cy="50" r="15" fill="var(--accent-blue)"/>
      </svg>
    )
  },
  {
    title: "Summer Camp",
    age: "Ages 4 - 10 Years",
    duration: "5 Days",
    description: "Our signature annual camp with daily yoga adventures, creative mindfulness crafts, and outdoor nature exploration.",
    color: "blue",
    svg: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,15 90,85 10,85" fill="var(--accent-blue)"/>
        <polygon points="50,40 80,90 20,90" fill="var(--accent-pink)" fillOpacity="0.6"/>
      </svg>
    )
  }
];

const PRICING_PLANS = [
  {
    title: "Monthly",
    price: "$80",
    period: "/mo",
    popular: false,
    features: [
      "4 sessions per month",
      "Basic progress report",
      "Refund policy applicable",
      "Access to standard classes"
    ],
    btnText: "Get Started"
  },
  {
    title: "Quarterly",
    price: "$210",
    period: "/3 mo",
    popular: true,
    features: [
      "12 sessions total",
      "Detailed mindfulness report",
      "1 free class guest pass for a friend",
      "Priority scheduling & booking",
      "Complimentary club t-shirt"
    ],
    btnText: "Unravel Quarterly"
  },
  {
    title: "Yearly",
    price: "$750",
    period: "/yr",
    popular: false,
    features: [
      "50 sessions total",
      "Personal wellness coach audits",
      "Free Summer Camp entry ticket",
      "Exclusive members-only weekend events",
      "10% discount on boutique retail items"
    ],
    btnText: "Enroll Yearly"
  }
];

const FAQS = [
  {
    q: "What age can children start yoga?",
    a: "Children can start yoga as early as 2 years old! Our Tiny Yoga classes are customized specifically for toddler motor skills, focusing on animal movements, songs, and playful imitation rather than rigid poses."
  },
  {
    q: "Do I need to bring a yoga mat?",
    a: "No, we provide all high-quality, non-toxic, child-safe yoga mats and wellness props in our studio. However, children are welcome to bring their personal mats if they prefer."
  },
  {
    q: "Can I trial a class before enrolling?",
    a: "Absolutely! We offer a complimentary trial class for all new local students. You can register for your trial session easily via our Connect page form."
  }
];

export default function ProgramsPage() {
  return (
    <div>
      {/* HEADER SECTION */}
      <section className="section" style={{ paddingBottom: "40px", paddingTop: "60px" }}>
        <div className="container">
          <h1 className="section-title">Our Programs</h1>
          <p className="section-subtitle">
            Specializing in movement and mindfulness for every stage of childhood! Discover the perfect yoga journey for your little one.
          </p>
        </div>
      </section>

      {/* PROGRAMS LIST */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <div className="grid grid-3">
            {PROGRAMS.map((prog, index) => (
              <motion.div
                key={prog.title}
                className="card program-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div 
                  className="program-image-container"
                  style={{
                    backgroundColor: prog.color === "pink" ? "var(--accent-pink-light)" : "var(--accent-blue-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {prog.svg}
                </div>
                <div className="program-info">
                  <div className="program-meta">
                    <span className="badge badge-pink">{prog.age}</span>
                    <span className="badge badge-blue">{prog.duration}</span>
                  </div>
                  <h3 className="program-card-title">{prog.title}</h3>
                  <p className="program-card-desc">{prog.description}</p>
                  <Link href="/connect" className="btn btn-outline" style={{ marginTop: "auto", width: "100%" }}>
                    Enroll Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="section pricing-section">
        <div className="container">
          <h2 className="section-title">Flexible Plans</h2>
          <p className="section-subtitle">
            Choose the plan that fits your family's schedule and child's wellness goals.
          </p>

          <div className="pricing-grid">
            {PRICING_PLANS.map((plan) => (
              <motion.div
                key={plan.title}
                className={`card price-card ${plan.popular ? "price-card-popular" : ""}`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {plan.popular && <span className="popular-badge">Most Popular</span>}
                <div className="price-card-header">
                  <h3 className="price-card-title">{plan.title}</h3>
                  <div className="price-card-amount">
                    {plan.price}<span>{plan.period}</span>
                  </div>
                </div>

                <ul className="price-features">
                  {plan.features.map((feat) => (
                    <li key={feat} className="price-feature-item">
                      <Check size={16} className="price-feature-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/connect"
                  className={`btn ${plan.popular ? "btn-secondary" : "btn-outline-blue"}`}
                  style={{ width: "100%" }}
                >
                  {plan.btnText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section" style={{ paddingBottom: "120px" }}>
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about preparing for your child's first yoga class.</p>
          <Accordion items={FAQS} />
        </div>
      </section>
    </div>
  );
}
