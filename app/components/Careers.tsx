"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const FALLBACK = [
  { id: "1", name: "Portugal",       country: "Portugal",       flag: "🇵🇹", is_active: true },
  { id: "2", name: "Norway",         country: "Norway",         flag: "🇳🇴", is_active: true },
  { id: "3", name: "Serbia",         country: "Serbia",         flag: "🇷🇸", is_active: true },
  { id: "4", name: "Lithuania",      country: "Lithuania",      flag: "🇱🇹", is_active: true },
  { id: "5", name: "Hungary",        country: "Hungary",        flag: "🇭🇺", is_active: true },
  { id: "6", name: "Czech Republic", country: "Czech Republic", flag: "🇨🇿", is_active: true },
];

function ApplyButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-apply"))}
      className="mt-10 inline-block rounded-full bg-[#f2a33c] px-10 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
    >
      Apply Now
    </button>
  );
}

export default function Careers() {
  const [countries, setCountries] = useState(FALLBACK);

  useEffect(() => {
    supabase.from("career_locations").select("*").eq("is_active", true).order("display_order")
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        // Merge DB rows with fallback so hardcoded countries always appear
        const dbCountries = data.map((c: { country: string }) => c.country);
        const extra = FALLBACK.filter((f) => !dbCountries.includes(f.country));
        setCountries([...data, ...extra]);
      });
  }, []);

  return (
    <section id="careers" className="overflow-hidden bg-[#f8fafc] py-12">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="relative overflow-hidden rounded-[3rem] bg-brand-navy p-12 lg:p-20">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#f2a33c]/20 blur-[100px]" />
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-[#f2a33c]">Work Abroad</span>
              <h2 className="text-3xl font-black leading-tight text-white lg:text-4xl">Job Opportunities Abroad</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                ETTA helps you find and secure employment in Europe. We currently have active job placement opportunities in{" "}
                {countries.map((c) => c.country).join(", ")}. Let us guide your journey.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {countries.map((c) => (
                  <span key={c.id} className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white">
                    <span className="text-lg">{c.flag}</span>
                    {c.country}
                  </span>
                ))}
              </div>
              <ApplyButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
