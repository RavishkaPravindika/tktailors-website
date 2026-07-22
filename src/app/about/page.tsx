import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { Eye, Target, Heart, Award, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about T.K. Custom Tailors — three generations of master tailoring excellence since 1970. Discover our story, values, and commitment to craftsmanship.",
};

const timelineEvents = [
  {
    year: "1970",
    title: "The Beginning",
    description:
      "T.K. Karunaratne founded T.K. Tailors with a small workshop and a big dream — to bring precision tailoring to every customer.",
  },
  {
    year: "1998",
    title: "Growing Reputation",
    description:
      "Word spread fast. Within a decade, T.K. Tailors had become the go-to tailor for weddings, corporate events, and school uniforms across the region.",
  },
  {
    year: "2005",
    title: "Expanding the Workshop",
    description:
      "Growing demand required a larger space. The workshop expanded with modern equipment while preserving the artisanal techniques that defined our quality.",
  },
  {
    year: "2012",
    title: "Second Generation Joins",
    description:
      "Pravinda Karunaratne joined the family business, bringing fresh perspectives and modern design sensibilities while honoring traditional techniques.",
  },
  {
    year: "2018",
    title: "Award for Excellence",
    description:
      "T.K. Tailors was recognized among the finest tailoring establishments in the region, a testament to our unwavering commitment to quality.",
  },
  {
    year: "2024",
    title: "Three Generations Strong",
    description:
      "Today, the third generation is involved in the business. We continue our legacy with the same passion, precision, and personal touch that started it all.",
  },
];

const values = [
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become a globally trusted Sri Lankan tailoring brand, renowned for timeless craftsmanship, perfect fit, and excellence without compromise.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To craft exceptional garments through generations of expertise, precision, and innovation, creating confidence and individuality for every customer, everywhere.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Craftsmanship, integrity, customer-first service, and a deep respect for the art of tailoring. We believe a perfectly fitted garment has the power to transform how you feel and how you present yourself to the world.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundColor: "var(--hero-bg)" }}
      >
        <div className="container-max relative z-10">
          <AnimatedSection className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
              Est. 1970
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">
              Our Story
            </h1>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Three generations. One unwavering commitment to the art of tailoring.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story section */}
      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80"
                    alt="Master tailor at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"
                    alt="Premium fabric selection"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={0.1}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--muted)] mb-4">The Founding Story</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-5">
                A Legacy of Craftsmanship. Three Generations of Excellence.
              </h2>
              <div className="elegant-divider mb-6" />
              <div className="space-y-4 text-[var(--muted)] leading-relaxed">
                <p>
                  Established in 1950 as T.K. Custom Tailors by our founder, Thenkutti Suvinel Silva, our journey began with a passion for craftsmanship, precision, and the art of creating garments that reflect individuality.
                </p>
                <p>
                  Through the years, the legacy was carried forward by the second generation, Thenkutti Karunasena Silva, preserving the values and expertise that shaped the foundation of the business. Today, under the leadership of the third generation, CEO Thenkutti Dumindu Shemal Silva, the business continues to evolve while remaining deeply rooted in its heritage.
                </p>
                <p>
                  From its humble beginnings as a small tailoring shop, T.K. Custom Tailors has grown into a premium tailoring business offering a diverse range of custom clothing solutions, including bespoke suits, formalwear, wedding attire, corporate uniforms, school uniforms, ladies’ tailoring, and professional alterations.
                </p>
                <p>
                  Our identity is built on generations of experience, unique cutting techniques, precise craftsmanship, premium quality, and a commitment to creating garments that are truly individual. Every piece we create carries not only the skill of our craftsmen, but also the legacy of the family behind the name.
                </p>
                <p>
                  As we move forward as TK Tailors (Pvt) Ltd, our vision is to take this three-generation legacy beyond borders and establish a globally recognized Sri Lankan tailoring brand—bringing our craftsmanship, creativity, and commitment to excellence to customers around the world.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: Award, value: "56+", label: "Years" },
                  { icon: Users, value: "100K+", label: "Clients" },
                  { icon: Clock, value: "3rd", label: "Generation" },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center p-4 rounded-xl" style={{ backgroundColor: "var(--section-alt)" }}>
                      <Icon className="w-5 h-5 text-[var(--muted)] mx-auto mb-2" />
                      <div className="font-serif text-2xl font-bold text-[var(--foreground)]">{stat.value}</div>
                      <div className="text-xs text-[var(--muted)] uppercase tracking-wide">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" style={{ backgroundColor: "var(--section-alt)" }}>
        <div className="container-max">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Our Journey"
              title="A Timeline of Excellence"
              subtitle="Key milestones that have shaped T.K. Tailors into the institution it is today."
            />
          </AnimatedSection>

          <div className="relative mt-16">
            {/* Vertical line */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{ backgroundColor: "var(--border)" }}
            />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <AnimatedSection key={event.year} delay={index * 0.08}>
                  <div className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-12 md:pl-0`}>
                    {/* Year bubble (desktop centered) */}
                    <div className="absolute left-0 md:left-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center md:-translate-x-1/2 z-10"
                      style={{ backgroundColor: "var(--foreground)", borderColor: "var(--foreground)" }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[var(--background)]" />
                    </div>

                    {/* Content */}
                    <div className={`md:w-[45%] ${index % 2 === 0 ? "md:text-right" : "md:ml-auto"}`}>
                      <div className="card p-6">
                        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--muted)] mb-2">{event.year}</p>
                        <h3 className="font-serif text-xl font-bold text-[var(--foreground)] mb-2">{event.title}</h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="container-max">
          <AnimatedSection>
            <SectionHeader
              eyebrow="What Drives Us"
              title="Vision, Mission & Values"
              subtitle="The principles that guide every stitch, every fitting, and every relationship we build."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title} delay={index * 0.1}>
                  <div className="card p-8 h-full text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: "var(--muted-bg)" }}
                    >
                      <Icon className="w-6 h-6 text-[var(--foreground)]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[var(--foreground)] mb-4">{value.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{value.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop photos */}
      <section className="section-padding" style={{ backgroundColor: "var(--section-alt)" }}>
        <div className="container-max">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Our Workshop"
              title="Where Craftsmanship Lives"
              subtitle="Step inside our workshop — a space where tradition meets modern precision."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {[
              { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", alt: "Shop interior" },
              { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", alt: "Tailoring workshop" },
              { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", alt: "Suit display" },
              { src: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80", alt: "Shirt tailoring" },
              { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Fabric collection" },
              { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80", alt: "Detail work" },
            ].map((img, index) => (
              <AnimatedSection key={img.src} delay={index * 0.07}>
                <div className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
