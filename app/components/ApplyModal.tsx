"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, CheckCircle2, BriefcaseIcon, User, Mail, FileText } from "lucide-react";
import PhoneInput, { getCountries, getCountryCallingCode, Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const COUNTRY_LIST = getCountries()
  .map((code) => ({
    code,
    name: new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code,
    callingCode: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const OPEN_POSITIONS = [
  { country: "Portugal",  flag: "🇵🇹" },
  { country: "Norway",    flag: "🇳🇴" },
  { country: "Serbia",    flag: "🇷🇸" },
  { country: "Lithuania", flag: "🇱🇹" },
];

type Form = {
  first_name: string; last_name: string; email: string;
  country: Country | ""; phone: string;
  applying_for: string; message: string; country_reason: string;
};
const EMPTY: Form = {
  first_name: "", last_name: "", email: "",
  country: "RW" as Country, phone: "",
  applying_for: "", message: "", country_reason: "",
};

/* ── Reusable sub-components ── */
function SectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
      <Icon className="h-3.5 w-3.5 text-[#f2a33c]" />
      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{title}</span>
    </div>
  );
}

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
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
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${
          error ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"
        }`}
      />
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </>
  );
}

function Textarea({ value, onChange, placeholder, rows = 3, error }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; error?: string;
}) {
  return (
    <>
      <textarea value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} rows={rows}
        className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${
          error ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"
        }`}
      />
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </>
  );
}

/* ── Main modal ── */
export default function ApplyModal() {
  const [open, setOpen]       = useState(false);
  const [form, setForm]       = useState<Form>(EMPTY);
  const [errors, setErrors]   = useState<Partial<Record<keyof Form, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [submitted, setSubmitted] = useState({ name: "", email: "", country: "", flag: "" });

  useEffect(() => {
    const handler = () => { setOpen(true); setDone(false); setForm(EMPTY); setErrors({}); };
    window.addEventListener("open-apply", handler);
    return () => window.removeEventListener("open-apply", handler);
  }, []);

  function upd<K extends keyof Form>(key: K, val: Form[K]) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }

  function handleCountry(code: Country | "") {
    upd("country", code);
    upd("phone", "");
  }

  function validate() {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.first_name.trim())  e.first_name    = "Required";
    if (!form.last_name.trim())   e.last_name     = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.country)            e.country       = "Select your country";
    if (!form.phone)              e.phone         = "Phone number required";
    if (!form.applying_for)       e.applying_for  = "Select a position";
    if (!form.message.trim())     e.message       = "Required";
    if (!form.country_reason.trim()) e.country_reason = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const countryName = COUNTRY_LIST.find((c) => c.code === form.country)?.name ?? form.country;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("job_applications") as any).insert({
      first_name:     form.first_name.trim(),
      last_name:      form.last_name.trim(),
      email:          form.email.trim(),
      country:        countryName,
      phone:          form.phone,
      applying_for:   form.applying_for,
      message:        form.message.trim(),
      country_reason: form.country_reason.trim(),
    });
    setLoading(false);
    if (!error) {
      const pos = OPEN_POSITIONS.find((p) => p.country === form.applying_for);
      setSubmitted({
        name: form.first_name.trim(),
        email: form.email.trim(),
        country: form.applying_for,
        flag: pos?.flag ?? "🌍",
      });
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
          <div className="h-2 w-full bg-[#f2a33c]" />

          <div className="flex flex-col items-center px-10 py-10 text-center">
            {/* Ring icon */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#f2a33c]/10" />
              <div className="absolute inset-3 rounded-full bg-[#f2a33c]/15" />
              <div className="absolute inset-5 rounded-full bg-[#f2a33c]/20" />
              <CheckCircle2 className="relative h-10 w-10 text-[#f2a33c]" />
            </div>

            <h3 className="text-2xl font-black text-[#0f1e3c]">
              Application Received, {submitted.name}!
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You&apos;ve taken the first step toward working in{" "}
              <span className="font-bold text-[#0f1e3c]">
                {submitted.flag} {submitted.country}
              </span>
              . ETTA will guide you from here.
            </p>

            {/* What happens next */}
            <div className="mt-7 w-full rounded-2xl bg-gray-50 p-5 text-left">
              <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-gray-400">
                What happens next
              </p>
              <ul className="space-y-3">
                {[
                  { step: "1", text: "ETTA reviews your application and profile" },
                  { step: "2", text: `We research available opportunities in ${submitted.country} that match your background` },
                  { step: "3", text: `We contact you at ${submitted.email} to discuss next steps` },
                  { step: "4", text: "ETTA supports you through the full placement process" },
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

            <p className="mt-5 text-xs text-gray-400">
              Say Yes To New World! — ETTA is with you every step of the way.
            </p>

            <button onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-xl bg-[#0f1e3c] py-3 text-sm font-bold text-white transition hover:bg-[#f2a33c]">
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedPos = OPEN_POSITIONS.find((p) => p.country === form.applying_for);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />

      <div className="relative flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* ── Left panel ── */}
        <div className="hidden w-[36%] flex-col justify-between bg-[#0f1e3c] p-7 text-white sm:flex">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2a33c]">
              <BriefcaseIcon className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-black leading-snug">
              Work Abroad <br />
              <span className="text-[#f2a33c]">with ETTA</span>
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              ETTA connects talented individuals with employment opportunities across Europe. Tell us where you want to work and we&apos;ll handle the rest.
            </p>

            <div className="mt-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
                We Place Talent In
              </p>
              <ul className="space-y-2">
                {OPEN_POSITIONS.map(({ country, flag }) => (
                  <li key={country}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                      form.applying_for === country
                        ? "bg-[#f2a33c] font-bold text-white"
                        : "text-white/70"
                    }`}>
                    <span className="text-base">{flag}</span>
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
            Say Yes To New World!
          </p>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex flex-1 flex-col">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h3 className="text-sm font-black text-[#0f1e3c]">Placement Request Form</h3>
              <p className="text-[11px] text-gray-400">All fields are required unless marked optional</p>
            </div>
            <button onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            {done ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2a33c]/10">
                  <CheckCircle2 className="h-8 w-8 text-[#f2a33c]" />
                </div>
                <h3 className="text-xl font-black text-[#0f1e3c]">Request Submitted!</h3>
                <p className="max-w-xs text-sm text-gray-500">
                  Thank you! ETTA will review your details and reach out to help you secure your opportunity abroad.
                </p>
                <button onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-[#f2a33c] px-8 py-2.5 text-sm font-bold text-white transition hover:bg-[#e09230]">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">

                {/* Section 1: Personal Info */}
                <div>
                  <SectionHeading icon={User} title="Personal Information" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel>First Name</FieldLabel>
                      <TextInput value={form.first_name} onChange={(v) => upd("first_name", v)} placeholder="John" error={errors.first_name} />
                    </div>
                    <div>
                      <FieldLabel>Last Name</FieldLabel>
                      <TextInput value={form.last_name} onChange={(v) => upd("last_name", v)} placeholder="Doe" error={errors.last_name} />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact */}
                <div>
                  <SectionHeading icon={Mail} title="Contact Details" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel>Email Address</FieldLabel>
                      <TextInput value={form.email} onChange={(v) => upd("email", v)} placeholder="you@example.com" error={errors.email} />
                    </div>
                    <div>
                      <FieldLabel>Phone Number</FieldLabel>
                      <div className={`overflow-hidden rounded-xl border bg-gray-50 transition focus-within:bg-white ${
                        errors.phone ? "border-red-300" : "border-gray-200 focus-within:border-[#f2a33c]"
                      }`}>
                        <PhoneInput international countryCallingCodeEditable={false}
                          country={(form.country || "RW") as Country}
                          value={form.phone} onChange={(val) => upd("phone", val ?? "")}
                          className="phone-input-custom px-4 py-2.5 text-sm" />
                      </div>
                      {errors.phone && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.phone}</p>}
                    </div>
                    <div className="col-span-2">
                      <FieldLabel>Country of Residence</FieldLabel>
                      <select value={form.country} onChange={(e) => handleCountry(e.target.value as Country | "")}
                        className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition focus:bg-white focus:outline-none ${
                          errors.country ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"
                        }`}>
                        <option value="">— Select country —</option>
                        {COUNTRY_LIST.map((c) => (
                          <option key={c.code} value={c.code}>{c.name} (+{c.callingCode})</option>
                        ))}
                      </select>
                      {errors.country && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.country}</p>}
                      {form.country && (
                        <p className="mt-1 text-xs text-gray-400">
                          Calling code: <span className="font-bold text-[#f2a33c]">+{getCountryCallingCode(form.country as Country)}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 3: Application */}
                <div>
                  <SectionHeading icon={FileText} title="Your Goals" />
                  <div className="space-y-3">
                    <div>
                      <FieldLabel>Country where you want to work</FieldLabel>
                      <select value={form.applying_for} onChange={(e) => upd("applying_for", e.target.value)}
                        className={`w-full rounded-xl border bg-gray-50 px-4 py-2.5 text-sm text-gray-900 transition focus:bg-white focus:outline-none ${
                          errors.applying_for ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"
                        }`}>
                        <option value="">— Select your preferred country —</option>
                        {OPEN_POSITIONS.map(({ country, flag }) => (
                          <option key={country} value={country}>{flag} {country}</option>
                        ))}
                      </select>
                      {errors.applying_for && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.applying_for}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <FieldLabel>Tell us about yourself</FieldLabel>
                        <Textarea value={form.message} onChange={(v) => upd("message", v)} rows={3}
                          placeholder="Your background, skills, work experience, and what kind of job you are looking for…"
                          error={errors.message} />
                      </div>
                      <div>
                        <FieldLabel>
                          Why {selectedPos ? `${selectedPos.flag} ${selectedPos.country}` : "this country"}?
                        </FieldLabel>
                        <Textarea value={form.country_reason} onChange={(v) => upd("country_reason", v)} rows={3}
                          placeholder={`What is your reason for choosing ${selectedPos?.country ?? "this country"}? Any personal, professional, or cultural connections?`}
                          error={errors.country_reason} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Terms */}
                <div className="rounded-xl bg-[#f2a33c]/5 border border-[#f2a33c]/20 px-4 py-3 text-xs text-gray-500">
                  By submitting this form you allow ETTA to use your information to match you with job opportunities abroad and contact you regarding your request.
                </div>

                <button type="submit" disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f1e3c] py-3.5 text-sm font-bold text-white transition hover:bg-[#f2a33c] disabled:opacity-60">
                  <BriefcaseIcon className="h-4 w-4" />
                  {loading ? "Submitting…" : "Request ETTA's Assistance"}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
