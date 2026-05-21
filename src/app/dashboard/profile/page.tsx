"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { profile, updateProfile, addNotification } = useDashboard();

  // Local state for the editable fields
  const [name, setName] = useState(profile.name);
  const [level, setLevel] = useState(profile.level);
  const [email, setEmail] = useState(profile.email || "alex.river@happyfit.com");
  const [profileImage, setProfileImage] = useState(profile.profileImage);
  const [coverImage, setCoverImage] = useState(profile.coverImage);
  const [isEditing, setIsEditing] = useState(false);

  // Sync state if profile context changes underneath
  useEffect(() => {
    setName(profile.name);
    setLevel(profile.level);
    setEmail(profile.email || "alex.river@happyfit.com");
    setProfileImage(profile.profileImage);
    setCoverImage(profile.coverImage);
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      addNotification("⚠️ Name cannot be empty!", "warning");
      return;
    }
    
    updateProfile({
      name,
      level,
      email,
      profileImage,
      coverImage
    });
    setIsEditing(false);
  };

  const handleReset = () => {
    setName(profile.name);
    setLevel(profile.level);
    setEmail(profile.email);
    setProfileImage(profile.profileImage);
    setCoverImage(profile.coverImage);
    setIsEditing(false);
    addNotification("Changes discarded.", "info");
  };

  // Mock list of rich, gorgeous badges
  const achievements = [
    {
      id: "ach-1",
      title: "Mindfulness Master",
      desc: "Complete 10 Meditation sessions",
      icon: "self_improvement",
      color: "from-purple-500 to-indigo-500",
      unlocked: true
    },
    {
      id: "ach-2",
      title: "Early Bird Yogini",
      desc: "Attend a class before 8:00 AM",
      icon: "wb_sunny",
      color: "from-amber-400 to-orange-500",
      unlocked: true
    },
    {
      id: "ach-3",
      title: "Consistency King",
      desc: "Reach a 10-day streak",
      icon: "local_fire_department",
      color: "from-rose-500 to-red-600",
      unlocked: true
    },
    {
      id: "ach-4",
      title: "Vinyasa Warrior",
      desc: "Complete 5 Vinyasa classes",
      icon: "fitness_center",
      color: "from-emerald-400 to-teal-600",
      unlocked: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Cover Image & Avatar Stack */}
      <div className="relative rounded-3xl overflow-hidden shadow-md">
        <div className="h-44 relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Profile Cover Image"
            className="w-full h-full object-cover"
            src={coverImage}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Details Overlay Card */}
        <div className="bg-white dark:bg-inverse-surface/5 p-6 border-x border-b border-outline-variant/60 rounded-b-3xl flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16 relative z-10 text-center md:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-outline/40 shadow-md bg-white"
              src={profileImage}
            />
            <div className="mb-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="font-headline-lg text-[22px] font-extrabold text-on-surface leading-tight">
                  {profile.name}
                </h1>
                <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="font-body-md text-[12px] text-on-surface-variant mt-1.5 flex items-center gap-1 justify-center md:justify-start">
                <span className="material-symbols-outlined text-[15px]">mail</span> {email}
              </p>
              <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 flex items-center gap-1 justify-center md:justify-start uppercase tracking-wider font-extrabold text-primary">
                <span className="material-symbols-outlined text-[14px]">spa</span> {profile.level}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="border border-outline-variant hover:border-primary text-on-surface hover:text-primary px-5 py-2 rounded-full font-label-md text-[12px] font-bold transition-all active:scale-95 flex items-center gap-1.5 self-center md:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isEditing ? "close" : "edit"}
            </span>
            {isEditing ? "Cancel Edit" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Profile Editing or Info Card - Span 7 */}
        <div className="lg:col-span-7 bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-3xl p-6 shadow-xs">
          <h2 className="font-headline-md text-[17px] text-on-surface font-extrabold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">person_outline</span>
            Personal Information
          </h2>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex River"
                    className="bg-surface-container-low border border-outline-variant/70 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/70 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                  >
                    <option value="Yoga Journey">Yoga Journey (Beginner)</option>
                    <option value="Vinyasa Mastery">Vinyasa Mastery (Intermediate)</option>
                    <option value="Meditation Yogi">Meditation Yogi (All Levels)</option>
                    <option value="Kundalini Flow">Kundalini Flow (Advanced)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.river@happyfit.com"
                  className="bg-surface-container-low border border-outline-variant/70 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    value={profileImage}
                    onChange={(e) => setProfileImage(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/70 rounded-xl px-4 py-2.5 font-body-md text-[11px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                    Cover URL
                  </label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/70 rounded-xl px-4 py-2.5 font-body-md text-[11px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="border border-outline-variant text-on-surface-variant hover:text-on-surface px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-outline-variant/50">
                <div>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Name</p>
                  <p className="font-body-md text-[13px] text-on-surface mt-0.5 font-semibold">{profile.name}</p>
                </div>
                <div>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Program Level</p>
                  <p className="font-body-md text-[13px] text-on-surface mt-0.5 font-semibold">{profile.level}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-outline-variant/50">
                <div>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Email</p>
                  <p className="font-body-md text-[13px] text-on-surface mt-0.5 font-semibold">{email}</p>
                </div>
                <div>
                  <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Subscription Plan</p>
                  <p className="font-body-md text-[13px] text-on-surface mt-0.5 font-semibold text-primary">{profile.plan}</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold">Billing Schedule</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">credit_card</span>
                  Renewing via auto-debit on <span className="font-semibold text-on-surface">{profile.renewalDate}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Streaks & Accomplishments - Span 5 */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subscription Tier Capsule */}
          <div className="bg-gradient-to-tr from-primary to-indigo-600 text-white rounded-3xl p-5 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-15">
              <span className="material-symbols-outlined text-[96px] rotate-12">loyalty</span>
            </div>
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest inline-block mb-3">
                {profile.plan}
              </span>
              <h3 className="font-headline-md text-[18px] font-extrabold leading-tight">
                Vibrant Mind & Body Access
              </h3>
              <p className="font-body-sm text-[11px] text-white/95 mt-1 leading-relaxed">
                You have unrestricted authorization to all schedules, on-demand visual libraries, and priority trainer consults.
              </p>
              
              <div className="mt-4.5 pt-4 border-t border-white/20 flex justify-between items-center text-[10px]">
                <span>Renewal Date: <span className="font-bold">{profile.renewalDate}</span></span>
                <span className="font-bold flex items-center gap-0.5 bg-white text-primary px-2.5 py-1 rounded-full text-[9px] shadow-sm">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Goal & Streak Summary Widget */}
          <div className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-3xl p-5 shadow-xs flex justify-around text-center">
            <div>
              <div className="w-11 h-11 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-2 border border-rose-500/20">
                <span className="material-symbols-outlined text-[22px] animate-pulse">local_fire_department</span>
              </div>
              <p className="text-[20px] font-extrabold text-on-surface tracking-tight">{profile.streak} Days</p>
              <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold mt-0.5">Active Streak</p>
            </div>
            
            <div className="w-px bg-outline-variant self-stretch"></div>

            <div>
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 border border-primary/20">
                <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
              </div>
              <p className="text-[20px] font-extrabold text-on-surface tracking-tight">
                {profile.weeklyGoalCompleted}/{profile.weeklyGoalTotal}
              </p>
              <p className="text-[9px] text-on-surface-variant uppercase tracking-wider font-extrabold mt-0.5">Weekly Goal</p>
            </div>
          </div>
        </div>

        {/* Achievements / Rewards Showcase - Span 12 */}
        <div className="lg:col-span-12 bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-3xl p-6 shadow-xs mt-2">
          <h2 className="font-headline-md text-[17px] text-on-surface font-extrabold mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">military_tech</span>
            Unlocked Achievements & Rewards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                  ach.unlocked
                    ? "bg-white dark:bg-inverse-surface/10 border-outline-variant/60 shadow-xs hover:-translate-y-0.5 hover:shadow-md cursor-default group"
                    : "bg-surface-container-highest/20 border-outline-variant/40 opacity-50 grayscale select-none"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${ach.color} text-white flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6`}>
                  <span className="material-symbols-outlined text-[20px]">{ach.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-headline-md text-[12px] font-extrabold text-on-surface">
                      {ach.title}
                    </h3>
                    {!ach.unlocked && (
                      <span className="material-symbols-outlined text-[12px] text-on-surface-variant">lock</span>
                    )}
                  </div>
                  <p className="text-[10px] text-on-surface-variant/90 leading-tight mt-0.5">
                    {ach.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
