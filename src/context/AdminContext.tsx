"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────
export interface AdminStudent {
  id: string;
  name: string;
  email: string;
  plan: "Premium" | "Basic" | "Trial";
  status: "Active" | "Inactive";
  joinDate: string;
  avatar: string;
}

export interface AdminCourse {
  id: string;
  title: string;
  category: "Hatha" | "Vinyasa" | "Meditation" | "Kids" | "Restorative";
  instructor: string;
  instructorImg: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  description: string;
  coverImg: string;
  enrolled: number;
  maxCapacity: number;
  status: "Active" | "Draft" | "Archived";
}

export interface AdminBooking {
  id: string;
  studentName: string;
  studentInitials: string;
  course: string;
  date: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  theme: "primary" | "secondary" | "tertiary";
}

export interface AdminEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxCapacity: number;
  registered: number;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  coverImg: string;
}

interface ToastNotification {
  id: number;
  message: string;
  type?: "info" | "success" | "warning";
}

interface AdminContextType {
  students: AdminStudent[];
  courses: AdminCourse[];
  bookings: AdminBooking[];
  events: AdminEvent[];
  notifications: ToastNotification[];
  addStudent: (s: Omit<AdminStudent, "id">) => void;
  updateStudent: (id: string, updates: Partial<AdminStudent>) => void;
  deleteStudent: (id: string) => void;
  addCourse: (c: Omit<AdminCourse, "id">) => void;
  updateCourse: (id: string, updates: Partial<AdminCourse>) => void;
  deleteCourse: (id: string) => void;
  addEvent: (e: Omit<AdminEvent, "id">) => void;
  updateEvent: (id: string, updates: Partial<AdminEvent>) => void;
  deleteEvent: (id: string) => void;
  updateBookingStatus: (id: string, status: AdminBooking["status"]) => void;
  addNotification: (message: string, type?: "info" | "success" | "warning") => void;
  clearNotification: (id: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ─── Seed Data ───────────────────────────────────────────────────────
const seedStudents: AdminStudent[] = [
  { id: "s1", name: "Emma Knight", email: "emma.k@happyfit.com", plan: "Premium", status: "Active", joinDate: "Jan 15, 2026", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop" },
  { id: "s2", name: "Leo Miller", email: "leo.m@happyfit.com", plan: "Premium", status: "Active", joinDate: "Feb 3, 2026", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop" },
  { id: "s3", name: "Sophia Chen", email: "sophia.c@happyfit.com", plan: "Basic", status: "Active", joinDate: "Mar 22, 2026", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop" },
  { id: "s4", name: "James Park", email: "james.p@happyfit.com", plan: "Trial", status: "Active", joinDate: "Apr 10, 2026", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop" },
  { id: "s5", name: "Mia Rodriguez", email: "mia.r@happyfit.com", plan: "Premium", status: "Active", joinDate: "Apr 28, 2026", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop" },
  { id: "s6", name: "Noah Williams", email: "noah.w@happyfit.com", plan: "Basic", status: "Inactive", joinDate: "Dec 5, 2025", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop" },
  { id: "s7", name: "Ava Thompson", email: "ava.t@happyfit.com", plan: "Premium", status: "Active", joinDate: "May 1, 2026", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop" },
  { id: "s8", name: "Ethan Davis", email: "ethan.d@happyfit.com", plan: "Trial", status: "Active", joinDate: "May 12, 2026", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&h=256&auto=format&fit=crop" },
];

const seedCourses: AdminCourse[] = [
  { id: "c1", title: "Morning Hatha Flow", category: "Hatha", instructor: "Sarah J.", instructorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop", duration: "45 mins", difficulty: "Beginner", description: "Start your day with mindful movement and breath alignment.", coverImg: "https://images.unsplash.com/photo-1599901860904-17e08c2d131f?q=80&w=600&auto=format&fit=crop", enrolled: 28, maxCapacity: 35, status: "Active" },
  { id: "c2", title: "Deep Restoration", category: "Restorative", instructor: "Marcus T.", instructorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop", duration: "60 mins", difficulty: "All Levels", description: "Long-held passive stretches to release deep fascia tension.", coverImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop", enrolled: 18, maxCapacity: 30, status: "Active" },
  { id: "c3", title: "Kids Playful Yoga", category: "Kids", instructor: "Elena R.", instructorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop", duration: "30 mins", difficulty: "Beginner", description: "Fun games and stories introducing children to yoga.", coverImg: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=600&auto=format&fit=crop", enrolled: 22, maxCapacity: 25, status: "Active" },
  { id: "c4", title: "Vinyasa Sunset Power", category: "Vinyasa", instructor: "Sarah J.", instructorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop", duration: "50 mins", difficulty: "Intermediate", description: "Strength-building sunset flow with core integration.", coverImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop", enrolled: 31, maxCapacity: 35, status: "Active" },
  { id: "c5", title: "Candlelight Meditation", category: "Meditation", instructor: "Marcus T.", instructorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop", duration: "40 mins", difficulty: "Beginner", description: "Guided breathing and visualization for restful sleep.", coverImg: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop", enrolled: 15, maxCapacity: 40, status: "Active" },
  { id: "c6", title: "Early Morning Zen", category: "Meditation", instructor: "Elena R.", instructorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop", duration: "30 mins", difficulty: "Beginner", description: "Brief mindfulness session with gentle seated stretching.", coverImg: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=600&auto=format&fit=crop", enrolled: 20, maxCapacity: 20, status: "Active" },
  { id: "c7", title: "Advanced Ashtanga Series", category: "Vinyasa", instructor: "Sarah J.", instructorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop", duration: "75 mins", difficulty: "Advanced", description: "Traditional Ashtanga primary series for experienced practitioners.", coverImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop", enrolled: 12, maxCapacity: 20, status: "Draft" },
  { id: "c8", title: "Family Bonding Yoga", category: "Kids", instructor: "Elena R.", instructorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop", duration: "45 mins", difficulty: "All Levels", description: "Fun partner poses and activities for families to enjoy together.", coverImg: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=600&auto=format&fit=crop", enrolled: 0, maxCapacity: 30, status: "Draft" },
];

const seedBookings: AdminBooking[] = [
  { id: "b1", studentName: "Emma Knight", studentInitials: "EK", course: "Kids Mindfulness 101", date: "May 20, 2026", status: "Confirmed", theme: "primary" },
  { id: "b2", studentName: "Leo Miller", studentInitials: "LM", course: "Advanced Family Yoga", date: "May 19, 2026", status: "Pending", theme: "secondary" },
  { id: "b3", studentName: "Sophia Chen", studentInitials: "SC", course: "Early Morning Zen", date: "May 19, 2026", status: "Confirmed", theme: "tertiary" },
  { id: "b4", studentName: "James Park", studentInitials: "JP", course: "Vinyasa Sunset Power", date: "May 18, 2026", status: "Confirmed", theme: "primary" },
  { id: "b5", studentName: "Mia Rodriguez", studentInitials: "MR", course: "Candlelight Meditation", date: "May 18, 2026", status: "Pending", theme: "secondary" },
  { id: "b6", studentName: "Ava Thompson", studentInitials: "AT", course: "Morning Hatha Flow", date: "May 17, 2026", status: "Confirmed", theme: "tertiary" },
];

const seedEvents: AdminEvent[] = [
  { id: "e1", title: "Summer Solstice Yoga Retreat", date: "Jun 21, 2026", time: "06:00 AM - 12:00 PM", location: "Riverside Park Pavilion", description: "A transformative outdoor yoga retreat celebrating the longest day of the year with sunrise sessions, group meditation, and wellness workshops.", maxCapacity: 100, registered: 67, status: "Upcoming", coverImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop" },
  { id: "e2", title: "Beginner's Open Day", date: "May 25, 2026", time: "10:00 AM - 04:00 PM", location: "Happy Fit Main Studio", description: "Free introductory sessions for newcomers. Try Hatha, Vinyasa, and Meditation classes with our expert instructors.", maxCapacity: 50, registered: 42, status: "Upcoming", coverImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" },
  { id: "e3", title: "Kids Wellness Week", date: "Jun 2–6, 2026", time: "09:00 AM - 11:00 AM", location: "Happy Fit Kids Zone", description: "A week-long series of playful yoga, mindfulness games, and creative movement for children ages 5–12.", maxCapacity: 30, registered: 30, status: "Upcoming", coverImg: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=600&auto=format&fit=crop" },
  { id: "e4", title: "Instructor Certification Workshop", date: "Jul 15–20, 2026", time: "08:00 AM - 06:00 PM", location: "Conference Hall B", description: "Intensive 6-day yoga teacher training and certification program. Open to advanced practitioners.", maxCapacity: 25, registered: 18, status: "Upcoming", coverImg: "https://images.unsplash.com/photo-1599901860904-17e08c2d131f?q=80&w=600&auto=format&fit=crop" },
  { id: "e5", title: "Spring Mindfulness Fair", date: "Apr 15, 2026", time: "11:00 AM - 05:00 PM", location: "Community Garden", description: "Annual mindfulness fair with vendor booths, live demos, sound baths, and organic food tasting.", maxCapacity: 200, registered: 185, status: "Completed", coverImg: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop" },
];

// ─── Provider ────────────────────────────────────────────────────────
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<AdminStudent[]>(seedStudents);
  const [courses, setCourses] = useState<AdminCourse[]>(seedCourses);
  const [bookings, setBookings] = useState<AdminBooking[]>(seedBookings);
  const [events, setEvents] = useState<AdminEvent[]>(seedEvents);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const ls = (key: string) => localStorage.getItem(key);
      const s = ls("hf_admin_students"); if (s) setStudents(JSON.parse(s));
      const c = ls("hf_admin_courses");  if (c) setCourses(JSON.parse(c));
      const b = ls("hf_admin_bookings"); if (b) setBookings(JSON.parse(b));
      const e = ls("hf_admin_events");   if (e) setEvents(JSON.parse(e));
    } catch (err) { console.error("Error loading admin data:", err); }
  }, []);

  const save = (key: string, value: unknown) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { console.error(err); }
  };

  // ─── Notifications ──────────────────────────────────────────────
  const addNotification = useCallback((message: string, type: "info" | "success" | "warning" = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 4000);
  }, []);

  const clearNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // ─── Students CRUD ──────────────────────────────────────────────
  const addStudent = (s: Omit<AdminStudent, "id">) => {
    const next = [{ ...s, id: "s" + Date.now() }, ...students];
    setStudents(next); save("hf_admin_students", next);
    addNotification(`👤 Student "${s.name}" added successfully!`);
  };

  const updateStudent = (id: string, updates: Partial<AdminStudent>) => {
    const next = students.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setStudents(next); save("hf_admin_students", next);
    addNotification(`✏️ Student record updated.`);
  };

  const deleteStudent = (id: string) => {
    const target = students.find((s) => s.id === id);
    const next = students.filter((s) => s.id !== id);
    setStudents(next); save("hf_admin_students", next);
    addNotification(`🗑️ Student "${target?.name}" removed.`, "warning");
  };

  // ─── Courses CRUD ───────────────────────────────────────────────
  const addCourse = (c: Omit<AdminCourse, "id">) => {
    const next = [{ ...c, id: "c" + Date.now() }, ...courses];
    setCourses(next); save("hf_admin_courses", next);
    addNotification(`📚 Course "${c.title}" created!`);
  };

  const updateCourse = (id: string, updates: Partial<AdminCourse>) => {
    const next = courses.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCourses(next); save("hf_admin_courses", next);
    addNotification(`✏️ Course updated successfully.`);
  };

  const deleteCourse = (id: string) => {
    const target = courses.find((c) => c.id === id);
    const next = courses.filter((c) => c.id !== id);
    setCourses(next); save("hf_admin_courses", next);
    addNotification(`🗑️ Course "${target?.title}" deleted.`, "warning");
  };

  // ─── Events CRUD ────────────────────────────────────────────────
  const addEvent = (e: Omit<AdminEvent, "id">) => {
    const next = [{ ...e, id: "e" + Date.now() }, ...events];
    setEvents(next); save("hf_admin_events", next);
    addNotification(`🎉 Event "${e.title}" created!`);
  };

  const updateEvent = (id: string, updates: Partial<AdminEvent>) => {
    const next = events.map((e) => (e.id === id ? { ...e, ...updates } : e));
    setEvents(next); save("hf_admin_events", next);
    addNotification(`✏️ Event updated.`);
  };

  const deleteEvent = (id: string) => {
    const target = events.find((e) => e.id === id);
    const next = events.filter((e) => e.id !== id);
    setEvents(next); save("hf_admin_events", next);
    addNotification(`🗑️ Event "${target?.title}" removed.`, "warning");
  };

  // ─── Bookings ───────────────────────────────────────────────────
  const updateBookingStatus = (id: string, status: AdminBooking["status"]) => {
    const next = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(next); save("hf_admin_bookings", next);
    addNotification(`Booking #${id} → ${status}.`, status === "Cancelled" ? "warning" : "success");
  };

  return (
    <AdminContext.Provider value={{
      students, courses, bookings, events, notifications,
      addStudent, updateStudent, deleteStudent,
      addCourse, updateCourse, deleteCourse,
      addEvent, updateEvent, deleteEvent,
      updateBookingStatus, addNotification, clearNotification,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within an AdminProvider");
  return ctx;
};
