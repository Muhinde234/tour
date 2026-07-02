"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Send, CheckCircle2, User, Map } from "lucide-react";
import Image from "next/image";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

const COUNTRY_LIST = getCountries()
  .map((code) => ({
    code,
    name: new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code,
    callingCode: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

type Option = { id: string; name: string };
type FormData = {
  first_name: string; last_name: string; email: string; country: string;
  destination: string; trip_type: string; message: string;
};
const EMPTY: FormData = { first_name: "", last_name: "", email: "", country: "RW", destination: "", trip_type: "", message: "" };

function SectionHeading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
      <Icon className="h-3.5 w-3.5 text-[#f2a33c]" />
      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{title}</span>
    </div>
  );
}
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-400">{children}</label>;
}
function TextInput({ value, onChange, placeholder, error }: { value: string; onChange: (v: string) => void; placeholder?: string; error?: string }) {
  return (
    <>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${error ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"}`}
      />
      {error && <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>}
    </>
  );
}

export default function PlanTripModal() {
  const [open, setOpen]       = useState(false);
  const [step, setStep]       = useState(1);
  const [form, setForm]       = useState<FormData>(EMPTY);
  const [errors, setErrors]   = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [submitted, setSubmitted] = useState({ name: "", email: "" });
  const [destinations, setDestinations] = useState<Option[]>([]);
  const [tripTypes, setTripTypes]       = useState<Option[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("trip_destinations") as any).select("id,name").eq("is_active", true).order("display_order").then(({ data }: any) => { if (data) setDestinations(data); });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("trip_types") as any).select("id,name").eq("is_active", true).order("display_order").then(({ data }: any) => { if (data) setTripTypes(data); });
  }, []);

  useEffect(() => {
    const handler = () => { setOpen(true); setDone(false); setStep(1); setForm(EMPTY); setErrors({}); };
    window.addEventListener("open-plan-trip", handler);
    return () => window.removeEventListener("open-plan-trip", handler);
  }, []);

  function upd(key: keyof FormData, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }

  function validateStep1() {
    const e: Partial<FormData> = {};
    if (!form.first_name.trim()) e.first_name = "Required";
    if (!form.last_name.trim())  e.last_name  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.country)           e.country    = "Select your country";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function validateStep2() {
    const e: Partial<FormData> = {};
    if (!form.destination) e.destination = "Select a destination";
    if (!form.trip_type)   e.trip_type   = "Select a trip type";
    if (!form.message.trim()) e.message  = "Please add more details";
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    const countryName = COUNTRY_LIST.find((c) => c.code === form.country)?.name ?? form.country;
    const { error } = await supabase.from("contact_messages").insert({
      first_name:  form.first_name.trim(),
      last_name:   form.last_name.trim(),
      email:       form.email.trim(),
      country:     countryName,
      destination: form.destination,
      trip_type:   form.trip_type,
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
            <h3 className="text-2xl font-black text-[#0f1e3c]">Trip Request Sent, {submitted.name}!</h3>
            <p className="mt-2 text-sm text-gray-500">Our travel specialists will craft your personalised itinerary and be in touch shortly.</p>
            <div className="mt-7 w-full rounded-2xl bg-gray-50 p-5 text-left">
              <p className="mb-4 text-[11px] font-black uppercase tracking-widest text-gray-400">What happens next</p>
              <ul className="space-y-3">
                {["Trip request received by ETTA", "Our travel specialist reviews your destination and preferences", `We respond to ${submitted.email} with a personalised itinerary`].map((text, i) => (
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
        <div className="hidden w-[38%] flex-col justify-between bg-[#0f1e3c] p-7 text-white sm:flex">
          <div>
            <Image src="/images/logo.png" alt="ETTA" width={40} height={40} className="mb-5" />
            <h2 className="text-xl font-black leading-tight">Plan Your<br /><span className="text-[#f2a33c]">Perfect Trip</span></h2>
            <p className="mt-2 text-xs leading-relaxed text-white/60">Tell us your dream destination and we&apos;ll craft a personalised itinerary just for you.</p>
            <div className="mt-6 space-y-2">
              {[{ n: 1, label: "Personal Info", desc: "Your name & contact" }, { n: 2, label: "Trip Details", desc: "Destination & trip type" }].map(({ n, label, desc }) => (
                <div key={n} className={`flex items-center gap-3 rounded-xl p-3 transition ${step === n ? "bg-[#f2a33c]/20" : "opacity-40"}`}>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${step === n ? "bg-[#f2a33c] text-white" : "bg-white/10 text-white"}`}>{n}</span>
                  <div><p className="text-sm font-bold">{label}</p><p className="text-[10px] text-white/50">{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">Say Yes To New World!</p>
        </div>

        {/* Right panel */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 sm:hidden">
            <h2 className="font-black text-[#0f1e3c]">Plan My Trip</h2>
            <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"><X className="h-4 w-4 text-gray-500" /></button>
          </div>
          <button onClick={() => setOpen(false)} className="absolute right-4 top-4 hidden h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 sm:flex"><X className="h-4 w-4" /></button>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <form onSubmit={submit} className="flex flex-col gap-5">
              {/* Progress */}
              <div className="flex items-center gap-3">
                {[1, 2].map((s) => (
                  <div key={s} className="flex flex-1 flex-col gap-1">
                    <div className={`h-1.5 rounded-full transition-all ${s <= step ? "bg-[#f2a33c]" : "bg-gray-200"}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${s === step ? "text-[#f2a33c]" : "text-gray-300"}`}>{s === 1 ? "Personal Info" : "Trip Details"}</span>
                  </div>
                ))}
                <span className="shrink-0 text-xs text-gray-400">{step} / 2</span>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <SectionHeading icon={User} title="Personal Information" />
                    <div className="grid grid-cols-2 gap-3">
                      <div><FieldLabel>First Name</FieldLabel><TextInput value={form.first_name} onChange={(v) => upd("first_name", v)} placeholder="John" error={errors.first_name} /></div>
                      <div><FieldLabel>Last Name</FieldLabel><TextInput value={form.last_name} onChange={(v) => upd("last_name", v)} placeholder="Doe" error={errors.last_name} /></div>
                    </div>
                    <div className="mt-3"><FieldLabel>Email</FieldLabel><TextInput value={form.email} onChange={(v) => upd("email", v)} placeholder="you@example.com" error={errors.email} /></div>
                    <div className="mt-3">
                      <FieldLabel>Country</FieldLabel>
                      <select value={form.country} onChange={(e) => upd("country", e.target.value)}
                        className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:bg-white focus:outline-none ${errors.country ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"}`}>
                        <option value="">— Select country —</option>
                        {COUNTRY_LIST.map((c) => <option key={c.code} value={c.code}>{c.name} (+{c.callingCode})</option>)}
                      </select>
                      {errors.country && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.country}</p>}
                      {form.country && <p className="mt-1 text-xs text-gray-400">Country code: <span className="font-bold text-[#f2a33c]">+{getCountryCallingCode(form.country as Parameters<typeof getCountryCallingCode>[0])}</span></p>}
                    </div>
                  </div>
                  <button type="button" onClick={() => { if (validateStep1()) { setStep(2); setErrors({}); } }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2a33c] py-3.5 text-sm font-bold text-white transition hover:bg-[#0f1e3c]">
                    Next — Trip Details →
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <SectionHeading icon={Map} title="Trip Details" />
                    <div className="space-y-3">
                      <div>
                        <FieldLabel>Where do you want to go?</FieldLabel>
                        <select value={form.destination} onChange={(e) => upd("destination", e.target.value)}
                          className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 transition focus:bg-white focus:outline-none ${errors.destination ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"}`}>
                          <option value="">— Select destination —</option>
                          {destinations.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                        {errors.destination && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.destination}</p>}
                      </div>
                      <div>
                        <FieldLabel>What kind of trip?</FieldLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {tripTypes.map((type) => (
                            <button key={type.id} type="button" onClick={() => upd("trip_type", type.name)}
                              className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${form.trip_type === type.name ? "border-[#f2a33c] bg-[#f2a33c]/10 text-[#f2a33c]" : "border-gray-200 bg-gray-50 text-gray-600 hover:border-[#f2a33c]/50"}`}>
                              {type.name}
                            </button>
                          ))}
                        </div>
                        {errors.trip_type && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.trip_type}</p>}
                      </div>
                      <div>
                        <FieldLabel>Tell us more</FieldLabel>
                        <textarea value={form.message} onChange={(e) => upd("message", e.target.value)} rows={3}
                          placeholder="Dates, group size, budget, special requirements…"
                          className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:bg-white focus:outline-none ${errors.message ? "border-red-300" : "border-gray-200 focus:border-[#f2a33c]"}`}
                        />
                        {errors.message && <p className="mt-1 text-[11px] font-medium text-red-500">{errors.message}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => { setStep(1); setErrors({}); }} className="rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">← Back</button>
                    <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 rounded-full bg-[#f2a33c] py-3 text-sm font-bold text-white transition hover:bg-[#0f1e3c] disabled:opacity-60">
                      <Send className="h-4 w-4" />{loading ? "Sending…" : "Send Request"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
