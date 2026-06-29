"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Activity, Image, Users, Phone } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Programs", href: "/programs", icon: Activity },
    { name: "Gallery", href: "/gallery", icon: Image },
    { name: "Team", href: "/team", icon: Users },
    { name: "Connect", href: "/connect", icon: Phone },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
          >
            <div className="bottom-nav-icon-container">
              <Icon size={20} />
            </div>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
