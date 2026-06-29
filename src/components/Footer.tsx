"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Brand logo */}
        <div className="footer-brand">
          <Link href="/" className="footer-brand-link">
            <Image
              src="/images/happy-fit-logo.jpg"
              alt="Happy Fit Club Logo"
              width={32}
              height={32}
              unoptimized
              className="footer-logo"
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="footer-nav">
          <Link href="/" className="footer-nav-link">HOME</Link>
          <Link href="/about" className="footer-nav-link">ABOUT</Link>
          <Link href="/programs" className="footer-nav-link">PROGRAMS</Link>
          <Link href="/gallery" className="footer-nav-link">GALLERY</Link>
          <Link href="/team" className="footer-nav-link">TEAM</Link>
          <Link href="/connect" className="footer-nav-link">CONNECT</Link>
        </nav>

        {/* Right: Copyright only */}
        <div className="footer-right">
          <span className="footer-copyright">
            © 2024 Happy Fit Club. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}


