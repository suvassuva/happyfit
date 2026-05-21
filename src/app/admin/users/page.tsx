"use client";

import { useAdmin, AdminStudent } from "@/context/AdminContext";
import { useState } from "react";

export default function UsersPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useAdmin();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPlan, setFormPlan] = useState<AdminStudent["plan"]>("Trial");
  const [formStatus, setFormStatus] = useState<AdminStudent["status"]>("Active");

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

  const planColors: Record<string, string> = {
    Premium: "bg-primary/10 text-primary border-primary/20",
    Basic: "bg-secondary/10 text-secondary border-secondary/20",
    Trial: "bg-tertiary/10 text-tertiary border-tertiary/20",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-[26px] font-extrabold text-on-surface tracking-tight">
            User Management
          </h1>
          <p className="font-body-md text-[12px] text-on-surface-variant mt-1">
            Manage student accounts, subscription plans, and enrollment status.
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
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-surface-container-low border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Student</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Email</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Plan</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider">Joined</th>
                <th className="px-5 py-3.5 font-label-md text-[9px] text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[32px] mb-2 block opacity-40">search_off</span>
                    <p className="font-body-md text-[13px]">No students found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
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
                        className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold transition-colors cursor-pointer ${
                          s.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {s.status}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-on-surface-variant">{s.joinDate}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex justify-end gap-1">
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
