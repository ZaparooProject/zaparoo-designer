# Zaparoo Designer

Browser-based label/card designer for the Zaparoo NFC project. Deployed at [design.zaparoo.org](https://design.zaparoo.org/). Everything runs client-side — no server, no login, no saved state.

## Commands

- `yarn dev` — Start Vite dev server
- `yarn build` — Build for production (runs prebuild + tsc + vite build)
- `yarn lint` — ESLint check
- `yarn test` — Run tests once (Vitest)
- `yarn make-logos` — Regenerate logo data files, then auto-format with Prettier
- `yarn preview` — Preview production build locally

## Tech Stack

- React 19, TypeScript (strict), Vite 7
- MUI 7 + Emotion for UI components and styling
- FabricJS 6 for canvas rendering and template manipulation
- PDFKit for PDF generation (with custom FabricJS-to-PDF bridge in `src/extensions/`)
- React Router DOM 7 (BrowserRouter, routes: `/` for V1, `/editor` for V2)
- React Context API for state management
- Netlify Functions for serverless API proxying (image search via IGDB/TheGamesDB)
- Yarn as package manager

## Architecture

```
src/
  components/       V1 UI (original editor at "/" route)
  componentsV2/     V2 UI (new editor at "/editor" route, active development)
  contexts/         React Context definitions (appData, fileDropper)
  hooks/            Custom hooks (canvas, file handling, paste, resize)
  utils/            Utilities (PDF prep, template handling, search, colors)
  extensions/       FabricJS extensions (PDF export, font cache, custom config)
  assets/templates  SVG templates, console/controller/logo images, fonts
  constants/        App constants
netlify/
  functions/        Serverless endpoints (search, imageProxy, platforms, companies)
  apiProviders/     API integrations (IGDB, TheGamesDB, auth token management)
  data/             Platform data mappings
```

V1 and V2 UIs coexist during migration. New work should target `componentsV2/` unless fixing V1 bugs.

## State Management

Two React Contexts provide app-wide state:

- `AppDataContext` (`src/contexts/appData.ts`) — template selection, colors, print options, media type
- `FileDropContext` (`src/contexts/fileDropper.ts`) — files/cards, card editing, selection state

Context providers are in `src/components/AppDataProvider.tsx` and `src/components/FileDropperProvider.tsx`.

## Code Style

- Prettier: 2-space indent, single quotes, trailing commas, semicolons
- ES modules (`import`/`export`), destructure imports when possible
- TypeScript strict mode — no `any` types, no unused locals/parameters
- Component files are PascalCase `.tsx`, hooks are `useCamelCase.ts`
- CSS files sit alongside their components with matching names

## Template System

See @TEMPLATES.md for the full template format specification.

Templates are SVG files with custom `zaparoo-placeholder` and `zaparoo-fill-strategy` attributes. They are registered in `src/cardsTemplates.ts` with metadata (layout, author, compatible media sizes). Template previews live in `src/assets/templatesPreviews/`.

## Netlify Functions

Serverless functions in `netlify/functions/` proxy external API calls (IGDB, TheGamesDB) to avoid exposing API keys client-side. These use `.mts` extensions (ES module TypeScript). API provider implementations are in `netlify/apiProviders/`.

## Git Conventions

Commit messages use conventional format: `feat():`, `fix():`, `chore():` with a description. PRs are squash-merged.

## Important

- NEVER commit `.env` files or API keys — Netlify functions use environment variables configured in the Netlify dashboard
- NEVER modify `node_modules/blob-stream/` directly — the `prebuild` script copies a patched `blob-stream.js` from `src/utils/blob-stream.js` into node_modules before each build
- Testing is in early stages (Vitest) — add tests for new logic during development, especially pure functions and reducers
- Asset files in `src/assets/consoles/`, `src/assets/controllers/`, and `src/assets/logos/` have specific usage permissions from their authors — do not redistribute outside this project
- Zaparoo trademark assets are licensed specifically to this project — they must be removed if redistributing or forking
- The MUI theme (dark mode, custom palette with primary `#5361D9`) is configured in `src/main.tsx`
- FabricJS is excluded from Vite's dependency optimization (`vite.config.ts`)

## Testing Guidelines

Testing is in early stages. Add tests when writing new logic — especially pure functions, reducers, and utilities. Don't retrofit tests onto unchanged code, but do cover new work.

### Principles

**Test behavior, not implementation.** Tests should verify what the code does from the consumer's perspective. If you refactor internals without changing behavior, no tests should break. Ask: "What would a caller of this function observe?" Test that.

**Mock discipline:**

- Only mock external dependencies: network I/O, browser APIs, third-party services.
- Never mock internal business logic. If you need to mock an internal module to test another, the design likely needs rethinking.
- "Don't mock what you don't own": wrap third-party code in your own abstraction. Mock your wrapper, not the library directly.

**AAA pattern.** Every test follows Arrange / Act / Assert:

```typescript
it('should return Edit panel when card has no game data', () => {
  // Arrange
  const state: PanelState = { ...initialPanelState, panel: panels.Templates };

  // Act
  const next = panelReducer(state, {
    type: 'ENTER_EDITING',
    editingCard: makeCard(),
  });

  // Assert
  expect(next.panel).toBe(panels.Edit);
});
```

**Descriptive test names.** Use the pattern: `"should [expected behavior] when [condition]"`

```typescript
// Good
it('should restore lastCollectionPanel when leaving from editing-only panel');
it('should switch to Resources panel when card has game data');

// Bad
it('works');
it('test panel');
```

### LLM-Specific Pitfalls

When writing tests with LLM assistance, watch out for:

1. **Don't test the mock**: if the test only verifies that a mock returns what you told it to, you're testing nothing.
2. **Don't mirror implementation in tests**: if the test logic is a copy of the source logic, it can't catch bugs.
3. **Test edge cases, not just happy paths**: empty inputs, null values, boundary conditions.
4. **Avoid snapshot overuse**: snapshots are brittle and obscure intent. Prefer explicit assertions on the fields that matter.
5. **Assertions must be meaningful**: every test must assert something that would fail if the code were broken. `expect(result).toBeDefined()` alone is almost never sufficient.

### Project Structure

Unit tests live next to their source files:

```
src/
  componentsV2/
    panelReducer.ts
    panelReducer.test.ts
  utils/
    colors.ts
    colors.test.ts
```

### Running Tests

```bash
yarn test          # Run all tests once
npx vitest         # Run in watch mode
```
