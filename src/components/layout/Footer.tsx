"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Scissors, Phone, Mail, MapPin, MessageCircle, Share2, Globe } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/skills", label: "Our Skills" },
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
              <div className="w-9 h-9 bg-[var(--foreground)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scissors className="w-4 h-4 text-[var(--background)]" />
              </div>
              <div>
                <span className="font-serif font-bold text-[var(--foreground)] text-lg">T.K. Custom Tailors</span>
                <p className="text-[10px] text-[var(--muted)] tracking-widest uppercase">Est. 1970</p>
              </div>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
              Three generations of master craftsmanship. Delivering elegance, precision, and perfect fit since 1970.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <Globe size={15} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <Share2 size={15} />
              </a>
              <a
                href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}` : "https://wa.me/94XXXXXXXXX"}
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] transition-all duration-200"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <MessageCircle size={15} />
              </a>
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
                <MessageCircle size={14} className="text-[var(--muted)] mt-0.5 flex-shrink-0" />
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
                  {settings?.address || "T.K. Tailors, Main Street,\nSri Lanka"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs text-[var(--muted)]">
            © 2026 T.K. Tailors. All rights reserved.
          </p>
          <div className="text-xs text-[var(--muted)]">
            <Link href="https://ravishka.vercel.app/" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-2">
                Architected and Spearheaded by
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
          {/* <Link
            href="/admin/login"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Admin
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
