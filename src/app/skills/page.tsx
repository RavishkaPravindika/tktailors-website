import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { skills } from "@/data/skills";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Explore the full range of tailoring skills at T.K. Tailors — from bespoke suit design to expert alterations, traditional clothing, and premium stitching techniques.",
};

export default function SkillsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24" style={{ backgroundColor: "var(--foreground)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
              Expertise & Mastery
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
              Our Skills
            </h1>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              A craft perfected over three generations — every technique refined through years of practice and passion.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20" style={{ backgroundColor: "var(--background)" }}>
        <div className="container-max">
          {skills.map((skill, index) => {
            const isEven = index % 2 === 0;
            return (
              <AnimatedSection key={skill.id} delay={0.05}>
                <div
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? "lg:flex-row-reverse" : ""} mb-24 last:mb-0`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant group">
                      <Image
                        src={skill.image}
                        alt={skill.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="w-full lg:w-1/2">
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)] mb-3">
                      Skill #{String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
                      {skill.title}
                    </h2>
                    <div className="elegant-divider mb-5" />
                    <p className="text-[var(--muted)] leading-relaxed mb-6">{skill.description}</p>

                    <div className="space-y-3">
                      {skill.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[var(--foreground)] flex-shrink-0" />
                          <span className="text-sm text-[var(--foreground)]">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {index < skills.length - 1 && (
                  <hr className="mb-24" style={{ borderColor: "var(--border)" }} />
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "var(--section-alt)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Ready to Begin?"
              title="Let's Create Something Beautiful"
              subtitle="Book a consultation with our master tailors and experience the T.K. Tailors difference."
            />
            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-semibold text-sm rounded-full hover:opacity-90 transition-all duration-200 hover:scale-105"
              >
                Book a Consultation
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center px-8 py-4 border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm rounded-full hover:bg-[var(--muted-bg)] transition-all duration-200"
              >
                View Our Gallery
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
