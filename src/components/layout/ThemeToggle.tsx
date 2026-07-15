"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle({ scrolled = true }: { scrolled?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-[var(--muted-bg)]" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{ backgroundColor: "transparent" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = scrolled
          ? "var(--muted-bg)"
          : "var(--nav-hover-unscrolled)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      }}
    >
      {theme === "dark" ? (
        <Sun 
          className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform duration-200" 
          size={18} 
          style={{ color: scrolled ? "var(--foreground)" : "var(--nav-text-unscrolled)" }}
        />
      ) : (
        <Moon 
          className="w-4.5 h-4.5 group-hover:-rotate-12 transition-transform duration-200" 
          size={18} 
          style={{ color: scrolled ? "var(--foreground)" : "var(--nav-text-unscrolled)" }}
        />
      )}
    </button>
  );
}
