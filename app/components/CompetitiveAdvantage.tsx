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
      "Foster understanding and appreciation of different cultures through travel.",
      "Create opportunities for clients to engage with local communities.",
    ],
  },
  {
    title: "Support Academic & Personal Growth",
    items: [
      "Develop programs that support academic achievements and development.",
      "Offer guidance and resources to help students succeed internationally.",
    ],
  },
];

export default function CompetitiveAdvantage() {
  return (
    <section className="bg-white py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        
        <div className="grid items-start gap-16 lg:grid-cols-12">
          
          {/* LEFT SIDE: Heading & Large Vertical Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="mb-12">
              <span className="mb-4 inline-block font-bold uppercase tracking-[0.4em] text-[#f2a33c] text-sm">
                The ETTA Promise
              </span>
              <h2 className="text-3xl font-black leading-tight text-slate-900 lg:text-4xl">
                What Sets Us <br />
                <span className="text-[#f2a33c]">Apart.</span>
              </h2>
              <p className="mt-6 text-xl text-slate-500 max-w-sm leading-relaxed">
                We don&apos;t just plan trips — we build experiences that change lives through travel and education.
              </p>
            </div>

            {/* Massive Vertical Image */}
            <div className="relative h-[400px] w-full lg:h-[700px]">
              {/* Background Glow */}
              <div className="absolute -left-10 top-10 -z-10 h-full w-full rounded-[4rem] bg-[#f2a33c]/5" />
              
              <div className="h-full w-full overflow-hidden rounded-[4rem] shadow-2xl">
                <Image
                  src="/images/advantage-notebook.jpg"
                  alt="ETTA Planning"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: LARGE STACKED CARDS */}
          <div className="lg:col-span-7 space-y-10 lg:pl-10">
            {advantages.map((adv, index) => (
              <div
                key={adv.title}
                className={`
                  group relative rounded-[3.5rem] border border-slate-100 bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-500
                  hover:shadow-[0_40px_80px_rgba(242,163,60,0.12)] hover:-translate-y-2
                  ${index === 1 ? "lg:ml-[-5%]" : ""} 
                `}
              >
                {/* Background Accent */}
                <div className="absolute right-10 top-10 text-8xl font-black text-slate-50 opacity-[0.03] transition-opacity group-hover:opacity-10">
                  {index + 1}
                </div>

                <h3 className="mb-8 text-3xl font-black text-slate-900 lg:text-4xl">
                  {adv.title}
                </h3>

                <ul className="space-y-6">
                  {adv.items.map((item) => (
                    <li key={item} className="flex items-start gap-5">
                      {/* Custom Checkmark Icon */}
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f2a33c] text-white shadow-lg shadow-[#f2a33c]/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg leading-relaxed text-slate-600 group-hover:text-slate-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Decorative Line */}
                <div className="mt-10 h-1 w-20 rounded-full bg-slate-100 transition-all duration-500 group-hover:w-full group-hover:bg-[#f2a33c]/20" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}