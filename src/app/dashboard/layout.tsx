"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { profile, notifications, clearNotification } = useDashboard();
  const { logout } = useAuth();

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: "dashboard" },
    { href: "/dashboard/bookings", label: "My Bookings", icon: "calendar_today" },
    { href: "/dashboard/classes", label: "Online Classes", icon: "video_library" },
    { href: "/dashboard/payments", label: "Payments", icon: "payments" },
    { href: "/dashboard/profile", label: "Profile", icon: "person" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-screen w-56 bg-surface dark:bg-inverse-surface border-r border-outline-variant dark:border-outline shadow-md py-8 space-y-6 sticky top-0">
        {/* Top Logo and Title */}
        <div className="px-6 py-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary-container/20 flex items-center justify-center border border-primary/20 dark:border-primary-container/30">
            <span className="material-symbols-outlined text-primary font-bold text-[22px]">spa</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-headline-md text-[17px] font-extrabold text-primary tracking-tight leading-none">
              Happy Fit
            </span>
            <span className="text-[9px] text-on-surface-variant/70 uppercase tracking-widest font-bold mt-0.5 leading-none">
              Club
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-3.5 mx-4 rounded-full transition-all active:scale-[0.98] ${
                  isActive
                    ? "bg-primary-container text-white font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section (Unified Compact Profile Card) */}
        <div className="mt-auto px-4 pb-4">
          <div className="flex items-center justify-between p-2.5 bg-surface-container-low dark:bg-inverse-surface/30 rounded-[24px] border border-outline-variant/30 dark:border-outline/30 shadow-sm animate-fade-in">
            <Link href="/dashboard/profile" className="flex items-center gap-3 min-w-0 hover:opacity-85 transition-opacity group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Student Profile Picture"
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-outline/40 shadow-xs group-hover:scale-105 transition-transform"
                src={profile.profileImage}
              />
              <div className="min-w-0 flex flex-col justify-center">
                <p className="font-label-md text-[13px] font-bold text-on-surface tracking-tight truncate leading-tight">
                  {profile.name}
                </p>
                <p className="text-[8px] text-on-surface-variant uppercase tracking-widest font-extrabold mt-0.5 leading-none">
                  {profile.level}
                </p>
              </div>
            </Link>
            
            {/* Inline Compact Sign Out Button */}
            <button 
              onClick={logout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface-container-high dark:hover:bg-inverse-surface transition-colors active:scale-90 flex-shrink-0"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto px-margin-mobile md:px-margin-desktop py-8 max-w-container-max mx-auto pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Navigation Shell */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-outline-variant flex justify-around items-center py-4 px-4 z-50 shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      {/* Global Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className="bg-inverse-surface text-inverse-on-surface px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-right duration-300 border border-white/10 pointer-events-auto max-w-sm transition-all"
          >
            <span className={`material-symbols-outlined ${
              n.type === "warning" ? "text-warning" : n.type === "info" ? "text-secondary" : "text-primary-fixed"
            }`}>
              {n.type === "warning" ? "warning" : n.type === "info" ? "info" : "check_circle"}
            </span>
            <span className="font-body-md text-[13px] font-medium">{n.message}</span>
            <button 
              onClick={() => clearNotification(n.id)} 
              className="ml-auto text-inverse-on-surface/50 hover:text-inverse-on-surface transition-colors p-0.5 rounded-full"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}

