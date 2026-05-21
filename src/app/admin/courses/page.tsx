"use client";

import { useAdmin, AdminCourse } from "@/context/AdminContext";
import { useState } from "react";

export default function CoursesPage() {
  const { courses, addCourse, updateCourse, deleteCourse } = useAdmin();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [fTitle, setFTitle] = useState("");
  const [fCategory, setFCategory] = useState<AdminCourse["category"]>("Hatha");
  const [fInstructor, setFInstructor] = useState("");
  const [fDuration, setFDuration] = useState("45 mins");
  const [fDifficulty, setFDifficulty] = useState<AdminCourse["difficulty"]>("Beginner");
  const [fDescription, setFDescription] = useState("");
  const [fCover, setFCover] = useState("");
  const [fMaxCapacity, setFMaxCapacity] = useState(30);
  const [fStatus, setFStatus] = useState<AdminCourse["status"]>("Draft");

  const categories = ["All", "Hatha", "Vinyasa", "Meditation", "Kids", "Restorative"];

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || c.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const resetForm = () => {
    setFTitle(""); setFCategory("Hatha"); setFInstructor(""); setFDuration("45 mins");
    setFDifficulty("Beginner"); setFDescription(""); setFCover(""); setFMaxCapacity(30); setFStatus("Draft");
    setShowForm(false); setEditingId(null);
  };

  const openEdit = (c: AdminCourse) => {
    setFTitle(c.title); setFCategory(c.category); setFInstructor(c.instructor); setFDuration(c.duration);
    setFDifficulty(c.difficulty); setFDescription(c.description); setFCover(c.coverImg); setFMaxCapacity(c.maxCapacity); setFStatus(c.status);
    setEditingId(c.id); setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: fTitle, category: fCategory, instructor: fInstructor,
      instructorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop",
      duration: fDuration, difficulty: fDifficulty, description: fDescription,
      coverImg: fCover || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
      enrolled: 0, maxCapacity: fMaxCapacity, status: fStatus,
    };
    if (editingId) {
      updateCourse(editingId, data);
    } else {
      addCourse(data);
    }
    resetForm();
  };

  const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Draft: "bg-yellow-100 text-yellow-700",
    Archived: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-[26px] font-extrabold text-on-surface tracking-tight">Course CMS</h1>
          <p className="font-body-md text-[12px] text-on-surface-variant mt-1">Create, manage, and organize your yoga class catalog.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-full font-label-md text-[12px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          Create Course
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-grow max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input type="text" placeholder="Search courses or instructors..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/60 rounded-full py-2.5 pl-11 pr-5 font-body-md text-[13px] text-on-surface focus:outline-none focus:border-primary transition-colors focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/60 shadow-xs" />
        </div>
        <div className="text-[11px] text-on-surface-variant/80 font-bold">{filtered.length} course{filtered.length !== 1 && "s"}</div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-label-md text-[11px] font-bold transition-all active:scale-95 flex-shrink-0 border ${
              selectedCategory === cat ? "bg-secondary text-white border-secondary shadow-sm" : "bg-white border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-2xl p-6 shadow-md animate-fade-in">
          <h3 className="font-headline-md text-[15px] font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">{editingId ? "edit" : "add_circle"}</span>
            {editingId ? "Edit Course" : "Create New Course"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Title</label>
              <input type="text" value={fTitle} onChange={(e) => setFTitle(e.target.value)} placeholder="e.g. Power Vinyasa" required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Category</label>
              <select value={fCategory} onChange={(e) => setFCategory(e.target.value as AdminCourse["category"])}
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
                {categories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Instructor</label>
              <input type="text" value={fInstructor} onChange={(e) => setFInstructor(e.target.value)} placeholder="e.g. Sarah J." required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Duration</label>
              <input type="text" value={fDuration} onChange={(e) => setFDuration(e.target.value)} placeholder="e.g. 45 mins"
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Difficulty</label>
              <select value={fDifficulty} onChange={(e) => setFDifficulty(e.target.value as AdminCourse["difficulty"])}
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
                <option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option><option value="All Levels">All Levels</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Max Capacity</label>
              <input type="number" value={fMaxCapacity} onChange={(e) => setFMaxCapacity(Number(e.target.value))} min={1}
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Status</label>
              <select value={fStatus} onChange={(e) => setFStatus(e.target.value as AdminCourse["status"])}
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">
                <option value="Draft">Draft</option><option value="Active">Active (Published)</option><option value="Archived">Archived</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Cover Image URL</label>
              <input type="url" value={fCover} onChange={(e) => setFCover(e.target.value)} placeholder="https://..."
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[11px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="lg:col-span-3 md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Description</label>
              <textarea value={fDescription} onChange={(e) => setFDescription(e.target.value)} rows={2} placeholder="Brief description of the class..."
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none" />
            </div>
            <div className="lg:col-span-3 md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className="bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold shadow-md transition-all active:scale-95">
                {editingId ? "Save Changes" : "Create Course"}
              </button>
              <button type="button" onClick={resetForm} className="border border-outline-variant text-on-surface-variant px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold transition-all active:scale-95">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Course Cards Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-10 bg-surface-container-lowest border border-outline-variant/50 rounded-3xl min-h-[280px]">
          <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40 mb-3">search_off</span>
          <h3 className="font-headline-md text-[16px] text-on-surface font-bold">No Courses Found</h3>
          <p className="font-body-sm text-[12px] text-on-surface-variant max-w-xs mt-1">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col group">
              <div className="h-32 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={c.coverImg} />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-primary shadow-sm border border-primary/10">{c.category}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${statusColors[c.status]}`}>{c.status}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-white text-[9px] font-bold">{c.duration}</div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-headline-md text-[14px] font-extrabold text-on-surface group-hover:text-primary transition-colors leading-snug">{c.title}</h3>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={c.instructor} className="w-7 h-7 rounded-full border border-white shadow-xs object-cover flex-shrink-0" src={c.instructorImg} />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">person</span>{c.instructor}</span>
                    <span className="text-[10px] text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">show_chart</span>{c.difficulty}</span>
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant/90 line-clamp-2 leading-relaxed mb-3">{c.description}</p>
                  {/* Enrollment Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[9px] text-on-surface-variant font-bold mb-1">
                      <span>Enrolled</span>
                      <span>{c.enrolled}/{c.maxCapacity}</span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(c.enrolled / c.maxCapacity) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => openEdit(c)} className="flex-grow border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">edit</span>Edit
                  </button>
                  <button onClick={() => updateCourse(c.id, { status: c.status === "Active" ? "Archived" : "Active" })}
                    className="flex-grow border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-[0.97] flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">{c.status === "Active" ? "archive" : "publish"}</span>
                    {c.status === "Active" ? "Archive" : "Publish"}
                  </button>
                  {confirmDeleteId === c.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => { deleteCourse(c.id); setConfirmDeleteId(null); }} className="bg-error/10 text-error px-3 py-2 rounded-full text-[10px] font-bold">Yes</button>
                      <button onClick={() => setConfirmDeleteId(null)} className="bg-surface-container-high px-3 py-2 rounded-full text-[10px] font-bold">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDeleteId(c.id)} className="w-9 h-9 border border-outline-variant text-on-surface-variant hover:text-error hover:border-error rounded-full flex items-center justify-center transition-all active:scale-90">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
