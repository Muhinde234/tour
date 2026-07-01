"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Send, CheckCircle2 } from "lucide-react";

type Field = { first_name: string; middle_name: string; last_name: string; email: string; message: string };
const EMPTY: Field = { first_name: "", middle_name: "", last_name: "", email: "", message: "" };

function Input({ label, value, onChange, placeholder, optional }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; optional?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
        {optional && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium normal-case tracking-normal text-gray-400">optional</span>}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-[#f2a33c] focus:bg-white focus:outline-none"
      />
    </div>
  );
}

export default function ContactModal() {
  const [open, setOpen]     = useState(false);
  const [form, setForm]     = useState<Field>(EMPTY);
  const [errors, setErrors] = useState<Partial<Field>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]     = useState(false);

  /* Listen for custom event dispatched from Header / any CTA */
  useEffect(() => {
    const handler = () => { setOpen(true); setDone(false); setForm(EMPTY); setErrors({}); };
    window.addEventListener("open-contact", handler);
    return () => window.removeEventListener("open-contact", handler);
  }, []);

  function upd(key: keyof Field, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }

  function validate() {
    const e: Partial<Field> = {};
    if (!form.first_name.trim()) e.first_name = "Required";
    if (!form.last_name.trim())  e.last_name  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim())    e.message    = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      first_name:  form.first_name.trim(),
      middle_name: form.middle_name.trim(),
      last_name:   form.last_name.trim(),
      email:       form.email.trim(),
      message:     form.message.trim(),
    });
    setLoading(false);
    if (!error) { setDone(true); setForm(EMPTY); }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-3xl bg-[#0f1e3c] px-6 py-5 text-white">
          <div>
            <h2 className="text-lg font-black">Get In Touch</h2>
            <p className="text-xs text-white/50">We typically reply within 24 hours.</p>
          </div>
          <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="h-14 w-14 text-[#f2a33c]" />
              <h3 className="text-xl font-black text-[#0f1e3c]">Message Sent!</h3>
              <p className="text-sm text-gray-500">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
              <button onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-[#f2a33c] px-8 py-2.5 text-sm font-bold text-white transition hover:bg-[#e09230]">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {/* Names row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input label="First Name" value={form.first_name} onChange={(v) => upd("first_name", v)} placeholder="John" />
                  {errors.first_name && <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>}
                </div>
                <div>
                  <Input label="Last Name" value={form.last_name} onChange={(v) => upd("last_name", v)} placeholder="Doe" />
                  {errors.last_name && <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>}
                </div>
              </div>

              <Input label="Middle Name" value={form.middle_name} onChange={(v) => upd("middle_name", v)} placeholder="Optional" optional />

              <div>
                <Input label="Email" value={form.email} onChange={(v) => upd("email", v)} placeholder="you@example.com" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => upd("message", e.target.value)}
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-[#f2a33c] focus:bg-white focus:outline-none"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2a33c] py-3 text-sm font-bold text-white transition hover:bg-[#e09230] disabled:opacity-60">
                <Send className="h-4 w-4" />
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
