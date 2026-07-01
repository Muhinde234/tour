"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Card, FieldLabel, Input, SaveButton, Toast, PageHeader } from "../_components/ui";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

type Member = { id: string; name: string; role: string; photo_url: string; display_order: number };

function PhotoUploader({
  member,
  onUploaded,
}: {
  member: Member;
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview while uploading
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `team/${member.id}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("team-photos")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setUploading(false);
      setPreview(null);
      alert("Upload failed: " + uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("team-photos").getPublicUrl(path);
    setUploading(false);
    onUploaded(data.publicUrl);
  }

  const displaySrc = preview ?? (member.photo_url?.startsWith("http") ? member.photo_url : null);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Clickable avatar */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative h-28 w-28 overflow-hidden rounded-full bg-gray-100 ring-4 ring-[#f2a33c]/30 transition hover:ring-[#f2a33c]"
      >
        {displaySrc ? (
          <Image
            src={displaySrc}
            alt={member.name}
            fill
            unoptimized={!!preview}
            className="object-cover transition group-hover:brightness-75"
            sizes="112px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-3xl font-black text-gray-400">
            {member.name?.[0] ?? "?"}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 transition group-hover:opacity-100">
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          ) : (
            <>
              <Camera className="h-5 w-5 text-white" />
              <span className="text-[10px] font-bold text-white">Change</span>
            </>
          )}
        </div>
      </button>

      <p className="text-xs text-gray-400">Click photo to upload a new image</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

export default function TeamPage() {
  const [team, setTeam]     = useState<Member[]>([]);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [toast, setToast]   = useState("");

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  useEffect(() => {
    supabase
      .from("team_members")
      .select("*")
      .order("display_order")
      .then(({ data }) => { if (data) setTeam(data); });
  }, []);

  function update(i: number, field: keyof Member, val: string) {
    setTeam((prev) => {
      const u = [...prev];
      u[i] = { ...u[i], [field]: val };
      return u;
    });
  }

  async function handlePhotoUploaded(i: number, url: string) {
    // Immediately persist new photo URL to DB
    const m = { ...team[i], photo_url: url };
    update(i, "photo_url", url);
    await supabase.from("team_members").update({ photo_url: url }).eq("id", m.id);
    notify(`${m.name}'s photo updated!`);
  }

  async function save(i: number) {
    const m = team[i];
    setSaving((p) => ({ ...p, [m.id]: true }));
    const { error } = await supabase.from("team_members").update(m).eq("id", m.id);
    setSaving((p) => ({ ...p, [m.id]: false }));
    notify(error ? "Error saving." : `${m.name} updated!`);
  }

  return (
    <div>
      <PageHeader
        title="Team Members"
        description="Click a photo to upload a new image. Edit name and role then hit Save."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {team.map((m, i) => (
          <Card key={m.id}>
            {/* Photo uploader */}
            <PhotoUploader
              member={m}
              onUploaded={(url) => handlePhotoUploaded(i, url)}
            />

            {/* Divider */}
            <div className="my-5 border-t border-gray-100" />

            {/* Fields */}
            <div className="space-y-3">
              <div>
                <FieldLabel>Full Name</FieldLabel>
                <Input value={m.name} onChange={(v) => update(i, "name", v)} />
              </div>
              <div>
                <FieldLabel>Role / Position</FieldLabel>
                <Input value={m.role} onChange={(v) => update(i, "role", v)} />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <SaveButton onClick={() => save(i)} loading={!!saving[m.id]} />
            </div>
          </Card>
        ))}
      </div>

      <Toast message={toast} />
    </div>
  );
}
