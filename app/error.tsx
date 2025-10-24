"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Something went wrong</h1>
      <p style={{ opacity: 0.8 }}>
        We couldn’t render the dashboard. {error?.message ? `Details: ${error.message}` : ""}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "none",
          background: "var(--accent)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </section>
  );
}
