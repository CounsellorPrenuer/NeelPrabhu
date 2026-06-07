export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID || "NeelPrabhu";
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "neelprabhu3@gmail.com";
export const CONTACT_PHONE =
  import.meta.env.VITE_CONTACT_PHONE || "+91 9921193333";

const PRODUCTION_WORKER_URL =
  "https://multi-tenant-platform.gauravgoodreads.workers.dev";
export const WORKER_BASE_URL = (
  import.meta.env.VITE_WORKER_BASE_URL ||
  (import.meta.env.PROD ? PRODUCTION_WORKER_URL : "")
).replace(/\/$/, "");

export function apiUrl(path: string): string {
  if (!WORKER_BASE_URL) return path;
  return `${WORKER_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
