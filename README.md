# Shree Sidhh Rudreshwar Mahadev Temple Trust — React Frontend

## Run locally
```
npm install
npm run dev
```
Then open the printed localhost URL.

## Build for production
```
npm run build
```
Output goes to `dist/`.

## Status
This is Phase 1 of the full spec: complete project scaffold, design system,
routing for all 15 planned sections, and a fully-built Home page.

**Built pages:** Home (all sections), Puja Booking (list + dynamic detail page with
working booking form at `/puja-booking/:slug`), Member Login, Member Registration,
Member Dashboard (profile, membership card, donation history, puja booking history —
protected route, redirects to Login if not signed in).

**Stubbed routes (ComingSoon placeholder):** About Trust, About Temple, Online Darshan,
Donation, Gaushala, Bhojanshala, Events, Cultural Activities, Gallery, News, Volunteer,
Contact.

## Auth (current phase)
`src/context/AuthContext.jsx` simulates login/register with an in-memory + sessionStorage
session (no real backend yet). Any email/password combination works. Swap the function
bodies for real `apiClient` calls to Laravel Sanctum when the backend is ready — component
code won't need to change.

## Images
All images in `src/assets/images/**` are placeholder photography (navy/gold/saffron
toned abstract art), generated locally because this build environment has no internet
access to source real temple photographs. They are real JPG files rendered via
standard `<img>` tags — not SVGs, not CSS backgrounds, not base64 — so you can replace
them 1:1 with real photography later without touching any component code. Just keep
the same filenames, or update the import path in the relevant component.

## Folder structure
```
src/
├── assets/{images,videos,styles}
├── components/{common,home,about,temple,gallery,donation,puja,gaushala,
│               bhojanshala,membership,event,blog,contact}
├── layouts/        (MainLayout: Navbar + Footer + floating buttons)
├── pages/           (route-level pages)
├── routes/          (centralized route path constants)
├── services/        (data-access layer, already shaped like future API calls)
├── hooks/            (useCountUp, useScrollToTop)
├── context/         (reserved for AuthContext etc. — next phase)
├── data/            (dummy JSON-like data, swap for API responses later)
└── utils/
```

## Backend integration path
`src/services/apiClient.js` is a pre-configured Axios instance for Laravel + Sanctum
(cookie auth, `VITE_API_BASE_URL` env var). `src/services/templeService.js` already
exposes the exact function signatures components call (`getStats()`, `getPujas()`,
etc.) — swap each function body from local data to an `apiClient.get(...)` call and
no component needs to change.
