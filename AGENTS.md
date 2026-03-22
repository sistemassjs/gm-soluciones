# AGENTS.md

## Cursor Cloud specific instructions

This is **SolucionesGM** — a purely frontend Angular 20 SPA (marketing website). There is no backend or database in this repo.

### Running the app

- `npm start` runs the dev server on `http://localhost:4200` (uses `ng serve` with hot-reload).
- See `README.md` for standard Angular CLI commands (build, test, serve, scaffold).

### Testing

- `npm test` runs Karma + Jasmine unit tests. Use `CHROME_BIN=$(which google-chrome) npx ng test --no-watch --browsers=ChromeHeadless` for headless CI-style runs.
- **Known issue:** The existing `app.spec.ts` tests fail with `NG0201: No provider for HttpClient` — this is a pre-existing test configuration gap (missing `provideHttpClient()` or `HttpClientTestingModule` in the test setup), not an environment problem.

### Lint

- No ESLint or lint script is configured in this project. `npm run build` (TypeScript compilation) serves as the primary static check.

### Notes

- The contact form POSTs to an external API (`api.solucionesgm.com/contact`); submissions will fail locally but the rest of the app is fully functional.
- `animate.css` is listed under `devDependencies` but is used at runtime via style imports — this is the project's convention.
