"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-sm sticky top-0 z-50 w-full">
      <nav className="flex justify-between items-center px-gutter py-2.5 w-full max-w-container-max mx-auto">
        <Link href="/" className="font-headline-md text-[18px] font-bold text-primary dark:text-inverse-primary tracking-tight">
          Happy Fit Club
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/#programs"
            className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary pb-0.5 font-label-md text-[13px]"
          >
            Programs
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant dark:text-surface-variant font-medium hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200 font-label-md text-[13px]"
          >
            Events
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant dark:text-surface-variant font-medium hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200 font-label-md text-[13px]"
          >
            Trainers
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                <button className="hidden sm:block bg-secondary-fixed text-secondary font-label-md text-[12px] px-4 py-2 rounded-full hover:shadow-md transition-all">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={logout}
                className="hidden lg:block text-on-surface-variant font-medium hover:text-error transition-colors text-[13px]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[13px] px-4">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="hidden sm:block bg-primary text-on-primary font-label-md text-[12px] px-4 py-2 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all active:scale-95">
                  Join Free Trial
                </button>
              </Link>
            </>
          )}
          
          {user?.role === "admin" && (
            <Link href="/admin" className="hidden lg:block text-on-surface-variant font-medium hover:text-primary transition-colors text-[13px]">
              Admin
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-1.5 text-on-surface"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant p-4 space-y-3 animate-in slide-in-from-top duration-300">
          <Link
            href="/#programs"
            className="block text-primary font-bold font-label-md text-[14px]"
            onClick={() => setIsMenuOpen(false)}
          >
            Programs
          </Link>
          {user ? (
            <>
              <Link
                href={user.role === "admin" ? "/admin" : "/dashboard"}
                className="block text-on-surface-variant font-medium font-label-md text-[14px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="block w-full text-left text-error font-medium font-label-md text-[14px]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-on-surface-variant font-medium font-label-md text-[14px]"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link href="/signup" className="block">
                <button className="w-full bg-primary text-on-primary font-label-md text-[13px] px-4 py-3 rounded-full">
                  Join Free Trial
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

