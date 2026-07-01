"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Input, SaveButton, Toast, PageHeader } from "../_components/ui";

type Stat = { id: string; label: string; value: string; display_order: number };

export default function StatsPage() {
  const [stats, setStats]   = useState<Stat[]>([]);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [toast, setToast]   = useState("");

  const notify = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); }, []);

  useEffect(() => {
    supabase.from("site_stats").select("*").order("display_order")
      .then(({ data }) => { if (data) setStats(data); });
  }, []);

  function update(i: number, field: keyof Stat, val: string) {
    setStats((prev) => { const u = [...prev]; u[i] = { ...u[i], [field]: val }; return u; });
  }

  async function save(i: number) {
    const s = stats[i];
    setSaving((p) => ({ ...p, [s.id]: true }));
    const { error } = await supabase.from("site_stats").update(s).eq("id", s.id);
    setSaving((p) => ({ ...p, [s.id]: false }));
    notify(error ? "Error saving." : "Stat updated!");
  }

  return (
    <div>
      <PageHeader title="Performance Stats" description="Update the numbers shown in the Performance Overview section." />

      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={stat.id}>
            <p className="mb-4 text-3xl font-black text-[#f2a33c]">{stat.value}</p>

            <div className="space-y-3">
              <div><FieldLabel>Value (e.g. 15+)</FieldLabel><Input value={stat.value} onChange={(v) => update(i, "value", v)} placeholder="15+" /></div>
              <div><FieldLabel>Label</FieldLabel><Input value={stat.label} onChange={(v) => update(i, "label", v)} /></div>
            </div>

            <div className="mt-5 flex justify-end">
              <SaveButton onClick={() => save(i)} loading={!!saving[stat.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
