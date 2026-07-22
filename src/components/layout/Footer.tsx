"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Scissors, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/skills", label: "Our Skills" },
  { href: "/craft", label: "Our Craft" },
  { href: "/staff", label: "Our Staff" },
  { href: "/gallery", label: "Gallery" },
  { href: "/guest-book", label: "Guest Book" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
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

  return (
    <footer
      className="border-t mt-0"
      style={{ backgroundColor: "var(--section-alt)", borderColor: "var(--border)" }}
    >
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              {/* <div className="w-9 h-9 bg-[var(--foreground)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scissors className="w-4 h-4 text-[var(--background)]" />
              </div> */}
              <img src="/icon.svg" alt="Logo" width={50} height={50} className="p-0.5"></img>
              <div>
                <span className="font-serif font-bold text-[var(--foreground)] text-lg">T.K. Custom Tailors</span>
                <p className="text-[10px] text-[var(--muted)] tracking-widest uppercase">Est. 1970</p>
              </div>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
              Three generations of master craftsmanship. Delivering elegance, precision, and perfect fit since 1970.
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/TKCustomTailors"
                target="blank"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Instagram */}
              {/* <a
                href="#"
                target="blank"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a> */}
              {/* WhatsApp */}
              <a
                href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}` : "https://wa.me/94XXXXXXXXX"}
                target="blank"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              {/* YouTube */}
              {/* <a
                href="#"
                target="blank"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-[var(--foreground)] mb-4 text-sm tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-semibold text-[var(--foreground)] mb-4 text-sm tracking-wide">
              Our Services
            </h4>
            <ul className="space-y-2">
              {["Men's Suits", "Custom Shirts", "Wedding Suits", "Ladies Wear", "School Uniforms", "Corporate Uniforms", "Alterations", "Traditional Clothing"].map((s) => (
                <li key={s}>
                  <Link
                    href="/skills"
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-[var(--foreground)] mb-4 text-sm tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[var(--muted)] mt-0.5 flex-shrink-0" />
                <div>
                  <a href={settings?.phone ? `tel:${settings.phone.replace(/[^0-9+]/g, '')}` : "tel:+94XXXXXXXXX"} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {settings?.phone || "+94 XX XXX XXXX"}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-[14px] h-[14px] text-[var(--muted)] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}` : "https://wa.me/94XXXXXXXXX"} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[var(--muted)] mt-0.5 flex-shrink-0" />
                <a href={settings?.email ? `mailto:${settings.email}` : "mailto:info@tktailors.lk"} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                  {settings?.email || "info@tktailors.lk"}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[var(--muted)] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--muted)] whitespace-pre-line">
                  {settings?.address || "T.K. Custom Tailors, Galle Road,\nSri Lanka"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs text-[var(--muted)]">
            © 2026 T.K. Custom Tailors. All rights reserved.
          </p>
          <div className="text-xs text-[var(--muted)]">
            <Link href="https://ravishka.vercel.app/" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-2">
                Designed & Developed by
                <div className='top-0 left-0 w-10 h-10 flex items-center justify-center text-white font-bold text-xl transition-all duration-300'>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 500 500" 
                  >
                    <defs>
                      {/* Defining the Cyan to Purple Gradient */}
                      <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00D4FF" />   {/* accent-cyan */}
                        <stop offset="100%" stopColor="#A855F7" /> {/* accent-purple */}
                      </linearGradient>
                    </defs>

                    {/* Scaled-down 'R' Logo Mark (Now at 70% size and perfectly centered) */}
                    <g transform="translate(75, 60) scale(0.70)">
                      <path 
                        fill="url(#brandGradient)" 
                        d="M 70 50 L 250 50 A 150 150 0 0 1 340 320 L 430 420 L 364 420 L 220 260 L 220 340 L 170 340 L 170 150 L 336.6 150 A 100 100 0 0 0 250 100 L 120 100 L 120 420 L 70 420 Z M 220 200 L 220 260 L 257 301 A 100 100 0 0 0 350 200 Z" 
                      />
                    </g>

                    {/* Highly Prominent and Bolder Text, Centered Below */}
                    <text 
                      x="250" 
                      y="470" 
                      textAnchor="middle" 
                      fontFamily="system-ui, -apple-system, sans-serif" 
                      fontSize="80" 
                      fontWeight="950" 
                      letterSpacing="10" 
                      fill="url(#brandGradient)"
                    >
                      RAVISHKA
                    </text>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
