import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../App";
const routes = [
  "",
  "accommodation",
  "accommodation/maisonette",
  "gallery",
  "location",
  "contact",
  "privacy",
  "cookies",
  "terms",
];
it.each(["el", "en"].flatMap((l) => routes.map((r) => `/${l}/${r}`)))(
  "renders route %s",
  async (route) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
    expect(screen.queryByText("404 · GLYFONERI")).not.toBeInTheDocument();
  },
);
it("switches language, persists it and restores it from the root", async () => {
  localStorage.clear();
  const first = render(
    <MemoryRouter initialEntries={["/el"]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Switch to English" }),
  );
  expect(
    await screen.findByRole("heading", {
      name: "Your seaside escape in Glyfa.",
    }),
  ).toBeInTheDocument();
  expect(localStorage.getItem("glyfoneri-language")).toBe("en");
  first.unmount();
  render(
    <MemoryRouter initialEntries={["/"]}>
      <AppRoutes />
    </MemoryRouter>,
  );
  expect(
    await screen.findByRole("heading", {
      name: "Your seaside escape in Glyfa.",
    }),
  ).toBeInTheDocument();
});
