"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-gutter">
      <div className="w-full max-w-[360px] glass-card p-6 rounded-2xl shadow-lg">
        <div className="text-center mb-6">
          <Link href="/" className="font-headline-md text-primary font-bold text-[20px]">
            Happy Fit Club
          </Link>
          <h1 className="font-headline-md text-[16px] mt-3 text-on-surface">Welcome Back!</h1>
          <p className="text-on-surface-variant font-body-md text-[12px] mt-0.5">
            Sign in to continue your wellness journey.
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

          <div className="flex justify-end">
            <Link href="#" className="text-primary font-label-md text-[12px] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary font-label-md text-[13px] py-2.5 rounded-xl hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-on-surface-variant font-body-sm text-[12px]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        
        <div className="mt-6 pt-5 border-t border-outline-variant/30 text-center">
          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-label-md mb-3">
            Or continue with
          </p>
          <div className="flex gap-3 justify-center">
            <button className="w-full flex items-center justify-center gap-2 py-1.5 px-4 border border-outline rounded-xl hover:bg-surface-container-low transition-colors">
              <img src="https://www.google.com/favicon.ico" className="w-3.5 h-3.5" alt="Google" />
              <span className="text-[11px] font-medium">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
