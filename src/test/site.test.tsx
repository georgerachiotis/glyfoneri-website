import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { LanguageContext, savedLanguage } from "../lib/i18n";
import Layout from "../components/Layout";
import Accommodation from "../pages/Accommodation";
import Gallery from "../pages/Gallery";
import ContactForm from "../components/ContactForm";
import { BookingLink } from "../components/ui";
import { inquirySchema, inquiryAdapter } from "../lib/inquiry";
import { property } from "../config/property";
import { en } from "../locales/en";
import { el } from "../locales/el";
function wrap(child: React.ReactNode, route = "/en") {
  return render(
    <LanguageContext.Provider value="en">
      <MemoryRouter initialEntries={[route]}>{child}</MemoryRouter>
    </LanguageContext.Provider>,
  );
}
describe("navigation and booking", () => {
  it("links the main pages and changes the language route", async () => {
    wrap(
      <Routes>
        <Route path="/:lang" element={<Layout />}>
          <Route path="gallery" element={<p>Gallery route</p>} />
        </Route>
      </Routes>,
      "/en/gallery",
    );
    expect(
      screen.getAllByRole("link", { name: "Accommodation" })[0],
    ).toHaveAttribute("href", "/en/accommodation");
    await userEvent.click(
      screen.getByRole("button", { name: "Αλλαγή στα Ελληνικά" }),
    );
    expect(screen.getByText("Gallery route")).toBeInTheDocument();
  });
  it("opens and closes mobile menu", async () => {
    wrap(
      <Routes>
        <Route path="/:lang" element={<Layout />} />
      </Routes>,
    );
    const trigger = screen.getByRole("button", { name: "Open menu" });
    await userEvent.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("open");
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Close" }),
    );
    expect(dialog).not.toHaveAttribute("open");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
  it("reads persisted language and falls back to Greek", () => {
    localStorage.clear();
    expect(savedLanguage()).toBe("el");
    localStorage.setItem("glyfoneri-language", "en");
    expect(savedLanguage()).toBe("en");
    localStorage.setItem("glyfoneri-language", "xx");
    expect(savedLanguage()).toBe("el");
  });
  it("uses the real booking destination safely", () => {
    wrap(<BookingLink />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", property.bookingUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
describe("accommodation", () => {
  it.each(["maisonette"])(
    "resolves %s",
    (slug) => {
      wrap(
        <Routes>
          <Route path="/en/accommodation/:slug" element={<Accommodation />} />
        </Routes>,
        `/en/accommodation/${slug}`,
      );
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.queryByText("404 · GLYFONERI")).not.toBeInTheDocument();
    },
  );
  it("shows 404 for unknown slugs", () => {
    wrap(
      <Routes>
        <Route path="/en/accommodation/:slug" element={<Accommodation />} />
      </Routes>,
      "/en/accommodation/missing",
    );
    expect(screen.getByText("404 · GLYFONERI")).toBeInTheDocument();
  });
});
describe("gallery", () => {
  it("filters, opens, navigates and closes the lightbox", async () => {
    wrap(<Gallery />);
    await userEvent.click(screen.getByRole("button", { name: /Image 1:/ }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("open");
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByText(/2 \/ 12/)).toBeInTheDocument();
    fireEvent(dialog, new Event("cancel", { bubbles: true }));
    expect(dialog).not.toHaveAttribute("open");
    await userEvent.click(
      screen.getByRole("button", { name: "Accommodation" }),
    );
    expect(screen.getAllByRole("button", { name: /Image \d:/ })).toHaveLength(
      4,
    );
  });
});
const valid = {
  name: "Guest",
  email: "guest@example.com",
  phone: "",
  checkIn: "2099-07-01",
  checkOut: "2099-07-04",
  adults: 2,
  children: 0,
  message: "Question about arrival",
  consent: true,
};
describe("inquiries", () => {
  it("accepts valid data but never pretends to send", async () => {
    expect(inquirySchema(en).safeParse(valid).success).toBe(true);
    expect(await inquiryAdapter.submit(valid)).toEqual({
      status: "not-configured",
    });
  });
  it.each([
    { checkOut: "2099-07-01" },
    { checkOut: "2099-06-30" },
    { checkIn: "2000-01-01" },
    { checkIn: "2099-02-30" },
    { email: "invalid" },
    { name: " " },
    { consent: false },
    { adults: 0 },
    { children: -1 },
    { adults: 1.5 },
  ])("rejects invalid data %j", (override) => {
    expect(inquirySchema(en).safeParse({ ...valid, ...override }).success).toBe(
      false,
    );
  });
  it("renders accessible field errors", async () => {
    wrap(<ContactForm />);
    await userEvent.click(
      screen.getByRole("button", { name: "Check inquiry details" }),
    );
    expect(await screen.findByText(en.errors.consent)).toBeInTheDocument();
    expect(screen.getByLabelText("Full name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText(en.formUnavailable)).toBeInTheDocument();
  });
  it("contains matching translation structures", () => {
    expect(Object.keys(el).sort()).toEqual(Object.keys(en).sort());
    expect(el.nav).toHaveLength(en.nav.length);
    expect(el.stayDescriptions).toHaveLength(en.stayDescriptions.length);
  });
});
