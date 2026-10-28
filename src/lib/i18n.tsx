import { createContext, useContext } from "react";
import { el } from "../locales/el";
import { en } from "../locales/en";
export type Language = "el" | "en";
export const dictionaries = { el, en };
export const LanguageContext = createContext<Language>("el");
export function useLocale() {
  const lang = useContext(LanguageContext);
  return {
    lang,
    t: dictionaries[lang],
    path: (part = "") => `/${lang}${part ? "/" + part : ""}`,
  };
}
export function savedLanguage(): Language {
  try {
    return localStorage.getItem("glyfoneri-language") === "en" ? "en" : "el";
  } catch {
    return "el";
  }
}
