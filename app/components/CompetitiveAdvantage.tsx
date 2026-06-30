import Image from "next/image";

const advantages = [
  {
    title: "Enhance Customer Experience",
    items: [
      "Provide personalized and high-quality travel and study abroad services.",
      "Continuously improve customer service to exceed client expectations.",
      "Offer diverse and unique travel and educational experiences.",
    ],
  },
  {
    title: "Promote Cultural Exchange",
    items: [
      "Foster understanding and appreciation of different cultures through travel and study abroad programs.",
      "Create opportunities for clients to engage with local communities and cultures.",
    ],
  },
  {
    title: "Support Academic and Personal Growth",
    items: [
      "Develop comprehensive study abroad programs that support academic achievements and personal development.",
      "Offer guidance and resources to help students succeed in their international studies.",
    ],
  },
];

export default function CompetitiveAdvantage() {
  return (
    <section className="bg-brand-cyan-light/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          ETTA Competitive Advantage
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-brand-navy">
                  {adv.title}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {adv.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-brand-orange">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-xl sm:h-96">
            <Image
              src="/images/advantage-notebook.jpg"
              alt="Notebook, laptop, and phone on a desk symbolizing ETTA's planning process"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
