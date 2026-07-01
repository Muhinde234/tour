import Image from "next/image";

const photos = [
  {
    src: "/images/success-1.jpg",
    alt: "ETTA student graduate celebrating after completing a study abroad program",
    className: "lg:mt-24",
  },
  {
    src: "/images/success-3.jpg",
    alt: "ETTA student graduate smiling outside her university campus",
    className: "lg:-mt-12 lg:z-20 scale-110",
  },
  {
    src: "/images/success-2.jpg",
    alt: "ETTA student graduate in cap and gown at his graduation ceremony",
    className: "lg:mt-32",
  },
];

export default function SuccessStories() {
  return (
    <section id="stories" className="overflow-hidden bg-[#FAF9F6] py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* HEADER SECTION */}
        <div className="relative mb-10 flex flex-col items-center text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.4em] text-[#f2a33c]">
            Proven Results
          </span>
          <h2 className="text-6xl font-black leading-tight text-slate-900 lg:text-8xl">
            Success <span className="text-[#f2a33c]">Stories.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-500">
            Every day we hear from clients who, in the process of following
            their passion for travel and education, have expanded both their
            knowledge and opportunities. Here are a few of the students who
            completed and enjoyed our study abroad services.
          </p>

          <div className="absolute -top-10 left-1/2 -z-10 -translate-x-1/2 text-[20rem] font-black text-slate-100 opacity-50">
            &ldquo;
          </div>
        </div>

        {/* STAGGERED PHOTO GALLERY */}
        <div className="grid gap-12 sm:grid-cols-3 lg:gap-8">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className={`group relative flex flex-col items-center transition-all duration-700 ${photo.className}`}
            >
              <div className="relative h-112 w-full overflow-hidden rounded-[3rem] shadow-2xl lg:h-150">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-6 -z-10 h-32 w-32 rounded-full bg-[#f2a33c]/10 blur-2xl transition-all duration-700 group-hover:scale-150" />
            </div>
          ))}
        </div>

        {/* BOTTOM MOTIVATIONAL QUOTE */}
        <div className="mt-14 text-center">
          <h3 className="text-3xl font-bold text-slate-800 lg:text-4xl">
            Ready to be our next{" "}
            <span className="text-[#f2a33c]">Success Story?</span>
          </h3>
          <a
            href="#contact"
            className="mt-10 inline-block rounded-full bg-[#f2a33c] px-12 py-5 text-xl font-black text-white shadow-[0_20px_40px_rgba(242,163,60,0.3)] transition-all hover:scale-110 hover:rotate-2"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
}
