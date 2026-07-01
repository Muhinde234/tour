"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Input, Textarea, SaveButton, Toast, PageHeader } from "../_components/ui";

type Hero = { id: string; tagline: string; title: string; subtitle: string; cta_primary_text: string; cta_secondary_text: string };

export default function HeroPage() {
  const [hero, setHero]   = useState<Hero | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast]   = useState("");

  useEffect(() => {
    supabase.from("hero_section").select("*").eq("id", "main").single()
      .then(({ data }) => { if (data) setHero(data); });
  }, []);

  function upd(field: keyof Hero, val: string) { setHero((h) => h ? { ...h, [field]: val } : h); }

  async function save() {
    if (!hero) return;
    setSaving(true);
    const { error } = await supabase.from("hero_section").update(hero).eq("id", "main");
    setSaving(false);
    setToast(error ? "Error saving." : "Hero section saved!");
    setTimeout(() => setToast(""), 3000);
  }

  if (!hero) return <div className="text-sm text-gray-400">Loading…</div>;

  return (
    <div>
      <PageHeader title="Hero Section" description="Edit the first thing visitors see when they land on the website." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Content">
          <div className="space-y-4">
            <div><FieldLabel>Tagline (small text above heading)</FieldLabel><Input value={hero.tagline} onChange={(v) => upd("tagline", v)} /></div>
            <div><FieldLabel>Main Heading</FieldLabel><Textarea value={hero.title} rows={2} onChange={(v) => upd("title", v)} /></div>
            <div><FieldLabel>Subtitle / Description</FieldLabel><Textarea value={hero.subtitle} rows={3} onChange={(v) => upd("subtitle", v)} /></div>
          </div>
        </Card>

        <Card title="Buttons">
          <div className="space-y-4">
            <div><FieldLabel>Primary CTA Button</FieldLabel><Input value={hero.cta_primary_text} onChange={(v) => upd("cta_primary_text", v)} placeholder="Start Your Journey" /></div>
            <div><FieldLabel>Secondary CTA Button</FieldLabel><Input value={hero.cta_secondary_text} onChange={(v) => upd("cta_secondary_text", v)} placeholder="Learn More" /></div>
          </div>

          <div className="mt-6 rounded-xl bg-[#0f1e3c] p-4 text-white text-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#f2a33c] mb-1">{hero.tagline}</p>
            <p className="font-black text-lg leading-tight">{hero.title}</p>
            <p className="mt-2 text-xs text-white/60 line-clamp-2">{hero.subtitle}</p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-[#f2a33c] px-3 py-1 text-xs font-bold">{hero.cta_primary_text}</span>
              <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-bold">{hero.cta_secondary_text}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-4 flex justify-end">
        <SaveButton onClick={save} loading={saving} />
      </div>
      <Toast message={toast} />
    </div>
  );
}
