"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Input, SaveButton, Toast, PageHeader } from "../_components/ui";

type Career = { id: string; country: string; flag: string; is_active: boolean; display_order: number };

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [saving, setSaving]   = useState<Record<string, boolean>>({});
  const [toast, setToast]     = useState("");

  const notify = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); }, []);

  useEffect(() => {
    supabase.from("career_locations").select("*").order("display_order")
      .then(({ data }) => { if (data) setCareers(data); });
  }, []);

  function update(i: number, field: keyof Career, val: string | boolean) {
    setCareers((prev) => { const u = [...prev]; u[i] = { ...u[i], [field]: val }; return u; });
  }

  async function save(i: number) {
    const c = careers[i];
    setSaving((p) => ({ ...p, [c.id]: true }));
    const { error } = await supabase.from("career_locations").update(c).eq("id", c.id);
    setSaving((p) => ({ ...p, [c.id]: false }));
    notify(error ? "Error saving." : `${c.country} updated!`);
  }

  return (
    <div>
      <PageHeader title="Career Locations" description="Manage countries where ETTA is currently hiring." />

      <div className="grid gap-5 sm:grid-cols-2">
        {careers.map((career, i) => (
          <Card key={career.id}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{career.flag}</span>
                <p className="font-bold text-[#0f1e3c]">{career.country}</p>
              </div>
              <label className="flex cursor-pointer items-center gap-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={career.is_active}
                    onChange={(e) => update(i, "is_active", e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`h-6 w-11 rounded-full transition-colors ${career.is_active ? "bg-[#f2a33c]" : "bg-gray-200"}`} />
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${career.is_active ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-xs font-semibold text-gray-500">{career.is_active ? "Active" : "Hidden"}</span>
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div><FieldLabel>Country Name</FieldLabel><Input value={career.country} onChange={(v) => update(i, "country", v)} /></div>
              <div><FieldLabel>Flag Emoji</FieldLabel><Input value={career.flag} onChange={(v) => update(i, "flag", v)} placeholder="🇵🇹" /></div>
            </div>

            <div className="mt-5 flex justify-end">
              <SaveButton onClick={() => save(i)} loading={!!saving[career.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
