"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useTable } from "@/lib/useTable";
import { Card, FieldLabel, Input, SaveButton, DeleteButton, AddButton, Toast, PageHeader } from "../_components/ui";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

type Member = { id: string; name: string; role: string; photo_url: string; display_order: number };

function PhotoUploader({ member, onUploaded }: { member: Member; onUploaded: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `team/${member.id}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("team-photos").upload(path, file, { upsert: true, contentType: file.type });
    if (error) { setUploading(false); setPreview(null); alert("Upload failed: " + error.message); return; }
    const { data } = supabase.storage.from("team-photos").getPublicUrl(path);
    setUploading(false);
    onUploaded(data.publicUrl);
  }

  const src = preview ?? (member.photo_url?.startsWith("http") ? member.photo_url : null);

  return (
    <div className="flex flex-col items-center gap-2">
      <button type="button" onClick={() => ref.current?.click()}
        className="group relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 ring-4 ring-[#f2a33c]/20 transition hover:ring-[#f2a33c]">
        {src
          ? <Image src={src} alt={member.name} fill unoptimized={!!preview} className="object-cover transition group-hover:brightness-75" sizes="96px" />
          : <div className="flex h-full w-full items-center justify-center text-2xl font-black text-gray-300">{member.name?.[0] ?? "?"}</div>}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 transition group-hover:opacity-100">
          {uploading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <><Camera className="h-4 w-4 text-white" /><span className="text-[9px] font-bold text-white">Change</span></>}
        </div>
      </button>
      <p className="text-[10px] text-gray-400">Click to upload</p>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

export default function TeamPage() {
  const { items: team, saving, toast, update, save, add, remove } = useTable<Member>("team_members");

  async function handlePhoto(id: string, url: string) {
    update(id, { photo_url: url });
    await supabase.from("team_members").update({ photo_url: url }).eq("id", id);
  }

  async function addMember() {
    const count = team.length + 1;
    await add({ name: "New Member", role: "Role", photo_url: "", display_order: count });
  }

  return (
    <div>
      <PageHeader title="Team Members" description="Add, edit or remove team members. Click a photo to upload a new one."
        action={<AddButton onClick={addMember} loading={!!saving.__new} label="Add Member" />} />

      <div className="grid gap-5 sm:grid-cols-2">
        {team.map((m) => (
          <Card key={m.id}>
            <PhotoUploader member={m} onUploaded={(url) => handlePhoto(m.id, url)} />
            <div className="my-4 border-t border-gray-100" />
            <div className="space-y-3">
              <div><FieldLabel>Full Name</FieldLabel><Input value={m.name} onChange={(v) => update(m.id, { name: v })} /></div>
              <div><FieldLabel>Role / Position</FieldLabel><Input value={m.role} onChange={(v) => update(m.id, { role: v })} /></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <DeleteButton onClick={() => remove(m.id)} loading={!!saving[m.id]} />
              <SaveButton onClick={() => save(m)} loading={!!saving[m.id]} />
            </div>
          </Card>
        ))}
      </div>
      <Toast message={toast} />
    </div>
  );
}
