"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function openContact() {
  window.dispatchEvent(new Event("open-contact"));
}
function openPlanTrip() {
  window.dispatchEvent(new Event("open-plan-trip"));
}

const navLinks = [
  { href: "#about", label: "About", modal: false },
  { href: "#services", label: "Services", modal: false },
  { href: "#why-us", label: "Why Us", modal: false },
  { href: "#stories", label: "Success Stories", modal: false },
  { href: "#team", label: "Team", modal: false },
  { href: "#careers", label: "Careers", modal: false },
  { href: "#", label: "Contact", modal: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.03] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        
        
        <div className="flex flex-1 items-center">
          <Link href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
            <div className="hidden flex-col leading-tight lg:flex">
              {/* Main Company Name */}
              <span className="whitespace-nowrap text-sm font-bold uppercase tracking-widest text-slate-900">
              ETTA
              </span>
              {/* Slogan added here */}
              <span className="text-[10px] font-medium tracking-[0.15em] text-yellow-500">
                SAY YES TO NEW WORLD!
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER SIDE: NAV LINKS (Increased Size 16px) */}
        <nav className="hidden lg:flex items-center justify-center gap-10">
          {navLinks.map((link) =>
            link.modal ? (
              <button
                key={link.label}
                onClick={openContact}
                className="text-[16px] font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-[16px] font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* RIGHT SIDE: DARK PILL CTA */}
        <div className="flex flex-1 items-center justify-end">
          <button
            onClick={openPlanTrip}
            className="hidden rounded-full bg-slate-900 px-7 py-3 text-[15px] font-bold text-white transition-all hover:bg-slate-800 sm:block"
          >
            Plan My Trip
          </button>

          {/* MOBILE BURGER */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-900 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 w-full border-t border-black/5 bg-white lg:hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-10 text-lg font-medium text-slate-900">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="w-full px-10">
                <button
                  onClick={() => { setOpen(false); openPlanTrip(); }}
                  className="w-full rounded-full bg-slate-900 py-4 text-white"
                >
                  Plan My Trip
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}