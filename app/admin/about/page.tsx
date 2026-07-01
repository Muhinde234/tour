"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Input, Textarea, SaveButton, Toast, PageHeader } from "../_components/ui";

type AboutCard = { id: string; number: string; title: string; body: string; display_order: number };

export default function AboutPage() {
  const [cards, setCards]   = useState<AboutCard[]>([]);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [toast, setToast]   = useState("");

  const notify = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); }, []);

  useEffect(() => {
    supabase.from("about_cards").select("*").order("display_order")
      .then(({ data }) => { if (data) setCards(data); });
  }, []);

  function update(i: number, field: keyof AboutCard, val: string) {
    setCards((prev) => { const u = [...prev]; u[i] = { ...u[i], [field]: val }; return u; });
  }

  async function save(i: number) {
    const c = cards[i];
    setSaving((p) => ({ ...p, [c.id]: true }));
    const { error } = await supabase.from("about_cards").update(c).eq("id", c.id);
    setSaving((p) => ({ ...p, [c.id]: false }));
    notify(error ? "Error saving." : `Card ${c.number} saved!`);
  }

  return (
    <div>
      <PageHeader title="About Cards" description="Edit the four cards displayed in the About Us section." />

      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((card, i) => (
          <Card key={card.id}>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f2a33c] text-sm font-black text-white">
                {card.number}
              </span>
              <p className="font-bold text-[#0f1e3c]">{card.title}</p>
            </div>

            <div className="space-y-3">
              <div><FieldLabel>Title</FieldLabel><Input value={card.title} onChange={(v) => update(i, "title", v)} /></div>
              <div><FieldLabel>Body Text</FieldLabel><Textarea value={card.body} rows={4} onChange={(v) => update(i, "body", v)} /></div>
            </div>

            <div className="mt-5 flex justify-end">
              <SaveButton onClick={() => save(i)} loading={!!saving[card.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
