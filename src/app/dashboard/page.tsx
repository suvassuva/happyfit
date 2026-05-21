"use client";

import Link from "next/link";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const {
    profile,
    classes,
    bookedClassIds,
    reminders,
    bookClass,
    toggleReminder,
    incrementGoal,
  } = useDashboard();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Slice the first 3 classes as the "Upcoming Classes" display on Overview
  const featuredClasses = classes.slice(0, 3);

  return (
    <>
      {/* Welcome Banner (Compact) */}
      <section className="mb-6 relative overflow-hidden rounded-lg bg-primary-container p-3 md:p-5 text-white shadow-lg flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <div className="relative z-10 max-w-lg text-center md:text-left">
          <h2 className="font-headline-xl text-[20px] mb-2 tracking-tight">
            Namaste, {profile.name.split(" ")[0]}! Ready for today&apos;s
            session?
          </h2>
          <p className="font-body-lg text-[13px] opacity-90 mb-4">
            You&apos;re on a {profile.streak}-day streak. Keep that
            mindfulness flowing!
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Link 
              href="/dashboard/classes" 
              className="bg-white text-primary px-4 py-2 rounded-full font-label-md text-[12px] hover:shadow-lg transition-all active:scale-95 inline-block text-center"
            >
              Resume Last Class
            </Link>
          </div>
        </div>
        <div className="relative w-full md:w-[200px] aspect-video md:aspect-square rounded-xl overflow-hidden shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Yoga Session"
            className="w-full h-full object-cover"
            src={profile.coverImage}
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* Bento Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Membership Card - Span 4 */}
        <div className="lg:col-span-4 md:col-span-6 glass-card p-5 rounded-lg flex flex-col justify-between h-full min-h-[240px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3">
            <span className="material-symbols-outlined text-primary/20 text-2xl rotate-12">
              card_membership
            </span>
          </div>
          <div>
            <span className="bg-secondary-container/20 text-secondary px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest mb-2 inline-block">
              Status: {profile.status}
            </span>
            <h3 className="font-headline-md text-[16px] text-on-surface mb-0.5">
              {profile.plan}
            </h3>
            <p className="font-body-sm text-[11px] text-on-surface-variant">
              Unlimited access to all live sessions and workshops.
            </p>
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase mb-0.5">
                  Next Renewal
                </p>
                <p className="font-headline-md text-[16px] text-primary">
                  {profile.renewalDate}
                </p>
              </div>
              <Link href="/dashboard/payments" className="text-primary font-label-md text-[11px] hover:underline">
                Manage
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Tracker - Span 4 */}
        <div className="lg:col-span-4 md:col-span-6 bg-white dark:bg-inverse-surface/5 p-5 rounded-lg shadow-sm border border-outline-variant flex flex-col items-center text-center justify-center min-h-[240px]">
          <div className="flex justify-between items-center w-full mb-4 px-1">
            <h3 className="font-headline-md text-[16px] text-on-surface">Weekly Goal</h3>
            <button 
              onClick={incrementGoal}
              className="text-primary hover:bg-primary/5 p-1.5 rounded-full transition-colors active:scale-90"
              title="Log activity"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </button>
          </div>
          
          <div className="relative w-24 h-24 mb-3">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-surface-container-highest"
                cx="48"
                cy="48"
                fill="transparent"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <circle
                className="transition-all duration-700 ease-in-out"
                cx="48"
                cy="48"
                fill="transparent"
                r="42"
                stroke="currentColor"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * profile.weeklyGoalCompleted) / profile.weeklyGoalTotal}
                strokeLinecap="round"
                strokeWidth="8"
                style={{ color: 'var(--color-primary)' }}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-lg text-[18px] text-on-surface">
                {profile.weeklyGoalCompleted}
                <span className="text-[12px] text-on-surface-variant">
                  /{profile.weeklyGoalTotal}
                </span>
              </span>
            </div>
          </div>
          <p className="font-body-md text-[12px] text-on-surface-variant">
            {profile.weeklyGoalCompleted >= profile.weeklyGoalTotal 
              ? "🏆 Goal achieved!" 
              : `${profile.weeklyGoalTotal - profile.weeklyGoalCompleted} more classes to go!`}
          </p>
        </div>

        {/* Quick Actions - Span 4 */}
        <div className="lg:col-span-4 md:col-span-12 space-y-3 flex flex-col h-full justify-between">
          <Link href="/dashboard/classes" className="bg-primary w-full text-white p-3 rounded-lg flex items-center justify-between shadow-md hover:bg-primary/90 transition-all group active:scale-95 text-left">
            <div>
              <span className="font-label-md text-[10px] block mb-0.5 opacity-90">
                Ready for more?
              </span>
              <span className="font-headline-md text-[15px]">Book a Class</span>
            </div>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              add_circle
            </span>
          </Link>
          <a href="#" className="bg-white border border-outline-variant w-full p-3 rounded-lg flex items-center gap-3 hover:bg-surface-container-low transition-colors group active:scale-98">
            <div className="w-9 h-9 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">download</span>
            </div>
            <div className="text-left">
              <span className="font-label-md text-[12px] block text-on-surface">
                Materials
              </span>
              <span className="text-[10px] text-on-surface-variant">
                Guides, Playlists, PDFs
              </span>
            </div>
          </a>
          <a href="#" className="bg-white border border-outline-variant w-full p-3 rounded-lg flex items-center gap-3 hover:bg-surface-container-low transition-colors group active:scale-98">
            <div className="w-9 h-9 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div className="text-left">
              <span className="font-label-md text-[12px] block text-on-surface">
                Contact Trainer
              </span>
              <span className="text-[10px] text-on-surface-variant">
                Get personalized feedback
              </span>
            </div>
          </a>
        </div>

        {/* Upcoming Classes - Span 12 */}
        <div className="lg:col-span-12 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-headline-md text-[18px] text-on-surface tracking-tight">
              Upcoming Classes
            </h3>
            <Link
              href="/dashboard/classes"
              className="text-primary font-label-md text-[11px] flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              View Schedule <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 no-scrollbar">
            {featuredClasses.map((cls) => (
              <div
                key={cls.id}
                className="min-w-[220px] flex-shrink-0 bg-white rounded-lg shadow-sm border border-outline-variant overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-20 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={cls.title}
                    className="w-full h-full object-cover"
                    src={cls.coverImg}
                  />
                  {cls.status === "Live Now" && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[8px] font-bold uppercase text-primary">
                      Live
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p
                        className={`font-label-md text-[10px] ${
                          cls.status === "Live Now"
                            ? "text-primary"
                            : "text-on-surface-variant"
                        } mb-0.5`}
                      >
                        {cls.time}
                      </p>
                      <h4 className="font-headline-md text-[14px] text-on-surface">
                        {cls.title}
                      </h4>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={cls.trainer}
                      className="w-8 h-8 rounded-full border border-white shadow-sm object-cover"
                      src={cls.trainerImg}
                    />
                  </div>
                  <p className="text-[10px] text-on-surface-variant mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">person</span>{" "}
                    {cls.trainer}
                  </p>
                  {cls.status === "Live Now" ? (
                    <button 
                      onClick={() => bookClass(cls.id)}
                      className={`w-full py-1.5 rounded-full font-label-md text-[11px] shadow-sm transition-all active:scale-95 ${
                        bookedClassIds.includes(cls.id) 
                          ? "bg-outline-variant text-on-surface-variant" 
                          : "bg-primary text-white hover:bg-primary/90"
                      }`}
                    >
                      {bookedClassIds.includes(cls.id) ? "Booked" : "Join Session"}
                    </button>
                  ) : (
                    <button 
                      onClick={() => toggleReminder(cls.id)}
                      className={`w-full border py-1.5 rounded-full font-label-md text-[11px] active:scale-95 transition-all ${
                        reminders.includes(cls.id)
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-primary text-primary hover:bg-primary/5"
                      }`}
                    >
                      {reminders.includes(cls.id) ? "Reminder Set" : "Notify Me"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


