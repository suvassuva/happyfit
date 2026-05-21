"use client";

import { useAdmin, AdminStudent } from "@/context/AdminContext";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function UsersPageContent() {
  const { students, addStudent, updateStudent, deleteStudent, addNotification } = useAdmin();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPlan, setFormPlan] = useState<AdminStudent["plan"]>("Trial");
  const [formStatus, setFormStatus] = useState<AdminStudent["status"]>("Active");

  // Mail Drawer state
  const [showMailDrawer, setShowMailDrawer] = useState(false);
  const [mailRecipient, setMailRecipient] = useState<AdminStudent | null>(null);
  const [mailTemplate, setMailTemplate] = useState<"custom" | "expiry" | "overdue" | "welcome">("custom");
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendingStep, setSendingStep] = useState("");

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormName(""); setFormEmail(""); setFormPlan("Trial"); setFormStatus("Active");
    setShowForm(false); setEditingId(null);
  };

  const openEditForm = (s: AdminStudent) => {
    setFormName(s.name); setFormEmail(s.email); setFormPlan(s.plan); setFormStatus(s.status);
    setEditingId(s.id); setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateStudent(editingId, { name: formName, email: formEmail, plan: formPlan, status: formStatus });
    } else {
      addStudent({
        name: formName,
        email: formEmail,
        plan: formPlan,
        status: formStatus,
        joinDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formName)}&background=random&size=256`,
      });
    }
    resetForm();
  };

  // Due status utility
  const getDueStatus = (dueDateStr?: string, status?: string) => {
    if (status === "Inactive") {
      return { text: "Expired", className: "bg-surface-container-high text-on-surface-variant border-outline-variant/30", icon: "cancel" };
    }
    if (!dueDateStr) return { text: "No Date", className: "bg-surface-container-high text-on-surface-variant border-outline-variant/30", icon: "help" };
    
    const due = new Date(dueDateStr);
    const today = new Date("2026-05-21");
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const formattedDate = due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    
    if (diffDays < 0) {
      return { 
        text: `Overdue (${Math.abs(diffDays)}d)`, 
        date: formattedDate,
        className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30", 
        icon: "warning", 
        isOverdue: true,
        diffDays
      };
    } else if (diffDays <= 5) {
      return { 
        text: `Due in ${diffDays}d`, 
        date: formattedDate,
        className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30", 
        icon: "hourglass_empty", 
        isSoon: true,
        diffDays
      };
    } else {
      return { 
        text: formattedDate, 
        className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30", 
        icon: "check_circle",
        diffDays
      };
    }
  };

  const handleTemplateChange = (template: typeof mailTemplate, recipient: AdminStudent | null) => {
    setMailTemplate(template);
    if (!recipient) return;
    
    const today = new Date("2026-05-21");
    let formattedDue = "";
    let overdueDays = 0;
    if (recipient.dueDate) {
      const due = new Date(recipient.dueDate);
      formattedDue = due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const diffTime = today.getTime() - due.getTime();
      overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    if (template === "custom") {
      setMailSubject("");
      setMailBody("");
    } else if (template === "expiry") {
      setMailSubject("Renew Your HappyFit Membership 🧘‍♀️");
      setMailBody(`Hi ${recipient.name},\n\nThis is a friendly reminder that your HappyFit ${recipient.plan} membership is expiring soon on ${formattedDue || "next week"}.\n\nPlease log in to your dashboard to complete renewal and keep enjoying your daily wellness and fitness sessions!\n\nWarm regards,\nThe HappyFit Team`);
    } else if (template === "overdue") {
      setMailSubject("ACTION REQUIRED: HappyFit Payment Overdue ⚠️");
      setMailBody(`Hi ${recipient.name},\n\nYour HappyFit ${recipient.plan} membership payment is currently past due by ${overdueDays > 0 ? overdueDays : 3} days (due on ${formattedDue || "recently"}).\n\nTo prevent any interruption in booking yoga, meditation, and children's fitness classes, please update your billing details and complete payment in your dashboard.\n\nWarm regards,\nThe HappyFit Team`);
    } else if (template === "welcome") {
      setMailSubject(`Welcome to the HappyFit Family, ${recipient.name.split(" ")[0]}! 🎉`);
      setMailBody(`Hi ${recipient.name},\n\nWelcome to HappyFit! We are thrilled to have you join our wellness community.\n\nAs a special welcome gift, here is a promo code for 20% off any upcoming weekend outdoor retreats or certification courses: 'FAMILY20'.\n\nSee you on the mat soon!\n\nWarmest regards,\nThe HappyFit Team`);
    }
  };

  const openMailDrawer = (s: AdminStudent) => {
    setMailRecipient(s);
    setShowMailDrawer(true);
    // Pre-select template based on due status
    const dueStatus = getDueStatus(s.dueDate, s.status);
    if (dueStatus.isOverdue) {
      handleTemplateChange("overdue", s);
    } else if (dueStatus.isSoon) {
      handleTemplateChange("expiry", s);
    } else {
      handleTemplateChange("custom", s);
    }
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailRecipient) return;
    
    setIsSending(true);
    setSendingStep("Drafting notification message...");
    
    setTimeout(() => {
      setSendingStep("Connecting to SMTP mail relay...");
      setTimeout(() => {
        setSendingStep("Securing connection with TLS...");
        setTimeout(() => {
          setSendingStep("Delivering notification envelope...");
          setTimeout(() => {
            setIsSending(false);
            setSendingStep("");
            setShowMailDrawer(false);
            addNotification(`📧 Email notification successfully dispatched to ${mailRecipient.name}!`, "success");
          }, 800);
        }, 600);
      }, 600);
    }, 600);
  };

  // Handle URL Query parameters
  useEffect(() => {
    const emailActionId = searchParams.get("emailAction");
    const templateParam = searchParams.get("template") as any;
    
    if (emailActionId && students.length > 0) {
      const student = students.find((s) => s.id === emailActionId);
      if (student) {
        setMailRecipient(student);
        setShowMailDrawer(true);
        if (templateParam && ["custom", "expiry", "overdue", "welcome"].includes(templateParam)) {
          handleTemplateChange(templateParam, student);
        } else {
          const dueStatus = getDueStatus(student.dueDate, student.status);
          if (dueStatus.isOverdue) {
            handleTemplateChange("overdue", student);
          } else if (dueStatus.isSoon) {
            handleTemplateChange("expiry", student);
          } else {
            handleTemplateChange("custom", student);
          }
        }
        
        // Clean URL params so it doesn't reopen on refresh
        const params = new URLSearchParams(searchParams.toString());
        params.delete("emailAction");
        params.delete("template");
        router.replace(`/admin/users?${params.toString()}`);
      }
    }
  }, [searchParams, students]);

  const planColors: Record<string, string> = {
    Premium: "bg-primary/10 text-primary border-primary/20",
    Basic: "bg-secondary/10 text-secondary border-secondary/20",
    Trial: "bg-tertiary/10 text-tertiary border-tertiary/20",
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-[26px] font-extrabold text-on-surface tracking-tight">
            User Management
          </h1>
          <p className="font-body-md text-[12px] text-on-surface-variant mt-1">
            Manage student accounts, subscription plans, billing due dates, and student notifications.
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-full font-label-md text-[12px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">person_add</span>
          Add Student
        </button>
      </div>

      {/* Search + Stats Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-grow max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/60 rounded-full py-2.5 pl-11 pr-5 font-body-md text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/60 shadow-xs"
          />
        </div>
        <div className="flex gap-3">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl px-3.5 py-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[16px]">groups</span>
            <span className="font-label-md text-[11px] font-bold text-primary">{students.length} Total</span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl px-3.5 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="font-label-md text-[11px] font-bold text-green-700">{students.filter((s) => s.status === "Active").length} Active</span>
          </div>
        </div>
      </div>

      {/* Add/Edit Form (Collapsible) */}
      {showForm && (
        <div className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-2xl p-6 shadow-md animate-fade-in">
          <h3 className="font-headline-md text-[15px] font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">{editingId ? "edit" : "person_add"}</span>
            {editingId ? "Edit Student" : "Add New Student"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Full Name</label>
              <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. John Smith" required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Email</label>
              <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="john@happyfit.com" required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Plan</label>
              <select value={formPlan} onChange={(e) => setFormPlan(e.target.value as AdminStudent["plan"])}
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
                <option value="Premium">Premium ($49/mo)</option>
                <option value="Basic">Basic ($29/mo)</option>
                <option value="Trial">Trial (Free)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Status</label>
              <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as AdminStudent["status"])}
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className="bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold shadow-md transition-all active:scale-95">
                {editingId ? "Save Changes" : "Add Student"}
              </button>
              <button type="button" onClick={resetForm} className="border border-outline-variant text-on-surface-variant hover:text-on-surface px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold transition-all active:scale-95">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Students Table */}
      <div className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead className="bg-surface-container-low border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Student</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Email</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Plan</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Due Date / Billing</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Joined</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[32px] mb-2 block opacity-40">search_off</span>
                    <p className="font-body-md text-[13px]">No students found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const dueInfo = getDueStatus(s.dueDate, s.status);
                  return (
                    <tr key={s.id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                      <td className="px-5 py-3.5 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={s.name} className="w-8 h-8 rounded-full object-cover border border-white shadow-xs" src={s.avatar} />
                        <span className="font-body-md text-[12px] text-on-surface font-semibold">{s.name}</span>
                      </td>
                      <td className="px-5 py-3.5 text-[12px] text-on-surface-variant">{s.email}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${planColors[s.plan]}`}>
                          {s.plan}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => updateStudent(s.id, { status: s.status === "Active" ? "Inactive" : "Active" })}
                          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold transition-colors cursor-pointer border ${
                            s.status === "Active" 
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" 
                              : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {s.status}
                        </button>
                      </td>
                      {/* Due Date Badge Column */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold border ${dueInfo.className}`}>
                            <span className="material-symbols-outlined text-[12px]">{dueInfo.icon}</span>
                            {dueInfo.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[12px] text-on-surface-variant">{s.joinDate}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end gap-1">
                          {/* Mail Action Button */}
                          <button 
                            onClick={() => openMailDrawer(s)} 
                            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" 
                            title="Send Email / Alert"
                          >
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                          </button>
                          
                          <button onClick={() => openEditForm(s)} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-lg transition-colors" title="Edit">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          {confirmDeleteId === s.id ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => { deleteStudent(s.id); setConfirmDeleteId(null); }} className="p-1.5 text-error bg-error/10 rounded-lg transition-colors text-[9px] font-bold px-2">
                                Confirm
                              </button>
                              <button onClick={() => setConfirmDeleteId(null)} className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg text-[9px] font-bold px-2">
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmDeleteId(s.id)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/5 rounded-lg transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Premium Email Drawer */}
      {showMailDrawer && mailRecipient && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          {/* Backdrop */}
          <div 
            onClick={() => { if (!isSending) setShowMailDrawer(false); }} 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          ></div>
          
          {/* Drawer container */}
          <div className="relative w-full max-w-4xl bg-white dark:bg-inverse-surface border-l border-outline-variant/40 shadow-2xl h-full flex flex-col md:flex-row z-10 overflow-hidden animate-slide-left">
            
            {/* Sending Loader Overlay */}
            {isSending && (
              <div className="absolute inset-0 bg-white/95 dark:bg-inverse-surface/95 z-50 flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="font-headline-md text-[16px] font-bold text-on-surface mb-2">Sending Notification</h3>
                <p className="font-body-md text-[12px] text-on-surface-variant animate-pulse">{sendingStep}</p>
                <div className="w-48 bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-6">
                  <div className="bg-primary h-full animate-progress rounded-full"></div>
                </div>
              </div>
            )}

            {/* Left: Input Form Panel */}
            <div className="flex-1 p-6 flex flex-col border-r border-outline-variant/10 max-h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mailRecipient.avatar} alt={mailRecipient.name} className="w-10 h-10 rounded-full border shadow-xs" />
                  <div>
                    <h2 className="font-headline-md text-[16px] font-bold text-on-surface">Email Student</h2>
                    <p className="text-[11px] text-on-surface-variant">{mailRecipient.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMailDrawer(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSendMail} className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Template selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Notification Template</label>
                    <select 
                      value={mailTemplate} 
                      onChange={(e) => handleTemplateChange(e.target.value as any, mailRecipient)}
                      className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary"
                    >
                      <option value="custom">Custom Message (Blank)</option>
                      <option value="expiry">Membership Expiry Reminder</option>
                      <option value="overdue">Past Due Payment Alert</option>
                      <option value="welcome">Welcome Promo Offer</option>
                    </select>
                  </div>

                  {/* Subject input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Email Subject</label>
                    <input 
                      type="text" 
                      value={mailSubject} 
                      onChange={(e) => setMailSubject(e.target.value)}
                      placeholder="e.g. Update regarding your yoga class schedule" 
                      required
                      className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Body text area */}
                  <div className="flex flex-col gap-1.5 flex-grow">
                    <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Message Content</label>
                    <textarea 
                      value={mailBody} 
                      onChange={(e) => setMailBody(e.target.value)}
                      placeholder="Type your notification body here..." 
                      required
                      rows={9}
                      className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] text-on-surface focus:outline-none focus:border-primary resize-none flex-grow min-h-[160px]"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-outline-variant/10">
                  <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-full font-label-md text-[12px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    Send Notification
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowMailDrawer(false)}
                    className="border border-outline-variant text-on-surface-variant hover:text-on-surface px-6 py-3 rounded-full font-label-md text-[12px] font-bold transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Rich HTML Live Preview Panel */}
            <div className="w-full md:w-[380px] bg-slate-50 dark:bg-slate-900 p-6 flex flex-col max-h-full overflow-y-auto">
              <h3 className="font-headline-md text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">preview</span>
                Branded HTML Live Preview
              </h3>
              
              {/* Premium framed newsletter mockup */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col flex-grow min-h-[350px]">
                
                {/* Header bar */}
                <div className="bg-primary p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">fitness_center</span>
                    <span className="font-headline-sm text-[12px] font-black tracking-widest uppercase">HappyFit</span>
                  </div>
                  <span className="text-[8px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase">wellness</span>
                </div>
                
                {/* Email Body content */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <h4 className="font-headline-sm text-[12px] font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 pb-2">
                      {mailSubject || "(No Subject)"}
                    </h4>
                    
                    {/* Render message body with spacing */}
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
                      {mailBody ? (
                        mailBody.split("\n").map((para, i) => (
                          <p key={i} className={para.trim() === "" ? "h-2" : "mb-2"}>
                            {para}
                          </p>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">Enter message content to preview...</span>
                      )}
                    </div>
                  </div>

                  {/* Branded Call to Action Button */}
                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <div className="bg-primary hover:bg-primary/90 text-white text-center py-2 px-4 rounded-lg text-[10px] font-bold pointer-events-none cursor-default inline-block w-full shadow-xs">
                      Access My Wellness Dashboard
                    </div>
                  </div>
                </div>

                {/* Branded Footer */}
                <div className="bg-slate-100 dark:bg-slate-900 px-5 py-4 text-center border-t border-slate-200/50 dark:border-slate-800/40">
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">HappyFit Wellness Studio</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">123 Peace Street, San Francisco, CA 94102</p>
                  <p className="text-[7px] text-slate-400/60 mt-1">If you have any questions, reply directly to this mail.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={
      <div className="p-6 text-center text-on-surface-variant font-label-md flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-[12px] animate-pulse">Loading student panel...</p>
      </div>
    }>
      <UsersPageContent />
    </Suspense>
  );
}
