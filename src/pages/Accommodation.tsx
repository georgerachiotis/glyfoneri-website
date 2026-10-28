import { Link, useParams } from "react-router-dom";
import { accommodations } from "../data/accommodation";
import { useLocale } from "../lib/i18n";
import {
  AccommodationCard,
  BookingLink,
} from "../components/ui";
import GalleryGrid from "../components/GalleryGrid";
import { photos } from "../data/photos";
import NotFound from "./NotFound";
export default function Accommodation() {
  const { slug } = useParams();
  const { t, path } = useLocale();
  const stay = accommodations.find((s) => s.slug === slug);
  if (slug && !stay) return <NotFound />;
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">{t.place}</p>
        <h1>{stay ? t.stayNames[stay.translationIndex] : t.staysTitle}</h1>
        <p>{stay ? t.stayDescriptions[stay.translationIndex] : t.staysText}</p>
      </div>
      <section className="section content-section">
        {stay ? (
          <>
            <Link className="text-link" to={path("accommodation")}>
              ← {t.allStays}
            </Link>
            <div className="detail-image">
              <GalleryGrid
                items={photos.filter((p) => p.src === stay.photo).slice(0, 1)}
              />
            </div>
            <div className="detail-body">
              {stay.confirmed && (
                <dl>
                  {stay.capacity !== null && (
                    <>
                      <dt>{t.fields.adults}</dt>
                      <dd>{stay.capacity}</dd>
                    </>
                  )}
                  {stay.size !== null && (
                    <>
                      <dt>m²</dt>
                      <dd>{stay.size}</dd>
                    </>
                  )}
                  {stay.beds && <dd>{stay.beds}</dd>}
                </dl>
              )}
              <div className="hero-buttons">
                <BookingLink />
                <Link className="text-link" to={path("contact")}>
                  {t.contact}
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="stay-grid">
              {accommodations.map((s) => (
                <AccommodationCard key={s.id} stay={s} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
