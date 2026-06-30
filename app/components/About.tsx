import Image from "next/image";

const cards = [
  {
    no: "01",
    title: "About Us",
    body: "Welcome to EMMA TOUR AND TRAVEL AGENCY LTD, your trusted partner in tourism and education consultancy. With a passion for exploration and a commitment to educational excellence, we specialize in creating unforgettable travel experiences and facilitating life-changing study abroad opportunities.",
  },
  {
    no: "02",
    title: "Who We Are",
    body: "Founded by a team of seasoned travel enthusiasts and education professionals, ETTA brings together years of expertise in both the tourism and education sectors. Our deep understanding of these fields allows us to offer tailored services that cater to the unique needs and aspirations of our clients.",
  },
  {
    no: "03",
    title: "Vision",
    body: "To be a global leader in the tourism and study abroad industry, recognized for our dedication to quality, innovation, and customer satisfaction. We strive to create a world where travel and education are accessible to all, promoting cross-cultural exchange and global citizenship.",
  },
  {
    no: "04",
    title: "Our Approach",
    body: "At ETTA, we believe in a client-centered approach. We take the time to understand your interests, goals, and preferences, allowing us to craft bespoke solutions that exceed your expectations. Our dedicated team supports you every step of the way.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
          About Us
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-xl sm:h-96">
            <Image
              src="/images/about-santorini.jpg"
              alt="Aerial view of a coastal town with turquoise water, representing ETTA's tourism destinations"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {cards.map((card) => (
              <div key={card.no} className="rounded-xl bg-brand-cyan-light/40 p-5">
                <span className="inline-block rounded-md bg-brand-sky px-2 py-1 text-xs font-bold text-white">
                  {card.no}
                </span>
                <h3 className="mt-3 text-lg font-bold text-brand-navy">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
