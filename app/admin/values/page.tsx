"use client";

import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, Textarea, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type Value = { id: string; title: string; body: string; display_order: number };

export default function ValuesPage() {
  const { items: values, saving, toast, update, save, add, remove } = useTable<Value>("site_values");

  async function addValue() {
    await add({ title: "New Value", body: "Describe this value.", display_order: values.length + 1 });
  }

  return (
    <div>
      <PageHeader title="Core Values" description="Edit or add company values shown in the Values section."
        action={<AddButton onClick={addValue} loading={!!saving.__new} label="Add Value" />} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((v, i) => (
          <Card key={v.id}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2a33c] text-white">
              <span className="text-xs font-black">0{i + 1}</span>
            </div>
            <div className="space-y-3">
              <div><FieldLabel>Title</FieldLabel><Input value={v.title} onChange={(val) => update(v.id, { title: val })} /></div>
              <div><FieldLabel>Description</FieldLabel><Textarea value={v.body} rows={3} onChange={(val) => update(v.id, { body: val })} /></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <DeleteButton onClick={() => remove(v.id)} loading={!!saving[v.id]} />
              <SaveButton onClick={() => save(v)} loading={!!saving[v.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
