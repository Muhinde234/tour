import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-brand-navy py-20 text-white">
      <Image
        src="/images/footer-skyline.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm sm:p-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Thank You!</h2>
          <p className="mt-3 text-lg font-medium text-brand-orange">
            Because, we&apos;re here to help.
          </p>
          <p className="mt-4 max-w-2xl text-white/85 leading-relaxed">
            We take the time to understand your interests, goals, and
            preferences, allowing us to craft bespoke solutions that exceed
            your expectations. Our dedicated team is here to support you
            every step of the way, ensuring a seamless and enjoyable
            experience.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
            <div className="rounded-xl bg-white/15 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                Website
              </p>
              <a
                href="https://www.emmatourtravel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-semibold hover:underline"
              >
                www.emmatourtravel.com
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} EMMA TOUR AND TRAVEL AGENCY LTD.
          All rights reserved. &mdash; Say Yes To New World!
        </p>
      </div>
    </footer>
  );
}
