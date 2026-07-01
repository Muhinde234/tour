import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section id="services" className="bg-white py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* SECTION HEADER & MISSION MANIFESTO */}
        <div className="mb-10 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-4 inline-block font-bold uppercase tracking-[0.3em] text-[#f2a33c]">
              Our Purpose
            </span>
            <h2 className="text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
              What <br /> 
              <span className="text-[#f2a33c]">We Do.</span>
            </h2>
          </div>
          
          <div className="relative lg:col-span-7">
            <div className="relative z-10 rounded-[2.5rem] bg-[#f8fafc] p-10 lg:p-14 shadow-sm border-l-8 border-[#f2a33c]">
              <h3 className="mb-4 text-2xl font-bold text-slate-900 uppercase tracking-widest">Our Mission</h3>
              <p className="text-xl leading-relaxed text-slate-600">
                To empower individuals through enriching travel and educational
                experiences. By providing top-notch tourism services and
                comprehensive study abroad programs, we aim to broaden horizons,
                foster cultural understanding, and contribute to the personal and
                professional growth of our clients.
              </p>
            </div>
            {/* Decorative element behind mission */}
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2.5rem] bg-[#f2a33c]/5" />
          </div>
        </div>

        {/* SERVICES: OVERLAPPING DESIGN */}
        <div className="space-y-16">
          
          {/* SERVICE 1: TOURISM */}
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="relative h-[500px] overflow-hidden rounded-[4rem] shadow-2xl lg:col-span-7 lg:h-[700px]">
              <Image
                src="/images/what-we-do-car.jpg"
                alt="Tourism"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>

            <div className="relative z-20 -mt-20 lg:-ml-32 lg:mt-0 lg:col-span-5">
              <div className="rounded-[3rem] bg-white p-12 shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_30px_60px_rgba(242,163,60,0.2)]">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f2a33c] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-6 text-4xl font-black text-slate-900">Tourism</h3>
                <p className="text-lg leading-relaxed text-slate-500">
                  We curate personalized travel itineraries that provide
                  enriching experiences and memorable adventures. From cultural
                  tours and historical explorations to relaxing getaways and
                  adventure trips, we ensure every journey is meticulously
                  planned and flawlessly executed.
                </p>
              </div>
            </div>
          </div>

          {/* SERVICE 2: EDUCATION (REVERSED) */}
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="order-2 relative z-20 -mt-20 lg:-mr-32 lg:mt-0 lg:col-span-5 lg:order-1">
              <div className="rounded-[3rem] bg-slate-900 p-12 shadow-[0_30px_60px_rgba(0,0,0,0.08)] text-white">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f2a33c] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mb-6 text-4xl font-black">Education Consultancy</h3>
                <p className="text-lg leading-relaxed text-slate-400">
                  Our education consultancy services are designed to help
                  students achieve their academic goals through study abroad
                  programs. We provide comprehensive guidance on choosing the
                  right institutions, applying for programs, and securing visas.
                </p>
              </div>
            </div>

            <div className="order-1 relative h-[500px] overflow-hidden rounded-[4rem] shadow-2xl lg:col-span-7 lg:h-[700px] lg:order-2">
              <Image
                src="/images/success-3.jpg"
                alt="Education"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}