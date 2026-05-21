"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

export default function ClassesPage() {
  const { classes, bookedClassIds, reminders, bookClass, toggleReminder } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Hatha", "Vinyasa", "Meditation", "Kids", "Restorative"];

  // Filter classes based on search query and category pill
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || cls.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-[28px] font-extrabold text-on-surface tracking-tight">
          Online Classes
        </h1>
        <p className="font-body-md text-[13px] text-on-surface-variant mt-1">
          Explore and book live stream sessions led by expert instructors. Connect from anywhere.
        </p>
      </div>

      {/* Search and Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search classes, trainers, style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/60 rounded-full py-2.5 pl-11 pr-5 font-body-md text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/60 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface p-0.5 rounded-full"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Info Metric */}
        <div className="text-[11px] text-on-surface-variant/80 font-bold self-end md:self-center">
          Showing {filteredClasses.length} class{filteredClasses.length !== 1 && "es"}
        </div>
      </div>

      {/* Category Selector Pills */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4.5 py-2.5 rounded-full font-label-md text-[12px] font-bold transition-all active:scale-95 flex-shrink-0 border ${
              selectedCategory === cat
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            {cat} {cat === "All" ? "" : "Yoga"}
          </button>
        ))}
      </div>

      {/* Classes Grid */}
      {filteredClasses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest border border-outline-variant/50 rounded-3xl min-h-[300px] animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-on-surface-variant text-[28px]">search_off</span>
          </div>
          <h3 className="font-headline-md text-[16px] text-on-surface font-bold">
            No Classes Found
          </h3>
          <p className="font-body-sm text-[12px] text-on-surface-variant max-w-xs mt-1.5">
            We couldn&apos;t find any sessions matching your search or filters. Try checking other categories or keywords!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => {
            const isBooked = bookedClassIds.includes(cls.id);
            const hasReminder = reminders.includes(cls.id);
            const isFull = cls.spotsLeft === 0;

            return (
              <div
                key={cls.id}
                className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/70 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col group animate-fade-in"
              >
                {/* Cover Image Block */}
                <div className="h-32 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={cls.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={cls.coverImg}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 dark:bg-black/80 backdrop-blur px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm border border-primary/10">
                      {cls.category}
                    </span>
                    {cls.status === "Live Now" && (
                      <span className="bg-error/95 text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm animate-pulse">
                        Live
                      </span>
                    )}
                  </div>
                  
                  {/* Spots Left Pill */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded text-white text-[9px] font-bold">
                    {isFull ? (
                      <span className="text-error-fixed">Class Full</span>
                    ) : (
                      <span>{cls.spotsLeft} Spots Left</span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-white text-[9px] font-bold uppercase tracking-wider">
                    {cls.duration}
                  </div>
                </div>

                {/* Description & Interactive Block */}
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
                    
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] text-on-surface-variant flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
                        {cls.time}
                      </span>
                      <span className="text-[10px] text-on-surface-variant flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[13px] text-primary">show_chart</span>
                        {cls.difficulty}
                      </span>
                    </div>

                    <p className="font-body-sm text-[11px] text-on-surface-variant/90 line-clamp-2 leading-relaxed mb-4">
                      {cls.description}
                    </p>
                  </div>

                  {/* Booking Buttons */}
                  <div className="space-y-2 mt-auto">
                    {cls.status === "Live Now" ? (
                      <button
                        onClick={() => bookClass(cls.id)}
                        disabled={isBooked || isFull}
                        className={`w-full py-2.5 rounded-full font-label-md text-[11px] font-bold tracking-wide shadow-sm transition-all active:scale-[0.97] ${
                          isBooked
                            ? "bg-outline-variant text-on-surface-variant/60 cursor-not-allowed"
                            : isFull
                            ? "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
                            : "bg-primary text-white hover:bg-primary/95"
                        }`}
                      >
                        {isBooked ? "Booked & Active" : isFull ? "Class Full" : "Join Session"}
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => bookClass(cls.id)}
                          disabled={isBooked || isFull}
                          className={`flex-grow py-2.5 rounded-full font-label-md text-[11px] font-bold tracking-wide shadow-sm transition-all active:scale-[0.97] ${
                            isBooked
                              ? "bg-outline-variant text-on-surface-variant/60 cursor-not-allowed"
                              : isFull
                              ? "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
                              : "bg-primary text-white hover:bg-primary/95"
                          }`}
                        >
                          {isBooked ? "Booked" : isFull ? "Fully Booked" : "Book Class"}
                        </button>
                        {!isBooked && (
                          <button
                            onClick={() => toggleReminder(cls.id)}
                            className={`w-10 h-10 flex-shrink-0 border rounded-full flex items-center justify-center transition-colors active:scale-90 ${
                              hasReminder
                                ? "bg-primary/10 border-primary text-primary"
                                : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                            }`}
                            title={hasReminder ? "Remove reminder" : "Set reminder"}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {hasReminder ? "notifications_active" : "notifications"}
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
