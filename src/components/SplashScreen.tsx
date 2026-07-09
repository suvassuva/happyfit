"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("happy_fit_splash_viewed");
    if (!hasSeenSplash) {
      setIsVisible(true);
    }
  }, []);

  const playChime = () => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // 1. Warm "power on" sine sweep (low-mid rumble)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(120, now);
      subOsc.frequency.exponentialRampToValueAtTime(240, now + 0.5);

      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 0.7);

      // 2. High-quality phone startup chime: C-chord arpeggio (C5 -> E5 -> G5 -> C6)
      // Triangle waves provide a soft, warm flute/bell-like chime
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const delayBetweenNotes = 0.12;

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + index * delayBetweenNotes);

        // Smooth volume envelope for each bell note
        gainNode.gain.setValueAtTime(0, now + index * delayBetweenNotes);
        // Attack
        gainNode.gain.linearRampToValueAtTime(0.18, now + index * delayBetweenNotes + 0.06);
        // Decay/Release
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * delayBetweenNotes + 1.2);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + index * delayBetweenNotes);
        osc.stop(now + index * delayBetweenNotes + 1.2);
      });
    } catch (e) {
      console.warn("AudioContext failed to initialize:", e);
    }
  };

  const handleEnter = () => {
    // Play chime sound
    playChime();
    
    // Set sessionStorage so it doesn't show again in this browser tab
    sessionStorage.setItem("happy_fit_splash_viewed", "true");
    
    // Trigger transition fade-out
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(-45deg, #fff0f5, #e0eafd, #f3e8ff, #fff0f5)",
            backgroundSize: "400% 400%",
            animation: "gradientMove 8s ease infinite",
          }}
        >
          {/* Animated Background Mesh Helper CSS */}
          <style>{`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>

          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "24px" }}>
            {/* Pulsing Logo Container */}
            <motion.div
              animate={{ 
                scale: [0.96, 1.04, 0.96],
                boxShadow: [
                  "0 10px 30px rgba(255, 92, 151, 0.15)",
                  "0 20px 45px rgba(30, 90, 219, 0.25)",
                  "0 10px 30px rgba(255, 92, 151, 0.15)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                border: "6px solid white"
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                <Image
                  src="/images/happy-fit-logo.jpg"
                  alt="Happy Fit Club Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Studio Taglines */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-blue)", fontSize: "1.8rem", fontWeight: "800" }}>
                Happy Fit Club
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--accent-pink)", fontSize: "0.95rem", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>
                Play to pause to prosper
              </p>
            </motion.div>

            {/* Play/Enter Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
              style={{ marginTop: "16px" }}
            >
              <button
                onClick={handleEnter}
                className="btn btn-primary"
                style={{
                  padding: "16px 36px",
                  fontSize: "1.1rem",
                  gap: "10px",
                  boxShadow: "0 10px 25px rgba(255, 92, 151, 0.4)",
                  borderRadius: "50px",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <span>Enter Studio</span>
                <Play size={18} fill="white" />
              </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
