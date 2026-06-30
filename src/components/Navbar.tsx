"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
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

        {/* Mobile: Quick Call Button (replaces hamburger — bottom nav handles navigation) */}
        <a
          href="tel:+919880115287"
          className="mobile-call-btn"
          aria-label="Call Happy Fit Club"
        >
          <Phone size={20} />
        </a>
      </div>
    </header>
  );
}
