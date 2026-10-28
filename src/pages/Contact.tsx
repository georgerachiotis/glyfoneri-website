import { useLocale } from "../lib/i18n";
import { property } from "../config/property";
import { BookingLink } from "../components/ui";
export default function Contact() {
  const { t, lang } = useLocale();
  return (
    <>
      <div className="page-heading">
        <p className="eyebrow">{t.nav[4]}</p>
        <h1>{t.contactTitle}</h1>
        <p>{t.contactText}</p>
      </div>
      <section className="section content-section split">
        <div className="contact-list">
          <h2>{t.contactPhoneTitle}</h2>
          {property.phones[lang].map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
              {phone}
            </a>
          ))}
          {property.email && (
            <a href={`mailto:${property.email}`}>{property.email}</a>
          )}
        </div>
        <div className="contact-booking-panel">
          <p className="eyebrow">{t.availability}</p>
          <h2>{t.contactBookingTitle}</h2>
          <p>{t.contactBookingText}</p>
          <BookingLink className="button" />
        </div>
      </section>
    </>
  );
}
