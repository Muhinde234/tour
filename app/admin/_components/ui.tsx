import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function Card({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-gray-100 bg-white p-6 shadow-sm", className)}>
      {title && <h2 className="mb-5 text-sm font-bold text-[#0f1e3c]">{title}</h2>}
      {children}
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400">{children}</label>;
}

export function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-[#f2a33c] focus:bg-white focus:outline-none"
    />
  );
}

export function Textarea({ value, onChange, rows = 3, placeholder }: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-[#f2a33c] focus:bg-white focus:outline-none"
    />
  );
}

export function SaveButton({ onClick, loading, label = "Save Changes" }: {
  onClick: () => void; loading: boolean; label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="rounded-xl bg-[#f2a33c] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#e09230] disabled:opacity-50"
    >
      {loading ? "Saving…" : label}
    </button>
  );
}

export function DeleteButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="Delete"
      className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-400 transition hover:bg-red-100 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}

export function AddButton({ onClick, loading, label = "Add New" }: {
  onClick: () => void; loading: boolean; label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[#f2a33c]/40 px-4 py-2.5 text-sm font-semibold text-[#f2a33c] transition hover:border-[#f2a33c] hover:bg-[#f2a33c]/5 disabled:opacity-50"
    >
      <Plus className="h-4 w-4" />
      {loading ? "Adding…" : label}
    </button>
  );
}

export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#0f1e3c] px-5 py-3 text-sm font-semibold text-white shadow-xl">
      <span className="h-2 w-2 rounded-full bg-[#f2a33c]" />
      {message}
    </div>
  );
}

export function PageHeader({ title, description, action }: {
  title: string; description?: string; action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-xl font-black text-[#0f1e3c]">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-gray-400">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
      {label}
    </div>
  );
}
