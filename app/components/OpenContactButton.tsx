"use client";

export default function OpenContactButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-contact"))}
      className="shrink-0 rounded-full bg-[#f2a33c] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-white hover:text-[#0f1e3c] active:scale-95"
    >
      Contact Us
    </button>
  );
}
