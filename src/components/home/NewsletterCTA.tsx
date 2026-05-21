"use client";

import { useState } from "react";

export const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="bg-primary rounded-lg p-8 md:p-16 text-center text-on-primary relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <circle cx="10" cy="10" r="20" fill="white"></circle>
              <circle cx="90" cy="90" r="30" fill="white"></circle>
            </svg>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            {!isSubscribed ? (
              <>
                <h2 className="font-headline-xl text-[24px] md:text-[32px] leading-tight">
                  Start Your Wellness Journey Today
                </h2>
                <p className="font-body-lg text-[14px] opacity-90 max-w-lg mx-auto">
                  Join our newsletter to receive weekly yoga tips for kids, exclusive class schedules, and early access to events.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto" onSubmit={handleSubmit}>
                  <input
                    className="flex-1 px-5 py-3 rounded-full bg-white/20 border border-white/40 placeholder:text-white/60 text-[13px] focus:ring-2 focus:ring-white focus:outline-none backdrop-blur-sm transition-all"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="bg-white text-primary font-label-md text-[13px] px-8 py-3 rounded-full hover:shadow-lg transition-all active:scale-95">
                    Subscribe
                  </button>
                </form>
              </>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500 py-12">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-white text-5xl">mark_email_read</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl mb-4">You&apos;re All Set!</h2>
                <p className="font-body-lg text-body-lg opacity-90">
                  Check your inbox soon for your first wellness guide. Welcome to the club!
                </p>
                <button 
                  onClick={() => setIsSubscribed(false)}
                  className="mt-8 text-white/70 hover:text-white font-label-md text-label-md"
                >
                  Join with another email
                </button>
              </div>
            )}
            <p className="font-caption text-caption opacity-70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

