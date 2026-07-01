import { cn } from "@/lib/cn";

export function Card({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-gray-100 bg-white p-6 shadow-sm", className)}>
      {title && <h2 className="mb-5 text-base font-bold text-[#0f1e3c]">{title}</h2>}
      {children}
    </div>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">{children}</label>;
}

export function Input({
  value, onChange, placeholder, type = "text",
}: {
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

export function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-[#f2a33c] focus:bg-white focus:outline-none"
    />
  );
}

export function SaveButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="rounded-xl bg-[#f2a33c] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#e09230] disabled:opacity-50"
    >
      {loading ? "Saving…" : "Save Changes"}
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

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-7">
      <h1 className="text-2xl font-black text-[#0f1e3c]">{title}</h1>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
}
