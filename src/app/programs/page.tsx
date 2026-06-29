"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, Smile, Sparkles, Compass, MapPin, ArrowRight } from "lucide-react";
import Accordion from "@/components/Accordion";

const PROGRAMS = [
  {
    title: "Little Yogi’s Club",
    age: "Ages 3 - 6 Years",
    duration: "45 Mins",
    description: "A playful introduction to yoga where toddlers and young kids explore movement, story-based poses, and simple breathing exercises.",
    color: "pink",
    img: "/images/little yogis.jpg"
  },
  {
    title: "Young Yogi’s Club",
    age: "Ages 6 - 12 Years",
    duration: "60 Mins",
    description: "Building strength, body awareness, and emotional resilience through fun yoga sequences, games, and basic mindfulness tools.",
    color: "blue",
    img: "/images/kids2.jpg"
  },
  {
    title: "Limitless Club",
    age: "Ages 12 - 17 Years",
    duration: "60 Mins",
    description: "Empowering teens with physical fitness, flexibility, stress-management techniques, and a positive self-image in a supportive social environment.",
    color: "pink",
    img: "/images/Limitless club (1).jpg"
  },
  {
    title: "Special Fit",
    age: "Ages 5+ Years",
    duration: "45 Mins",
    description: "An inclusive, adaptive program customized to nurture motor skills, focus, and sensory coordination for children with unique learning styles.",
    color: "blue",
    img: "/images/Special Fit.jpg"
  },
  {
    title: "Solo- Fit: Personalized Kids Yoga",
    age: "Ages 3 - 17 Years",
    duration: "Private Session",
    description: "One-on-one tailored sessions designed to meet your child's specific physical, emotional, or developmental goals with personalized attention.",
    color: "pink",
    img: "/images/Solofit.jpg"
  },
  {
    title: "Pause Fit",
    age: "Ages 3 - 17 Years",
    duration: "45 Mins",
    description: "A mindfulness and relaxation-centered session focused on deep breathing, self-regulation tools, and sound healing to calm active minds.",
    color: "blue",
    img: "/images/Pause Fit.jpg"
  },
  {
    title: "The Yoga Nest",
    age: "Parent Child / Family",
    duration: "45 Mins",
    description: "Bond with your child through partner yoga, cooperative movements, and group mindfulness games designed to build trust and family connection.",
    color: "pink",
    img: "/images/Yoga Nest.jpg"
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
                <div className="program-image-container">
                  <Image
                    src={prog.img}
                    alt={prog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
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
