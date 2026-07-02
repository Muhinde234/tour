"use client";

import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type Destination = { id: string; name: string; is_active: boolean; display_order: number };

export default function DestinationsPage() {
  const { items, saving, toast, update, save, add, remove } = useTable<Destination>(
    "trip_destinations", { orderBy: "display_order" }
  );

  async function addItem() {
    await add({ name: "New Destination", is_active: true, display_order: items.length + 1 });
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Trip Destinations"
        description="Manage the destinations shown in the Plan My Trip form."
        action={<AddButton onClick={addItem} loading={!!saving.__new} label="Add Destination" />}
      />

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center gap-4">
              {/* Toggle */}
              <label className="flex cursor-pointer items-center gap-2 shrink-0">
                <div className="relative">
                  <input type="checkbox" checked={item.is_active} className="sr-only"
                    onChange={(e) => update(item.id, { is_active: e.target.checked })} />
                  <div className={`h-5 w-9 rounded-full transition-colors ${item.is_active ? "bg-[#f2a33c]" : "bg-gray-200"}`} />
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${item.is_active ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-[11px] font-semibold text-gray-400">{item.is_active ? "Visible" : "Hidden"}</span>
              </label>

              {/* Name */}
              <div className="flex-1">
                <FieldLabel>Destination name</FieldLabel>
                <Input value={item.name} onChange={(v) => update(item.id, { name: v })} placeholder="e.g. Portugal 🇵🇹" />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <DeleteButton onClick={() => remove(item.id)} loading={!!saving[item.id]} />
                <SaveButton onClick={() => save(item)} loading={!!saving[item.id]} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
