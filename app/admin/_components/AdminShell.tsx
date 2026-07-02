"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] font-sans">

      {/* ── Desktop sidebar (always visible lg+) ── */}
      <div className="hidden lg:flex lg:shrink-0">
        <Sidebar onNav={() => {}} />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          {/* Slide-in panel */}
          <div className="fixed left-0 top-0 z-50 h-full lg:hidden">
            <Sidebar onNav={() => setOpen(false)} />
          </div>
        </>
      )}

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Mobile top bar */}
        <header className="flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f1e3c] text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <span className="text-sm font-black text-[#0f1e3c]">ETTA Admin</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
