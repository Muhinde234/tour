import Image from "next/image";

const values = [
  {
    title: "Excellency",
    body: "We strive for the highest standards in all our services, ensuring every detail of your journey is handled with professional precision.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l-2 5L9 9l11 4-5 2zm0 0l4 4M4 4h.01M4 20h.01M20 4h.01" />
    ),
  },
  {
    title: "Integrity",
    body: "We conduct our business with absolute honesty and transparency, building lasting trust with clients.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  },
  {
    title: "Innovation",
    body: "We continuously seek new ways to enhance our offerings with modern travel and education solutions.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    title: "Customer Focus",
    body: "Your satisfaction is our top priority. We listen, adapt, and deliver experiences tailored to you.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  },
  {
    title: "Cultural Appreciation",
    body: "We promote understanding and respect for diverse cultures, fostering global citizenship.",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
];

export default function Values() {
  return (
    <section className="bg-brand-navy overflow-hidden py-16 text-white lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* LEFT SIDE: Heading and Large Decorative Image */}
          <div className="sticky top-12 lg:col-span-5">
            <div className="mb-12">
              <span className="mb-4 inline-block font-bold uppercase tracking-[0.3em] text-[#f2a33c]">
                Our Core Philosophy
              </span>
              <h2 className="text-5xl font-black leading-[1.1] lg:text-7xl">
                The Values <br />
                That <span className="text-[#f2a33c]">Drive Us.</span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-slate-400">
                At ETTA, our principles aren&apos;t just words—they are the
                foundation of every journey we plan and every future we help build.
              </p>
            </div>

            <div className="relative h-[350px] w-full lg:h-[450px]">
              {/* Decorative Frame */}
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border-2 border-[#f2a33c]/20" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl">
                <Image
                  src="/images/values-office.jpg"
                  alt="Team values"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: BENTO GRID */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`
                    group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:bg-white/[0.08]
                    ${index === 0 ? "lg:col-span-6 bg-gradient-to-br from-white/10 to-transparent" : "lg:col-span-3"}
                  `}
                >
                  <div className="relative z-10">
                    {/* Icon Box */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2a33c] text-brand-navy shadow-lg shadow-[#f2a33c]/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        {value.icon}
                      </svg>
                    </div>

                    <h3
                      className={`font-black text-white transition-colors group-hover:text-[#f2a33c] 
                      ${index === 0 ? "mb-4 text-3xl lg:text-4xl" : "mb-3 text-xl lg:text-2xl"}`}
                    >
                      {value.title}
                    </h3>

                    <p
                      className={`leading-relaxed text-slate-400 transition-colors group-hover:text-slate-200 
                      ${index === 0 ? "max-w-xl text-lg" : "text-sm lg:text-base"}`}
                    >
                      {value.body}
                    </p>
                  </div>

                  {/* Decorative Background Number */}
                  <span className="absolute -bottom-6 -right-2 select-none text-9xl font-black text-white/[0.03] transition-all duration-700 group-hover:-translate-y-4 group-hover:text-[#f2a33c]/10">
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