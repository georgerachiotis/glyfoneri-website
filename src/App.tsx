import React, { lazy, Suspense, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { LanguageContext, dictionaries, savedLanguage } from "./lib/i18n";
import SEO from "./components/SEO";

const Accommodation = lazy(() => import("./pages/Accommodation"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Location = lazy(() => import("./pages/Location"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));
function LanguageShell() {
  const { lang } = useParams();
  const valid = lang === "en" ? "en" : "el";
  useEffect(() => {
    if (lang === "el" || lang === "en") {
      document.documentElement.lang = lang;
      try {
        localStorage.setItem("glyfoneri-language", lang);
      } catch {}
    }
  }, [lang]);
  if (lang !== "el" && lang !== "en")
    return (
      <LanguageContext.Provider value="el">
        <Suspense fallback="…">
          <NotFound />
        </Suspense>
      </LanguageContext.Provider>
    );
  return (
    <LanguageContext.Provider value={valid}>
      <SEO />
      <Suspense
        fallback={
          <p className="section" role="status">
            {dictionaries[valid].loading}
          </p>
        }
      >
        <Layout />
      </Suspense>
    </LanguageContext.Provider>
  );
}
function AccommodationIndexRedirect() {
  const { lang } = useParams();
  return <Navigate to={`/${lang}/gallery`} replace />;
}
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${savedLanguage()}`} replace />}
      />
      <Route path="/:lang" element={<LanguageShell />}>
        <Route index element={<Home />} />
        <Route
          path="accommodation"
          element={<AccommodationIndexRedirect />}
        />
        <Route path="accommodation/:slug" element={<Accommodation />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="location" element={<Location />} />
        <Route path="contact" element={<Contact />} />
        {["privacy", "cookies", "terms"].map((page) => (
          <Route key={page} path={page} element={<Legal page={page} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
