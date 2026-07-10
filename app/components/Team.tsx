import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const FALLBACK = [
  { id: "1", name: "NTAKIYIMANA Emmanuel", role: "Chief Executive Officer & Founder (CEO)", photo_url: "/images/team-ceo-emmanuel.jpg", display_order: 1 },
  { id: "2", name: "UWASE T.", role: "Chief Marketing Officer", photo_url: "/images/team-cmo-uwase.jpg", display_order: 2 },
  { id: "3", name: "Kalisa T.H", role: "Chief Operating Officer (COO)", photo_url: "/images/team-coo-kalisa.jpg", display_order: 3 },
  { id: "4", name: "Mujawayezu Therese", role: "Manager", photo_url: "/images/team-manager-therese.jpg", display_order: 4 },
];

export default async function Team() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("team_members").select("*").order("display_order");
  const team = (data && data.length > 0 ? data : FALLBACK) as { id: string; name: string; role: string; photo_url: string }[];

  return (
    <section id="team" className="overflow-hidden bg-white py-12">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-[#f2a33c]">The People Behind ETTA</span>
          <h2 className="text-3xl font-black leading-tight text-slate-900 lg:text-4xl">Our Super Team</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">&ldquo;Where Dreams Come True, Journeys Begin!&rdquo;</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="group rounded-[2.5rem] border border-slate-100 bg-[#f8fafc] p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full shadow-md ring-4 ring-white">
                <Image
                  src={member.photo_url || "/images/team-ceo-emmanuel.jpg"}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  fill sizes="128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#f2a33c]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
