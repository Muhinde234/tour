"use client";

import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, Textarea, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type AboutCard = { id: string; number: string; title: string; body: string; display_order: number };

export default function AboutPage() {
  const { items: cards, saving, toast, update, save, add, remove } = useTable<AboutCard>("about_cards");

  async function addCard() {
    const n = String(cards.length + 1).padStart(2, "0");
    await add({ number: n, title: "New Card", body: "Describe this section.", display_order: cards.length + 1 });
  }

  return (
    <div>
      <PageHeader title="About Cards" description="Edit the cards displayed in the About Us section."
        action={<AddButton onClick={addCard} loading={!!saving.__new} label="Add Card" />} />

      <div className="grid gap-5 sm:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.id}>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f2a33c] text-xs font-black text-white">{card.number}</span>
              <p className="font-bold text-[#0f1e3c]">{card.title}</p>
            </div>
            <div className="space-y-3">
              <div><FieldLabel>Number Badge</FieldLabel><Input value={card.number} onChange={(v) => update(card.id, { number: v })} placeholder="01" /></div>
              <div><FieldLabel>Title</FieldLabel><Input value={card.title} onChange={(v) => update(card.id, { title: v })} /></div>
              <div><FieldLabel>Body</FieldLabel><Textarea value={card.body} rows={4} onChange={(v) => update(card.id, { body: v })} /></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <DeleteButton onClick={() => remove(card.id)} loading={!!saving[card.id]} />
              <SaveButton onClick={() => save(card)} loading={!!saving[card.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
