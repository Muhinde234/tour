"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Star, Users, BarChart3, Briefcase, Phone,
  Info, ImageIcon, Heart, CheckCircle, Settings, ExternalLink,
  MessageSquare, FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/cn";
import SignOutButton from "./SignOutButton";

const groups = [
  {
    label: "Overview",
    items: [
      { href: "/admin",         label: "Dashboard",     icon: LayoutDashboard },
    ],
  },
  {
    label: "Page Sections",
    items: [
      { href: "/admin/hero",     label: "Hero",          icon: ImageIcon },
      { href: "/admin/about",    label: "About Cards",   icon: Info },
      { href: "/admin/values",   label: "Values",        icon: Heart },
      { href: "/admin/services", label: "Services",      icon: Star },
      { href: "/admin/why-us",   label: "Why Choose Us", icon: CheckCircle },
      { href: "/admin/stats",    label: "Stats",         icon: BarChart3 },
    ],
  },
  {
    label: "People & Places",
    items: [
      { href: "/admin/team",     label: "Team",          icon: Users },
      { href: "/admin/careers",  label: "Careers",       icon: Briefcase },
    ],
  },
  {
    label: "Inbox",
    items: [
      { href: "/admin/messages",     label: "Contact Messages", icon: MessageSquare },
      { href: "/admin/applications", label: "Job Applications", icon: FolderOpen },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/admin/contact",  label: "Contact Info",  icon: Phone },
      { href: "/admin/config",   label: "Site Config",   icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col bg-[#0f1e3c] text-white">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <Image src="/images/logo.png" alt="ETTA" width={34} height={34} />
        <div className="leading-tight">
          <p className="text-xs font-black tracking-wide">ETTA Admin</p>
          <p className="text-[10px] text-white/40">Content Manager</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="mb-1 px-3 text-[9px] font-bold uppercase tracking-widest text-white/30">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = path === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-all",
                        active
                          ? "bg-[#f2a33c] text-white"
                          : "text-white/55 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] text-white/40 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Live Site
        </a>
        <SignOutButton />
      </div>
    </aside>
  );
}
