import { Link } from "react-router-dom";
import { useLocale } from "../lib/i18n";
export default function NotFound() {
  const { t, path } = useLocale();
  return (
    <section className="not-found">
      <p className="eyebrow">404 · GLYFONERI</p>
      <h1>{t.notFound}</h1>
      <p>{t.notFoundText}</p>
      <Link className="button" to={path()}>
        {t.back}
      </Link>
    </section>
  );
}
