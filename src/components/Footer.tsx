"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Image
                src="/images/happy-fit-logo.jpg"
                alt="Happy Fit Club Logo"
                width={72}
                height={72}
                unoptimized
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </Link>
            <p className="footer-description">
              Nurturing little souls through movement, mindfulness, and play in a safe, premium environment.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                  <polygon points="10 15 15 12 10 9"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-links-title">Explore</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/programs" className="footer-link">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="footer-link">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/team" className="footer-link">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-links-title">Support</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/team" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/connect" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-links-title">Connect</h4>
            <ul className="footer-links-list" style={{ gap: "8px" }}>
              <li style={{ fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <Phone size={16} style={{ marginTop: "3px", color: "var(--accent-pink)", flexShrink: 0 }} />
                <div>
                  <strong>Phone:</strong><br />
                  <a href="tel:+919880115287" style={{ color: "inherit", textDecoration: "none" }} className="footer-link">
                    Gunjan @ 9880115287
                  </a>
                </div>
              </li>
              <li style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "4px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <Mail size={16} style={{ marginTop: "3px", color: "var(--accent-blue)", flexShrink: 0 }} />
                <div>
                  <strong>Email:</strong><br />
                  <a href="mailto:happyfitclubblr@gmail.com" style={{ color: "inherit", textDecoration: "none" }} className="footer-link">
                    happyfitclubblr@gmail.com
                  </a>
                </div>
              </li>
              <li style={{ marginTop: "12px" }}>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Happy+Fit+Club+Seetharampalya+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="google-trust-badge-footer"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" style={{ display: "block", flexShrink: 0 }}>
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
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: "1.1" }}>
                    <div style={{ display: "flex", gap: "1px" }}>
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} style={{ color: "#fbbf24", fontSize: "0.75rem" }}>{star}</span>
                      ))}
                    </div>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-primary)", fontWeight: "600" }}>
                      5.0 (16 Reviews)
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            © 2026 Happy Fit Club
          </span>
        </div>
      </div>
    </footer>
  );
}
