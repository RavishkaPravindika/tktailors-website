"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import { GalleryImage } from "@/types";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "formal", label: "Formal" },
  { id: "casual", label: "Casual" },
  { id: "uniforms", label: "Uniforms" },
  { id: "alterations", label: "Alterations" },
  { id: "interior", label: "Shop Interior" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filtered = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const currentIndex = lightboxImage ? filtered.indexOf(lightboxImage) : -1;

  const prev = useCallback(() => {
    if (currentIndex > 0) setLightboxImage(filtered[currentIndex - 1]);
    else setLightboxImage(filtered[filtered.length - 1]);
  }, [currentIndex, filtered]);

  const next = useCallback(() => {
    if (currentIndex < filtered.length - 1) setLightboxImage(filtered[currentIndex + 1]);
    else setLightboxImage(filtered[0]);
  }, [currentIndex, filtered]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24" style={{ backgroundColor: "var(--hero-bg)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
              Portfolio
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
              Our Gallery
            </h1>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              A visual celebration of craftsmanship — each image a testament to our dedication to quality and precision.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="container-max">
          {/* Filter Bar */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    activeCategory === cat.id
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                  )}
                >
                  {cat.label}
                  {activeCategory === cat.id && (
                    <span className="ml-2 text-xs opacity-60">
                      {filtered.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-0"
            >
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  className="break-inside-avoid mb-4 rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setLightboxImage(image)}
                >
                  <div className="relative w-full" style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 transition-transform" />
                    </div>
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 text-black text-xs font-medium px-2 py-0.5 rounded-full capitalize">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--muted)]">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/97"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative max-h-[85vh] flex items-center justify-center">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  width={lightboxImage.width}
                  height={lightboxImage.height}
                  className="object-contain rounded-xl max-h-[85vh] w-auto max-w-full"
                  style={{ maxHeight: "85vh" }}
                />
              </div>

              {/* Caption */}
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm capitalize">{lightboxImage.alt}</p>
                <p className="text-white/30 text-xs mt-1">
                  {currentIndex + 1} / {filtered.length}
                </p>
              </div>

              {/* Controls */}
              <button
                className="absolute -top-2 -right-2 md:top-0 md:right-0 md:translate-x-1/2 md:-translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform z-10"
                onClick={() => setLightboxImage(null)}
              >
                <X size={18} />
              </button>

              {filtered.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                    onClick={(e) => { e.stopPropagation(); next(); }}
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
