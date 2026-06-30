import Image from "next/image";

const values = [
  {
    title: "Excellency",
    body: "We strive for the highest standards in all our services.",
  },
  {
    title: "Integrity",
    body: "We conduct our business with honesty and transparency.",
  },
  {
    title: "Innovation",
    body: "We continuously seek new ways to enhance our offerings and provide added value.",
  },
  {
    title: "Customer Focus",
    body: "Your satisfaction is our top priority.",
  },
  {
    title: "Cultural Appreciation",
    body: "We promote understanding and respect for diverse cultures through our programs.",
  },
];

export default function Values() {
  return (
    <section className="bg-brand-navy py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Our Values</h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-xl sm:h-96">
            <Image
              src="/images/values-office.jpg"
              alt="ETTA team meeting room with world map décor"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <li
                key={value.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-lg font-bold text-brand-orange">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {value.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
