"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Scissors } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=85"
          alt="Premium tailor workshop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-white/40" />
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-white/60" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60">
                Est. 1989 · Master Tailors
              </span>
              <Scissors className="w-4 h-4 text-white/60 scale-x-[-1]" />
            </div>
            <div className="h-px w-12 bg-white/40" />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6">
            Crafted for
            <br />
            <span className="italic text-white/80">Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            Three generations of bespoke tailoring mastery. Every stitch tells a story of craftsmanship, precision, and timeless elegance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold text-sm tracking-wide rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Book a Consultation
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white font-semibold text-sm tracking-wide rounded-full hover:bg-white/10 hover:border-white/70 hover:scale-105 transition-all duration-200"
            >
              View Our Work
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-12 mt-16 pt-8 border-t border-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {[
              { value: "35+", label: "Years Experience" },
              { value: "5000+", label: "Happy Clients" },
              { value: "3", label: "Generations" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </section>
  );
}
