"use client";

import { useEffect, useState, useCallback } from "react";
import { Phone, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Input, SaveButton, Toast, PageHeader } from "../_components/ui";

type ContactInfo = { id: string; phone_rw: string; phone_ke: string; phone_us: string; address_1: string; address_2: string };

export default function ContactPage() {
  const [info, setInfo]   = useState<ContactInfo | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast]   = useState("");

  const notify = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); }, []);

  useEffect(() => {
    supabase.from("contact_info").select("*").eq("id", "main").single()
      .then(({ data }) => { if (data) setInfo(data); });
  }, []);

  async function save() {
    if (!info) return;
    setSaving(true);
    const { error } = await supabase.from("contact_info").update(info).eq("id", "main");
    setSaving(false);
    notify(error ? "Error saving." : "Contact info saved!");
  }

  if (!info) return <div className="text-sm text-gray-400">Loading…</div>;

  return (
    <div className="max-w-2xl">
      <PageHeader title="Contact Information" description="These values appear in the top banner and footer of the site." />

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Phone Numbers */}
        <Card title="Phone Numbers">
          <div className="space-y-4">
            <div>
              <FieldLabel>
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Rwanda</span>
              </FieldLabel>
              <Input value={info.phone_rw} onChange={(v) => setInfo({ ...info, phone_rw: v })} placeholder="+250 785 316 178" />
            </div>
            <div>
              <FieldLabel>
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Kenya</span>
              </FieldLabel>
              <Input value={info.phone_ke} onChange={(v) => setInfo({ ...info, phone_ke: v })} placeholder="+254 112 538 982" />
            </div>
            <div>
              <FieldLabel>
                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> USA</span>
              </FieldLabel>
              <Input value={info.phone_us} onChange={(v) => setInfo({ ...info, phone_us: v })} placeholder="+1 817 500 3240" />
            </div>
          </div>
        </Card>

        {/* Addresses */}
        <Card title="Office Addresses">
          <div className="space-y-4">
            <div>
              <FieldLabel>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Address 1</span>
              </FieldLabel>
              <Input value={info.address_1} onChange={(v) => setInfo({ ...info, address_1: v })} placeholder="Kigali, Rwanda" />
            </div>
            <div>
              <FieldLabel>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Address 2</span>
              </FieldLabel>
              <Input value={info.address_2} onChange={(v) => setInfo({ ...info, address_2: v })} placeholder="Nairobi, Kenya" />
            </div>
          </div>
        </Card>
      </div>

      {/* Preview */}
      <Card title="Live Preview" className="mt-6">
        <div className="rounded-xl bg-[#f2a33c] px-6 py-3 text-sm text-white">
          <div className="flex flex-wrap justify-between gap-3">
            <span>📞 {info.phone_rw} / {info.phone_ke} / {info.phone_us}</span>
            <span>📍 {info.address_1} · {info.address_2}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <SaveButton onClick={save} loading={saving} />
        </div>
      </Card>

      <Toast message={toast} />
    </div>
  );
}
