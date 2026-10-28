import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../lib/i18n";
import { property } from "../config/property";
import { accommodations } from "../data/accommodation";
export default function SEO() {
  const { lang, t } = useLocale();
  const { pathname } = useLocation();
  useEffect(() => {
    const part = pathname.split("/").slice(2).join("/");
    const index = [
      "",
      "accommodation",
      "gallery",
      "location",
      "contact",
    ].indexOf(part);
    const stay = accommodations.find((s) => part === `accommodation/${s.slug}`);
    const legal = ["privacy", "cookies", "terms"].indexOf(part);
    const unknown = index < 0 && !stay && legal < 0;
    const title =
      (stay
        ? t.stayNames[stay.translationIndex]
        : index >= 0
          ? t.seo[index]
          : legal >= 0
            ? t.legal[legal]
            : t.notFound) +
      " | " +
      property.name;
    const description = stay
      ? t.stayDescriptions[stay.translationIndex]
      : index === 2
        ? t.galleryText
        : index === 3
          ? t.locationText
          : index === 4
            ? t.contactText
            : legal >= 0
              ? t.legalText
              : t.heroText;
    document.title = title;
    const nodes: Element[] = [];
    function meta(key: string, value: string, propertyKey = false) {
      const el = document.createElement("meta");
      el.setAttribute(propertyKey ? "property" : "name", key);
      el.content = value;
      document.head.append(el);
      nodes.push(el);
    }
    function link(rel: string, href: string, language?: string) {
      const el = document.createElement("link");
      el.rel = rel;
      el.href = href;
      if (language) el.hreflang = language;
      document.head.append(el);
      nodes.push(el);
    }
    meta("description", description);
    meta(
      "robots",
      !property.ownerConfirmed || unknown
        ? "noindex, nofollow"
        : "index, follow",
    );
    meta("og:title", title, true);
    meta("og:description", description, true);
    meta("og:type", "website", true);
    meta("og:locale", lang === "el" ? "el_GR" : "en_GB", true);
    meta("twitter:card", "summary");
    meta("twitter:title", title);
    meta("twitter:description", description);
    if (property.siteUrl) {
      const base = property.siteUrl.replace(/\/$/, "");
      link("canonical", base + pathname);
      meta("og:url", base + pathname, true);
      for (const l of ["el", "en"])
        link("alternate", `${base}/${l}${part ? "/" + part : ""}`, l);
      link("alternate", `${base}/el${part ? "/" + part : ""}`, "x-default");
    }
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      name: property.name,
      alternateName: property.alternativeName,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Glyfa",
        addressRegion: "Fthiotida",
        postalCode: "35013",
        addressCountry: "GR",
      },
      ...(property.siteUrl ? { url: property.siteUrl } : {}),
    });
    document.head.append(schema);
    nodes.push(schema);
    return () => nodes.forEach((n) => n.remove());
  }, [pathname, lang, t]);
  return null;
}
