import { useLocale } from "../lib/i18n";
export default function Legal({ page }: { page: string }) {
  const { t } = useLocale();
  const i = ["privacy", "cookies", "terms"].indexOf(page);
  return (
    <>
      <div className="page-heading">
        <h1>{t.legal[i]}</h1>
      </div>
      <section className="section content-section legal-copy">
        <p>{t.legalText}</p>
        {i < 2 && <p>{i === 0 ? t.privacyText : t.cookieText}</p>}
      </section>
    </>
  );
}
