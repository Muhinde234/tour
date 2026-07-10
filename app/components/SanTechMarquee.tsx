"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "SAN Tech", src: "/santech.png" },
  { name: "Partner 1", src: "/images/pattern2.webp" }, // Replace with your actual logo paths
 { name: "Partner 4", src: "/images/pattern1.jpeg" }
];

// Duplicate the list multiple times to ensure a seamless infinite gapless scroll
const scrollingPartners = [...partners, ...partners, ...partners, ...partners];

export default function PartnerMarquee() {
  return (
    <section className="relative overflow-hidden bg-[#fefae0] py-12 border-y border-[#f2a33c]/20">
      {/* Optional Title */}
      <div className="mb-8 text-center">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#f2a33c]/80">
          Our Global Partners
        </h3>
      </div>

      <div className="relative flex items-center">
        {/* Left & Right Fades to make it look like it emerges from nothing */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#fefae0] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#fefae0] to-transparent" />

        <motion.div
          className="flex items-center gap-10"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25, // Adjust speed here
              ease: "linear",
            },
          }}
        >
          {scrollingPartners.map((partner, index) => (
            <div
              key={index}
              className="group flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-[#f2a33c]/20"
            >
              <div className="relative h-16 w-16">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative text background */}
      <div className="pointer-events-none absolute -bottom-4 left-0 w-full text-center opacity-[0.03]">
        <span className="text-9xl font-black uppercase text-[#f2a33c]">Partnership</span>
      </div>
    </section>
  );
}