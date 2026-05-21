"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { upcomingClasses as initialClasses, studentProfile as initialProfile } from "@/lib/dummy-data";

export interface StudentProfile {
  name: string;
  email: string;
  level: string;
  status: string;
  plan: string;
  renewalDate: string;
  streak: number;
  weeklyGoalCompleted: number;
  weeklyGoalTotal: number;
  profileImage: string;
  coverImage: string;
}

export interface ClassItem {
  id: string;
  time: string;
  title: string;
  trainer: string;
  trainerImg: string;
  coverImg: string;
  status: "Live Now" | "Scheduled" | "Completed" | "Full";
  category: "Hatha" | "Vinyasa" | "Meditation" | "Kids" | "Restorative";
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  spotsLeft?: number;
}

export interface Transaction {
  id: string;
  date: string;
  invoiceNo: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  method: string;
  planName: string;
}

interface ToastNotification {
  id: number;
  message: string;
  type?: "info" | "success" | "warning";
}

interface DashboardContextType {
  profile: StudentProfile;
  classes: ClassItem[];
  bookedClassIds: string[];
  reminders: string[];
  notifications: ToastNotification[];
  transactions: Transaction[];
  updateProfile: (newProfile: Partial<StudentProfile>) => void;
  bookClass: (classId: string) => void;
  cancelBooking: (classId: string) => void;
  toggleReminder: (classId: string) => void;
  incrementGoal: () => void;
  addNotification: (message: string, type?: "info" | "success" | "warning") => void;
  clearNotification: (id: number) => void;
  addTransaction: (tx: Omit<Transaction, "id" | "date">) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Rich and beautiful expanded set of initial classes with full categories and details
const seedClasses: ClassItem[] = [
  {
    id: "1",
    time: "09:00 AM",
    title: "Morning Hatha Flow",
    trainer: "Sarah J.",
    trainerImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1599901860904-17e08c2d131f?q=80&w=600&auto=format&fit=crop",
    status: "Live Now",
    category: "Hatha",
    duration: "45 mins",
    difficulty: "Beginner",
    description: "Align your breath and posture in this energizing start to your morning. Ideal for setting a peaceful intention.",
    spotsLeft: 3
  },
  {
    id: "2",
    time: "12:30 PM",
    title: "Deep Restoration",
    trainer: "Marcus T.",
    trainerImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    status: "Scheduled",
    category: "Restorative",
    duration: "60 mins",
    difficulty: "All Levels",
    description: "Relax deeply with long-held passive stretches designed to open up the fascia, release tension, and soothe the mind.",
    spotsLeft: 12
  },
  {
    id: "3",
    time: "04:00 PM",
    title: "Kids Playful Yoga",
    trainer: "Elena R.",
    trainerImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=600&auto=format&fit=crop",
    status: "Scheduled",
    category: "Kids",
    duration: "30 mins",
    difficulty: "Beginner",
    description: "A dynamic, energetic class that introduces children to movement, focus, and breathing through fun games and stories.",
    spotsLeft: 8
  },
  {
    id: "4",
    time: "06:30 PM",
    title: "Vinyasa Sunset Power",
    trainer: "Sarah J.",
    trainerImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
    status: "Scheduled",
    category: "Vinyasa",
    duration: "50 mins",
    difficulty: "Intermediate",
    description: "Sweat, stretch, and flow in this faster-paced core integration and strength-building sunset Vinyasa sequence.",
    spotsLeft: 5
  },
  {
    id: "5",
    time: "08:30 PM",
    title: "Candlelight Meditation",
    trainer: "Marcus T.",
    trainerImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop",
    status: "Scheduled",
    category: "Meditation",
    duration: "40 mins",
    difficulty: "Beginner",
    description: "Prepare your nervous system for a restful sleep with guided breathing exercises, visualization, and silence.",
    spotsLeft: 20
  },
  {
    id: "6",
    time: "07:30 AM",
    title: "Early Morning Zen",
    trainer: "Elena R.",
    trainerImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
    coverImg: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=600&auto=format&fit=crop",
    status: "Scheduled",
    category: "Meditation",
    duration: "30 mins",
    difficulty: "Beginner",
    description: "Start your day centered and calm. A brief, powerful session of mindfulness and gentle seated stretching.",
    spotsLeft: 0 // Full
  }
];

const seedTransactions: Transaction[] = [
  {
    id: "tx1",
    date: "May 15, 2026",
    invoiceNo: "INV-2026-005",
    amount: "$49.00",
    status: "Paid",
    method: "Visa ending in 4242",
    planName: "Premium Monthly Subscription"
  },
  {
    id: "tx2",
    date: "Apr 15, 2026",
    invoiceNo: "INV-2026-004",
    amount: "$49.00",
    status: "Paid",
    method: "Visa ending in 4242",
    planName: "Premium Monthly Subscription"
  },
  {
    id: "tx3",
    date: "Mar 15, 2026",
    invoiceNo: "INV-2026-003",
    amount: "$49.00",
    status: "Paid",
    method: "Visa ending in 4242",
    planName: "Premium Monthly Subscription"
  },
  {
    id: "tx4",
    date: "Feb 15, 2026",
    invoiceNo: "INV-2026-002",
    amount: "$49.00",
    status: "Paid",
    method: "Mastercard ending in 9876",
    planName: "Premium Monthly Subscription"
  }
];

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize student profile state with email
  const [profile, setProfile] = useState<StudentProfile>(() => {
    return {
      ...initialProfile,
      email: "alex.river@happyfit.com"
    };
  });

  const [classes] = useState<ClassItem[]>(seedClasses);
  const [bookedClassIds, setBookedClassIds] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem("happyfit_profile");
      if (storedProfile) setProfile(JSON.parse(storedProfile));

      const storedBookings = localStorage.getItem("happyfit_bookings");
      if (storedBookings) setBookedClassIds(JSON.parse(storedBookings));

      const storedReminders = localStorage.getItem("happyfit_reminders");
      if (storedReminders) setReminders(JSON.parse(storedReminders));

      const storedTransactions = localStorage.getItem("happyfit_transactions");
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
    } catch (error) {
      console.error("Error loading dashboard data from localStorage:", error);
    }
  }, []);

  // Save actions to localStorage helper
  const saveToLocal = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  const addNotification = (message: string, type: "info" | "success" | "warning" = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const clearNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const updateProfile = (newProfile: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...newProfile };
      saveToLocal("happyfit_profile", updated);
      return updated;
    });
    addNotification("👤 Profile updated successfully!", "success");
  };

  const bookClass = (classId: string) => {
    const selectedClass = classes.find((c) => c.id === classId);
    if (!selectedClass) return;

    if (bookedClassIds.includes(classId)) {
      addNotification("You've already booked this class!", "warning");
      return;
    }

    if (selectedClass.spotsLeft === 0) {
      addNotification("⚠️ This class is fully booked!", "warning");
      return;
    }

    const updatedBookings = [...bookedClassIds, classId];
    setBookedClassIds(updatedBookings);
    saveToLocal("happyfit_bookings", updatedBookings);

    // Auto increment goal progress when a class is successfully booked
    setProfile((prev) => {
      const newProgress = Math.min(prev.weeklyGoalCompleted + 1, prev.weeklyGoalTotal);
      const updated = { ...prev, weeklyGoalCompleted: newProgress };
      saveToLocal("happyfit_profile", updated);
      return updated;
    });

    addNotification(`🎉 Booked: "${selectedClass.title}". Check your Bookings!`, "success");
  };

  const cancelBooking = (classId: string) => {
    const selectedClass = classes.find((c) => c.id === classId);
    if (!selectedClass) return;

    const updatedBookings = bookedClassIds.filter((id) => id !== classId);
    setBookedClassIds(updatedBookings);
    saveToLocal("happyfit_bookings", updatedBookings);

    // Decrement goal progress when booking is cancelled
    setProfile((prev) => {
      const newProgress = Math.max(prev.weeklyGoalCompleted - 1, 0);
      const updated = { ...prev, weeklyGoalCompleted: newProgress };
      saveToLocal("happyfit_profile", updated);
      return updated;
    });

    addNotification(`Booking cancelled: "${selectedClass.title}".`, "info");
  };

  const toggleReminder = (classId: string) => {
    const selectedClass = classes.find((c) => c.id === classId);
    if (!selectedClass) return;

    let updatedReminders: string[];
    if (reminders.includes(classId)) {
      updatedReminders = reminders.filter((id) => id !== classId);
      addNotification(`Reminder removed for "${selectedClass.title}".`, "info");
    } else {
      updatedReminders = [...reminders, classId];
      addNotification(`⏰ Reminder set! We'll alert you for "${selectedClass.title}".`, "success");
    }
    setReminders(updatedReminders);
    saveToLocal("happyfit_reminders", updatedReminders);
  };

  const incrementGoal = () => {
    setProfile((prev) => {
      if (prev.weeklyGoalCompleted < prev.weeklyGoalTotal) {
        const updated = { ...prev, weeklyGoalCompleted: prev.weeklyGoalCompleted + 1 };
        saveToLocal("happyfit_profile", updated);
        addNotification("💪 Great job! Activity logged.", "success");
        return updated;
      } else {
        addNotification("🏆 You have already reached your weekly goal!", "info");
        return prev;
      }
    });
  };

  const addTransaction = (tx: Omit<Transaction, "id" | "date">) => {
    const newTx: Transaction = {
      ...tx,
      id: "tx" + (transactions.length + 1),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    const updatedTxs = [newTx, ...transactions];
    setTransactions(updatedTxs);
    saveToLocal("happyfit_transactions", updatedTxs);
    addNotification("💳 Payment method updated successfully!", "success");
  };

  return (
    <DashboardContext.Provider
      value={{
        profile,
        classes,
        bookedClassIds,
        reminders,
        notifications,
        transactions,
        updateProfile,
        bookClass,
        cancelBooking,
        toggleReminder,
        incrementGoal,
        addNotification,
        clearNotification,
        addTransaction
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
