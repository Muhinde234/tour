export default function TopBar() {
  return (
    <div className="bg-brand-orange text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-2 text-xs sm:justify-between sm:text-sm">
        <a
          href="tel:+250785316178"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .97.76l.86 3.45a1 1 0 0 1-.5 1.13L7.1 9.41a12.05 12.05 0 0 0 5.49 5.49l1.07-1.51a1 1 0 0 1 1.13-.5l3.45.86a1 1 0 0 1 .76.97V19a2 2 0 0 1-2 2h-1C9.16 21 3 14.84 3 7V5Z"
            />
          </svg>
          <span className="whitespace-nowrap">
            +250 785 316 178 / +254 112 538 982 / +1 817 500 3240
          </span>
        </a>

        <span className="flex items-center gap-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12Z"
            />
            <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="whitespace-nowrap">Kigali, Rwanda &middot; Nairobi, Kenya</span>
        </span>

        <span className="whitespace-nowrap font-bold tracking-wide">
          EMMA TOUR AND TRAVEL AGENCY
        </span>
      </div>
    </div>
  );
}
