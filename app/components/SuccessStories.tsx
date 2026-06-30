import Image from "next/image";

const photos = [
  {
    src: "/images/success-1.jpg",
    alt: "ETTA student graduate celebrating with a bouquet of flowers at her graduation",
  },
  {
    src: "/images/success-2.jpg",
    alt: "ETTA student graduate in cap and gown in front of a 'Congratulations Graduates' banner",
  },
  {
    src: "/images/success-3.jpg",
    alt: "ETTA student graduate smiling outside her university campus",
  },
];

export default function SuccessStories() {
  return (
    <section id="stories" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          ETTA Success Stories
        </h2>
        <p className="mt-4 max-w-3xl text-gray-700 leading-relaxed">
          There are a variety of ways our students and travelers benefit from
          our programs. Every day we hear from clients who, in the process of
          following their passion for travel and education, have expanded
          both their knowledge and opportunities. Here are a few of the
          students who completed and enjoyed our study abroad services.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative h-80 w-full overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
