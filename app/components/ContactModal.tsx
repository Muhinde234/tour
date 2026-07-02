"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Send, CheckCircle2, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

const COUNTRY_LIST = getCountries()
  .map((code) => ({
    code,
    name: new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code,
    callingCode: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

type FormData = {
  first_name: string; middle_name: string; last_name: string;
  email: string; country: string; message: string;
};
const EMPTY: FormData = {
  first_name: "", middle_name: "", last_name: "",
  email: "", country: "RW", message: "",
};

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
      {children}
      {optional && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium normal-case tracking-normal text-gray-400">optional</span>}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, error }: {
  value: string; onChange: (v: string) => void; placeholder?: string; error?: string;
}) {
  return (
    <>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${
          error ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-[#f2a33c]"
        }`}
      />
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </>
  );
}

export default function ContactModal() {
  const [open, setOpen]       = useState(false);
  const [form, setForm]       = useState<FormData>(EMPTY);
  const [errors, setErrors]   = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [submitted, setSubmitted] = useState({ name: "", email: "" });

  useEffect(() => {
    const handler = () => { setOpen(true); setDone(false); setForm(EMPTY); setErrors({}); };
    window.addEventListener("open-contact", handler);
    return () => window.removeEventListener("open-contact", handler);
  }, []);

  function upd(key: keyof FormData, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }

  function validate() {
    const e: Partial<FormData> = {};
    if (!form.first_name.trim()) e.first_name = "Required";
    if (!form.last_name.trim())  e.last_name  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.country)           e.country    = "Please select your country";
    if (!form.message.trim())    e.message    = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const countryName = COUNTRY_LIST.find((c) => c.code === form.country)?.name ?? form.country;
    const { error } = await supabase.from("contact_messages").insert({
      first_name:  form.first_name.trim(),
      middle_name: form.middle_name.trim(),
      last_name:   form.last_name.trim(),
      email:       form.email.trim(),
      country:     countryName,
      message:     form.message.trim(),
    });
    setLoading(false);
    if (!error) {
      setSubmitted({ name: form.first_name.trim(), email: form.email.trim() });
      setDone(true);
      setForm(EMPTY);
    }
  }

  if (!open) return null;

  /* Success screen */
  if (done) {
    return (
      <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="h-2 w-full bg-[#f2a33c]" />
          <div className="flex flex-col items-center px-10 py-10 text-center">
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#f2a33c]/10" />
              <div className="absolute inset-3 rounded-full bg-[#f2a33c]/15" />
              <div className="absolute inset-5 rounded-full bg-[#f2a33c]/20" />
              <CheckCircle2 className="relative h-10 w-10 text-[#f2a33c]" />
            </div>
            <h3 className="text-2xl font-black text-[#0f1e3c]">Thank you, {submitted.name}!</h3>
            <p className="mt-2 text-sm text-gray-500">Your message has been received. We&apos;ll be in touch shortly.</p>
            <div className="mt-7 w-full rounded-2xl bg-gray-50 p-5 text-left">
              <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-gray-400">What happens next</p>
              <ul className="space-y-3">
                {["Your message has been received by ETTA", "Our team reviews your enquiry within 24 hours", `We'll respond directly to ${submitted.email}`].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2a33c] text-[11px] font-black text-white">{i + 1}</span>
                    <span className="text-sm text-gray-600">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setOpen(false)} className="mt-6 w-full rounded-xl bg-[#0f1e3c] py-3 text-sm font-bold text-white transition hover:bg-[#f2a33c]">Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
      <div className="relative flex w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left panel */}
        <div className="hidden w-[42%] flex-col justify-between bg-[#0f1e3c] p-8 text-white sm:flex">
          <div>
            <Image src="/images/logo.png" alt="ETTA" width={44} height={44} className="mb-6" />
            <h2 className="text-2xl font-black leading-tight">Get In Touch<br /><span className="text-[#f2a33c]">With ETTA</span></h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">We typically reply within 24 hours.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#f2a33c]" /><div className="text-xs leading-relaxed text-white/70">+250 785 316 178<br />+254 112 538 982<br />+1 817 500 3240</div></div>
            <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f2a33c]" /><div className="text-xs leading-relaxed text-white/70">Kigali, Rwanda<br />Nairobi, Kenya</div></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Say Yes To New World!</p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 sm:hidden">
            <h2 className="font-black text-[#0f1e3c]">Contact Us</h2>
            <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"><X className="h-4 w-4 text-gray-500" /></button>
          </div>
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 hidden h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 sm:flex"><X className="h-4 w-4" /></button>

          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><FieldLabel>First Name</FieldLabel><TextInput value={form.first_name} onChange={(v) => upd("first_name", v)} placeholder="John" error={errors.first_name} /></div>
                <div><FieldLabel>Last Name</FieldLabel><TextInput value={form.last_name} onChange={(v) => upd("last_name", v)} placeholder="Doe" error={errors.last_name} /></div>
              </div>
              <div><FieldLabel optional>Middle Name</FieldLabel><TextInput value={form.middle_name} onChange={(v) => upd("middle_name", v)} placeholder="e.g. William" /></div>
              <div><FieldLabel>Email Address</FieldLabel><TextInput value={form.email} onChange={(v) => upd("email", v)} placeholder="you@example.com" error={errors.email} /></div>
              <div>
                <FieldLabel>Country</FieldLabel>
                <select value={form.country} onChange={(e) => upd("country", e.target.value)}
                  className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:bg-white focus:outline-none ${errors.country ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"}`}>
                  <option value="">— Select country —</option>
                  {COUNTRY_LIST.map((c) => <option key={c.code} value={c.code}>{c.name} (+{c.callingCode})</option>)}
                </select>
                {errors.country && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.country}</p>}
                {form.country && <p className="mt-1 text-xs text-gray-400">Country code: <span className="font-bold text-[#f2a33c]">+{getCountryCallingCode(form.country as Parameters<typeof getCountryCallingCode>[0])}</span></p>}
              </div>
              <div>
                <FieldLabel>Message</FieldLabel>
                <textarea value={form.message} onChange={(e) => upd("message", e.target.value)} rows={4} placeholder="How can we help you?"
                  className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${errors.message ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"}`}
                />
                {errors.message && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.message}</p>}
              </div>
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2a33c] py-3.5 text-sm font-bold text-white transition hover:bg-[#0f1e3c] disabled:opacity-60">
                <Send className="h-4 w-4" />{loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
