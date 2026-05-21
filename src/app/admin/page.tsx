"use client";

import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

export default function AdminPage() {
  const { students, courses, bookings, events, updateBookingStatus } = useAdmin();

  // Live computed stats from context
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const activeCourses = courses.filter((c) => c.status === "Active").length;
  const totalEnrolled = courses.reduce((acc, c) => acc + c.enrolled, 0);
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const upcomingEvents = events.filter((e) => e.status === "Upcoming").length;

  // Revenue estimate: $49/premium + $29/basic + $0/trial per active student
  const monthlyRevenue = students
    .filter((s) => s.status === "Active")
    .reduce((acc, s) => acc + (s.plan === "Premium" ? 49 : s.plan === "Basic" ? 29 : 0), 0);

  const stats = [
    { label: "Total Students", value: totalStudents.toLocaleString(), change: `${activeStudents} active`, icon: "groups", color: "primary", bgColor: "primary-fixed" },
    { label: "Monthly Revenue", value: `$${monthlyRevenue.toLocaleString()}`, change: `${totalEnrolled} enrolled`, icon: "payments", color: "secondary", bgColor: "secondary-fixed" },
    { label: "Active Courses", value: activeCourses.toString(), change: `${courses.length} total`, icon: "menu_book", color: "tertiary", bgColor: "tertiary-fixed" },
    { label: "Bookings", value: bookings.length.toString(), change: `${pendingBookings} pending`, icon: "add_task", color: "primary", bgColor: "primary-fixed" },
  ];

  // Revenue data for chart (mock but proportional)
  const revenueData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 62 },
    { month: "Apr", value: 55 },
    { month: "May", value: 78 },
    { month: "Jun", value: 85 },
  ];
  const maxVal = Math.max(...revenueData.map((d) => d.value));

  return (
    <>
      {/* Header */}
      <header className="mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="font-headline-lg text-[22px] text-primary font-extrabold tracking-tight">
            Overview Dashboard
          </h2>
          <p className="font-body-md text-[12px] text-on-surface-variant mt-0.5">
            Nurturing wellness for every generation.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-high rounded-full font-label-md text-[12px] text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            Live Data
          </div>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-outline-variant/20 hover:bg-surface-container-low transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </div>
            {pendingBookings > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-error text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {pendingBookings}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-4 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-1.5 bg-${stat.bgColor} rounded-lg text-${stat.color}`}>
                <span className="material-symbols-outlined text-[18px]">{stat.icon}</span>
              </div>
              <span className="text-on-surface-variant font-label-md text-[9px] bg-surface-container-high px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-2.5">
              <p className="font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="font-headline-md text-[18px] mt-0.5 text-on-surface font-extrabold">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </section>

      {/* Dashboard Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Analytics Chart */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h4 className="font-headline-md text-[15px] font-bold">Revenue Analytics</h4>
              <p className="font-caption text-[10px] text-on-surface-variant">Growth performance over last 6 months</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="font-label-md text-[11px]">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-md text-[11px]">Goals</span>
              </div>
            </div>
          </div>

          {/* Interactive Bar Chart */}
          <div className="h-52 w-full relative flex items-end justify-between px-4">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 border-b border-outline-variant/30">
              <div className="w-full border-t border-outline-variant/10"></div>
              <div className="w-full border-t border-outline-variant/10"></div>
              <div className="w-full border-t border-outline-variant/10"></div>
            </div>
            <div className="z-10 w-full h-full flex items-end justify-around pb-6">
              {revenueData.map((d) => (
                <div key={d.month} className="group relative flex flex-col items-center">
                  {/* Tooltip */}
                  <div className="absolute -top-8 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                    ${(d.value * monthlyRevenue / maxVal).toFixed(0)}
                  </div>
                  <div
                    className="w-4 bg-primary/20 rounded-t-lg group-hover:bg-primary transition-all duration-300 cursor-pointer"
                    style={{ height: `${(d.value / maxVal) * 180}px` }}
                  ></div>
                  <span className="mt-2 font-caption text-[9px] opacity-60 group-hover:opacity-100 group-hover:font-bold transition-all">
                    {d.month}
                  </span>
                </div>
              ))}
            </div>
            {/* SVG Goal Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path d="M 40 160 Q 130 130 220 140 T 400 90 T 580 60" fill="none" stroke="var(--color-secondary)" strokeDasharray="5,4" strokeWidth="2.5" opacity="0.5"></path>
            </svg>
          </div>
        </div>

        {/* Quick Actions + Upcoming Events */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card rounded-xl p-4 flex flex-col gap-2.5">
            <h4 className="font-headline-md text-[15px] mb-1 font-bold">Quick Actions</h4>
            <Link href="/admin/courses" className="flex items-center w-full p-3 rounded-lg border border-outline-variant hover:border-primary hover:bg-primary-fixed/30 transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                </div>
                <span className="font-label-md text-[12px]">Add Course</span>
              </div>
            </Link>
            <Link href="/admin/users" className="flex items-center w-full p-3 rounded-lg border border-outline-variant hover:border-secondary hover:bg-secondary-fixed/30 transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                </div>
                <span className="font-label-md text-[12px]">Add Student</span>
              </div>
            </Link>
            <Link href="/admin/events" className="flex items-center w-full p-3 rounded-lg border border-outline-variant hover:border-tertiary hover:bg-tertiary-fixed/30 transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tertiary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">event</span>
                </div>
                <span className="font-label-md text-[12px]">Create Event</span>
              </div>
            </Link>
          </div>

          {/* Upcoming Events Mini-Widget */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-headline-md text-[14px] font-bold">Upcoming Events</h4>
              <Link href="/admin/events" className="text-primary font-label-md text-[10px] hover:underline">View All</Link>
            </div>
            <div className="space-y-2.5">
              {events.filter((e) => e.status === "Upcoming").slice(0, 3).map((ev) => (
                <div key={ev.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[16px]">event</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-md text-[11px] font-bold text-on-surface truncate">{ev.title}</p>
                    <p className="text-[9px] text-on-surface-variant">{ev.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="lg:col-span-3 glass-card rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 flex justify-between items-center border-b border-outline-variant/20">
            <h4 className="font-headline-md text-[15px] font-bold">Recent Bookings</h4>
            <span className="text-on-surface-variant font-label-md text-[10px]">
              {bookings.length} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[550px]">
              <thead className="bg-surface-container-low border-b border-outline-variant/10">
                <tr>
                  <th className="px-5 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider">Student</th>
                  <th className="px-5 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider">Course</th>
                  <th className="px-5 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="px-5 py-3 flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full bg-${b.theme}-fixed flex items-center justify-center text-${b.theme} font-bold text-[9px]`}>
                        {b.studentInitials}
                      </div>
                      <span className="font-body-md text-[12px] text-on-surface font-medium">{b.studentName}</span>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-on-surface-variant">{b.course}</td>
                    <td className="px-5 py-3 text-[12px] text-on-surface-variant">{b.date}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full font-label-md text-[9px] font-bold ${
                        b.status === "Confirmed" ? "bg-green-100 text-green-700"
                          : b.status === "Pending" ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        {b.status === "Pending" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "Confirmed")}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          </button>
                        )}
                        {b.status === "Confirmed" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "Pending")}
                            className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Set Pending"
                          >
                            <span className="material-symbols-outlined text-[18px]">pending</span>
                          </button>
                        )}
                        {b.status !== "Cancelled" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "Cancelled")}
                            className="p-1.5 text-on-surface-variant hover:text-error hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
