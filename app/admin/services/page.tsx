"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Textarea, SaveButton, Toast, PageHeader } from "../_components/ui";

type Entry = { key: string; title: string; body: string };

const DEFAULTS: Entry[] = [
  { key: "mission_text",          title: "Mission Statement",      body: "" },
  { key: "service_tourism_body",  title: "Tourism",                body: "" },
  { key: "service_education_body",title: "Education Consultancy",  body: "" },
];

export default function ServicesPage() {
  const [entries, setEntries] = useState<Entry[]>(DEFAULTS);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState("");

  useEffect(() => {
    supabase.from("site_config").select("*").in("key", DEFAULTS.map((d) => d.key))
      .then(({ data }) => {
        if (!data?.length) return;
        setEntries((prev) => prev.map((e) => {
          const row = data.find((d) => d.key === e.key);
          return row ? { ...e, body: row.value } : e;
        }));
      });
  }, []);

  function upd(key: string, body: string) {
    setEntries((prev) => prev.map((e) => e.key === key ? { ...e, body } : e));
  }

  async function save() {
    setSaving(true);
    await Promise.all(entries.map((e) =>
      supabase.from("site_config").upsert({ key: e.key, value: e.body, label: e.title })
    ));
    setSaving(false);
    setToast("Saved!");
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div>
      <PageHeader title="Services & Mission" description="Edit the Mission Statement and service descriptions shown in the 'What We Do' section." />

      <div className="grid gap-6 lg:grid-cols-3">
        {entries.map((e) => (
          <Card key={e.key} title={e.title}>
            <FieldLabel>Text</FieldLabel>
            <Textarea value={e.body} rows={7} onChange={(v) => upd(e.key, v)} placeholder={`Enter ${e.title}…`} />
          </Card>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <SaveButton onClick={save} loading={saving} />
      </div>
      <Toast message={toast} />
    </div>
  );
}
