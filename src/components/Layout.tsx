import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLocale } from "../lib/i18n";
import { property } from "../config/property";
import { BookingLink } from "./ui";
const routes = [
  ["", 0],
  ["gallery", 2],
  ["location", 3],
  ["contact", 4],
] as const;
export default function Layout() {
  const { lang, t, path } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  const initial = useRef(true);
  useEffect(() => {
    setOpen(false);
    window.scrollTo?.(0, 0);
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
    if (initial.current) initial.current = false;
    else main.current?.focus({ preventScroll: true });
  }, [location.pathname]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  const switchLanguage = () =>
    navigate(
      location.pathname.replace(/^\/(el|en)/, lang === "el" ? "/en" : "/el"),
    );
  const links = routes.map(([route, i]) => (
    <NavLink
      key={route}
      to={path(route)}
      end={i === 0}
      onClick={() => setOpen(false)}
    >
      {t.nav[i]}
    </NavLink>
  ));
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="header">
        <Link
          className="wordmark"
          to={path()}
          aria-label={`${property.name} ${t.nav[0]}`}
        >
          <span>
            glyfoneri<span className="logo-dot">.</span>
          </span>
          <small>MAIZONETTES · GLYFA</small>
        </Link>
        <nav className="desktop-nav" aria-label={t.menu}>
          {links}
        </nav>
        <div className="header-actions">
          <button
            className="language"
            onClick={switchLanguage}
            aria-label={
              lang === "el" ? "Switch to English" : "Αλλαγή στα Ελληνικά"
            }
          >
            {lang === "el" ? "EN" : "ΕΛ"}
          </button>
          <BookingLink className="button header-book" />
          <button
            ref={trigger}
            className="icon-button menu-toggle"
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={dialog}
        className="mobile-dialog"
        onCancel={close}
        aria-label={t.menu}
      >
        <button
          className="icon-button dialog-close"
          onClick={close}
          aria-label={t.close}
        >
          <X />
        </button>
        <nav>{links}</nav>
        <BookingLink />
      </dialog>
      <main id="main" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <Link className="wordmark" to={path()}>
              <span>glyfoneri.</span>
              <small>MAIZONETTES · GLYFA</small>
            </Link>
            <p>{t.footer}</p>
          </div>
          <nav aria-label={t.nav.join(" · ")}>{links}</nav>
        </div>
        <div className="footer-bottom">
          <small>
            © {new Date().getFullYear()} {property.name}
          </small>
          <div>
            {["privacy", "cookies", "terms"].map((r, i) => (
              <Link key={r} to={path(r)}>
                {t.legal[i]}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
