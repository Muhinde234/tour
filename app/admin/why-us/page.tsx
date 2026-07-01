"use client";

import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, Textarea, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type Reason = { id: string; title: string; body: string; display_order: number };

export default function WhyUsPage() {
  const { items: reasons, saving, toast, update, save, add, remove } = useTable<Reason>("why_choose_us");

  async function addReason() {
    await add({ title: "New Reason", body: "Explain why clients should choose ETTA.", display_order: reasons.length + 1 });
  }

  return (
    <div>
      <PageHeader title="Why Choose Us" description="Edit the reasons shown in the 'Why Choose Our Agency?' section."
        action={<AddButton onClick={addReason} loading={!!saving.__new} label="Add Reason" />} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <Card key={r.id}>
            <div className="space-y-3">
              <div><FieldLabel>Title</FieldLabel><Input value={r.title} onChange={(v) => update(r.id, { title: v })} /></div>
              <div><FieldLabel>Description</FieldLabel><Textarea value={r.body} rows={3} onChange={(v) => update(r.id, { body: v })} /></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <DeleteButton onClick={() => remove(r.id)} loading={!!saving[r.id]} />
              <SaveButton onClick={() => save(r)} loading={!!saving[r.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
