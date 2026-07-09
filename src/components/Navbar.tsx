"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MessageCircle, MessageSquare, Headphones, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isCareMenuOpen, setIsCareMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Connect", href: "/connect" },
  ];

  return (
    <>
      <header className="header">
        <div className="container header-container">
          <Link href="/" className="logo">
            <Image
              src="/images/happy-fit-logo.jpg"
              alt="Happy Fit Club Logo"
              width={64}
              height={64}
              unoptimized
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="desktop-nav-list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`desktop-nav-link ${isActive ? "active" : ""}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="header-actions">
            <button
              onClick={() => setIsCareMenuOpen(true)}
              className="btn btn-outline-support"
              aria-label="Customer Support"
            >
              <Headphones size={18} />
              Support
            </button>
            <Link href="/connect" className="btn btn-primary">
              Book Trial
            </Link>
          </div>

          {/* Mobile: Customer Support Trigger */}
          <button
            onClick={() => setIsCareMenuOpen(true)}
            className="mobile-care-btn"
            aria-label="Contact Customer Care"
          >
            <Headphones size={20} />
          </button>
        </div>
      </header>

      {/* Customer Care Popup Modal */}
      {isCareMenuOpen && (
        <>
          <div
            className="customer-care-backdrop"
            onClick={() => setIsCareMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="customer-care-modal" role="dialog" aria-modal="true">
            <div className="customer-care-header">
              <h3>Customer Care</h3>
              <button
                className="close-btn"
                onClick={() => setIsCareMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="customer-care-options">
              <a
                href="https://wa.me/919880115287?text=Hi%20Happy%20Fit%20Club,%20I'd%20like%20to%20know%20more%20about%20your%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="care-option whatsapp"
              >
                <div className="option-icon-container">
                  <MessageCircle size={18} />
                </div>
                <div className="option-text">
                  <h4>WhatsApp</h4>
                  <p>Chat with us instantly</p>
                </div>
              </a>

              <a href="tel:+919880115287" className="care-option call">
                <div className="option-icon-container">
                  <Phone size={18} />
                </div>
                <div className="option-text">
                  <h4>Direct Call</h4>
                  <p>Speak to our representative</p>
                </div>
              </a>

              <a href="sms:+919880115287" className="care-option sms">
                <div className="option-icon-container">
                  <MessageSquare size={18} />
                </div>
                <div className="option-text">
                  <h4>SMS Message</h4>
                  <p>Send us a text message</p>
                </div>
              </a>

              <a
                href="mailto:happyfitclubblr@gmail.com?subject=Inquiry%20from%20Website"
                className="care-option email"
              >
                <div className="option-icon-container">
                  <Mail size={18} />
                </div>
                <div className="option-text">
                  <h4>Email Us</h4>
                  <p>Get in touch via email</p>
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

