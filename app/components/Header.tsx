"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#stories", label: "Success Stories" },
  { href: "#team", label: "Team" },
  { href: "#careers", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2">
        <Link href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="EMMA TOUR AND TRAVEL AGENCY logo"
            width={36}
            height={36}
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-bold tracking-wide text-brand-navy sm:text-xs">
              EMMA TOUR AND TRAVEL AGENCY
            </span>
            <span className="text-[9px] font-medium text-brand-orange sm:text-[10px]">
              Say Yes To New World!
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-lg font-medium text-brand-navy md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-brand-orange px-5 py-2 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-brand-navy sm:inline-block"
          >
            Plan My Trip
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-navy md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium text-brand-navy">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block transition-colors hover:text-brand-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-brand-orange px-5 py-2 font-semibold text-white"
              >
                Plan My Trip
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
