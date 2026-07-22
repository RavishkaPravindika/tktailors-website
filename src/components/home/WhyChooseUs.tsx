"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scissors, Star, Ruler, DollarSign, Clock, Heart } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Scissors,
    title: "Experienced Tailors",
    description: "Our master tailors bring decades of expertise to every garment, ensuring unmatched quality and craftsmanship.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "We source only the finest fabrics and use professional techniques to deliver garments that last a lifetime.",
  },
  {
    icon: Ruler,
    title: "Perfect Fit",
    description: "With over 20 precise measurements taken, every garment is crafted to complement your unique body shape.",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    description: "Premium quality doesn't have to mean premium prices. We offer competitive rates without compromising on quality.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "We respect your time. Our efficient workflow ensures timely delivery for all orders, including rush requests.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description: "Your complete satisfaction is our priority. We work until the fit is perfect and you love what you wear.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--section-alt)" }}>
      <div className="container-max">
        <SectionHeader
          eyebrow="Why T.K. Custom Tailors"
          title="Why Choose Us"
          subtitle="We combine traditional craftsmanship with modern precision to deliver an experience that exceeds expectations."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <div className="card p-7 h-full group cursor-default">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: "var(--muted-bg)" }}
                  >
                    <Icon className="w-5 h-5 text-[var(--foreground)]" />
                  </div>
                  <h3 className="font-serif font-bold text-[var(--foreground)] text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
