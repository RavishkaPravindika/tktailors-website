"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Scissors, Shirt, GraduationCap, Star, Briefcase, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  { icon: Shirt, title: "Bespoke Tailoring", desc: "Garments designed and crafted specifically for your measurements and style." },
  { icon: Shirt, title: "Custom Shirts", desc: "Premium fitted shirts in your choice of fabric and style." },
  { icon: Scissors, title: "Trousers", desc: "Impeccably cut trousers with the perfect drape." },
  { icon: GraduationCap, title: "Formal Wear", desc: "Refined garments designed for professional and formal occasions." },
  { icon: Sparkles, title: "Ladies Wear", desc: "Elegant women's clothing for every occasion." },
  { icon: Scissors, title: "School Uniforms", desc: "Quality, comfort, and consistency for everyday wear." },
  { icon: Star, title: "Wedding & Occasion Wear", desc: "Tailored elegance for the moments that matter most." },
  { icon: Briefcase, title: "Corporate Uniforms", desc: "Professional clothing solutions designed to represent your brand." },
];

export default function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
      <div className="container-max">
        <SectionHeader
          eyebrow="What We Do"
          title="Our Tailoring Services"
          subtitle="From bespoke suits to everyday alterations, we cover the full spectrum of tailoring excellence."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.07, duration: 0.4 }}
              >
                <div className="card p-6 h-full group cursor-default hover:border-[var(--foreground)] transition-all duration-300">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all duration-300"
                    style={{ backgroundColor: "var(--muted-bg)" }}
                  >
                    <Icon className="w-4.5 h-4.5" size={18} />
                  </div>
                  <h3 className="font-serif font-semibold text-[var(--foreground)] mb-2">{service.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] border border-[var(--border)] px-6 py-3 rounded-full hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-200 group"
          >
            Explore All Services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
