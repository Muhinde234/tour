import Image from "next/image";

const reasons = [
  {
    title: "Expertise",
    body: "Our team comprises industry experts with extensive knowledge and experience.",
    tone: "bg-brand-navy",
  },
  {
    title: "Personalized Service",
    body: "We offer customized solutions tailored to your specific needs and preferences.",
    tone: "bg-brand-sky",
  },
  {
    title: "Global Network",
    body: "Our partnerships with top educational institutions and travel providers worldwide enable us to offer the best opportunities and experiences.",
    tone: "bg-brand-cyan-light",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          Why Choose Us?
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className={`rounded-xl p-6 ${reason.tone} ${
                  reason.tone === "bg-brand-cyan-light"
                    ? "text-brand-navy"
                    : "text-white"
                }`}
              >
                <h3 className="text-lg font-bold">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-90">
                  {reason.body}
                </p>
              </div>
            ))}
          </div>

          <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-xl sm:h-96">
            <Image
              src="/images/why-choose-collage.png"
              alt="Illustration of an airplane flying over world landmarks including the Eiffel Tower and the Leaning Tower of Pisa"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-gray-700 leading-relaxed">
          At EMMA TOUR AND TRAVEL AGENCY LTD we are dedicated to helping you
          explore the world and achieve your educational dreams. Join us on a
          journey of discovery, learning, and growth. Your adventure starts
          here!
        </p>
      </div>
    </section>
  );
}
