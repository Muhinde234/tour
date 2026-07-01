"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Send, CheckCircle2, BriefcaseIcon } from "lucide-react";
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
  Country,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

/* Build sorted country list from library */
const COUNTRY_LIST = getCountries()
  .map((code) => ({
    code,
    name: new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code,
    callingCode: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

type Form = {
  first_name: string;
  last_name: string;
  email: string;
  country: Country | "";
  phone: string;
  message: string;
};
const EMPTY: Form = { first_name: "", last_name: "", email: "", country: "", phone: "", message: "" };

function Label({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
      {children}
      {optional && (
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium normal-case tracking-normal text-gray-400">
          optional
        </span>
      )}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, error }: {
  value: string; onChange: (v: string) => void; placeholder?: string; error?: string;
}) {
  return (
    <>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${
          error ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-[#f2a33c]"
        }`}
      />
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </>
  );
}

export default function ApplyModal() {
  const [open, setOpen]       = useState(false);
  const [form, setForm]       = useState<Form>(EMPTY);
  const [errors, setErrors]   = useState<Partial<Record<keyof Form, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    const handler = () => { setOpen(true); setDone(false); setForm(EMPTY); setErrors({}); };
    window.addEventListener("open-apply", handler);
    return () => window.removeEventListener("open-apply", handler);
  }, []);

  function upd<K extends keyof Form>(key: K, val: Form[K]) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }

  /* When country changes, reset phone so PhoneInput re-derives the prefix */
  function handleCountry(code: Country | "") {
    upd("country", code);
    upd("phone", "");
  }

  function validate() {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.first_name.trim()) e.first_name = "Required";
    if (!form.last_name.trim())  e.last_name  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.country)           e.country    = "Please select your country";
    if (!form.phone)             e.phone      = "Phone number required";
    if (!form.message.trim())    e.message    = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabase.from("job_applications").insert({
      first_name: form.first_name.trim(),
      last_name:  form.last_name.trim(),
      email:      form.email.trim(),
      country:    form.country
        ? (new Intl.DisplayNames(["en"], { type: "region" }).of(form.country) ?? form.country)
        : "",
      phone:   form.phone,
      message: form.message.trim(),
    });
    setLoading(false);
    if (!error) { setDone(true); setForm(EMPTY); }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" onClick={() => setOpen(false)} />

      <div className="relative flex w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Left info panel */}
        <div className="hidden w-[38%] flex-col justify-between bg-[#0f1e3c] p-8 text-white sm:flex">
          <div>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2a33c]">
              <BriefcaseIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-black leading-tight">
              Join Our <br />
              <span className="text-[#f2a33c]">Global Team</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              We are currently hiring travel and education consultants in:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[["🇵🇹","Portugal"],["🇳🇴","Norway"],["🇷🇸","Serbia"],["🇱🇹","Lithuania"]].map(([flag, name]) => (
                <li key={name} className="flex items-center gap-2 text-white/80">
                  <span className="text-base">{flag}</span>{name}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            Say Yes To New World!
          </p>
        </div>

        {/* Right form panel */}
        <div className="flex flex-1 flex-col">
          <button onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200">
            <X className="h-4 w-4" />
          </button>

          <div className="flex-1 overflow-y-auto p-6">
            {done ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2a33c]/10">
                  <CheckCircle2 className="h-8 w-8 text-[#f2a33c]" />
                </div>
                <h3 className="text-xl font-black text-[#0f1e3c]">Application Sent!</h3>
                <p className="max-w-xs text-sm text-gray-500">
                  Thank you for applying. We&apos;ll review your application and get back to you soon.
                </p>
                <button onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-[#f2a33c] px-8 py-2.5 text-sm font-bold text-white transition hover:bg-[#e09230]">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <p className="mb-2 text-base font-black text-[#0f1e3c] sm:hidden">Apply Now</p>

                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>First Name</Label>
                    <TextInput value={form.first_name} onChange={(v) => upd("first_name", v)} placeholder="John" error={errors.first_name} />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <TextInput value={form.last_name} onChange={(v) => upd("last_name", v)} placeholder="Doe" error={errors.last_name} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label>Email Address</Label>
                  <TextInput value={form.email} onChange={(v) => upd("email", v)} placeholder="you@example.com" error={errors.email} />
                </div>

                {/* Country selector */}
                <div>
                  <Label>Country of Residence</Label>
                  <select
                    value={form.country}
                    onChange={(e) => handleCountry(e.target.value as Country | "")}
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
                  {errors.country && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.country}</p>}

                  {/* Calling code badge */}
                  {form.country && (
                    <p className="mt-1.5 text-xs text-gray-400">
                      Country code: <span className="font-bold text-[#f2a33c]">+{getCountryCallingCode(form.country as Country)}</span>
                    </p>
                  )}
                </div>

                {/* Phone with auto country code */}
                <div>
                  <Label>Phone Number</Label>
                  <div className={`overflow-hidden rounded-xl border bg-gray-50 transition focus-within:bg-white ${
                    errors.phone ? "border-red-300" : "border-gray-200 focus-within:border-[#f2a33c]"
                  }`}>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      country={(form.country || "RW") as Country}
                      value={form.phone}
                      onChange={(val) => upd("phone", val ?? "")}
                      className="phone-input-custom px-4 py-3 text-sm"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <Label>Why do you want to join ETTA?</Label>
                  <textarea
                    value={form.message}
                    onChange={(e) => upd("message", e.target.value)}
                    rows={3}
                    placeholder="Tell us about yourself and your experience…"
                    className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${
                      errors.message ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"
                    }`}
                  />
                  {errors.message && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.message}</p>}
                </div>

                <button type="submit" disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2a33c] py-3.5 text-sm font-bold text-white transition hover:bg-[#e09230] disabled:opacity-60">
                  <Send className="h-4 w-4" />
                  {loading ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
