"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";

const featuredImages = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    alt: "Wedding suit collection",
    category: "Wedding",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    alt: "Business suit",
    category: "Formal",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f6d?w=600&q=80",
    alt: "Professional attire",
    category: "Formal",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Fabric selection",
    category: "Workshop",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
    alt: "Tailoring detail",
    category: "Craft",
    span: "",
  },
];

export default function FeaturedGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i === 0 ? featuredImages.length - 1 : i - 1) : null
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i === featuredImages.length - 1 ? 0 : i + 1) : null
    );

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--section-alt)" }}>
      <div className="container-max">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Our Portfolio"
            title="Featured Gallery"
            subtitle="A glimpse into our finest work — craftsmanship that speaks for itself."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[220px]">
            {featuredImages.map((img, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl overflow-hidden cursor-pointer group ${img.span}`}
                onClick={() => setLightboxIndex(idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/90 text-black text-xs font-semibold px-2.5 py-1 rounded-full">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] border border-[var(--border)] px-6 py-3 rounded-full hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-200 group"
          >
            View Full Gallery
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={featuredImages[lightboxIndex].src}
                  alt={featuredImages[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <button
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                onClick={() => setLightboxIndex(null)}
              >
                <X size={18} />
              </button>
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                onClick={prev}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                onClick={next}
              >
                <ChevronRight size={20} />
              </button>
              <p className="text-center text-white/60 text-sm mt-4">
                {featuredImages[lightboxIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
