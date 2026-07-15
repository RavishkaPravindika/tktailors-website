"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scissors } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/skills", label: "Skills" },
  { href: "/staff", label: "Staff" },
  { href: "/gallery", label: "Gallery" },
  { href: "/guest-book", label: "Guest Book" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Check if admin page - use separate admin nav
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "backdrop-blur-md border-b py-3"
            : "py-5"
        )}
        style={{
          backgroundColor: scrolled ? "var(--nav-bg)" : "transparent",
          borderColor: scrolled ? "var(--nav-border)" : "transparent",
        }}
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
              style={{
                backgroundColor: scrolled ? "var(--foreground)" : "var(--nav-text-unscrolled)",
              }}
            >
              <Scissors
                className="w-4 h-4"
                style={{ color: scrolled ? "var(--background)" : "var(--foreground)" }}
              />
            </div>
            <div>
              <span
                className="font-serif font-bold text-lg tracking-tight leading-none"
                style={{ color: scrolled ? "var(--foreground)" : "var(--nav-text-unscrolled)" }}
              >
                T.K. Custom Tailors
              </span>
              <p
                className="text-[10px] tracking-widest uppercase leading-none mt-0.5"
                style={{ color: scrolled ? "var(--muted)" : "var(--nav-text-unscrolled)" }}
              >
                Est. 1970
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive
                      ? (scrolled ? "var(--background)" : "var(--foreground)")
                      : (scrolled ? "var(--foreground)" : "var(--nav-text-unscrolled)"),
                    backgroundColor: isActive
                      ? (scrolled ? "var(--foreground)" : "var(--nav-active-unscrolled-bg)")
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = scrolled
                        ? "var(--muted-bg)"
                        : "var(--nav-hover-unscrolled)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
              style={{ backgroundColor: "transparent" }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = scrolled
                  ? "var(--muted-bg)"
                  : "var(--nav-hover-unscrolled)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X
                      className="w-5 h-5"
                      style={{ color: scrolled ? "var(--foreground)" : "var(--nav-text-unscrolled)" }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu
                      className="w-5 h-5"
                      style={{ color: scrolled ? "var(--foreground)" : "var(--nav-text-unscrolled)" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              ref={menuRef}
              className="fixed top-0 right-0 h-full w-72 z-50 lg:hidden"
              style={{ backgroundColor: "var(--card-bg)", borderLeft: "1px solid var(--border)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--foreground)] rounded-full flex items-center justify-center">
                    <Scissors className="w-3.5 h-3.5 text-[var(--background)]" />
                  </div>
                  <span className="font-serif font-bold text-[var(--foreground)]">T.K. Tailors</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--muted-bg)]"
                >
                  <X className="w-4 h-4 text-[var(--foreground)]" />
                </button>
              </div>

              {/* Mobile links */}
              <nav className="p-5 flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-[var(--foreground)] text-[var(--background)]"
                            : "text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile footer */}
              <div className="absolute bottom-8 left-5 right-5">
                <p className="text-xs text-[var(--muted)] text-center">
                  © 2025 T.K. Tailors · Est. 1989
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
