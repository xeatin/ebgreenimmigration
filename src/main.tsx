import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAttribution } from "./lib/tracking/attribution";

// Capture UTMs / click IDs from the URL on first visit and persist for 90 days.
// Safe to call before render — runs synchronously and tolerates SSR/private mode.
initAttribution();

createRoot(document.getElementById("root")!).render(<App />);
