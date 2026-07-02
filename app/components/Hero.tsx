"use client";

export default function Hero() {
  return (
    <section id="top" className="relative isolate h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/50 via-brand-navy/60 to-brand-navy/80" />

      {/* Centered content */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-brand-orange">
          Say Yes To New World!
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
          Your Trusted Partner in Tourism &amp; Education Consultancy
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85">
          ETTA crafts unforgettable travel experiences and facilitates
          life-changing study abroad opportunities — with a passion for
          exploration and a commitment to educational excellence.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new Event("open-plan-trip"))}
            className="rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-white hover:text-brand-navy"
          >
            Plan My Trip
          </button>
          <a
            href="#about"
            className="rounded-full border border-white/60 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
