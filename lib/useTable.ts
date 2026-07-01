"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

export function useTable<T extends { id: string }>(
  table: string,
  options: { orderBy?: string; filters?: Record<string, unknown> } = {}
) {
  const { orderBy = "display_order", filters } = options;
  const [items, setItems]   = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [toast, setToast]   = useState("");

  const notify = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  const fetch = useCallback(async () => {
    setLoading(true);
    let q = supabase.from(table).select("*").order(orderBy);
    if (filters) Object.entries(filters).forEach(([k, v]) => { q = q.eq(k, v); });
    const { data } = await q;
    if (data) setItems(data as T[]);
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void fetch(); }, [fetch]);

  const update = useCallback((id: string, patch: Partial<T>) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, ...patch } : item));
  }, []);

  const save = useCallback(async (item: T) => {
    setSaving((p) => ({ ...p, [item.id]: true }));
    const { error } = await supabase.from(table).update(item).eq("id", item.id);
    setSaving((p) => ({ ...p, [item.id]: false }));
    notify(error ? `Error: ${error.message}` : "Saved successfully!");
    return !error;
  }, [table, notify]);

  const add = useCallback(async (newItem: Omit<T, "id">) => {
    setSaving((p) => ({ ...p, __new: true }));
    const { data, error } = await supabase.from(table).insert(newItem).select().single();
    setSaving((p) => ({ ...p, __new: false }));
    if (error) { notify(`Error: ${error.message}`); return null; }
    setItems((prev) => [...prev, data as T]);
    notify("Added successfully!");
    return data as T;
  }, [table, notify]);

  const remove = useCallback(async (id: string) => {
    setSaving((p) => ({ ...p, [id]: true }));
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) setItems((prev) => prev.filter((i) => i.id !== id));
    setSaving((p) => ({ ...p, [id]: false }));
    notify(error ? `Error: ${error.message}` : "Deleted!");
  }, [table, notify]);

  return { items, setItems, loading, saving, toast, update, save, add, remove, refetch: fetch };
}
