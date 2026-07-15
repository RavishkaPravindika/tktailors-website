"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { GuestBookEntry } from "@/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, BookOpen, ZoomIn, Maximize2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GuestBookPage() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [lightboxEntry, setLightboxEntry] = useState<GuestBookEntry | null>(null);

  useEffect(() => {
    const guestbookRef = ref(db, "guestbook");
    const unsubscribe = onValue(guestbookRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: GuestBookEntry[] = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...(val as Omit<GuestBookEntry, "id">),
        })).sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        setEntries(list);
      } else {
        setEntries([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const totalPages = entries.length;

  const goNext = () => {
    if (currentPage < totalPages - 1 && !flipping) {
      setFlipDirection("next");
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => p + 1);
        setFlipping(false);
      }, 500);
    }
  };

  const goPrev = () => {
    if (currentPage > 0 && !flipping) {
      setFlipDirection("prev");
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => p - 1);
        setFlipping(false);
      }, 500);
    }
  };

  // Demo entries for when Firebase isn't connected
  const demoEntries: GuestBookEntry[] = [
    {
      id: "demo1",
      imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
      caption: "Thank you for the wonderful wedding suit! — Rajith",
      uploadedAt: new Date().toISOString(),
    },
    {
      id: "demo2",
      imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80",
      caption: "The uniform fits perfectly! — Nimal",
      uploadedAt: new Date().toISOString(),
    },
  ];

  const displayEntries = entries.length > 0 ? entries : (loading ? [] : demoEntries);
  const totalDisplay = displayEntries.length;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20" style={{ backgroundColor: "var(--hero-bg)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-5">
              <BookOpen className="w-6 h-6 text-white/40" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
              Guest Book
            </h1>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Handwritten words from our valued customers — the most sincere form of appreciation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Book */}
      <section className="section-padding" style={{ backgroundColor: "var(--section-alt)" }}>
        <div className="container-max">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin" />
              <p className="text-[var(--muted)] text-sm">Loading guest book...</p>
            </div>
          ) : totalDisplay === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="w-16 h-16 text-[var(--muted)] mx-auto mb-4 opacity-30" />
              <h3 className="font-serif text-2xl text-[var(--foreground)] mb-2">Guest Book Coming Soon</h3>
              <p className="text-[var(--muted)]">Customer reviews will appear here as they&apos;re uploaded.</p>
            </div>
          ) : (
            <>
              {/* Book UI */}
              <div className="max-w-5xl mx-auto">
                {/* Book container */}
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    minHeight: "500px",
                  }}
                >
                  {/* Book spine effect */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-8 z-10"
                    style={{
                      background: "linear-gradient(to right, rgba(0,0,0,0.15), transparent)",
                    }}
                  />

                  {/* Page number */}
                  <div
                    className="absolute top-5 right-5 z-20 text-xs font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: "var(--muted-bg)", color: "var(--muted)" }}
                  >
                    {currentPage + 1} of {totalDisplay}
                  </div>

                  {/* Page content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{
                        opacity: 0,
                        rotateY: flipDirection === "next" ? 45 : -45,
                        x: flipDirection === "next" ? 40 : -40,
                      }}
                      animate={{ opacity: 1, rotateY: 0, x: 0 }}
                      exit={{
                        opacity: 0,
                        rotateY: flipDirection === "next" ? -45 : 45,
                        x: flipDirection === "next" ? -40 : 40,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{ perspective: "1000px" }}
                      className="flex flex-col md:flex-row items-stretch min-h-[500px]"
                    >
                      {/* Image */}
                      <div
                        className="relative md:w-1/2 min-h-[300px] md:min-h-[500px] cursor-zoom-in group"
                        onClick={() => setLightboxEntry(displayEntries[currentPage])}
                      >
                        <Image
                          src={displayEntries[currentPage].imageUrl}
                          alt={displayEntries[currentPage].caption || "Guest book entry"}
                          fill
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-8 h-8 text-[var(--foreground)]" />
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div
                        className="md:w-1/2 flex flex-col justify-center p-10 border-l"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {/* Decorative lines like paper */}
                        <div className="space-y-3 mb-8">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="h-px"
                              style={{ backgroundColor: "var(--border)", opacity: 0.5 }}
                            />
                          ))}
                        </div>

                        <p className="font-serif text-xs tracking-widest uppercase text-[var(--muted)] mb-4">
                          Customer Message
                        </p>

                        {displayEntries[currentPage].caption && (
                          <blockquote className="font-serif text-xl md:text-2xl text-[var(--foreground)] leading-relaxed italic mb-6">
                            &ldquo;{displayEntries[currentPage].caption}&rdquo;
                          </blockquote>
                        )}

                        <p className="text-xs text-[var(--muted)]">
                          {new Date(displayEntries[currentPage].uploadedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>

                        {displayEntries[currentPage].uploadedBy && (
                          <p className="text-xs text-[var(--muted)] mt-1">
                            — {displayEntries[currentPage].uploadedBy}
                          </p>
                        )}

                        {/* Click to view */}
                        <button
                          onClick={() => setLightboxEntry(displayEntries[currentPage])}
                          className="inline-flex items-center gap-2 mt-8 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                        >
                          <ZoomIn size={14} />
                          View full size
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={goPrev}
                    disabled={currentPage === 0 || flipping}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  {/* Page dots */}
                  <div className="flex gap-1.5">
                    {displayEntries.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setFlipDirection(i > currentPage ? "next" : "prev");
                          setCurrentPage(i);
                        }}
                        className={`rounded-full transition-all duration-200 ${
                          i === currentPage
                            ? "w-6 h-2.5 bg-[var(--foreground)]"
                            : "w-2.5 h-2.5 bg-[var(--border)] hover:bg-[var(--muted)]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goNext}
                    disabled={currentPage === totalDisplay - 1 || flipping}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Thumbnail strip */}
              {displayEntries.length > 1 && (
                <div className="max-w-5xl mx-auto mt-10">
                  <p className="text-xs text-[var(--muted)] uppercase tracking-widest text-center mb-4">All Entries</p>
                  <div className="flex gap-3 overflow-x-auto pb-2 justify-center flex-wrap">
                    {displayEntries.map((entry, i) => (
                      <button
                        key={entry.id}
                        onClick={() => {
                          setFlipDirection(i > currentPage ? "next" : "prev");
                          setCurrentPage(i);
                        }}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                          i === currentPage ? "border-[var(--foreground)] scale-110" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={entry.imageUrl}
                          alt={entry.caption || `Entry ${i + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxEntry && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/97"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxEntry(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-[60vh] flex items-center justify-center">
                <Image
                  src={lightboxEntry.imageUrl}
                  alt={lightboxEntry.caption || "Guest book entry"}
                  width={900}
                  height={700}
                  className="rounded-2xl max-h-[85vh] w-auto max-w-full object-contain"
                  style={{ maxHeight: "85vh" }}
                  unoptimized
                />
              </div>

              {lightboxEntry.caption && (
                <p className="text-center text-white/70 italic mt-4 text-sm">
                  &ldquo;{lightboxEntry.caption}&rdquo;
                </p>
              )}

              <button
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform"
                onClick={() => setLightboxEntry(null)}
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
