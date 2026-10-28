# Glyfoneri Maizonettes

A bilingual, mobile-first React website for the beachfront accommodation in Glyfa, Fthiotida. Greek is the default; English is available on every page. This is a development release, **not an owner-approved business launch**. It uses selected local property photos from the supplied image folder. Approve image use and final business content before launch. No remote hotlinks, invented reviews, rates, live availability, payments or reservation confirmations are included.

## Stack and local setup

Node.js 22.12+ or 24, React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Lucide, Framer Motion, React Hook Form, Zod, Vitest and React Testing Library.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

The development server prints its local address. Build output is `dist/`. Dependencies are locked in `package-lock.json`. Copy `.env.example` to `.env` when configuring deployment; never put credentials in `VITE_*` variables, which are public browser values.

## Structure

- `src/config/property.ts`: contact details, links, ratings, owner approval, inquiry limits and confirmation checklist.
- `src/data/accommodation.ts`: the maisonette category, its slug and nullable details. The property has four maisonettes; this category does not represent four separate listings.
- `src/data/photos.ts`: selected image dimensions, gallery categories and translated alt text.
- `src/locales/el.ts`, `en.ts`: matching typed translation dictionaries, including validation, legal placeholders and metadata.
- `src/components`: shared layout, booking links, photo presentation, lightbox, form and SEO.
- `src/pages`: home overview, accommodation details, gallery, location, contact, legal pages and 404.
- `src/lib`: language preference and inquiry schema/submission interface.
- `src/test`: behavior tests.
- `scripts/seo.mjs`: build-time robots, XML sitemap and SPA rewrite output.

## Content and confirmation model

The owner has confirmed four accommodation units, all maisonettes. Publicly mentioned features include beachfront access, sea views, Wi-Fi, parking, air conditioning, kitchen facilities, private bathrooms, balconies/terraces and garden. Their availability per unit remains unconfirmed. No capacities, bed counts or dimensions are inferred. Type-level amenity arrays remain empty until confirmed. Update both dictionaries and the typed data files together.

The Greek pages show 6972975332 and 2238061340; the English pages show 6987747365. Email remains null. Arrival times, travel distances, attractions, ferry schedules and accessibility claims are not invented. Rating snapshots are retained centrally but hidden because values/counts change and owner authorization is pending. A Booking.com quality classification is not presented as an official hotel star rating.

## Research notes — 21 September 2026

The supplied Booking.com and Google Maps short links could not be opened through the research tool. Search located the official Booking.com listing:
https://www.booking.com/hotel/gr/glyfoneri-apartments-sea-view.en-gb.html

It supports the name, Glyfa address, beachfront setting and core amenities. Search snapshots differed (9.8/13 reviews versus 9.7/14), so no numeric rating is displayed. Google Maps phone and original rating remain user-supplied observations, not independently reverified. The selected images in `public/images/curated/` are local copies from the supplied desktop image folder; exact duplicates and less varied views were excluded.

## Translation editing

Edit `en.ts` and `el.ts` together. `Dictionary` derives from the English shape and checks the Greek dictionary. All visible visitor copy belongs here. Routes use `/el` and `/en`; switching preserves the current page and accommodation slug. Local storage remembers only the language. Explicit language routes take precedence over the stored choice. A blocked storage API gracefully falls back to Greek. Brand and third-party names remain unchanged.

## Image replacement guide

Selected photos are stored in `public/images/curated/` and are used by the home page, accommodation details and gallery. The source files are 1024×768 pixels. Obtain image-use approval and guest consent where applicable before public launch. Recheck cropping on phones and provide responsive variants if needed.

Export the owner-supplied originals as WebP/AVIF plus fallback images at 640, 960 and 1600px widths. Update the photo source, intrinsic dimensions, translated alt text, and add `picture`/`srcSet` variants. Check cropping on phones and preserve dimensions to avoid layout shifts. No generated property likeness or unrelated stock accommodation is used.

## Booking links

Change only `property.bookingUrl` after verifying the official destination. `BookingLink` consistently uses a new tab with `noopener noreferrer` and an accessible external-destination notice. Booking.com handles actual rates, availability, terms and payments. No direct reservation is made here. Keep the provided Maps URL centralized too.

## Inquiry integration

The current form validates locally and displays that **nothing was sent**. It makes no network request and stores no inquiry data. Its button says “Check inquiry details.” Required fields, email, valid future arrival dates, departure ordering, nonnegative integer guest counts and privacy consent are validated. Upper guest limits remain null until the owner confirms them; the form is not a capacity or availability checker.

`InquiryAdapter.submit()` is the future integration boundary. To activate it:

1. Obtain approved privacy text, official email, and owner-confirmed limits.
2. Implement a Node/Express POST endpoint with independent server-side Zod validation, rate limiting, spam controls, restricted CORS, request size limits and idempotency.
3. Connect a transactional email provider server-side. Keep secrets outside browser builds. Confirm recipient ownership and test real delivery.
4. Replace the unavailable adapter with a fetch adapter using the public endpoint configuration. Return `sent` only after the server accepts the inquiry with a reference. Add network/timeout/error/retry states and a separate honest success UI. Never imply an inquiry confirms a booking.
5. Update the contact copy, button, privacy notice, configuration and automated tests together. Merely setting `VITE_INQUIRY_ENDPOINT` or `enabled` does not activate the form.

## SEO and deployment

Set `VITE_SITE_URL` to the final HTTPS origin and rebuild. Titles, descriptions, Open Graph, X summary metadata, canonical and Greek/English hreflang links are route-aware. Structured data contains only the property name and public address; unconfirmed phone, ratings, stars, prices and inventory are excluded. No social image is claimed while photography is missing.

Deploy `dist/` to a static host with history fallback to `index.html`. `_redirects` is provided for compatible hosts; on Nginx use `try_files $uri $uri/ /index.html`. Verify deep links on the real host. Client-side 404 pages work, but an SPA fallback returns HTTP 200; use a server route allowlist or prerendering if true HTTP 404 responses are required. Metadata is client-rendered; for reliable social crawlers, add prerendering or SSR before public marketing launch.

The build generates `sitemap.xml` from the configured origin; without one it is intentionally empty. `robots.txt` intentionally disallows indexing for this development release. Before launch, approve content and legal pages, set `ownerConfirmed`, and change the documented robots policy in `scripts/seo.mjs` to allow indexing. Do not assume robots/noindex is access control; use host authentication for a private preview. Configure HTTPS and host security headers, e.g. CSP restricted to self, `Referrer-Policy: strict-origin-when-cross-origin`, and `X-Content-Type-Options: nosniff`.

## Accessibility and performance

Semantic landmarks, skip link, visible focus rings, native modal dialogs, Escape closing, arrow-key gallery navigation, focus restoration, translated labels, associated inline errors and reduced-motion support. Native dialogs provide focus trapping and background inertness in supported modern browsers. Language routes update the document language. Route changes focus main content. Modal body scrolling is locked. System fonts support Greek without third-party font requests. Images reserve space and lazy-load below the hero; secondary routes load separately. No trackers, autoplay video or embedded Maps scripts.

Test supported browsers and screen readers before release. Lighthouse targets are goals, not measured scores; no score is claimed without a report. The automated dialog test shim verifies component state, not a browser's native focus trap, so browser verification is also required.

## Future backend plan

Keep type IDs stable when moving to PostgreSQL. Add separate tables for accommodation types, physical units, seasonal rates, availability blocks, reservations, guests, policy versions, payment events and synchronization jobs. Keep inventory transactional; use database constraints and locking to prevent overlapping reservations. Treat webhook delivery as idempotent and verify payment signatures. Record payment status separately from reservation status. A channel manager or iCal integration must resolve synchronization conflicts and time zones before direct booking opens. iCal alone does not guarantee instant availability; do not sell inventory from a stale browser calendar. Add authentication, role-based property administration, audit logs, backups and data-retention controls when that application is built.

## OWNER INFORMATION REQUIRED

- Official business name and legal business information.
- Authorized logo, if available.
- High-resolution authorized property photographs.
- Official email and confirmation of the language-specific phone numbers.
- Official names for the four maisonettes.
- Capacity, bed configuration, room sizes, floors and confirmed views.
- Full amenities, parking details and beach facilities.
- Check-in/check-out times and arrival instructions.
- Cancellation, payment, pet and child policies.
- Accessibility information and limitations.
- Approved Greek and English descriptions.
- Authorization to display reviews or ratings, with a fresh source check.
- Approved privacy, cookie and booking terms text.

## Pre-launch checklist

- [ ] Obtain all owner information above; clear every pending factual field.
- [ ] Replace all placeholder images and remove development labels.
- [ ] Approve legal pages and confirm host data processing.
- [ ] Reverify Booking.com/Maps destinations and contact information.
- [ ] Configure canonical origin, inspect sitemap/hreflang and decide SSR/prerendering.
- [ ] Verify actual email delivery before enabling submissions, or keep the honest disabled state.
- [ ] Run type checking, tests and production build.
- [ ] Review mobile/tablet/desktop, 200% zoom, keyboard and screen reader behavior.
- [ ] Measure Lighthouse on production, inspect runtime console and check deep links.
- [ ] Enable indexing only after owner approval and final content review.
