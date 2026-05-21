"use client";

import Link from "next/link";
import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

export default function BookingsPage() {
  const { classes, bookedClassIds, cancelBooking, addNotification } = useDashboard();
  const [filter, setFilter] = useState<"active" | "completed">("active");
  const [joiningClassId, setJoiningClassId] = useState<string | null>(null);

  // Filter booked classes
  const bookedClasses = classes.filter((cls) => bookedClassIds.includes(cls.id));

  // For visual depth, let's mock one completed booking if none exist, or display active
  const activeBookings = bookedClasses.filter((cls) => cls.status !== "Completed");
  const mockCompletedBookings = [
    {
      id: "comp-1",
      title: "Flow & Alignment Vinyasa",
      time: "Yesterday, 08:30 AM",
      trainer: "Sarah J.",
      trainerImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop",
      coverImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
      category: "Vinyasa",
      duration: "45 mins",
      difficulty: "Beginner",
      status: "Completed"
    }
  ];

  const handleJoinClass = (title: string, id: string) => {
    setJoiningClassId(id);
    addNotification(`🎥 Connecting to secure video server for "${title}"...`, "info");
    
    setTimeout(() => {
      setJoiningClassId(null);
      // Open mock Zoom link
      const win = window.open("https://zoom.us/join", "_blank");
      if (win) {
        addNotification("🚀 Zoom session launched! Namaste.", "success");
      } else {
        addNotification("⚠️ Pop-up blocked! Please allow pop-ups to open the class stream.", "warning");
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-[28px] font-extrabold text-on-surface tracking-tight">
            My Bookings
          </h1>
          <p className="font-body-md text-[13px] text-on-surface-variant mt-1">
            Manage your scheduled live classes, access streams, and track your wellness timeline.
          </p>
        </div>
        <div className="bg-primary/5 border border-primary/10 rounded-2xl px-4 py-2 flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
          <span className="font-label-md text-[12px] font-bold text-primary">
            {bookedClassIds.length} Scheduled Session{bookedClassIds.length !== 1 && "s"}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-outline-variant/60">
        <button
          onClick={() => setFilter("active")}
          className={`px-6 py-3 font-label-md text-[13px] font-bold border-b-2 transition-all active:scale-95 ${
            filter === "active"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-primary hover:border-outline-variant"
          }`}
        >
          Active Sessions ({activeBookings.length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-6 py-3 font-label-md text-[13px] font-bold border-b-2 transition-all active:scale-95 ${
            filter === "completed"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-primary hover:border-outline-variant"
          }`}
        >
          Completed History ({mockCompletedBookings.length})
        </button>
      </div>

      {/* Bookings Display */}
      {filter === "active" ? (
        activeBookings.length === 0 ? (
          /* Staggering Premium Empty State */
          <div className="flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest border border-outline-variant/55 rounded-3xl min-h-[360px] animate-fade-in shadow-xs">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
              <span className="material-symbols-outlined text-primary text-[32px] animate-pulse">event_busy</span>
            </div>
            <h3 className="font-headline-md text-[18px] text-on-surface font-extrabold">
              No Active Bookings
            </h3>
            <p className="font-body-sm text-[12px] text-on-surface-variant max-w-sm mt-2 mb-6">
              You haven&apos;t scheduled any upcoming live classes yet. Start exploring our high-energy and restorative yoga catalogs!
            </p>
            <Link
              href="/dashboard/classes"
              className="bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-full font-label-md text-[12px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">explore</span>
              Browse Classes
            </Link>
          </div>
        ) : (
          /* Booked Classes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBookings.map((cls) => (
              <div
                key={cls.id}
                className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/70 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col group animate-fade-in"
              >
                <div className="h-28 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={cls.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={cls.coverImg}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm border border-primary/10">
                      {cls.category}
                    </span>
                    {cls.status === "Live Now" && (
                      <span className="bg-error/95 text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm animate-pulse">
                        Live
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur px-2 py-0.5 rounded text-white text-[9px] font-bold uppercase tracking-wider">
                    {cls.duration}
                  </div>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-headline-md text-[15px] font-extrabold text-on-surface group-hover:text-primary transition-colors leading-snug">
                        {cls.title}
                      </h3>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={cls.trainer}
                        className="w-8 h-8 rounded-full border border-white shadow-sm object-cover flex-shrink-0"
                        src={cls.trainerImg}
                      />
                    </div>
                    
                    <p className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mb-1.5 font-medium">
                      <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
                      {cls.time}
                    </p>
                    <p className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mb-3 font-medium">
                      <span className="material-symbols-outlined text-[13px] text-primary">person</span>
                      Trainer: {cls.trainer}
                    </p>

                    <p className="font-body-sm text-[11px] text-on-surface-variant/90 line-clamp-2 leading-relaxed mb-4">
                      {cls.description}
                    </p>
                  </div>

                  <div className="space-y-2 mt-auto">
                    <button
                      onClick={() => handleJoinClass(cls.title, cls.id)}
                      disabled={joiningClassId !== null}
                      className={`w-full py-2.5 rounded-full font-label-md text-[11px] font-bold tracking-wide shadow-sm transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 ${
                        joiningClassId === cls.id
                          ? "bg-outline-variant text-on-surface-variant/60 cursor-wait"
                          : "bg-primary text-white hover:bg-primary/95"
                      }`}
                    >
                      {joiningClassId === cls.id ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-on-surface-variant border-t-transparent rounded-full animate-spin"></div>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[15px]">videocam</span>
                          Join Zoom Session
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => cancelBooking(cls.id)}
                      className="w-full border border-outline-variant text-on-surface-variant hover:border-error hover:text-error py-2.5 rounded-full font-label-md text-[11px] font-bold tracking-wide transition-colors active:scale-[0.97]"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Completed History Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompletedBookings.map((cls) => (
            <div
              key={cls.id}
              className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-2xl overflow-hidden flex flex-col group opacity-90 grayscale-[25%]"
            >
              <div className="h-28 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={cls.title}
                  className="w-full h-full object-cover"
                  src={cls.coverImg}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-surface-container-highest text-on-surface-variant px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    {cls.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-success text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[10px]">check_circle</span>
                  Completed
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-headline-md text-[15px] font-bold text-on-surface">
                      {cls.title}
                    </h3>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={cls.trainer}
                      className="w-8 h-8 rounded-full border border-white shadow-sm object-cover flex-shrink-0"
                      src={cls.trainerImg}
                    />
                  </div>
                  
                  <p className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mb-1.5">
                    <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                    {cls.time}
                  </p>
                  <p className="text-[10px] text-on-surface-variant flex items-center gap-1.5 mb-3">
                    <span className="material-symbols-outlined text-[13px]">person</span>
                    Trainer: {cls.trainer}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-outline-variant flex items-center justify-between">
                  <span className="text-[11px] font-bold text-success flex items-center gap-1">
                    🎉 +1 Goal Point Logged
                  </span>
                  <button 
                    onClick={() => addNotification("📘 Materials are ready for download!", "info")}
                    className="text-primary font-label-md text-[11px] font-bold hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">download</span>
                    Get Slides
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
