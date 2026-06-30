import Image from "next/image";

const marketSize = [
  { label: "Total Available Market", value: "$1.6 Billion", abbr: "TAM" },
  { label: "Serviceable Available Market", value: "$126 Million", abbr: "SAM" },
  { label: "Serviceable Obtainable Market", value: "$181 Million", abbr: "SOM" },
];

const performance = [
  { label: "Years of Experience", value: "15+" },
  { label: "Travel Completed", value: "250+" },
  { label: "Customer Satisfaction", value: "30,000+" },
  { label: "Gross Profit Projection", value: "$192.1M" },
];

const regions = [
  { label: "Africa", value: "43.9%" },
  { label: "America", value: "36.6%" },
  { label: "Asia", value: "19.5%" },
];

export default function Stats() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          ETTA Market Size
        </h2>
        <p className="mt-3 max-w-2xl text-gray-700">
          Market size is the total amount of all sales and customers that can
          be seen directly by stakeholders, used by ETTA to determine the
          potential of our market and business in the future.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {marketSize.map((item) => (
            <div
              key={item.abbr}
              className="rounded-2xl border border-black/5 bg-brand-cyan-light/40 p-6"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-brand-sky">
                {item.abbr}
              </span>
              <p className="mt-2 text-2xl font-extrabold text-brand-navy">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-xl sm:h-96">
            <Image
              src="/images/performance-desk.jpg"
              alt="Team reviewing travel performance analytics on a tablet"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-brand-navy">
              ETTA Performance Overview
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {performance.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-brand-orange/10 p-4"
                >
                  <p className="text-2xl font-extrabold text-brand-orange">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-700">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-brand-navy">
                Clients by Region
              </p>
              <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full">
                <span
                  className="bg-brand-navy"
                  style={{ width: regions[0].value }}
                  title={`${regions[0].label} ${regions[0].value}`}
                />
                <span
                  className="bg-brand-sky"
                  style={{ width: regions[1].value }}
                  title={`${regions[1].label} ${regions[1].value}`}
                />
                <span
                  className="bg-brand-orange"
                  style={{ width: regions[2].value }}
                  title={`${regions[2].label} ${regions[2].value}`}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                {regions.map((region, i) => (
                  <span key={region.label} className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        ["bg-brand-navy", "bg-brand-sky", "bg-brand-orange"][i]
                      }`}
                    />
                    {region.label} — {region.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
