import Image from "next/image";

const reasons = [
  {
    title: "Expertise",
    body: "Our team comprises industry experts with extensive knowledge and experience in global travel logistics and international education systems.",
    icon: <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-8.061 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 8.061 3.42 3.42 0 010 4.438 3.42 3.42 0 00-1.946 8.061 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-8.061 3.42 3.42 0 010-4.438z" />,
  },
  {
    title: "Personalized Service",
    body: "We don't believe in one-size-fits-all. We offer customized solutions tailored specifically to your academic goals and travel preferences.",
    icon: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  },
  {
    title: "Global Network",
    body: "Our partnerships with top educational institutions and travel providers worldwide enable us to offer the best opportunities and exclusive experiences.",
    icon: <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-[#f8fafc] py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6">
        
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT SIDE: CASCADING CARDS */}
          <div className="relative z-20 order-2 lg:order-1">
            <div className="mb-12">
              <span className="mb-4 inline-block font-bold uppercase tracking-[0.3em] text-[#f2a33c]">
                The ETTA Advantage
              </span>
              <h2 className="text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
                Why Choose <br /> 
                <span className="text-[#f2a33c]">Our Agency?</span>
              </h2>
            </div>

            <div className="flex flex-col space-y-[-2rem]">
              {reasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className={`
                    group relative flex gap-8 rounded-[3rem] bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 
                    hover:z-30 hover:shadow-[0_40px_80px_rgba(242,163,60,0.15)] hover:-translate-y-2
                    ${index === 1 ? "lg:translate-x-12" : ""}
                    ${index === 2 ? "lg:translate-x-24" : ""}
                  `}
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f2a33c]/10 text-[#f2a33c] transition-colors group-hover:bg-[#f2a33c] group-hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {reason.icon}
                    </svg>
                  </div>
                  
                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-slate-900 group-hover:text-[#f2a33c] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-slate-500">
                      {reason.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: MASSIVE IMAGE WITH BLEED */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 h-[500px] w-full overflow-hidden rounded-[4rem] shadow-2xl lg:h-[850px]">
              <Image
                src="/images/why-choose-collage.png"
                alt="Travel and Education"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f2a33c]/20 via-transparent to-transparent" />
            </div>
            
            {/* Background Decorative Blob */}
            <div className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-[#f2a33c]/10 blur-[100px]" />
          </div>
        </div>

        {/* BOTTOM CTA STRIP - The final closing statement */}
        <div className="relative mt-24 overflow-hidden rounded-[4rem] bg-slate-900 p-12 lg:p-20">
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#f2a33c]/20 blur-[100px]" />
            
            <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
                <div className="max-w-3xl">
                    <h3 className="text-3xl font-bold text-white lg:text-5xl lg:leading-tight">
                        Your adventure starts here. Join us on a journey of discovery, learning, and growth.
                    </h3>
                </div>
                <button className="whitespace-nowrap rounded-full bg-[#f2a33c] px-10 py-5 text-xl font-bold text-white shadow-[0_15px_30px_rgba(242,163,60,0.3)] transition-transform hover:scale-110 active:scale-95">
                    Plan My Trip
                </button>
            </div>
        </div>

      </div>
    </section>
  );
}