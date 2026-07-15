"use client";

import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-gray-300 text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const elfsightWidgetId = process.env.NEXT_PUBLIC_ELFSIGHT_WIDGET_ID;

  useEffect(() => {
    if (elfsightWidgetId) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.dataset.useServiceCore = "defer";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [elfsightWidgetId]);

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
      <div className="container-max">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Google Reviews"
            title="Our Customers Say"
            subtitle="Real experiences from our valued customers — their satisfaction is our greatest achievement."
          />
        </AnimatedSection>

        {/* Reviews Grid or Elfsight Widget */}
        {elfsightWidgetId ? (
          <div className="mt-10 min-h-[300px] flex justify-center w-full">
            <div className={`elfsight-app-${elfsightWidgetId} w-full`} data-elfsight-app-lazy></div>
          </div>
        ) : (
          <div ref={ref} className="text-center text-[var(--muted)]">Loading Google Reviews...</div>
        )}

        {/* CTAs to Google */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="https://maps.app.goo.gl/LesCBGYXMc33oGb59"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] border border-[var(--border)] px-6 py-3 rounded-full hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-200 group"
          >
            View all Google Reviews
            <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* <a
            href="https://search.google.com/local/writereview?placeid=ChIJg_ar72Mu4joRs8YjkwN5t5I"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--background)] bg-[var(--foreground)] px-6 py-3 rounded-full hover:opacity-90 transition-all duration-200 group"
          >
            Write a Review
            <Star size={15} className="fill-current" />
          </a> */}
        </div>
      </div>
    </section>
  );
}
