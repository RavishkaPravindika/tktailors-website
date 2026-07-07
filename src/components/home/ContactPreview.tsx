"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

const contacts = [
  {
    icon: Phone,
    title: "Phone",
    value: "+94 XX XXX XXXX",
    href: "tel:+94XXXXXXXXX",
    description: "Call us during business hours",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/94XXXXXXXXX",
    description: "Quick responses via WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@tktailors.lk",
    href: "mailto:info@tktailors.lk",
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Main Street, Sri Lanka",
    href: "/contact",
    description: "Come see us in person",
  },
];

export default function ContactPreview() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const contactRef = ref(db, "contact");
    const unsubscribe = onValue(contactRef, (snap) => {
      if (snap.val()) {
        setSettings(snap.val());
      }
    });
    return () => unsubscribe();
  }, []);

  const displayContacts = settings ? [
    { icon: Phone, title: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^0-9+]/g, '')}`, description: "Call us during business hours" },
    { icon: MessageCircle, title: "WhatsApp", value: "Chat with us", href: `https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}`, description: "Quick responses via WhatsApp" },
    { icon: Mail, title: "Email", value: settings.email, href: `mailto:${settings.email}`, description: "We reply within 24 hours" },
    { icon: MapPin, title: "Visit Us", value: settings.address, href: "/contact", description: "Come see us in person" },
  ] : contacts;

  return (
    <section className="section-padding border-t" style={{ backgroundColor: "var(--section-alt)", borderColor: "var(--border)" }}>
      <div className="container-max">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Get In Touch"
            title="We'd Love to Hear From You"
            subtitle="Whether it's a first fitting or a long-overdue alteration, we're here to help."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {displayContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <AnimatedSection key={contact.title} delay={index * 0.08}>
                <a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block p-6 rounded-2xl border transition-all duration-300"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--muted-bg)] flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-200">
                    <Icon className="w-5 h-5 text-[var(--foreground)]" />
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] mb-2">{contact.title}</p>
                  <p className="font-serif font-semibold text-[var(--foreground)] text-base mb-1">{contact.value}</p>
                  <p className="text-xs text-[var(--muted)]">{contact.description}</p>
                </a>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] font-semibold text-sm rounded-full hover:opacity-90 hover:gap-4 transition-all duration-200 group"
          >
            Send Us a Message
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
