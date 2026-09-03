"use client";

import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-semibold ${className}`}
      title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
      aria-label="Toggle dark / light theme"
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-amber-400" />
          <span className="hidden sm:inline text-[11px]">Terang</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          <span className="hidden sm:inline text-[11px]">Gelap</span>
        </>
      )}
    </button>
  );
}
