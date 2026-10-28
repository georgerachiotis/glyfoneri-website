import {
  ArrowUpRight,
  Waves,
  Eye,
  Wifi,
  Car,
  Wind,
  CookingPot,
  Bath,
  Sun,
  Trees,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "../lib/i18n";
import { property } from "../config/property";
import type { Accommodation } from "../data/accommodation";
export function BookingLink({
  className = "button",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { t } = useLocale();
  return (
    <a
      className={className}
      href={property.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${typeof children === "string" ? children : t.book} — ${t.external}`}
    >
      {children || t.book}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function Placeholder({
  src = "/images/shore.svg",
  alt,
  hero = false,
}: {
  src?: string;
  alt?: string;
  hero?: boolean;
}) {
  const { t } = useLocale();
  const isPlaceholder = src.endsWith(".svg");
  return (
    <figure className={`placeholder ${hero ? "hero-image" : ""}`}>
      <img
        src={src}
        alt={alt || (isPlaceholder ? t.placeholder : "Glyfoneri Maizonettes")}
        width={1600}
        height={1000}
        loading={hero ? "eager" : "lazy"}
        fetchPriority={hero ? "high" : "auto"}
      />
      {isPlaceholder && <figcaption>{t.placeholder}</figcaption>}
    </figure>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
const icons = [Waves, Eye, Wifi, Car, Wind, CookingPot, Bath, Sun, Trees];
export function Amenities({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  return (
    <ul className={compact ? "highlights" : "amenities"}>
      {t.amenities.slice(0, compact ? 4 : 9).map((item, i) => {
        const Icon = icons[i];
        return (
          <li key={item}>
            <Icon size={24} strokeWidth={1.4} />
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
export function AccommodationCard({ stay }: { stay: Accommodation }) {
  const { t, path } = useLocale();
  return (
    <article className="stay-card">
      <div className="stay-photos">
        <Link
          to={path(`accommodation/${stay.slug}`)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Placeholder src={stay.photo} />
        </Link>
        <span className="stay-photo-label">04 {t.stayUnitLabel}</span>
      </div>
      <div className="card-content">
        <span className="eyebrow">GLYFONERI · GLYFA</span>
        <h3>
          <Link to={path(`accommodation/${stay.slug}`)}>
            {t.stayNames[stay.translationIndex]}
          </Link>
        </h3>
        <p>{t.stayDescriptions[stay.translationIndex]}</p>
        <span className="stay-rule" aria-hidden="true" />
        <div className="card-actions">
          <Link className="text-link" to={path(`accommodation/${stay.slug}`)}>
            {t.details}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function BookingCTA() {
  const { t } = useLocale();
  return (
    <section className="booking-section">
      <Waves size={34} strokeWidth={1} />
      <h2>{t.ctaTitle}</h2>
      <p>{t.ctaText}</p>
      <BookingLink className="button light" />
    </section>
  );
}
