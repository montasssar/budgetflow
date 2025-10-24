import "./styles/globals.css";
import type { Metadata } from "next";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "BudgetFlow",
  description: "Personal finance dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <a href="#main" className="sr-only-focusable">Skip to content</a>

        <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container row" style={{ justifyContent: "space-between" }}>
            <div className="row">
              <strong>💸 BudgetFlow</strong>
              <span style={{ opacity: 0.7 }}>Personal Finance Dashboard</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main id="main" className="container">
          {children}
        </main>

        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container" style={{ opacity: 0.7, paddingTop: 8, paddingBottom: 8 }}>
            © {new Date().getFullYear()} BudgetFlow
          </div>
        </footer>
      </body>
    </html>
  );
}
