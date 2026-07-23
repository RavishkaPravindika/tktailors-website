"use client";

import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { GuestBookEntry } from "@/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
  ZoomIn,
  Maximize2,
  Bookmark,
  Sparkles,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GuestBookPage() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [lightboxEntry, setLightboxEntry] = useState<GuestBookEntry | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive breakpoint detector for 2-page desktop vs 1-page mobile/tab
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const guestbookRef = ref(db, "guestbook");
    const unsubscribe = onValue(guestbookRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list: GuestBookEntry[] = Object.entries(data)
          .map(([key, val]) => ({
            id: key,
            ...(val as Omit<GuestBookEntry, "id">),
          }))
          .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        setEntries(list);
      } else {
        setEntries([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Demo entries for when Firebase data isn't loaded
  const demoEntries: GuestBookEntry[] = [
    {
      id: "demo1",
      imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
      caption:
        "The bespoke suit crafted for my wedding was absolute perfection! The attention to detail and fit surpassed all expectations. Thank you T.K. Tailors!",
      uploadedAt: new Date(2025, 10, 14).toISOString(),
      uploadedBy: "Rajith Wickramasinghe",
    },
    {
      id: "demo2",
      imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
      caption:
        "Outfitted our entire corporate executive team with custom blazers. Incredible craftsmanship and prompt service throughout.",
      uploadedAt: new Date(2025, 11, 20).toISOString(),
      uploadedBy: "Nimal Fernando",
    },
    {
      id: "demo3",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      caption:
        "Three generations of mastery shows in every stitch. My linen summer suit is hands down the best garment in my wardrobe.",
      uploadedAt: new Date(2026, 1, 5).toISOString(),
      uploadedBy: "Duminda Silva",
    },
    {
      id: "demo4",
      imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f6d?w=800&q=80",
      caption:
        "The alteration work on my grandfather's vintage coat made it fit like it was sewn yesterday. Master class tailoring!",
      uploadedAt: new Date(2026, 2, 12).toISOString(),
      uploadedBy: "Kamal Perera",
    },
  ];

  const displayEntries = entries.length > 0 ? entries : loading ? [] : demoEntries;
  const totalDisplay = displayEntries.length;
  const step = isDesktop ? 2 : 1;

  const turnPage = (dir: "next" | "prev") => {
    if (flipping) return;
    if (dir === "next" && currentPage + step < totalDisplay) {
      setFlipDirection("next");
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => Math.min(p + step, totalDisplay - 1));
        setFlipping(false);
      }, 550);
    } else if (dir === "prev" && currentPage > 0) {
      setFlipDirection("prev");
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage((p) => Math.max(0, p - step));
        setFlipping(false);
      }, 550);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") turnPage("next");
      if (e.key === "ArrowLeft") turnPage("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalDisplay, flipping, isDesktop]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) turnPage("next");
    if (isRightSwipe) turnPage("prev");

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Ensure currentPage is even index when switching to desktop mode
  useEffect(() => {
    if (isDesktop && currentPage % 2 !== 0) {
      setCurrentPage((p) => p - 1);
    }
  }, [isDesktop]);

  const leftEntry = displayEntries[currentPage] || null;
  const rightEntry = isDesktop && currentPage + 1 < totalDisplay ? displayEntries[currentPage + 1] : null;

  // Next targets for middle spine flip animation
  const nextLeftEntry = isDesktop && currentPage + 2 < totalDisplay ? displayEntries[currentPage + 2] : null;
  const nextRightEntry = isDesktop && currentPage + 3 < totalDisplay ? displayEntries[currentPage + 3] : null;

  // Single Entry Card component inside book page
  const BookPageContent = ({ entry, pageNum }: { entry: GuestBookEntry | null; pageNum: number }) => {
    if (!entry) {
      return (
        <div className="w-full flex flex-col items-center justify-center p-8 text-center min-h-[460px] opacity-40">
          <BookOpen className="w-12 h-12 text-[var(--muted)] mb-3" />
          <p className="font-serif text-lg text-[var(--foreground)]">End of Guest Book</p>
          <p className="text-xs text-[var(--muted)] mt-1">T.K. Custom Tailors</p>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col justify-between h-full p-4 sm:p-6 md:p-8">
        {/* Page Top Header */}
        <div className="flex items-center justify-between mb-2 relative z-10">
          <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--muted)] opacity-70">
            PAGE #{String(pageNum).padStart(2, "0")}
          </div>
          <div className="text-xs text-[var(--muted)] font-serif font-medium">
            {new Date(entry.uploadedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Main Image Area (Single Image Per Page) */}
        <div
          className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[350px] rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] bg-black/5 cursor-pointer group my-2 relative z-10"
          onClick={() => setLightboxEntry(entry)}
        >
          <Image
            src={entry.imageUrl}
            alt={entry.caption || `Guest book page ${pageNum}`}
            fill
            className="object-contain p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 px-3.5 py-1.5 rounded-full bg-black/75 text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-sm">
              <Maximize2 className="w-3.5 h-3.5" />
              Inspect
            </div>
          </div>
        </div>

        {/* Caption Directly Under Image */}
        <div className="relative z-10 mt-3 text-center flex flex-col items-center justify-center">
          {entry.caption && (
            <blockquote className="font-serif text-sm sm:text-base text-[var(--foreground)] leading-relaxed italic text-center max-w-xl mx-auto my-1">
              &ldquo;{entry.caption}&rdquo;
            </blockquote>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20" style={{ backgroundColor: "var(--hero-bg)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-5">
              <BookOpen className="w-6 h-6 text-white/50" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
              Guest Book
            </h1>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Handwritten notes, heartfelt messages, and valued memories from our clients across generations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive 3D Middle-Spine Book Experience */}
      <section className="section-padding overflow-hidden" style={{ backgroundColor: "var(--section-alt)" }}>
        <div className="container-max">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-28 gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[var(--foreground)] animate-spin" />
              <p className="text-[var(--muted)] text-sm font-medium">Opening Guest Book...</p>
            </div>
          ) : totalDisplay === 0 ? (
            <div className="text-center py-28 card max-w-lg mx-auto p-12">
              <BookOpen className="w-16 h-16 text-[var(--muted)] mx-auto mb-4 opacity-40" />
              <h3 className="font-serif text-2xl text-[var(--foreground)] mb-2">Guest Book Coming Soon</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                Handwritten customer entries and reviews will be displayed here as they are added.
              </p>
            </div>
          ) : (
            <div className={isDesktop ? "max-w-6xl mx-auto" : "max-w-xl mx-auto"}>
              {/* Top Hint & Mode Indicator Bar */}
              <div className="flex items-center justify-between mb-6 px-2 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span className="hidden sm:inline">
                    {isDesktop ? "2-page open book spread — turning flips over the middle spine" : "Use swipe, arrow keys, or buttons to flip pages"}
                  </span>
                  <span className="sm:hidden">Swipe or tap buttons to flip</span>
                </div>
                <div className="font-medium bg-[var(--muted-bg)] px-3 py-1 rounded-full border border-[var(--border)]">
                  {isDesktop
                    ? `Pages ${currentPage + 1}${rightEntry ? `–${currentPage + 2}` : ""} of ${totalDisplay}`
                    : `Page ${currentPage + 1} of ${totalDisplay}`}
                </div>
              </div>

              {/* Theme-Adaptive Book Frame */}
              <div
                className="relative rounded-3xl p-3 sm:p-5 shadow-2xl border transition-colors duration-300 select-none"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--card-shadow)",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Inner Border Line matching Theme */}
                <div
                  className="rounded-2xl border p-1.5 sm:p-2 relative overflow-hidden"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--muted-bg)",
                  }}
                >
                  {/* Bookmark Ribbon */}
                  <div
                    className="absolute top-0 left-8 sm:left-1/2 sm:-ml-3 w-5 h-20 sm:h-28 z-40 rounded-b-md shadow-md pointer-events-none transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                      borderBottom: "3px solid #b91c1c",
                    }}
                  >
                    <div className="w-full h-full flex items-end justify-center pb-2">
                      <Bookmark className="w-3 h-3 text-amber-300/80" />
                    </div>
                  </div>

                  {/* Book Open Page Container (3D Perspective Viewport) */}
                  <div
                    className="relative rounded-xl overflow-hidden min-h-[500px] sm:min-h-[560px] flex items-stretch border"
                    style={{
                      borderColor: "var(--border)",
                      perspective: "2200px",
                      transformStyle: "preserve-3d",
                      backgroundColor: "var(--background)",
                    }}
                  >
                    {/* Spine Divider Shadow down the middle */}
                    {isDesktop && (
                      <div
                        className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-30 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.02) 45%, rgba(0,0,0,0.02) 55%, rgba(0,0,0,0.14) 100%)",
                        }}
                      />
                    )}

                    {/* ─── DESKTOP 2-PAGE SPREAD WITH MIDDLE-SPINE LEAF FLIP ─── */}
                    {isDesktop ? (
                      <div className="w-full flex flex-row items-stretch min-h-[500px] sm:min-h-[560px] relative">
                        {/* Static Left Page */}
                        <div
                          className="w-1/2 border-r flex flex-col relative"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <BookPageContent entry={leftEntry} pageNum={currentPage + 1} />
                        </div>

                        {/* Static Right Page */}
                        <div className="w-1/2 flex flex-col relative">
                          <BookPageContent entry={rightEntry} pageNum={currentPage + 2} />
                        </div>

                        {/* ─── DYNAMIC 3D LEAF FLIPPING ACROSS MIDDLE SPINE ─── */}
                        <AnimatePresence>
                          {flipping && flipDirection === "next" && (
                            <motion.div
                              key="flip-next"
                              initial={{ rotateY: 0 }}
                              animate={{ rotateY: -180 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 0.55,
                                ease: [0.645, 0.045, 0.355, 1.0],
                              }}
                              className="absolute top-0 bottom-0 left-1/2 w-1/2 z-40 border-l pointer-events-none"
                              style={{
                                transformOrigin: "left center",
                                transformStyle: "preserve-3d",
                                borderColor: "var(--border)",
                              }}
                            >
                              {/* Front Face of Turning Leaf (Current Right Page) */}
                              <div
                                className="absolute inset-0 border-r"
                                style={{
                                  backgroundColor: "var(--background)",
                                  borderColor: "var(--border)",
                                  backfaceVisibility: "hidden",
                                  WebkitBackfaceVisibility: "hidden",
                                }}
                              >
                                <BookPageContent entry={rightEntry} pageNum={currentPage + 2} />
                              </div>

                              {/* Back Face of Turning Leaf (New Left Page) */}
                              <div
                                className="absolute inset-0 border-l"
                                style={{
                                  backgroundColor: "var(--background)",
                                  borderColor: "var(--border)",
                                  backfaceVisibility: "hidden",
                                  WebkitBackfaceVisibility: "hidden",
                                  transform: "rotateY(180deg)",
                                }}
                              >
                                <BookPageContent entry={nextLeftEntry} pageNum={currentPage + 3} />
                              </div>
                            </motion.div>
                          )}

                          {flipping && flipDirection === "prev" && (
                            <motion.div
                              key="flip-prev"
                              initial={{ rotateY: 0 }}
                              animate={{ rotateY: 180 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 0.55,
                                ease: [0.645, 0.045, 0.355, 1.0],
                              }}
                              className="absolute top-0 bottom-0 right-1/2 w-1/2 z-40 border-r pointer-events-none"
                              style={{
                                transformOrigin: "right center",
                                transformStyle: "preserve-3d",
                                borderColor: "var(--border)",
                              }}
                            >
                              {/* Front Face of Turning Leaf (Current Left Page) */}
                              <div
                                className="absolute inset-0 border-l"
                                style={{
                                  backgroundColor: "var(--background)",
                                  borderColor: "var(--border)",
                                  backfaceVisibility: "hidden",
                                  WebkitBackfaceVisibility: "hidden",
                                }}
                              >
                                <BookPageContent entry={leftEntry} pageNum={currentPage + 1} />
                              </div>

                              {/* Back Face of Turning Leaf (Previous Right Page) */}
                              <div
                                className="absolute inset-0 border-r"
                                style={{
                                  backgroundColor: "var(--background)",
                                  borderColor: "var(--border)",
                                  backfaceVisibility: "hidden",
                                  WebkitBackfaceVisibility: "hidden",
                                  transform: "rotateY(-180deg)",
                                }}
                              >
                                <BookPageContent
                                  entry={displayEntries[currentPage - 1] || null}
                                  pageNum={currentPage}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* ─── MOBILE / TABLET SINGLE PAGE VIEW ─── */
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentPage}
                          initial={{
                            rotateY: flipDirection === "next" ? 70 : -70,
                            opacity: 0,
                            scale: 0.98,
                          }}
                          animate={{
                            rotateY: 0,
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            rotateY: flipDirection === "next" ? -70 : 70,
                            opacity: 0,
                            scale: 0.98,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                          className="w-full flex flex-col items-stretch min-h-[500px] sm:min-h-[560px]"
                          style={{
                            backgroundColor: "var(--background)",
                            transformOrigin:
                              flipDirection === "next" ? "left center" : "right center",
                          }}
                        >
                          <BookPageContent entry={leftEntry} pageNum={currentPage + 1} />
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {/* Page Edge Click Zones */}
                    <button
                      onClick={() => turnPage("prev")}
                      disabled={currentPage === 0 || flipping}
                      className="hidden md:flex absolute left-0 top-0 bottom-0 w-14 items-center justify-start pl-3 z-50 opacity-0 hover:opacity-100 transition-opacity disabled:pointer-events-none group"
                      aria-label="Previous Page"
                    >
                      <div className="w-9 h-9 rounded-full bg-black/75 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <ChevronLeft className="w-5 h-5" />
                      </div>
                    </button>
                    <button
                      onClick={() => turnPage("next")}
                      disabled={currentPage + step >= totalDisplay || flipping}
                      className="hidden md:flex absolute right-0 top-0 bottom-0 w-14 items-center justify-end pr-3 z-50 opacity-0 hover:opacity-100 transition-opacity disabled:pointer-events-none group"
                      aria-label="Next Page"
                    >
                      <div className="w-9 h-9 rounded-full bg-black/75 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Book Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
                <button
                  onClick={() => turnPage("prev")}
                  disabled={currentPage === 0 || flipping}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    backgroundColor: "var(--foreground)",
                    color: "var(--background)",
                  }}
                >
                  <ChevronLeft size={18} />
                  Turn Back
                </button>

                {/* Page Indicator Dots */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full py-2">
                  {Array.from({
                    length: isDesktop ? Math.ceil(totalDisplay / 2) : totalDisplay,
                  }).map((_, idx) => {
                    const pageIndex = isDesktop ? idx * 2 : idx;
                    const isActive = isDesktop
                      ? currentPage === pageIndex || currentPage === pageIndex + 1
                      : currentPage === pageIndex;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (currentPage === pageIndex || flipping) return;
                          setFlipDirection(pageIndex > currentPage ? "next" : "prev");
                          setFlipping(true);
                          setTimeout(() => {
                            setCurrentPage(pageIndex);
                            setFlipping(false);
                          }, 550);
                        }}
                        aria-label={`Go to page ${pageIndex + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-8 h-2.5 bg-[var(--foreground)]"
                            : "w-2.5 h-2.5 bg-[var(--border)] hover:bg-[var(--muted)]"
                        }`}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={() => turnPage("next")}
                  disabled={currentPage + step >= totalDisplay || flipping}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    backgroundColor: "var(--foreground)",
                    color: "var(--background)",
                  }}
                >
                  Next Page
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Thumbnail Strip */}
              {displayEntries.length > 1 && (
                <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
                  <p className="text-xs text-[var(--muted)] uppercase tracking-widest font-semibold mb-4">
                    Quick Page Selector ({totalDisplay} Entries)
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-3 justify-start sm:justify-center">
                    {displayEntries.map((entry, i) => {
                      const isSelected = isDesktop
                        ? i === currentPage || i === currentPage + 1
                        : i === currentPage;

                      return (
                        <button
                          key={entry.id}
                          onClick={() => {
                            const targetPage = isDesktop ? Math.floor(i / 2) * 2 : i;
                            if (targetPage === currentPage || flipping) return;
                            setFlipDirection(targetPage > currentPage ? "next" : "prev");
                            setFlipping(true);
                            setTimeout(() => {
                              setCurrentPage(targetPage);
                              setFlipping(false);
                            }, 550);
                          }}
                          className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                            isSelected
                              ? "border-[var(--foreground)] scale-110 shadow-md ring-2 ring-amber-500/40"
                              : "border-transparent opacity-60 hover:opacity-100"
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
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxEntry && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxEntry(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full flex flex-col items-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[80vh] flex items-center justify-center">
                <Image
                  src={lightboxEntry.imageUrl}
                  alt={lightboxEntry.caption || "Guest book entry image"}
                  width={1000}
                  height={800}
                  className="rounded-2xl max-h-[80vh] w-auto max-w-full object-contain shadow-2xl"
                  unoptimized
                />
              </div>

              {lightboxEntry.caption && (
                <p className="text-center text-white/80 font-serif italic mt-5 text-base sm:text-lg max-w-2xl leading-relaxed">
                  &ldquo;{lightboxEntry.caption}&rdquo;
                </p>
              )}

              <button
                className="absolute -top-4 -right-4 sm:top-2 sm:right-2 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                onClick={() => setLightboxEntry(null)}
                aria-label="Close image"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
