"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
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
      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[var(--muted-bg)] transition-all duration-200 group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4.5 h-4.5 text-[var(--foreground)] group-hover:rotate-12 transition-transform duration-200" size={18} />
      ) : (
        <Moon className="w-4.5 h-4.5 text-[var(--foreground)] group-hover:-rotate-12 transition-transform duration-200" size={18} />
      )}
    </button>
  );
}
