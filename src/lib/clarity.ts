const CLARITY_ID = "vmzzs8mcix";

let initialized = false;

export function initClarity() {
  if (initialized) return;
  if (typeof window === "undefined") return;

  initialized = true;

  const w = window as any;
  if (w.clarity) return;

  w.clarity = w.clarity || function (...args: any[]) {
    (w.clarity.q = w.clarity.q || []).push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  const first = document.getElementsByTagName("script")[0];
  first.parentNode?.insertBefore(script, first);
}
