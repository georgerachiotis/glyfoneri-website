import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "../lib/i18n";
import {
  Amenities,
  BookingCTA,
  Placeholder,
  SectionHeading,
} from "../components/ui";
export default function Home() {
  const { t, path } = useLocale();
  const reduced = useReducedMotion();
  return (
    <>
      <section className="hero">
        <Placeholder hero src="/images/curated/hero-beach.jpg" alt="Ξαπλώστρες κάτω από ψάθινες ομπρέλες στον παραθαλάσσιο χώρο του Glyfoneri" />
        <motion.div
          className="hero-content"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">{t.place}</p>
          <h1>{t.hero}</h1>
          <p className="hero-copy">{t.heroText}</p>
          <div className="hero-buttons">
            <Link className="button light" to={path("gallery")}>
              {t.explore}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
        <a className="hero-scroll" href="#welcome" aria-label={t.explore}>
          <ArrowDown size={20} />
        </a>
        <span className="hero-coordinate">GLYFONERI / GREECE</span>
      </section>
      <section id="welcome" className="section intro">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.introTitle}</h2>
        <p>{t.intro}</p>
      </section>
      <section className="experience">
        <Placeholder src="/images/curated/sea-view-plants.jpg" alt="Θέα στη θάλασσα μέσα από ανθισμένα φυτά" />
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2>{t.experienceTitle}</h2>
          <p>{t.experience}</p>
          <Link className="text-link" to={path("gallery")}>
            {t.galleryLink}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section">
        <SectionHeading title={t.amenitiesTitle} />
        <Amenities />
      </section>
      <section className="section gallery-preview">
        <div>
          <SectionHeading
            eyebrow={t.nav[2]}
            title={t.galleryTitle}
            text={t.galleryText}
          />
          <Link className="text-link" to={path("gallery")}>
            {t.galleryLink}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <Link to={path("gallery")} aria-label={t.galleryLink}>
          <Placeholder src="/images/curated/garden.jpg" alt="Καθιστικό σε σκιερό σημείο του κήπου" />
        </Link>
      </section>
      <section className="section location-preview">
        <MapPin size={36} strokeWidth={1} />
        <SectionHeading
          eyebrow={t.place}
          title={t.locationTitle}
          text={t.locationText}
        />
        <Link className="text-link" to={path("location")}>
          {t.nav[3]}
          <ArrowUpRight size={18} />
        </Link>
      </section>
      <BookingCTA />
    </>
  );
}
