"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Briefcase, Trash2, MailOpen, Mail, MapPin, Clock, Reply, Phone, Globe, FileDown } from "lucide-react";
import { PageHeader, Toast } from "../_components/ui";

type Application = {
  id: string; first_name: string; last_name: string; email: string;
  country: string; phone: string; applying_for: string;
  message: string; country_reason: string; document_url: string;
  is_read: boolean; created_at: string;
};

const FLAGS: Record<string, string> = {
  Portugal: "🇵🇹", Norway: "🇳🇴", Serbia: "🇷🇸", Lithuania: "🇱🇹",
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ApplicationsPage() {
  const [apps, setApps]         = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState("");

  const notify = useCallback((msg: string) => {
    setToast(msg); setTimeout(() => setToast(""), 3000);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("job_applications") as any)
      .select("*").order("created_at", { ascending: false })
      .then(({ data }: { data: Application[] }) => {
        if (data) setApps(data);
        setLoading(false);
      });
  }, []);

  async function markRead(app: Application) {
    if (app.is_read) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("job_applications") as any).update({ is_read: true }).eq("id", app.id);
    setApps((prev) => prev.map((a) => a.id === app.id ? { ...a, is_read: true } : a));
  }

  async function remove(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("job_applications") as any).delete().eq("id", id);
    setApps((prev) => prev.filter((a) => a.id !== id));
    if (selected?.id === id) setSelected(null);
    notify("Application deleted.");
  }

  function open(app: Application) {
    setSelected(app);
    markRead(app);
  }

  const unread = apps.filter((a) => !a.is_read).length;

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col">
      <PageHeader
        title="Job Applications"
        description={unread > 0 ? `${unread} new application${unread > 1 ? "s" : ""} to review` : "All applications reviewed"}
      />

      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : apps.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-gray-400">
          <Briefcase className="h-10 w-10 opacity-30" />
          <p className="text-sm">No applications yet. They will appear here once someone submits the placement request form.</p>
        </div>
      ) : (
        <div className="flex flex-1 gap-4 overflow-hidden">

          {/* List */}
          <div className="flex w-72 shrink-0 flex-col gap-2 overflow-y-auto">
            {apps.map((app) => (
              <button key={app.id} onClick={() => open(app)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selected?.id === app.id
                    ? "border-[#f2a33c] bg-[#f2a33c]/5"
                    : app.is_read
                    ? "border-gray-100 bg-white hover:bg-gray-50"
                    : "border-[#f2a33c]/30 bg-white shadow-sm"
                }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!app.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-[#f2a33c]" />}
                    <p className={`text-sm ${app.is_read ? "font-medium text-gray-700" : "font-black text-[#0f1e3c]"}`}>
                      {app.first_name} {app.last_name}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{timeAgo(app.created_at)}</span>
                </div>
                {app.applying_for && (
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#f2a33c]/10 px-2 py-0.5 text-[11px] font-bold text-[#f2a33c]">
                    {FLAGS[app.applying_for] ?? "🌍"} {app.applying_for}
                  </span>
                )}
                <p className="mt-1 truncate text-xs text-gray-400">{app.email}</p>
              </button>
            ))}
          </div>

          {/* Detail pane */}
          <div className="flex-1 overflow-y-auto">
            {selected ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-black text-[#0f1e3c]">
                        {selected.first_name} {selected.last_name}
                      </h2>
                      {selected.applying_for && (
                        <span className="rounded-full bg-[#f2a33c] px-3 py-1 text-xs font-bold text-white">
                          {FLAGS[selected.applying_for] ?? "🌍"} {selected.applying_for}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{selected.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{selected.phone}</span>
                      {selected.country && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{selected.country}</span>}
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(selected.created_at).toLocaleString()}</span>
                      <span className="flex items-center gap-1">
                        {selected.is_read
                          ? <><MailOpen className="h-3 w-3 text-green-500" /><span className="text-green-500">Reviewed</span></>
                          : <><Mail className="h-3 w-3 text-[#f2a33c]" /><span className="text-[#f2a33c]">New</span></>}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => remove(selected.id)}
                    className="flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-100">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>

                {/* Details grid */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="mb-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      <Globe className="h-3 w-3" /> About the Applicant
                    </p>
                    <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{selected.message || "—"}</p>
                  </div>
                  <div className="rounded-2xl bg-[#f2a33c]/5 p-5">
                    <p className="mb-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#f2a33c]">
                      {FLAGS[selected.applying_for] ?? "🌍"} Why {selected.applying_for}?
                    </p>
                    <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{selected.country_reason || "—"}</p>
                  </div>
                </div>

                {/* Document */}
                {selected.document_url && (
                  <a
                    href={selected.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#f2a33c]/30 bg-[#f2a33c]/5 py-3 text-sm font-bold text-[#f2a33c] transition hover:bg-[#f2a33c]/10"
                  >
                    <FileDown className="h-4 w-4" />
                    View / Download Supporting Document
                  </a>
                )}

                {/* Reply */}
                <a
                  href={`mailto:${selected.email}?subject=Your ETTA Placement Application — ${selected.applying_for}&body=Dear ${selected.first_name},%0A%0AThank you for your application to work in ${selected.applying_for} through ETTA.`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2a33c] py-3 text-sm font-bold text-white transition hover:bg-[#0f1e3c]">
                  <Reply className="h-4 w-4" />
                  Reply to {selected.first_name} via Email
                </a>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                Select an application to review it
              </div>
            )}
          </div>
        </div>
      )}

      <Toast message={toast} />
    </div>
  );
}
