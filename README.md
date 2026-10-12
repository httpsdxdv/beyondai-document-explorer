# BeyondAI Document Explorer

Independent React / Next.js / TypeScript portfolio demonstration by Henrique Gonçalves. All six sample documents are fictional. No client material, uploads, authentication, AI calls, tracking or paid backend.

## Run
Node.js 24 or later. `npm install`, `npm run dev`, open `/pt` or `/en`.
Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

## Behavior
Search titles and summaries without case/accent sensitivity. Combine category/year filters and date/title sorting. URL query parameters preserve the search while opening a document, returning to results, or changing language. Unknown IDs return 404. A GET form works without JavaScript; theme is a small React client control persisted locally.

## Architecture
Next.js App Router renders the library and documents on the server. A typed in-memory dataset makes the demo reproducible without credentials. Only theme preference needs client state. Responsive list layout, 44px controls, visible focus and reduced-motion support. Loading and empty states are explicit. This is a UI demonstration, not a production document management or security system.

## Validation and limitations
Unit tests cover search normalization, combined filters, sorting, URL serialization and bilingual content. Browser checks are recorded with the portfolio release evidence. Real Safari/Android testing remains a separate manual gate; no user performance or load claims are made.

## Privacy
No analytics scripts, network document storage, cookies or personal data collection. Theme preference uses localStorage on the visitor's device.

## License
MIT. Fictional demo content is included under the same license.
