# Lorena Cleaning Services — independent website concept

A complete mobile-first React, TypeScript and Vite website demo for an independent cleaner serving Ilford and Redbridge. Styled with Tailwind CSS and custom CSS, with Lucide React icons, self-hosted DM Serif Display / DM Sans fonts and subtle Motion for React entrance animations.

**This is an unsolicited concept, not an official business website. It is not affiliated with or endorsed by Lorena-Cleaning Services.** No reviews, certifications, insurance, staff, guarantees, prices or business history have been invented.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173/lorena-cleaning-demo/`.

```sh
npm run build
npm run preview
```

The build runs strict TypeScript checks before producing the static site in `dist/`. The preview serves that build, normally at `http://127.0.0.1:4173/lorena-cleaning-demo/`. The committed `package-lock.json` supports reproducible installation with `npm ci`.

## Verification

```sh
npm test
npm run build
node scripts/verify-serve.mjs
node scripts/verify-serve.mjs --dev
```

The eight component tests exercise validation, field focus, the non-transmitting demo submission, clearing entries, service selection, mobile-menu interactions, anchor destinations and contact links. The serve check temporarily starts Vite on loopback port 4187, checks the base path and production file responses, then stops its server. These checks do not verify visual browser rendering.

Desktop and mobile browser visual checks remain outstanding: the build session had no connected browser surface. Before publishing, inspect at 320, 390, 768, 1024 and 1440px widths, check for horizontal overflow, and exercise keyboard navigation and the form in an actual browser.

Dependency audit at build time: `npm audit --omit=dev` reports zero vulnerabilities. The full audit reports a high-severity `picomatch` ReDoS advisory propagated through five development dependency entries (`picomatch`, `fdir`, `tinyglobby`, `vite`, `vitest`). The registry currently offers no patched picomatch version. This dependency is not included in the static client bundle; do not pass untrusted glob patterns to the build/test tooling. Vite is configured to bind to loopback only. Recheck the advisory when upgrading dependencies rather than blindly applying npm's suggested major downgrades.

## GitHub Pages

1. Create a GitHub repository named **lorena-cleaning-demo**.
2. Push this project to its `main` branch, including the lockfile and `.github/workflows/deploy.yml`. Do not commit `node_modules` or `dist`.
3. In the repository, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Push a change or manually run **Actions → Deploy demo to GitHub Pages → Run workflow**.
5. The completed deployment reports the URL: `https://<your-github-username>.github.io/lorena-cleaning-demo/`.

The Vite base is `/lorena-cleaning-demo/`. All bundled images, fonts, scripts and styles respect this base. This single-page site uses standard anchor links, so React Router / HashRouter is unnecessary. If you rename the repository or deploy to a root/custom domain, change `base` in `vite.config.ts` and rebuild.

Repository: [yashashp2/lorena-cleaning-demo](https://github.com/yashashp2/lorena-cleaning-demo).

GitHub Pages URL: [lorena-cleaning-demo](https://yashashp2.github.io/lorena-cleaning-demo/). Pushes to `main` run the tests, production build and deployment automatically; check the repository's Actions tab for deployment status.

## Demo boundaries and data handling

- The quote form never transmits, persists or logs submitted information. Values exist only in React component memory while the page is open and are cleared on successful submission. There is no backend, local storage, session storage, analytics, tracking or service worker.
- Use sample information when testing. Browser extensions or browser autofill are outside the application’s control; autocomplete is disabled on the form.
- Required fields: full name, email, telephone, UK postcode, cleaning service and property type. Preferred date and additional details are optional. The date cannot be in the past; it is never treated as a booking.
- Errors appear beside the matching fields and focus moves to the first invalid control. Success moves focus to an explicit demonstration-only confirmation.
- Service enquiry links preselect the relevant service. Visitors can also call, email, open the public Nextdoor profile or try WhatsApp. Those links leave the demo or open a device application; they do not automatically send messages.
- The WhatsApp link uses `+447831039380`; availability of a WhatsApp account is **unverified**.
- The three-step enquiry flow is a proposed website experience, not a verified existing business procedure.
- No precise address or exhaustive area list is published. Surrounding-area availability should be checked with Lorena.
- `noindex, nofollow, noarchive` meta directives discourage indexing. They are not access controls; a deployed GitHub Pages site may be public. No robots.txt disallow is used, so crawlers can see the noindex instruction.

## Content and photography

Business details and the nine years of experience were supplied in the project brief, attributed to [Lorena’s public Nextdoor profile](https://nextdoor.co.uk/pages/lorena-cleaning-services-ilford-england/). They have not been independently reconfirmed with the owner. Confirm currency, wording, contact details, permissions and actual coverage with Lorena before any official launch.

Photography is illustrative stock imagery, not Lorena, her customers, her work or local properties. Optimised WebP files are bundled locally to avoid third-party image requests at runtime. Sources and licence details are in [ASSETS.md](ASSETS.md). No stock portrait represents Lorena.

Before adapting this demo into an official live enquiry site, obtain the owner’s approval, confirm the business facts, connect and test a suitable form backend, and provide an accurate privacy notice. Keep the demo’s noindex directive unless intentionally launching an authorised official site.

## Project structure

```text
src/
  App.tsx                    Homepage sections
  data.ts                    Contact details, navigation and services
  components/
    Header.tsx               Brand and accessible mobile navigation
    QuoteForm.tsx            Local-only form, validation and confirmation
    Reveal.tsx               Reduced-motion-aware entrance animation
  styles.css                 Tailwind theme and responsive presentation
public/
  favicon.svg
  images/                    Bundled illustrative WebP photographs
.github/workflows/deploy.yml  GitHub Pages build and deployment
```

## Accessibility and performance

Semantic landmarks, a skip link, labelled form controls, visible keyboard focus, native anchor navigation, Escape-to-close mobile navigation, reduced-motion support, responsive images and a priority-loaded hero are included. Below-the-fold photography is lazy-loaded. Fonts are self-hosted. No runtime requests to font, image or analytics services are required.
