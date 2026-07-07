"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { ref, push, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+94 XX XXX XXXX",
    href: "tel:+94XXXXXXXXX",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+94 XX XXX XXXX",
    href: "https://wa.me/94XXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@tktailors.lk",
    href: "mailto:info@tktailors.lk",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "T.K. Tailors, Main Street, Sri Lanka",
    href: "https://maps.app.goo.gl/LesCBGYXMc33oGb59",
  },
];

const businessHours = [
  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const messagesRef = ref(db, "messages");
      await push(messagesRef, {
        ...formData,
        createdAt: new Date().toISOString(),
        read: false,
      });
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-3.5 rounded-xl border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[var(--foreground)]/20 focus:border-[var(--foreground)]`;
  const inputStyle = { backgroundColor: "var(--muted-bg)", borderColor: "var(--border)", color: "var(--foreground)" };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24" style={{ backgroundColor: "var(--foreground)" }}>
        <div className="container-max text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">Get In Touch</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight">Contact Us</h1>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5" />
            <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              We&apos;d love to hear from you. Reach out for bookings, consultations, or any questions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      {/* <section className="relative h-96 overflow-hidden">
        <iframe
          src={settings?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.6!2d80.6350011!3d7.2905715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTcnMjYuMSJOIDgwwrAzOCcwNi4wIkU!5e0!3m2!1sen!2slk!4v1234567890"}
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="T.K. Tailors Location"
        />
        <div className="absolute bottom-4 right-4">
          <a
            href="https://maps.app.goo.gl/LesCBGYXMc33oGb59"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
          >
            <MapPin size={14} />
            Get Directions
          </a>
        </div>
      </section> */}

      {/* Contact Info + Form */}
      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection direction="right">
                <SectionHeader
                  eyebrow="Contact Information"
                  title="Reach Out"
                  centered={false}
                />
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.1}>
                <div className="space-y-4">
                  {(settings ? [
                    { icon: Phone, title: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/[^0-9+]/g, '')}` },
                    { icon: MessageCircle, title: "WhatsApp", value: settings.whatsapp, href: `https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}` },
                    { icon: Mail, title: "Email", value: settings.email, href: `mailto:${settings.email}` },
                    { icon: MapPin, title: "Address", value: settings.address, href: "https://maps.app.goo.gl/LesCBGYXMc33oGb59" }
                  ] : contactInfo).map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-start gap-4 p-4 rounded-xl border hover:border-[var(--foreground)] transition-all duration-200 group"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all duration-200"
                          style={{ backgroundColor: "var(--muted-bg)" }}
                        >
                          <Icon size={18} className="text-[var(--foreground)] group-hover:text-[var(--background)]" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-0.5">{item.title}</p>
                          <p className="text-sm font-medium text-[var(--foreground)]">{item.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </AnimatedSection>

              {/* Business Hours */}
              <AnimatedSection direction="right" delay={0.2}>
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[var(--muted-bg)] flex items-center justify-center">
                      <Clock size={16} className="text-[var(--foreground)]" />
                    </div>
                    <h3 className="font-serif font-semibold text-[var(--foreground)]">Business Hours</h3>
                  </div>
                  <div className="space-y-3">
                    {(settings?.businessHours ? [
                      { day: "Monday – Friday", hours: settings.businessHours.weekdays },
                      { day: "Saturday", hours: settings.businessHours.saturday },
                      { day: "Sunday", hours: settings.businessHours.sunday }
                    ] : businessHours).map((bh) => (
                      <div
                        key={bh.day}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-[var(--muted)]">{bh.day}</span>
                        <span className={`font-medium ${bh.hours === "Closed" ? "text-red-500" : "text-[var(--foreground)]"}`}>
                          {bh.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="left">
                <div className="card p-8">
                  <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-2">Send Us a Message</h2>
                  <p className="text-sm text-[var(--muted)] mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>

                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15, delay: 0.1 }}
                          className="w-20 h-20 rounded-full bg-[var(--muted-bg)] flex items-center justify-center mb-6"
                        >
                          <CheckCircle2 className="w-10 h-10 text-[var(--foreground)]" />
                        </motion.div>
                        <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-3">Message Sent!</h3>
                        <p className="text-[var(--muted)] mb-8 max-w-sm">
                          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="John Doe"
                              className={inputClass}
                              style={inputStyle}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+94 XX XXX XXXX"
                              className={inputClass}
                              style={inputStyle}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className={inputClass}
                            style={inputStyle}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                            Subject *
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className={inputClass}
                            style={inputStyle}
                          >
                            <option value="">Select a subject</option>
                            {/* <option>Bespoke Suit Enquiry</option>
                            <option>Wedding Suit Consultation</option>
                            <option>Uniform Order</option>
                            <option>Alterations</option>
                            <option>Fabric Enquiry</option>
                            <option>General Enquiry</option> */}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
                            Message *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Tell us about your requirements..."
                            className={`${inputClass} resize-none`}
                            style={inputStyle}
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
                            {error}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--foreground)] text-[var(--background)] font-semibold text-sm rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02]"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-t-transparent border-[var(--background)] rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={16} />
                              Send Message
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
