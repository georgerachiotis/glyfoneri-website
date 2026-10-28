import { MapPin, ArrowUpRight } from "lucide-react";
import { useLocale } from "../lib/i18n";
import { property } from "../config/property";
export default function Location() {
  const { t, lang } = useLocale();
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">{t.place}</p>
        <h1>{t.locationTitle}</h1>
        <p>{t.locationText}</p>
      </div>
      <section className="section content-section split">
        <div className="map-panel">
          <MapPin size={45} strokeWidth={1} />
          <h2>Glyfoneri</h2>
          <p>{property.address[lang]}</p>
          <a
            className="button"
            href={property.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.directions}
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="arrival-panel">
          <h2>{t.arrival}</h2>
          <p>{t.arrivalText}</p>
        </div>
      </section>
    </>
  );
}
