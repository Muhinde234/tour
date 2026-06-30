import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          What We Do
        </h2>

        <div className="mt-8 rounded-2xl bg-brand-cyan-light/40 p-8">
          <h3 className="text-lg font-bold text-brand-navy">Mission</h3>
          <p className="mt-3 max-w-3xl text-gray-700 leading-relaxed">
            To empower individuals through enriching travel and educational
            experiences. By providing top-notch tourism services and
            comprehensive study abroad programs, we aim to broaden horizons,
            foster cultural understanding, and contribute to the personal and
            professional growth of our clients. We are committed to
            delivering exceptional service, ensuring memorable journeys, and
            supporting academic success.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
            <div className="relative h-56 w-full">
              <Image
                src="/images/what-we-do-car.jpg"
                alt="Vintage red convertible car on a scenic countryside road"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-navy">Tourism</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                We curate personalized travel itineraries that provide
                enriching experiences and memorable adventures. From cultural
                tours and historical explorations to relaxing getaways and
                adventure trips, we ensure every journey is meticulously
                planned and flawlessly executed.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
            <div className="relative h-56 w-full">
              <Image
                src="/images/success-3.jpg"
                alt="A graduate celebrating after completing a study abroad program"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-navy">
                Education Consultancy
              </h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Our education consultancy services are designed to help
                students achieve their academic goals through study abroad
                programs. We provide comprehensive guidance on choosing the
                right institutions, applying for programs, securing visas,
                and preparing for life in a new country.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
