import { supabase } from "@/lib/supabase";
import { Users, Briefcase, BarChart3, Phone, Info } from "lucide-react";
import { Card } from "./_components/ui";

async function getCounts() {
  const [t, c, s] = await Promise.all([
    supabase.from("team_members").select("id", { count: "exact", head: true }),
    supabase.from("career_locations").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("site_stats").select("id", { count: "exact", head: true }),
  ]);
  return { team: t.count ?? 0, careers: c.count ?? 0, stats: s.count ?? 0 };
}

const tiles = [
  { key: "team",    label: "Team Members",      icon: Users,     href: "/admin/team",    color: "bg-[#0f1e3c]" },
  { key: "careers", label: "Active Locations",  icon: Briefcase, href: "/admin/careers", color: "bg-[#f2a33c]" },
  { key: "stats",   label: "Performance Stats", icon: BarChart3, href: "/admin/stats",   color: "bg-emerald-500" },
];

const quickLinks = [
  { href: "/admin/about",   label: "Edit About Cards",    icon: Info },
  { href: "/admin/contact", label: "Update Contact Info", icon: Phone },
];

export default async function DashboardPage() {
  const counts = await getCounts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#0f1e3c]">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to the ETTA Content Manager. Edit any section from the sidebar.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid gap-5 sm:grid-cols-3">
        {tiles.map(({ key, label, icon: Icon, href, color }) => (
          <a key={key} href={href} className="group">
            <div className={`flex items-center justify-between rounded-2xl ${color} p-6 text-white transition-transform hover:-translate-y-0.5`}>
              <div>
                <p className="text-3xl font-black">{counts[key as keyof typeof counts]}</p>
                <p className="mt-1 text-sm text-white/70">{label}</p>
              </div>
              <Icon className="h-10 w-10 text-white/20" />
            </div>
          </a>
        ))}
      </div>

      {/* Quick access */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2a33c]/10 text-[#f2a33c]">
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-semibold text-[#0f1e3c]">{label}</span>
          </a>
        ))}
      </div>

      {/* Info card */}
      <Card className="mt-8" title="How It Works">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2"><span className="text-[#f2a33c] font-bold">1.</span> Select a section from the left sidebar.</li>
          <li className="flex gap-2"><span className="text-[#f2a33c] font-bold">2.</span> Edit any field — text, numbers, flags, phone numbers.</li>
          <li className="flex gap-2"><span className="text-[#f2a33c] font-bold">3.</span> Click <strong>Save Changes</strong> — updates go live instantly.</li>
          <li className="flex gap-2"><span className="text-[#f2a33c] font-bold">4.</span> Use <strong>View Live Site</strong> at the bottom of the sidebar to preview.</li>
        </ul>
      </Card>
    </div>
  );
}
