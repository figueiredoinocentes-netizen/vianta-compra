const PIXEL_ID = "788545497617754";

let initialized = false;

export function initPixel() {
  if (initialized) return;
  if (typeof window === "undefined") return;

  initialized = true;

  // Inject fbevents.js
  const f = window as any;
  if (f.fbq) return;

  const n: any = (f.fbq = function (...args: any[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [] as any[];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first.parentNode?.insertBefore(script, first);

  f.fbq("init", PIXEL_ID);
  f.fbq("track", "PageView");

  // noscript fallback
  const img = document.createElement("img");
  img.height = 1;
  img.width = 1;
  img.style.display = "none";
  img.src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`;
  document.body.appendChild(img);
}

export function trackEvent(event: string, params?: Record<string, any>) {
  const f = window as any;
  if (typeof f.fbq === "function") {
    f.fbq("track", event, params);
  }
}
