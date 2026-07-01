"use client";

import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type Career = { id: string; country: string; flag: string; is_active: boolean; display_order: number };

export default function CareersPage() {
  const { items: careers, saving, toast, update, save, add, remove } = useTable<Career>("career_locations");

  async function addCareer() {
    await add({ country: "New Country", flag: "🌍", is_active: true, display_order: careers.length + 1 });
  }

  return (
    <div>
      <PageHeader title="Career Locations" description="Manage countries where ETTA is hiring. Toggle to show or hide on the site."
        action={<AddButton onClick={addCareer} loading={!!saving.__new} label="Add Country" />} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {careers.map((c) => (
          <Card key={c.id}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-3xl">{c.flag}</span>
              <label className="flex cursor-pointer items-center gap-1.5">
                <div className="relative">
                  <input type="checkbox" checked={c.is_active} className="sr-only"
                    onChange={(e) => update(c.id, { is_active: e.target.checked })} />
                  <div className={`h-5 w-9 rounded-full transition-colors ${c.is_active ? "bg-[#f2a33c]" : "bg-gray-200"}`} />
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${c.is_active ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-[10px] font-semibold text-gray-400">{c.is_active ? "Active" : "Hidden"}</span>
              </label>
            </div>
            <div className="space-y-2">
              <div><FieldLabel>Country</FieldLabel><Input value={c.country} onChange={(v) => update(c.id, { country: v })} /></div>
              <div><FieldLabel>Flag emoji</FieldLabel><Input value={c.flag} onChange={(v) => update(c.id, { flag: v })} placeholder="🇵🇹" /></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <DeleteButton onClick={() => remove(c.id)} loading={!!saving[c.id]} />
              <SaveButton onClick={() => save(c)} loading={!!saving[c.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
