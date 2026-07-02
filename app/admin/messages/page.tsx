"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Trash2, MailOpen, MapPin, Clock, Reply } from "lucide-react";
import { PageHeader, Toast } from "../_components/ui";

type Message = {
  id: string; first_name: string; middle_name: string; last_name: string;
  email: string; country: string; message: string;
  is_read: boolean; created_at: string;
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading]   = useState(true);
  const [toast, setToast]       = useState("");

  const notify = useCallback((msg: string) => {
    setToast(msg); setTimeout(() => setToast(""), 3000);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("contact_messages") as any)
      .select("*").order("created_at", { ascending: false })
      .then(({ data }: { data: Message[] }) => {
        if (data) setMessages(data);
        setLoading(false);
      });
  }, []);

  async function markRead(msg: Message) {
    if (msg.is_read) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("contact_messages") as any).update({ is_read: true }).eq("id", msg.id);
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, is_read: true } : m));
  }

  async function remove(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("contact_messages") as any).delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    notify("Message deleted.");
  }

  function open(msg: Message) {
    setSelected(msg);
    markRead(msg);
  }

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col">
      <PageHeader
        title="Contact Messages"
        description={unread > 0 ? `${unread} unread message${unread > 1 ? "s" : ""}` : "All messages read"}
      />

      {loading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-gray-400">
          <Mail className="h-10 w-10 opacity-30" />
          <p className="text-sm">No messages yet. They will appear here once someone submits the contact form.</p>
        </div>
      ) : (
        <div className="flex flex-1 gap-4 overflow-hidden">

          {/* List */}
          <div className="flex w-72 shrink-0 flex-col gap-2 overflow-y-auto">
            {messages.map((msg) => (
              <button key={msg.id} onClick={() => open(msg)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selected?.id === msg.id
                    ? "border-[#f2a33c] bg-[#f2a33c]/5"
                    : msg.is_read
                    ? "border-gray-100 bg-white hover:bg-gray-50"
                    : "border-[#f2a33c]/30 bg-white shadow-sm"
                }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {!msg.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-[#f2a33c]" />}
                    <p className={`text-sm ${msg.is_read ? "font-medium text-gray-700" : "font-black text-[#0f1e3c]"}`}>
                      {msg.first_name} {msg.last_name}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{timeAgo(msg.created_at)}</span>
                </div>
                <p className="mt-1 truncate text-xs text-gray-400">{msg.email}</p>
                <p className="mt-1.5 line-clamp-2 text-xs text-gray-500">{msg.message}</p>
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
                    <h2 className="text-xl font-black text-[#0f1e3c]">
                      {selected.first_name} {selected.middle_name ? selected.middle_name + " " : ""}{selected.last_name}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{selected.email}</span>
                      {selected.country && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{selected.country}</span>}
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(selected.created_at).toLocaleString()}</span>
                      <span className="flex items-center gap-1">
                        {selected.is_read
                          ? <><MailOpen className="h-3 w-3 text-green-500" /><span className="text-green-500">Read</span></>
                          : <><Mail className="h-3 w-3 text-[#f2a33c]" /><span className="text-[#f2a33c]">Unread</span></>}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => remove(selected.id)}
                    className="flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-100">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>

                {/* Message */}
                <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">Message</p>
                  <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{selected.message}</p>
                </div>

                {/* Reply */}
                <a href={`mailto:${selected.email}?subject=Re: Your enquiry to EMMA TOUR AND TRAVEL AGENCY`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2a33c] py-3 text-sm font-bold text-white transition hover:bg-[#0f1e3c]">
                  <Reply className="h-4 w-4" />
                  Reply via Email
                </a>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                Select a message to read it
              </div>
            )}
          </div>
        </div>
      )}

      <Toast message={toast} />
    </div>
  );
}
