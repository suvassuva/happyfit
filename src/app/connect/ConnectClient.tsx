"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone as PhoneIcon, 
  Mail, 
  Send, 
  CheckCircle
} from "lucide-react";

export default function ConnectClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    ageGroup: "2 - 4 Years",
    programInterest: "Kids Yoga",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div>
      {/* HEADER SECTION */}
      <section className="section" style={{ paddingBottom: "40px", paddingTop: "60px" }}>
        <div className="container">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">
            Have questions about our movement programs? We&apos;re here to help your little one start their wellness journey. Reach out today!
          </p>
        </div>
      </section>

      {/* CONTACT LAYOUT GRID */}
      <section className="section" style={{ paddingTop: "0", paddingBottom: "120px" }}>
        <div className="container">
          <div className="contact-grid">
            {/* Left Column: Details and Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card" style={{ height: "100%" }}>
                <h2 className="form-title" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "24px" }}>
                  Contact Details
                </h2>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-icon-wrapper">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="contact-info-label">Our Studio</div>
                      <div className="contact-info-value">
                        Hoodi, Doddanakundi Industrial Area 2,<br />Seetharampalya, Mahadevapura,<br />Bengaluru, Karnataka 560048
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon-wrapper contact-info-icon-wrapper-pink">
                      <PhoneIcon size={16} />
                    </div>
                    <div>
                      <div className="contact-info-label">Call Us</div>
                      <div className="contact-info-value">
                        <a href="tel:+919880115287" style={{ color: "inherit", textDecoration: "none" }}>
                          Gunjan @ 9880115287
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon-wrapper" style={{ backgroundColor: "#25D366", color: "white" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.709 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="contact-info-label">WhatsApp Us</div>
                      <div className="contact-info-value">
                        <a href="https://wa.me/919880115287?text=Hi!%20I'm%20interested%20in%20booking%20a%20free%20trial%20class%20at%20Happy%20Fit%20Club." target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", fontWeight: "600" }}>
                          +91 98801 15287
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon-wrapper">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="contact-info-label">Email Us</div>
                      <div className="contact-info-value">
                        <a href="mailto:happyfitclubblr@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>
                          happyfitclubblr@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                 <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Happy+Fit+Club+Seetharampalya+Bengaluru" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="google-trust-badge"
                    style={{ width: "100%", justifyContent: "center", padding: "4px 10px", gap: "6px" }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" style={{ display: "block", flexShrink: 0 }}>
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
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", lineHeight: "1" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-primary)", fontWeight: "600" }}>
                        5.0 Rating
                      </span>
                      <div style={{ display: "flex", gap: "1px" }}>
                        {"★★★★★".split("").map((star, i) => (
                          <span key={i} style={{ color: "#fbbf24", fontSize: "0.75rem" }}>{star}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <h3 className="contact-social-title">Follow Our Journey</h3>
                  <div className="contact-social-links">
                    <a 
                      href="https://www.instagram.com/happyfitclubblr?utm_source=qr&igsh=MWxmOXhxbG9idHE3aw==" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="contact-social-btn" 
                      aria-label="Instagram"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>
                    <a href="#" className="contact-social-btn" aria-label="Facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Google Map */}
                <div style={{ position: "relative", width: "100%", height: "280px", borderRadius: "16px", overflow: "hidden", marginTop: "24px", border: "1px solid var(--border-color)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                  <iframe
                    src="https://maps.google.com/maps?q=Happy%20Fit%20Club%20Seetharampalya%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Happy Fit Club Location Map"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="card" style={{ height: "100%" }}>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <h2 className="form-title">Send a Message</h2>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          placeholder="Alex Johnson"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-input"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group form-grid-full">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          placeholder="hello@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="ageGroup" className="form-label">Child&apos;s Age</label>
                        <select
                          id="ageGroup"
                          name="ageGroup"
                          className="form-input"
                          value={formData.ageGroup}
                          onChange={handleChange}
                        >
                          <option value="0 - 2 Years">0 - 2 Years</option>
                          <option value="2 - 4 Years">2 - 4 Years</option>
                          <option value="5 - 8 Years">5 - 8 Years</option>
                          <option value="9 - 12 Years">9 - 12 Years</option>
                          <option value="13 - 14 Years">13 - 14 Years</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="programInterest" className="form-label">Program Interest</label>
                        <select
                          id="programInterest"
                          name="programInterest"
                          className="form-input"
                          value={formData.programInterest}
                          onChange={handleChange}
                        >
                          <option value="Tiny Yoga">Tiny Yoga</option>
                          <option value="Kids Yoga">Kids Yoga</option>
                          <option value="Teen Yoga">Teen Yoga</option>
                          <option value="Family Yoga">Family Yoga</option>
                          <option value="Weekend Retreat">Weekend Retreat</option>
                          <option value="Summer Camp">Summer Camp</option>
                        </select>
                      </div>

                      <div className="form-group form-grid-full">
                        <label htmlFor="message" className="form-label">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          className="form-input"
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <div className="form-grid-full" style={{ marginTop: "12px" }}>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ width: "100%", gap: "10px" }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send size={16} />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    className="form-success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="form-success-icon" size={64} />
                    <h2 className="form-success-title">Message Sent!</h2>
                    <p className="form-success-desc">
                      Thank you, <strong>{formData.name}</strong>. We have received your inquiry about <strong>{formData.programInterest}</strong> and will get back to you at <strong>{formData.email}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          ageGroup: "2 - 4 Years",
                          programInterest: "Kids Yoga",
                          message: ""
                        });
                      }}
                      className="btn btn-outline"
                      style={{ marginTop: "24px" }}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
