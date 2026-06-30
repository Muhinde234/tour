import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden h-screen">
      <Image
        src="/images/hero-santorini.jpg"
        alt="Whitewashed clifftop village overlooking the sea in Santorini, Greece"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/20" />

      <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-40">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange">
          Say Yes To New World!
        </p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
          Your Trusted Partner in Tourism &amp; Education Consultancy
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85">
          EMMA TOUR AND TRAVEL AGENCY (ETTA) crafts unforgettable travel
          experiences and facilitates life-changing study abroad
          opportunities — with a passion for exploration and a commitment to
          educational excellence.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-brand-orange px-7 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-white hover:text-brand-navy"
          >
            Start Your Journey
          </a>
          <a
            href="#about"
            className="rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
