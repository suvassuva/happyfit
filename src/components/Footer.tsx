"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <Sparkles className="logo-icon" size={24} fill="var(--accent-pink)" />
              <span>Happy Fit Club</span>
            </Link>
            <p className="footer-description">
              Nurturing little souls through movement, mindfulness, and play in a safe, premium environment.
            </p>
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
              <li style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <strong>Phone:</strong><br />
                <a href="tel:+919880115287" style={{ color: "inherit", textDecoration: "none" }} className="footer-link">
                  Gunjan @ 9880115287
                </a>
              </li>
              <li style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                <strong>Email:</strong><br />
                <a href="mailto:happyfitclubblr@gmail.com" style={{ color: "inherit", textDecoration: "none" }} className="footer-link">
                  happyfitclubblr@gmail.com
                </a>
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
            © 2026 Happy Fit Club. Nurturing little souls through movement.
          </span>
          <span className="footer-copyright">
            Designed with love for healthy kids.
          </span>
        </div>
      </div>
    </footer>
  );
}
