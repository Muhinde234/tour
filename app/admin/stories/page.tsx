"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Textarea, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";

type Story = { id: string; story: string; photo_url: string; display_order: number };

function PhotoUploader({ story, onUploaded }: { story: Story; onUploaded: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `stories/${story.id}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("team-photos").upload(path, file, { upsert: true, contentType: file.type });
    if (error) { setUploading(false); setPreview(null); alert("Upload failed: " + error.message); return; }
    const { data } = supabase.storage.from("team-photos").getPublicUrl(path);
    setUploading(false);
    onUploaded(data.publicUrl);
  }

  const src = preview ?? (story.photo_url?.startsWith("http") ? story.photo_url : story.photo_url || null);

  return (
    <div className="flex flex-col items-center gap-2">
      <button type="button" onClick={() => ref.current?.click()}
        className="group relative h-20 w-20 overflow-hidden rounded-full bg-gray-100 ring-4 ring-[#f2a33c]/20 transition hover:ring-[#f2a33c]">
        {src
          ? <Image src={src} alt="Story photo" fill unoptimized={!!preview} className="object-cover transition group-hover:brightness-75" sizes="80px" />
          : <div className="flex h-full w-full items-center justify-center text-gray-300 text-xl font-black">?</div>}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 transition group-hover:opacity-100">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <><Camera className="h-3.5 w-3.5 text-white" /><span className="text-[9px] font-bold text-white">Change</span></>}
        </div>
      </button>
      <p className="text-[10px] text-gray-400">Click to upload</p>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

export default function StoriesPage() {
  const { items, saving, toast, update, save, add, remove } = useTable<Story>("success_stories");

  async function handlePhoto(id: string, url: string) {
    update(id, { photo_url: url });
    await supabase.from("success_stories").update({ photo_url: url }).eq("id", id);
  }

  async function addStory() {
    await add({ story: "Share a client success story here.", photo_url: "/images/success-1.jpg", display_order: items.length + 1 });
  }

  return (
    <div>
      <PageHeader title="Success Stories" description="Manage the testimonials shown in the Success Stories marquee."
        action={<AddButton onClick={addStory} loading={!!saving.__new} label="Add Story" />} />

      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id}>
            <div className="flex items-start gap-4">
              <PhotoUploader story={item} onUploaded={(url) => handlePhoto(item.id, url)} />
              <div className="flex-1">
                <FieldLabel>Story / Testimonial</FieldLabel>
                <Textarea value={item.story} rows={4} onChange={(v) => update(item.id, { story: v })} placeholder="Client testimonial…" />
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
