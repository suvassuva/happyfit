"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { notifications, clearNotification } = useAdmin();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Analytics", icon: "analytics" },
    { href: "/admin/users", label: "User Management", icon: "group" },
    { href: "/admin/courses", label: "Course CMS", icon: "school" },
    { href: "/admin/events", label: "Event Management", icon: "event" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-surface font-body-md text-on-surface">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-lowest border-r border-outline-variant shadow-xl py-8 space-y-4 sticky top-0">
        <div className="px-7 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined">fitness_center</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md text-secondary tracking-tight">
              Admin Panel
            </h1>
            <p className="font-caption text-caption text-on-surface-variant">
              Management Portal
            </p>
          </div>
        </div>

        <nav className="flex-grow space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 mx-4 px-4 py-3 rounded-xl transition-all active:scale-[0.97] ${
                  isActive
                    ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm"
                    : "text-on-surface-variant hover:bg-secondary-fixed/10 hover:text-secondary"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile Card */}
        <div className="px-5 pt-6 mt-auto">
          <div className="glass-card rounded-xl p-3 flex items-center justify-between border-outline-variant/30">
            <div className="flex items-center gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Admin Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
              />
              <div className="min-w-0">
                <p className="font-label-md text-label-md text-on-surface font-bold truncate">
                  Alex Rivera
                </p>
                <p className="font-caption text-caption text-on-surface-variant">
                  Super Admin
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-surface-container-high transition-colors active:scale-90 flex-shrink-0"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-outline-variant px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[16px]">fitness_center</span>
          </div>
          <span className="font-headline-md text-[14px] text-secondary font-bold">Admin</span>
        </div>
        <button
          onClick={logout}
          className="text-on-surface-variant hover:text-error transition-colors"
          title="Sign Out"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>

      {/* Main Content Canvas */}
      <main className="flex-grow overflow-y-auto px-gutter py-8 max-w-container-max mx-auto w-full mt-14 md:mt-0 pb-20 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-outline-variant flex justify-around items-center py-3 px-4 z-50 shadow-lg">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                isActive ? "text-secondary" : "text-on-surface-variant hover:text-secondary"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="text-[8px] font-bold uppercase tracking-tighter">{item.label.split(" ")[0]}</span>
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
