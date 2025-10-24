"use client";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const t = (localStorage.getItem("theme") as Theme) || "dark";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "8px 10px",
        borderRadius: 12,
      }}
    >
      🌓 {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
