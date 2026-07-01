"use client";

import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type Stat = { id: string; label: string; value: string; display_order: number };

export default function StatsPage() {
  const { items: stats, saving, toast, update, save, add, remove } = useTable<Stat>("site_stats");

  async function addStat() {
    await add({ label: "New Metric", value: "0+", display_order: stats.length + 1 });
  }

  return (
    <div>
      <PageHeader title="Performance Stats" description="Edit the numbers shown in the Performance Overview section."
        action={<AddButton onClick={addStat} loading={!!saving.__new} label="Add Stat" />} />

      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.id}>
            <p className="mb-4 text-3xl font-black text-[#f2a33c]">{s.value}</p>
            <div className="space-y-3">
              <div><FieldLabel>Value</FieldLabel><Input value={s.value} placeholder="15+" onChange={(v) => update(s.id, { value: v })} /></div>
              <div><FieldLabel>Label</FieldLabel><Input value={s.label} onChange={(v) => update(s.id, { label: v })} /></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <DeleteButton onClick={() => remove(s.id)} loading={!!saving[s.id]} />
              <SaveButton onClick={() => save(s)} loading={!!saving[s.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
