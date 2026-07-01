"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Users,
  Info,
  BarChart3,
  Briefcase,
  Phone,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/admin",          label: "Dashboard",   icon: LayoutDashboard },
  { href: "/admin/about",    label: "About Cards", icon: Info },
  { href: "/admin/team",     label: "Team",        icon: Users },
  { href: "/admin/stats",    label: "Stats",       icon: BarChart3 },
  { href: "/admin/careers",  label: "Careers",     icon: Briefcase },
  { href: "/admin/contact",  label: "Contact",     icon: Phone },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#0f1e3c] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <Image src="/images/logo.png" alt="ETTA logo" width={38} height={38} />
        <div className="leading-tight">
          <p className="text-xs font-black tracking-wide">ETTA</p>
          <p className="text-[10px] text-white/50">Content Manager</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
          Sections
        </p>
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = path === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-[#f2a33c] text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View Live Site
        </a>
      </div>
    </aside>
  );
}
