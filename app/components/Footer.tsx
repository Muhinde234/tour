import Image from "next/image";
import OpenContactButton from "./OpenContactButton";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-brand-navy py-10 text-white">
      <Image
        src="/images/footer-skyline.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm sm:p-12">
          {/* Heading row with CTA button */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">
                Let&apos;s Plan Your Next Journey
              </h2>
              <p className="mt-3 max-w-xl text-white/70 leading-relaxed">
                We take the time to understand your interests, goals, and
                preferences, allowing us to craft bespoke solutions that exceed
                your expectations.
              </p>
            </div>
            <OpenContactButton />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-brand-orange p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                Address
              </p>
              <p className="mt-1 font-semibold">Kigali, Rwanda</p>
              <p className="font-semibold">Nairobi, Kenya</p>
            </div>
            <div className="rounded-xl bg-brand-sky p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                Telephone
              </p>
              <a href="tel:+250785316178" className="mt-1 block font-semibold hover:underline">
                +250 785 316 178
              </a>
              <a href="tel:+254112538982" className="block font-semibold hover:underline">
                +254 112 538 982
              </a>
              <a href="tel:+18175003240" className="block font-semibold hover:underline">
                +1 817 500 3240
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} EMMA TOUR AND TRAVEL AGENCY LTD.
          All rights reserved. &mdash; Say Yes To New World!
        </p>
        <p className="mt-2 text-center text-xs text-white/40">
          Developed by SAN Tech
        </p>
      </div>
    </footer>
  );
}
