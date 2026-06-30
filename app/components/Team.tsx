import Image from "next/image";

const team = [
  {
    name: "NTAKIYIMANA Emmanuel",
    role: "Chief Executive Officer & Founder (CEO)",
    src: "/images/team-ceo-emmanuel.jpg",
  },
  {
    name: "UWASE T.",
    role: "Chief Marketing Officer",
    src: "/images/team-cmo-uwase.jpg",
  },
  {
    name: "Kalisa T.H",
    role: "Chief Operating Officer (COO)",
    src: "/images/team-coo-kalisa.jpg",
  },
  {
    name: "Mujawayezu Therese",
    role: "Manager",
    src: "/images/team-manager-therese.jpg",
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          Our Super Team
        </h2>
        <p className="mt-3 max-w-2xl text-gray-700">
          Join EMMA TOUR AND TRAVEL AGENCY — &ldquo;Where Dreams Come True,
          Journeys Begin!&rdquo;
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full shadow-md">
                <Image
                  src={member.src}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-base font-bold text-brand-navy">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
