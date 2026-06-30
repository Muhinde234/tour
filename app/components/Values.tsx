import Image from "next/image";

const values = [
  {
    title: "Excellency",
    body: "We strive for the highest standards in all our services, ensuring every detail of your journey is handled with professional precision.",
    icon: (
      <path d="M12 15l-2 5L9 9l11 4-5 2zm0 0l4 4M4 4h.01M4 20h.01M20 4h.01" />
    ),
  },
  {
    title: "Integrity",
    body: "We conduct our business with absolute honesty and transparency, building lasting trust with our clients and partners.",
    icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  },
  {
    title: "Innovation",
    body: "We continuously seek new ways to enhance our offerings, providing added value through modern travel and education solutions.",
    icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: "Customer Focus",
    body: "Your satisfaction is our top priority. We listen, adapt, and deliver experiences tailored specifically to your aspirations.",
    icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  },
  {
    title: "Cultural Appreciation",
    body: "We promote understanding and respect for diverse cultures through our programs, fostering global citizenship.",
    icon: <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
];

export default function Values() {
  return (
    <section className="bg-brand-navy py-24 lg:py-32 overflow-hidden text-white">
      <div className="mx-auto max-w-[1400px] px-6">
        
        <div className="grid items-center gap-16 lg:grid-cols-12">
          
          {/* LEFT SIDE: Heading and Large Decorative Image */}
          <div className="lg:col-span-5">
            <div className="mb-12">
              <span className="mb-4 inline-block font-bold uppercase tracking-[0.3em] text-[#f2a33c]">
                Our Core Philosophy
              </span>
              <h2 className="text-5xl font-black leading-tight lg:text-7xl">
                The Values That <br /> 
                <span className="text-[#f2a33c]">Drive Us.</span>
              </h2>
              <p className="mt-8 text-lg text-slate-300 max-w-md leading-relaxed">
                At ETTA, our principles aren&apos;t just words—they are the foundation of every journey we plan and every future we help build.
              </p>
            </div>

            <div className="relative h-[400px] w-full lg:h-[500px]">
              {/* Overlapping Image Background Decorative Box */}
              <div className="absolute -bottom-6 -right-6 h-full w-full rounded-[3rem] border-2 border-[#f2a33c]/30" />
              <div className="relative h-full w-full overflow-hidden rounded-[3rem] shadow-2xl">
                <Image
                  src="/images/values-office.jpg"
                  alt="Team values"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: STAGGERED VALUES CARDS */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`
                    group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-sm transition-all duration-500
                    hover:border-[#f2a33c]/50 hover:bg-white/10 hover:-translate-y-2
                    ${index === 0 ? "sm:col-span-2 bg-gradient-to-br from-white/10 to-transparent" : ""}
                    ${index === 1 ? "lg:mt-8" : ""}
                    ${index === 2 ? "lg:-mt-8" : ""}
                    ${index === 4 ? "sm:col-span-2 lg:mt-4" : ""}
                  `}
                >
                  {/* Icon with Orange Glow */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f2a33c] text-brand-navy shadow-[0_0_20px_rgba(242,163,60,0.3)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {value.icon}
                    </svg>
                  </div>

                  <h3 className={`font-black text-white group-hover:text-[#f2a33c] transition-colors ${index === 0 ? "text-4xl mb-4" : "text-2xl mb-3"}`}>
                    {value.title}
                  </h3>
                  
                  <p className={`leading-relaxed text-slate-300 transition-colors group-hover:text-white ${index === 0 ? "text-xl max-w-2xl" : "text-base"}`}>
                    {value.body}
                  </p>

                  {/* Decorative Number for background */}
                  <span className="absolute -bottom-4 -right-4 text-9xl font-black text-white/[0.03] transition-all duration-500 group-hover:text-[#f2a33c]/10">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}