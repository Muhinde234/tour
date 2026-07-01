import Image from "next/image";

const cards = [
  {
    no: "01",
    title: "About Us",
    body: "Welcome to EMMA TOUR AND TRAVEL AGENCY LTD, your trusted partner in tourism and education consultancy. We specialize in creating unforgettable travel experiences and facilitating life-changing study abroad opportunities.",
  },
  {
    no: "02",
    title: "Who We Are",
    body: "Founded by a team of seasoned travel enthusiasts and education professionals, ETTA brings together years of expertise. Our deep understanding allows us to offer tailored services for unique needs.",
  },
  {
    no: "03",
    title: "Our Vision",
    body: "To be a global leader in the tourism and study abroad industry, recognized for our dedication to quality. We strive to create a world where travel and education are accessible to all.",
  },
  {
    no: "04",
    title: "Our Approach",
    body: "At ETTA, we believe in a client-centered approach. We take the time to understand your goals and preferences, allowing us to craft bespoke solutions that exceed your expectations.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#FAF9F6] py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          
    
          <div className="relative lg:col-span-5">
          
            <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-[#f2a33c]/10 blur-3xl" />
            
            <div className="relative z-10 h-[500px] w-full overflow-hidden rounded-[3rem] shadow-2xl lg:h-[750px]">
              <Image
                src="/images/about-santorini.jpg" 
                alt="Travel Destination"
                fill
                priority
                className="object-cover transition-transform duration-1000 hover:scale-110"
              />
              {/* Orange Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#f2a33c]/40 via-transparent to-transparent" />
            </div>
            
            {/* Floating Experience Badge (Matching your button color) */}
            <div className="absolute -bottom-6 -right-6 z-30 flex flex-col items-center justify-center rounded-3xl bg-[#f2a33c] p-8 text-white shadow-[0_20px_50px_rgba(242,163,60,0.4)]">
              <span className="text-5xl font-black">15+</span>
              <span className="text-xs font-bold uppercase tracking-widest opacity-90">
                Years of <br /> Excellence
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Heavy Overlapping Cards */}
          <div className="relative lg:col-span-7 lg:pl-10">
            <div className="mb-16">
              <span className="mb-4 inline-block font-bold uppercase tracking-[0.2em] text-[#f2a33c]">
                Get to know us
              </span>
              <h2 className="text-5xl font-black leading-tight text-brand-navy lg:text-6xl">
                Explore the World <br />
                <span className="text-[#f2a33c]">With Confidence.</span>
              </h2>
              <div className="mt-6 h-1.5 w-24 rounded-full bg-[#f2a33c]" />
            </div>

            {/* The Overlap Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-0">
              {cards.map((card, index) => (
                <div
                  key={card.no}
                  className={`
                    group relative flex min-h-[320px] flex-col justify-between rounded-[2.5rem] bg-white p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(242,163,60,0.15)]
                    ${index === 0 ? "lg:z-10 lg:mb-6" : ""}
                    ${index === 1 ? "lg:z-20 lg:ml-[-10%] lg:mt-24" : ""}
                    ${index === 2 ? "lg:z-30 lg:mt-[-10%]" : ""}
                    ${index === 3 ? "lg:z-40 lg:ml-[-15%] lg:mt-12" : ""}
                  `}
                >
                  {/* Card Header: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black text-[#f2a33c]/20 transition-colors group-hover:text-[#f2a33c]/40">
                      {card.no}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2a33c]/10 text-[#f2a33c] transition-colors group-hover:bg-[#f2a33c] group-hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-brand-navy">
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-500 group-hover:text-gray-700">
                      {card.body}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-10 left-10 right-10 h-0.5 bg-gray-100 group-hover:bg-[#f2a33c]/30" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}