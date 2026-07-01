const countries = [
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Serbia", flag: "🇷🇸" },
  { name: "Lithuania", flag: "🇱🇹" },
];

export default function Careers() {
  return (
    <section id="careers" className="overflow-hidden bg-[#f8fafc] py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="relative overflow-hidden rounded-[3rem] bg-brand-navy p-12 lg:p-20">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#f2a33c]/20 blur-[100px]" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-[#f2a33c]">
                We&apos;re Hiring
              </span>
              <h2 className="text-4xl font-black leading-tight text-white lg:text-6xl">
                Career Opportunities
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                ETTA is expanding internationally and currently has open
                positions for travel and education consultants in Portugal,
                Norway, Serbia, and Lithuania. Join our growing global team.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {countries.map((country) => (
                  <span
                    key={country.name}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    <span className="text-lg">{country.flag}</span>
                    {country.name}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-10 inline-block rounded-full bg-[#f2a33c] px-10 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
