"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Send, CheckCircle2, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

/* All countries sorted A-Z with calling code */
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

function TextInput({ label, value, onChange, placeholder, optional, error }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; optional?: boolean; error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
        {label}
        {optional && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium normal-case tracking-normal text-gray-400">
            optional
          </span>
        )}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${
          error ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-[#f2a33c]"
        }`}
      />
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </div>
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

  /* ── Full-width success screen ── */
  if (done) {
    return (
      <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
        <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Orange top bar */}
          <div className="h-2 w-full bg-[#f2a33c]" />

          <div className="flex flex-col items-center px-10 py-10 text-center">
            {/* Animated ring + icon */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#f2a33c]/10" />
              <div className="absolute inset-3 rounded-full bg-[#f2a33c]/15" />
              <div className="absolute inset-5 rounded-full bg-[#f2a33c]/20" />
              <CheckCircle2 className="relative h-10 w-10 text-[#f2a33c]" />
            </div>

            <h3 className="text-2xl font-black text-[#0f1e3c]">
              Thank you, {submitted.name}!
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Your message has been received. We&apos;ll be in touch shortly.
            </p>

            {/* What happens next */}
            <div className="mt-7 w-full rounded-2xl bg-gray-50 p-5 text-left">
              <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-gray-400">
                What happens next
              </p>
              <ul className="space-y-3">
                {[
                  { step: "1", text: "Your message has been received by ETTA" },
                  { step: "2", text: "Our team reviews your enquiry within 24 hours" },
                  { step: "3", text: `We'll respond directly to ${submitted.email}` },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f2a33c] text-[11px] font-black text-white">
                      {step}
                    </span>
                    <span className="text-sm text-gray-600">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-xl bg-[#0f1e3c] py-3 text-sm font-bold text-white transition hover:bg-[#f2a33c]">
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedCountry = COUNTRY_LIST.find((c) => c.code === form.country);

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* No blur — clear background */}
      <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />

      <div className="relative flex w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left info panel */}
        <div className="hidden w-[42%] flex-col justify-between bg-[#0f1e3c] p-8 text-white sm:flex">
          <div>
            <Image src="/images/logo.png" alt="ETTA" width={44} height={44} className="mb-6" />
            <h2 className="text-2xl font-black leading-tight">
              Let&apos;s Plan <br />
              <span className="text-[#f2a33c]">Your Journey</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Fill in the form and our team will get back to you within 24 hours.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#f2a33c]" />
              <div className="text-xs leading-relaxed text-white/70">
                +250 785 316 178<br />+254 112 538 982<br />+1 817 500 3240
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f2a33c]" />
              <div className="text-xs leading-relaxed text-white/70">
                Kigali, Rwanda<br />Nairobi, Kenya
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Say Yes To New World!
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-1 flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 sm:hidden">
            <h2 className="font-black text-[#0f1e3c]">Contact Us</h2>
            <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Desktop close */}
          <button onClick={() => setOpen(false)}
            className="absolute right-4 top-4 hidden h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 sm:flex">
            <X className="h-4 w-4" />
          </button>

          <div className="flex-1 overflow-y-auto p-6">
            {done ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2a33c]/10">
                  <CheckCircle2 className="h-8 w-8 text-[#f2a33c]" />
                </div>
                <h3 className="text-xl font-black text-[#0f1e3c]">Message Sent!</h3>
                <p className="max-w-xs text-sm text-gray-500">
                  Thank you for reaching out. We&apos;ll be in touch soon.
                </p>
                <button onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-[#f2a33c] px-8 py-2.5 text-sm font-bold text-white transition hover:bg-[#e09230]">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {/* Names */}
                <div className="grid grid-cols-2 gap-3">
                  <TextInput label="First Name" value={form.first_name}
                    onChange={(v) => upd("first_name", v)} placeholder="John" error={errors.first_name} />
                  <TextInput label="Last Name" value={form.last_name}
                    onChange={(v) => upd("last_name", v)} placeholder="Doe" error={errors.last_name} />
                </div>

                <TextInput label="Middle Name" value={form.middle_name}
                  onChange={(v) => upd("middle_name", v)} placeholder="e.g. William" optional />

                <TextInput label="Email Address" value={form.email}
                  onChange={(v) => upd("email", v)} placeholder="you@example.com" error={errors.email} />

                {/* Country */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={(e) => upd("country", e.target.value)}
                    className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:bg-white focus:outline-none ${
                      errors.country ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"
                    }`}
                  >
                    <option value="">— Select your country —</option>
                    {COUNTRY_LIST.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name} (+{c.callingCode})
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{errors.country}</p>
                  )}
                  {selectedCountry && (
                    <p className="mt-1.5 text-xs text-gray-400">
                      Country code:{" "}
                      <span className="font-bold text-[#f2a33c]">+{selectedCountry.callingCode}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => upd("message", e.target.value)}
                    rows={3}
                    placeholder="Tell us how we can help you…"
                    className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${
                      errors.message ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-[#f2a33c]"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] font-medium text-red-500">{errors.message}</p>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2a33c] py-3.5 text-sm font-bold text-white transition hover:bg-[#e09230] disabled:opacity-60">
                  <Send className="h-4 w-4" />
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
