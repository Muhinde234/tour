"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Input, SaveButton, Toast, PageHeader } from "../_components/ui";

type ConfigRow = { key: string; value: string; label: string; description: string };

export default function ConfigPage() {
  const [rows, setRows]     = useState<ConfigRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast]   = useState("");

  useEffect(() => {
    supabase.from("site_config").select("*").order("key")
      .then(({ data }) => { if (data) setRows(data); });
  }, []);

  function upd(key: string, value: string) {
    setRows((prev) => prev.map((r) => r.key === key ? { ...r, value } : r));
  }

  async function save() {
    setSaving(true);
    await Promise.all(rows.map((r) =>
      supabase.from("site_config").update({ value: r.value }).eq("key", r.key)
    ));
    setSaving(false);
    setToast("Site config saved!");
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div>
      <PageHeader title="Site Configuration" description="Global settings used across the website." />

      <Card>
        <div className="grid gap-5 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.key}>
              <FieldLabel>{r.label || r.key}</FieldLabel>
              <Input value={r.value} onChange={(v) => upd(r.key, v)} />
              {r.description && <p className="mt-1 text-[11px] text-gray-400">{r.description}</p>}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <SaveButton onClick={save} loading={saving} />
        </div>
      </Card>
      <Toast message={toast} />
    </div>
  );
}
