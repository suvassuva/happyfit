"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(name, email, password);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-gutter">
      <div className="w-full max-w-[360px] glass-card p-6 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <Link href="/" className="font-headline-md text-primary font-bold text-[20px]">
            Happy Fit Club
          </Link>
          <h1 className="font-headline-md text-[16px] mt-3 text-on-surface">Join the Club</h1>
          <p className="text-on-surface-variant font-body-md text-[12px] mt-0.5">
            Start your child's wellness journey today.
          </p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-lg mb-4 text-body-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="font-label-md text-[11px] text-on-surface-variant ml-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[13px]"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[11px] text-on-surface-variant ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              className="w-full px-3 py-2 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[13px]"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-[11px] text-on-surface-variant ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-xl border border-outline hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[13px]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary font-label-md text-[13px] py-2.5 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-on-surface-variant font-body-sm text-[12px]">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
