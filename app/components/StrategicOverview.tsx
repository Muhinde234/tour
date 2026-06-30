import Image from "next/image";

const quadrants = [
  {
    title: "Strengths",
    items: [
      "Best prices",
      "Innovative mindset",
      "Recently built platform & website",
      "Strong brand image & equity",
      "Good quality of after-sales support",
      "Very relatable to society",
    ],
  },
  {
    title: "Weaknesses",
    items: [
      "Long-term investment required",
      "Rising product insurance costs",
      "Third-party turnover from price competition",
      "Evolving public policies and procedures",
    ],
  },
  {
    title: "Opportunities",
    items: [
      "Growing demand for guided, organized travel",
      "Expanding study-abroad partnerships",
      "Untapped regional markets",
      "Digital platform for trip planning",
    ],
  },
  {
    title: "Threats",
    items: [
      "High level of employee turnover",
      "New competitors from other countries",
      "Impact of climate change",
      "Pandemic-related travel disruption",
    ],
  },
];

export default function StrategicOverview() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 text-white">
      <Image
        src="/images/strengths-cave-beach.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          Strategic Overview
        </h2>
        <p className="mt-3 max-w-2xl text-white/80">
          Our aim is to make the transition to travel and studying abroad as
          smooth and rewarding as possible — here is an honest look at where
          we stand.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {quadrants.map((quadrant) => (
            <div
              key={quadrant.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-brand-orange">
                {quadrant.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                {quadrant.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-orange">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
