import Image from "next/image";

const performance = [
  { label: "Years of Experience", value: "15+" },
  { label: "Trips Completed", value: "250+" },
  { label: "Happy Travelers & Students", value: "30,000+" },
];

const regions = [
  { label: "Africa", value: "43.9%", color: "bg-[#f2a33c]" },
  { label: "America", value: "36.6%", color: "bg-slate-400" },
  { label: "Asia", value: "19.5%", color: "bg-slate-600" },
];

export default function Stats() {
  return (
    <section className="overflow-hidden bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* IMAGE SIDE */}
          <div className="relative lg:col-span-6">
            <div className="relative z-10 h-96 w-full overflow-hidden rounded-[3rem] shadow-2xl lg:h-140">
              <Image
                src="/images/performance-desk.jpg"
                alt="ETTA team reviewing travel plans and performance"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-[#f2a33c]/10 blur-3xl" />
          </div>

          {/* CONTENT SIDE */}
          <div className="lg:col-span-6 lg:pl-10">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.3em] text-[#f2a33c]">
              Track Record
            </span>
            <h2 className="text-5xl font-black leading-tight text-slate-900">
              Performance <br /> Overview
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {performance.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[2rem] border border-slate-100 bg-[#f8fafc] p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <p className="text-4xl font-black text-[#f2a33c]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[2.5rem] bg-slate-900 p-10 text-white">
              <p className="mb-6 text-lg font-bold uppercase tracking-widest text-[#f2a33c]">
                Travelers &amp; Students by Region
              </p>

              <div className="relative flex h-6 w-full overflow-hidden rounded-full bg-slate-800">
                {regions.map((region) => (
                  <div
                    key={region.label}
                    className={`${region.color} transition-all duration-1000`}
                    style={{ width: region.value }}
                    title={`${region.label}: ${region.value}`}
                  />
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {regions.map((region) => (
                  <div key={region.label} className="flex flex-col">
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${region.color}`} />
                      <span className="text-sm font-bold">{region.label}</span>
                    </div>
                    <span className="text-2xl font-black text-white">
                      {region.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
