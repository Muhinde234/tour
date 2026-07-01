"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Textarea, SaveButton, Toast, PageHeader } from "../_components/ui";

type Service = { key: string; title: string; body: string };

const DEFAULTS: Service[] = [
  { key: "tourism",   title: "Tourism",               body: "" },
  { key: "education", title: "Education Consultancy", body: "" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(DEFAULTS);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState("");

  useEffect(() => {
    supabase.from("site_config").select("*").in("key", ["service_tourism_body", "service_education_body"])
      .then(({ data }) => {
        if (!data?.length) return;
        setServices((prev) => prev.map((s) => {
          const row = data.find((d) => d.key === `service_${s.key}_body`);
          return row ? { ...s, body: row.value } : s;
        }));
      });
  }, []);

  function upd(key: string, body: string) {
    setServices((prev) => prev.map((s) => s.key === key ? { ...s, body } : s));
  }

  async function save() {
    setSaving(true);
    await Promise.all(services.map((s) =>
      supabase.from("site_config").upsert({ key: `service_${s.key}_body`, value: s.body, label: s.title })
    ));
    setSaving(false);
    setToast("Services saved!");
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div>
      <PageHeader title="Services" description="Edit the Tourism and Education Consultancy descriptions." />

      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((s) => (
          <Card key={s.key} title={s.title}>
            <FieldLabel>Description</FieldLabel>
            <Textarea value={s.body} rows={6} onChange={(v) => upd(s.key, v)}
              placeholder={`Describe the ${s.title} service…`} />
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
