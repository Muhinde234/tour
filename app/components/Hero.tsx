"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const DEFAULT = {
  tagline: "Say Yes To New World!",
  title: "Your Trusted Partner in Tourism & Education Consultancy",
  subtitle:
    "ETTA crafts unforgettable travel experiences and facilitates life-changing study abroad opportunities — with a passion for exploration and a commitment to educational excellence.",
  cta_primary_text: "Start Your Journey",
  cta_secondary_text: "Learn More",
};

export default function Hero() {
  const [h, setH] = useState(DEFAULT);

  useEffect(() => {
    supabase
      .from("hero_section")
      .select("*")
      .eq("id", "main")
      .single()
      .then(({ data }) => { if (data) setH(data); });
  }, []);

  return (
    <section id="top" className="relative isolate h-screen overflow-hidden">
      <video
        autoPlay muted loop playsInline preload="auto"
        poster="/images/hero-santorini.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-linear-to-b from-brand-navy/50 via-brand-navy/60 to-brand-navy/80" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-brand-orange">
          {h.tagline}
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          {h.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85">{h.subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new Event("open-plan-trip"))}
            className="rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-white hover:text-brand-navy"
          >
            {h.cta_primary_text}
          </button>
          <a
            href="#about"
            className="rounded-full border border-white/60 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {h.cta_secondary_text}
          </a>
        </div>
      </div>
    </section>
  );
}
