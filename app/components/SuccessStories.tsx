"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Story {
  id: number;
  story: string;
  src: string;
}

const stories: Story[] = [
  {
    id: 1,
    story: "ETTA didn't just help me with my visa; they helped me find a home. The transition to the UK was seamless.",
    src: "/images/success-1.jpg",
  },
  {
    id: 2,
    story: "I was overwhelmed by the application process for Canada. Today, I'm working at a top tech firm in Toronto.",
    src: "/images/success-3.jpg",
  },
  {
    id: 3,
    story: "The cultural appreciation ETTA teaches is real. My study abroad was the most transformative year of my life.",
    src: "/images/success-2.jpg",
  },
  {
    id: 4,
    story: "Professional precision is an understatement. ETTA handled my complex application with ease and care.",
    src: "/images/success-1.jpg",
  },
  {
    id: 5,
    story: "Thanks to ETTA, I am now pursuing my dream degree in Australia with a partial scholarship.",
    src: "/images/success-3.jpg",
  },
];

// Tripling the array ensures a seamless loop on all screen sizes
const marqueeStories = [...stories, ...stories, ...stories];

export default function SuccessStories() {
  return (
    <section id="stories" className="relative overflow-hidden bg-[#FAF9F6] py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        
        {/* HEADER */}
        <div className="relative mb-20 flex flex-col items-center px-6 text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.4em] text-[#f2a33c]">
            Proven Results
          </span>
          <h2 className="text-6xl font-black leading-tight text-slate-900 lg:text-8xl">
            Success <span className="text-[#f2a33c]">Stories.</span>
          </h2>
        </div>

        {/* INFINITE MARQUEE CONTAINER */}
        <div className="group relative flex overflow-hidden py-12">
          <motion.div
            className="flex gap-8 lg:gap-12"
            animate={{
              x: ["0%", "-50%"], // Moves halfway because the list is duplicated
            }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
            // Pause movement when user hovers to allow clicking/reading
            whileHover={{ animationPlayState: "paused" }}
          >
            {marqueeStories.map((story, index) => (
              <FlipCard key={`${story.id}-${index}`} story={story} />
            ))}
          </motion.div>

          {/* Fade edges for better visual blending */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10" />
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="mt-20 px-6 text-center">
          <a
            href="#contact"
            className="inline-block rounded-full bg-[#f2a33c] px-12 py-5 text-xl font-black text-white shadow-[0_20px_40px_rgba(242,163,60,0.3)] transition-all hover:scale-110 hover:rotate-2"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
}

function FlipCard({ story }: { story: Story }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-64 w-64 shrink-0 cursor-pointer [perspective:1000px] lg:h-80 lg:w-80"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full shadow-2xl rounded-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.4, 0, 0.2, 1] 
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE (PHOTO) */}
        <div 
          className="absolute inset-0 h-full w-full overflow-hidden rounded-full border-4 border-white [backface-visibility:hidden]"
        >
          <Image
            src={story.src}
            alt="Success Story"
            fill
            className="object-cover"
          />
          {/* Subtle overlay hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
             <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm">Read Story</span>
          </div>
        </div>

        {/* BACK SIDE (TEXT content) */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-full bg-[#f2a33c] p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <svg className="mb-3 h-6 w-6 text-white/40" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z" />
          </svg>
          <p className="text-sm font-bold leading-relaxed text-slate-900 lg:text-base">
            {story.story}
          </p>
          <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/60">
            Click to Flip back
          </span>
        </div>
      </motion.div>
    </div>
  );
}