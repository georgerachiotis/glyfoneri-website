import { copyFileSync, writeFileSync } from "node:fs";
import { loadEnv } from "vite";
const env = loadEnv("production", process.cwd(), "VITE_");
const base = (env.VITE_SITE_URL || "").replace(/\/$/, "");
if (base && !/^https:\/\/[^\s]+$/.test(base))
  throw new Error("VITE_SITE_URL must be an HTTPS origin");
const routes = [
  "",
  "accommodation/maisonette",
  "gallery",
  "location",
  "contact",
  "privacy",
  "cookies",
  "terms",
];
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${base ? ["el", "en"].flatMap((l) => routes.map((r) => `<url><loc>${escape(base)}/${l}${r ? "/" + r : ""}</loc></url>`)).join("") : ""}</urlset>`,
);
// Development release stays unindexed until the owner approves content and legal pages.
writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nDisallow: /\n${base ? "Sitemap: " + base + "/sitemap.xml\n" : ""}`,
);
writeFileSync("dist/_redirects", "/* /index.html 200\n");
// GitHub Pages serves this file for deep links, allowing BrowserRouter to resume.
copyFileSync("dist/index.html", "dist/404.html");
writeFileSync("dist/.nojekyll", "");
