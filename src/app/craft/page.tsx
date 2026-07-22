import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fabrics } from "@/data/fabrics";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  MapPin,
  Layers,
  Star,
  CheckCircle2,
  MessageSquare,
  Ruler,
  Scissors,
  Hammer,
  UserCheck,
  BookOpen,
  Globe,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Craft",
  description:
    "Discover the fabrics, materials, and tailoring process behind every T.K. Custom Tailors garment — from premium fabric selection to the final perfect fit.",
};

const journeySteps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We understand your requirements, style, and purpose. Every great garment starts with a great conversation.",
  },
  {
    step: "02",
    icon: BookOpen,
    title: "Fabric & Design",
    description:
      "Choose from suitable fabrics, styles, and design details. Our tailors guide you through the full selection.",
  },
  {
    step: "03",
    icon: Ruler,
    title: "Precision Measurement",
    description:
      "We take detailed measurements for a personalized fit, capturing over 20 points on your body.",
  },
  {
    step: "04",
    icon: Scissors,
    title: "Signature Cutting",
    description:
      "Our skilled craftsmen apply our unique cutting techniques — the hallmark of T.K. Custom Tailors.",
  },
  {
    step: "05",
    icon: Hammer,
    title: "Expert Crafting",
    description:
      "The garment is carefully constructed with attention to every detail — from stitching tension to seam finishing.",
  },
  {
    step: "06",
    icon: UserCheck,
    title: "Final Fitting",
    description:
      "We refine the garment to achieve the perfect final fit. You leave with a garment made for you, and only you.",
  },
];

const futurePlans = [
  { icon: Globe, label: "International Enquiries" },
  { icon: MessageSquare, label: "Remote Consultation" },
  { icon: Ruler, label: "Measurement Guidance" },
  { icon: Layers, label: "Fabric Selection Assistance" },
  { icon: Globe, label: "International Delivery" },
];

export default function CraftPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24" style={{ backgroundColor: "var(--hero-bg)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
              Fabric · Technique · Excellence
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
              Our Craft
            </h1>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Every garment we create begins with the right materials and follows a process perfected across three generations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Fabrics & Materials ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="container-max">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Fabrics & Materials"
              title="The Foundation of Every Garment"
              subtitle="Exceptional tailoring begins with exceptional materials. Explore the premium fabrics we work with."
            />
          </AnimatedSection>

          {/* Fabric grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {fabrics.map((fabric, index) => (
              <AnimatedSection key={fabric.id} delay={index * 0.08} className="h-full">
                <div className="card overflow-hidden flex flex-col h-full group">
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={fabric.image}
                      alt={fabric.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Origin badge */}
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "#fff" }}
                    >
                      <MapPin className="w-2.5 h-2.5" />
                      {fabric.origin}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h3 className="font-serif text-xl font-bold text-[var(--foreground)]">
                      {fabric.name}
                    </h3>
                    <div className="elegant-divider" />
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {fabric.description}
                    </p>

                    {/* Attribute pills */}
                    <div className="mt-auto space-y-2 pt-2">
                      {/* Texture */}
                      <div className="flex items-start gap-2">
                        <Layers className="w-3.5 h-3.5 text-[var(--muted)] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                            Texture
                          </span>
                          <p className="text-xs text-[var(--foreground)] leading-snug">{fabric.texture}</p>
                        </div>
                      </div>
                      {/* Quality */}
                      <div className="flex items-start gap-2">
                        <Star className="w-3.5 h-3.5 text-[var(--muted)] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                            Quality
                          </span>
                          <p className="text-xs text-[var(--foreground)] leading-snug">{fabric.quality}</p>
                        </div>
                      </div>
                      {/* Suitable uses */}
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--muted)] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                            Suitable For
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {fabric.suitableFor.map((use) => (
                              <span
                                key={use}
                                className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                                style={{
                                  borderColor: "var(--border)",
                                  color: "var(--foreground)",
                                  backgroundColor: "var(--muted-bg)",
                                }}
                              >
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Digital catalogue coming soon banner */}
          {/* <AnimatedSection delay={0.3}>
            <div
              className="mt-12 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border"
              style={{
                backgroundColor: "var(--section-alt)",
                borderColor: "var(--border)",
              }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)] mb-1">
                  Coming Soon
                </p>
                <h3 className="font-serif text-xl font-bold text-[var(--foreground)]">
                  Digital Fabric Catalogue
                </h3>
                <p className="text-sm text-[var(--muted)] mt-1 max-w-md">
                  Browse our full collection of imported and domestic fabrics online — filter by type, weight, colour, and suitability.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-105 flex-shrink-0"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                Enquire Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection> */}
        </div>
      </section>

      {/* ─── Tailoring Journey ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--section-alt)" }}>
        <div className="container-max">
          <AnimatedSection>
            <SectionHeader
              eyebrow="The Tailoring Journey"
              title="From Vision to Perfect Fit"
              subtitle="Six carefully considered steps — from the first conversation to the moment you slip on a garment made exactly for you."
            />
          </AnimatedSection>

          {/* Steps — alternating timeline on desktop, stacked on mobile */}
          <div className="relative mt-16">
            {/* Centre spine (desktop only) */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-px"
              style={{ backgroundColor: "var(--border)" }}
            />

            <div className="space-y-10 md:space-y-0">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                const isLeft = index % 2 === 0;
                return (
                  <AnimatedSection key={step.step} delay={index * 0.1}>
                    {/* Mobile layout */}
                    <div className="md:hidden flex gap-5 items-start">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2"
                          style={{
                            backgroundColor: "var(--foreground)",
                            borderColor: "var(--foreground)",
                            color: "var(--background)",
                          }}
                        >
                          {step.step}
                        </div>
                        {index < journeySteps.length - 1 && (
                          <div className="w-px flex-1 mt-2 min-h-[2rem]" style={{ backgroundColor: "var(--border)" }} />
                        )}
                      </div>
                      <div className="card p-5 flex-1 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "var(--muted-bg)" }}
                          >
                            <Icon className="w-4 h-4 text-[var(--foreground)]" />
                          </div>
                          <h3 className="font-serif text-base font-bold text-[var(--foreground)]">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop alternating layout */}
                    <div className={`hidden md:flex items-center gap-0 mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                      {/* Card side */}
                      <div className="w-[46%] flex">
                        <div className={`card p-6 w-full ${isLeft ? "mr-auto" : "ml-auto"}`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: "var(--muted-bg)" }}
                            >
                              <Icon className="w-5 h-5 text-[var(--foreground)]" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted)]">
                                Step {step.step}
                              </p>
                              <h3 className="font-serif text-lg font-bold text-[var(--foreground)] leading-tight">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <div className="elegant-divider mb-3" />
                          <p className="text-sm text-[var(--muted)] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Centre dot */}
                      <div className="w-[8%] flex justify-center flex-shrink-0 relative z-10">
                        <div
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: "var(--foreground)",
                            borderColor: "var(--foreground)",
                            color: "var(--background)",
                          }}
                        >
                          {step.step}
                        </div>
                      </div>

                      {/* Empty side */}
                      <div className="w-[46%]" />
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Global Vision ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="container-max">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Where We're Headed"
              title="This Is Where Local Becomes Global"
              subtitle="We are building towards a future where T.K. Custom Tailors excellence reaches customers anywhere in the world."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
            {futurePlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <AnimatedSection key={plan.label} delay={index * 0.08} className="h-full">
                  <div
                    className="card p-6 flex flex-col items-center justify-center text-center gap-3 h-full group hover:shadow-elegant transition-shadow duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                      style={{ backgroundColor: "var(--muted-bg)" }}
                    >
                      <Icon className="w-5 h-5 text-[var(--foreground)]" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                      {plan.label}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding" style={{ backgroundColor: "var(--section-alt)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Ready to Begin?"
              title="Let's Craft Something Exceptional"
              subtitle="Book a consultation with our master tailors and experience the T.K. Custom Tailors difference — from the very first stitch."
            />
            <div className="mt-10 flex gap-4 justify-center flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center px-8 py-4 border rounded-full text-sm font-semibold transition-all duration-200 hover:bg-[var(--muted-bg)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                View Our Gallery
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
