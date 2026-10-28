import { useState } from "react";
import { useLocale } from "../lib/i18n";
import { photos } from "../data/photos";
import GalleryGrid from "../components/GalleryGrid";
export default function Gallery() {
  const { t } = useLocale();
  const [filter, setFilter] = useState(0);
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">{t.nav[2]}</p>
        <h1>{t.galleryTitle}</h1>
        <p>{t.galleryNotice}</p>
      </div>
      <section className="section content-section">
        <div className="filters" aria-label={t.nav[2]}>
          {t.filters.map((name, i) => (
            <button
              key={name}
              aria-pressed={filter === i}
              onClick={() => setFilter(i)}
            >
              {name}
            </button>
          ))}
        </div>
        <GalleryGrid
          key={filter}
          items={photos.filter((p) => filter === 0 || p.category === filter)}
        />
      </section>
    </>
  );
}
