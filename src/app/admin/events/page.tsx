"use client";

import { useAdmin, AdminEvent } from "@/context/AdminContext";
import { useState } from "react";

export default function EventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // Form state
  const [fTitle, setFTitle] = useState("");
  const [fDate, setFDate] = useState("");
  const [fTime, setFTime] = useState("");
  const [fLocation, setFLocation] = useState("");
  const [fDescription, setFDescription] = useState("");
  const [fMaxCapacity, setFMaxCapacity] = useState(50);
  const [fCover, setFCover] = useState("");

  const statusFilters = ["All", "Upcoming", "Ongoing", "Completed", "Cancelled"];

  const filtered = events.filter((e) => filterStatus === "All" || e.status === filterStatus);

  const resetForm = () => {
    setFTitle(""); setFDate(""); setFTime(""); setFLocation("");
    setFDescription(""); setFMaxCapacity(50); setFCover("");
    setShowForm(false); setEditingId(null);
  };

  const openEdit = (e: AdminEvent) => {
    setFTitle(e.title); setFDate(e.date); setFTime(e.time); setFLocation(e.location);
    setFDescription(e.description); setFMaxCapacity(e.maxCapacity); setFCover(e.coverImg);
    setEditingId(e.id); setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: fTitle, date: fDate, time: fTime, location: fLocation,
      description: fDescription, maxCapacity: fMaxCapacity, registered: 0,
      status: "Upcoming" as AdminEvent["status"],
      coverImg: fCover || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
    };
    if (editingId) {
      updateEvent(editingId, { ...data, status: undefined, registered: undefined });
    } else {
      addEvent(data);
    }
    resetForm();
  };

  const statusStyles: Record<string, { bg: string; text: string; icon: string }> = {
    Upcoming: { bg: "bg-blue-100", text: "text-blue-700", icon: "schedule" },
    Ongoing: { bg: "bg-green-100", text: "text-green-700", icon: "play_circle" },
    Completed: { bg: "bg-gray-100", text: "text-gray-600", icon: "check_circle" },
    Cancelled: { bg: "bg-red-100", text: "text-red-600", icon: "cancel" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-[26px] font-extrabold text-on-surface tracking-tight">Event Management</h1>
          <p className="font-body-md text-[12px] text-on-surface-variant mt-1">Create, schedule, and manage studio events, workshops, and retreats.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-full font-label-md text-[12px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Create Event
        </button>
      </div>

      {/* Stats + Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {statusFilters.map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full font-label-md text-[11px] font-bold transition-all active:scale-95 flex-shrink-0 border ${
                filterStatus === s ? "bg-secondary text-white border-secondary shadow-sm" : "bg-white border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary"
              }`}>
              {s} {s !== "All" && `(${events.filter((e) => e.status === s).length})`}
            </button>
          ))}
        </div>
        <div className="bg-primary/5 border border-primary/10 rounded-2xl px-3.5 py-2 flex items-center gap-2 self-start md:self-auto">
          <span className="material-symbols-outlined text-primary text-[16px]">event</span>
          <span className="font-label-md text-[11px] font-bold text-primary">{events.length} Total Events</span>
        </div>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-2xl p-6 shadow-md animate-fade-in">
          <h3 className="font-headline-md text-[15px] font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">{editingId ? "edit_calendar" : "event"}</span>
            {editingId ? "Edit Event" : "Create New Event"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Event Title</label>
              <input type="text" value={fTitle} onChange={(e) => setFTitle(e.target.value)} placeholder="e.g. Summer Yoga Retreat" required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Date</label>
              <input type="text" value={fDate} onChange={(e) => setFDate(e.target.value)} placeholder="e.g. Jun 21, 2026" required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Time</label>
              <input type="text" value={fTime} onChange={(e) => setFTime(e.target.value)} placeholder="e.g. 09:00 AM - 12:00 PM" required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Location</label>
              <input type="text" value={fLocation} onChange={(e) => setFLocation(e.target.value)} placeholder="e.g. Main Studio" required
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Max Capacity</label>
              <input type="number" value={fMaxCapacity} onChange={(e) => setFMaxCapacity(Number(e.target.value))} min={1}
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Cover Image URL</label>
              <input type="url" value={fCover} onChange={(e) => setFCover(e.target.value)} placeholder="https://..."
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[11px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
            </div>
            <div className="lg:col-span-3 md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Description</label>
              <textarea value={fDescription} onChange={(e) => setFDescription(e.target.value)} rows={2} placeholder="Describe the event..."
                className="bg-surface-container-low border border-outline-variant/60 rounded-xl px-4 py-2.5 font-body-md text-[12px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none" />
            </div>
            <div className="lg:col-span-3 md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className="bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold shadow-md transition-all active:scale-95">
                {editingId ? "Save Changes" : "Create Event"}
              </button>
              <button type="button" onClick={resetForm} className="border border-outline-variant text-on-surface-variant px-6 py-2.5 rounded-full font-label-md text-[12px] font-bold transition-all active:scale-95">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-10 bg-surface-container-lowest border border-outline-variant/50 rounded-3xl min-h-[280px]">
          <span className="material-symbols-outlined text-[36px] text-on-surface-variant/40 mb-3">event_busy</span>
          <h3 className="font-headline-md text-[16px] text-on-surface font-bold">No Events Found</h3>
          <p className="font-body-sm text-[12px] text-on-surface-variant max-w-xs mt-1">No events match the selected filter. Try another status or create a new event!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((ev) => {
            const style = statusStyles[ev.status];
            const capacityPercent = ev.maxCapacity > 0 ? (ev.registered / ev.maxCapacity) * 100 : 0;
            const isFull = ev.registered >= ev.maxCapacity;
            return (
              <div key={ev.id} className="bg-white dark:bg-inverse-surface/5 border border-outline-variant/60 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col md:flex-row group">
                {/* Cover Image */}
                <div className="w-full md:w-56 h-40 md:h-auto relative overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={ev.coverImg} />
                  <div className="absolute top-3 left-3">
                    <span className={`${style.bg} ${style.text} px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-[11px]">{style.icon}</span>
                      {ev.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-md text-[16px] font-extrabold text-on-surface group-hover:text-primary transition-colors mb-2">{ev.title}</h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3">
                      <span className="text-[11px] text-on-surface-variant flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[14px] text-primary">calendar_today</span>{ev.date}
                      </span>
                      <span className="text-[11px] text-on-surface-variant flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>{ev.time}
                      </span>
                      <span className="text-[11px] text-on-surface-variant flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>{ev.location}
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant/90 leading-relaxed mb-4 line-clamp-2">{ev.description}</p>

                    {/* Capacity Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[9px] font-bold mb-1.5">
                        <span className="text-on-surface-variant">Registration</span>
                        <span className={isFull ? "text-error" : "text-on-surface-variant"}>
                          {ev.registered}/{ev.maxCapacity} {isFull && "— FULL"}
                        </span>
                      </div>
                      <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${isFull ? "bg-error" : capacityPercent > 75 ? "bg-warning" : "bg-primary"}`}
                          style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => openEdit(ev)}
                      className="border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary px-4 py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">edit</span>Edit
                    </button>

                    {ev.status === "Upcoming" && (
                      <button onClick={() => updateEvent(ev.id, { status: "Ongoing" })}
                        className="border border-green-300 text-green-700 hover:bg-green-50 px-4 py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">play_circle</span>Start
                      </button>
                    )}
                    {ev.status === "Ongoing" && (
                      <button onClick={() => updateEvent(ev.id, { status: "Completed" })}
                        className="border border-blue-300 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>Complete
                      </button>
                    )}
                    {(ev.status === "Upcoming" || ev.status === "Ongoing") && (
                      <button onClick={() => updateEvent(ev.id, { status: "Cancelled" })}
                        className="border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">cancel</span>Cancel
                      </button>
                    )}
                    {(ev.status === "Completed" || ev.status === "Cancelled") && (
                      <button onClick={() => updateEvent(ev.id, { status: "Upcoming" })}
                        className="border border-primary/30 text-primary hover:bg-primary/5 px-4 py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">refresh</span>Reopen
                      </button>
                    )}

                    {confirmDeleteId === ev.id ? (
                      <div className="flex gap-1.5 ml-auto">
                        <button onClick={() => { deleteEvent(ev.id); setConfirmDeleteId(null); }} className="bg-error/10 text-error px-4 py-2 rounded-full text-[10px] font-bold transition-all active:scale-95">Confirm Delete</button>
                        <button onClick={() => setConfirmDeleteId(null)} className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full text-[10px] font-bold transition-all active:scale-95">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmDeleteId(ev.id)}
                        className="ml-auto border border-outline-variant text-on-surface-variant hover:text-error hover:border-error px-4 py-2 rounded-full font-label-md text-[10px] font-bold transition-all active:scale-95 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">delete</span>Delete
                      </button>
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
