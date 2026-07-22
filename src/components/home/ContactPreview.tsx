"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const contacts = [
  {
    icon: Phone,
    title: "Phone",
    value: "+94 XX XXX XXXX",
    href: "tel:+94XXXXXXXXX",
    description: "Call us during business hours",
  },
  {
    icon: WhatsappIcon,
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
    { icon: WhatsappIcon, title: "WhatsApp", value: "Chat with us", href: `https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}`, description: "Quick responses via WhatsApp" },
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
              <AnimatedSection key={contact.title} delay={index * 0.08} className="h-full">
                <a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex flex-col h-full p-6 rounded-2xl border transition-all duration-300 hover:shadow-elegant"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-[var(--muted-bg)] flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-200 flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--foreground)]" />
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] mb-2">{contact.title}</p>
                  <p className="font-serif font-semibold text-[var(--foreground)] text-base mb-1">{contact.value}</p>
                  <p className="text-xs text-[var(--muted)] mt-auto pt-2">{contact.description}</p>
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
