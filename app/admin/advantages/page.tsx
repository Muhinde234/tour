"use client";

import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, Textarea, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type Advantage = { id: string; title: string; items: string; display_order: number };

export default function AdvantagesPage() {
  const { items, saving, toast, update, save, add, remove } = useTable<Advantage>("competitive_advantages");

  async function addAdvantage() {
    await add({ title: "New Advantage", items: "First bullet point.\nSecond bullet point.", display_order: items.length + 1 });
  }

  return (
    <div>
      <PageHeader title="What Sets Us Apart" description="Edit the advantage cards shown in the 'What Sets Us Apart' section. Each bullet point goes on a new line."
        action={<AddButton onClick={addAdvantage} loading={!!saving.__new} label="Add Advantage" />} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Card key={item.id}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2a33c] text-white">
              <span className="text-xs font-black">0{i + 1}</span>
            </div>
            <div className="space-y-3">
              <div><FieldLabel>Title</FieldLabel><Input value={item.title} onChange={(v) => update(item.id, { title: v })} /></div>
              <div>
                <FieldLabel>Bullet Points (one per line)</FieldLabel>
                <Textarea value={item.items} rows={5} onChange={(v) => update(item.id, { items: v })} placeholder={"First point.\nSecond point."} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <DeleteButton onClick={() => remove(item.id)} loading={!!saving[item.id]} />
              <SaveButton onClick={() => save(item)} loading={!!saving[item.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
