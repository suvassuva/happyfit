"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Connect", href: "/connect" },
  ];

  return (
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
          <Link href="/connect" className="btn btn-primary">
            Book Trial
          </Link>
        </div>

        {/* Mobile menu toggle (just for visual symmetry, or showing quick contact details since we have bottom nav) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Slide-out Mobile Panel (Drawer for extra links/quick info) */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: "fixed",
            top: "var(--header-height)",
            left: 0,
            width: "100%",
            backgroundColor: "white",
            borderBottom: "1px solid var(--border-color)",
            padding: "24px",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "var(--shadow-md)"
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: isActive ? "var(--accent-pink)" : "var(--text-primary)",
                  fontWeight: isActive ? "700" : "500",
                  fontSize: "1.1rem",
                  padding: "8px 0"
                }}
              >
                {link.name}
              </Link>
            );
          })}
          <Link 
            href="/connect" 
            className="btn btn-primary"
            onClick={() => setMobileMenuOpen(false)}
            style={{ marginTop: "8px" }}
          >
            Book Free Trial
          </Link>
        </div>
      )}
    </header>
  );
}
