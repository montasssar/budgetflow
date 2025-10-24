"use client";
import { useEffect, useRef } from "react";

export default function ResultsAnnouncer({ count }: { count: number }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      // Force re-announce by clearing then setting text
      ref.current.textContent = "";
      // small delay ensures SR picks up new content
      const id = setTimeout(() => {
        if (ref.current) ref.current.textContent = `Showing ${count} transactions for current filters.`;
      }, 30);
      return () => clearTimeout(id);
    }
  }, [count]);

  return (
    <p
      ref={ref}
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "absolute", left: -9999, height: 1, width: 1, overflow: "hidden" }}
    />
  );
}
