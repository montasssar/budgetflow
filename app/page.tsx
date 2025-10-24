import { Suspense } from "react";
import DashboardClient from "./DashboardClient"; // direct import

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <DashboardClient />
    </Suspense>
  );
}

function Fallback() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      <p style={{ opacity: 0.7 }}>Loading…</p>
    </div>
  );
}
