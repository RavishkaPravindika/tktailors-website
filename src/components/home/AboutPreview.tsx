import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutPreview() {
  return (
    <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <AnimatedSection direction="right">
            <div className="relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant">
                <Image
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"
                  alt="Master tailor at work"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl flex flex-col items-center justify-center shadow-elegant border"
                style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}
              >
                <span className="font-serif text-4xl font-bold text-[var(--foreground)]">35</span>
                <span className="text-xs text-[var(--muted)] tracking-wider uppercase text-center leading-tight mt-1">Years of<br />Excellence</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="lg:pl-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)] mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight mb-6">
                A Legacy of Fine Tailoring
              </h2>
              <div className="elegant-divider mb-6" />
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                Founded in 1989 by Master Tailor T.K. Karunaratne, T.K. Tailors began as a humble workshop with a singular vision: to craft garments that combine artisanal precision with modern elegance.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-8">
                Three generations later, we remain committed to the same values — every piece is made with the same patience, skill, and personal attention that has earned us the trust of thousands of loyal customers.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { value: "1989", label: "Founded" },
                  { value: "3rd", label: "Generation" },
                  { value: "5000+", label: "Clients Served" },
                  { value: "100%", label: "Satisfaction" },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 pl-4" style={{ borderColor: "var(--border)" }}>
                    <div className="font-serif text-2xl font-bold text-[var(--foreground)]">{item.value}</div>
                    <div className="text-xs text-[var(--muted)] uppercase tracking-wide mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-[var(--background)] font-semibold text-sm rounded-full hover:gap-4 transition-all duration-200 group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
