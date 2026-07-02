"use client";

export default function PlanTripButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("open-plan-trip"))}
      className={className}
    >
      Plan My Trip
    </button>
  );
}
