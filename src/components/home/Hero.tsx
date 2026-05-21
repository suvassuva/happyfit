"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative bg-surface overflow-hidden py-12 md:py-16">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full font-label-md text-[11px]">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            Wellness Redefined
          </div>
          <h1 className="font-headline-xl text-[32px] md:text-[40px] text-on-surface leading-tight font-bold">
            Empowering the{" "}
            <span className="text-primary">
              Next Generation
            </span>{" "}
            through Yoga
          </h1>
          <p className="font-body-md text-[14px] text-on-surface-variant max-w-md leading-relaxed">
            Nurturing physical strength and emotional balance in children through
            playful movement, mindfulness, and certified guidance.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={user ? "/dashboard" : "/signup"}>
              <button className="bg-primary text-on-primary font-label-md text-[14px] px-6 py-3 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all active:scale-95">
                {user ? "Go to Dashboard" : "Join Free Trial"}
              </button>
            </Link>
            <Link href="/#programs">
              <button className="border border-outline-variant text-on-surface font-label-md text-[14px] px-6 py-3 rounded-full hover:bg-surface-container-low transition-colors">
                View Curriculum
              </button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="A group of diverse, joyful children are practicing yoga in a bright, airy studio with high ceilings and light wood floors. Warm sunlight streams through large windows, illuminating the scene with a soft, ethereal glow. The children are in a tree pose, smiling and looking focused, reflecting a peaceful yet playful mood. The aesthetic is clean and modern, featuring soft pastel tones of blue and pink that match the brand's premium wellness identity."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFG2eV6DvML23zdWOkvsbJVKPoUlM3x1Y-tRWcSVDMnxq8dVtsIUvxNmX3gpnDEiBY3ivbF292xAquJJv8rrxFYc486S7iAJxn5GJnsJt9_vXoCL28Esae5cQQix-0U9VDy08aJzkBIl_LKYdrqX_sqdTlNHTW_tI3xrc56bex3TF1L-65BeFCLG3BbU6M4LcpA1_-ONw4-sMgid8P74PY41qdn8aZmn8Ev11DQWWEdO5f5W-v94dgto9zG7kqcaV0Tvl293fmOx0"
            />
          </div>
          {/* Floating Badge */}
          <div className="absolute -bottom-4 -left-4 glass-card p-4 rounded-lg shadow-lg hidden md:block">
            <div className="flex items-center gap-3">
              <div className="bg-secondary-container p-2 rounded-full">
                <span
                  className="material-symbols-outlined text-on-secondary text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              </div>
              <div>
                <div className="font-headline-md text-[18px] text-on-surface">
                  5,000+
                </div>
                <div className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Happy Students
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
