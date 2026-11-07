# Portfolio image loading implementation plan

> Use superpowers:executing-plans task by task; image codec implementation and browser validation are delegated independent units.

**Goal:** Reduce transferred preview image bytes on the existing public portfolio while preserving original readable evidence.
**Architecture:** Checked-in WebP variants and sorted manifest; shared build-time HTML enrichment; original links/lightbox/details retained; original GitHub Pages publication and internal server mirror.
**Tech Stack:** Existing dependency-free Node24 static builder, Pillow offline codec, existing Playwright harness.
**Spec:** `docs/superpowers/specs/2026-11-07-image-loading-design.md`.

## Global constraints
- Current remote main9945af9/treeab1d7c59 is authoritative; no force-push of old API-snapshot history.
- No visual redesign, changed facts, original replacement, new hosting charges, credential/role creation or public server port changes.
- Explicit filtered test commands only, keep artifacts private.

## Review focus
- Small already-compressed images and alpha/text quality.
- Nested details native lazy behavior, lightbox full-resolution requests, no-JS and focus.
- Root/deep relative paths, entity escaping and source manifest drift.
- Real mobile/desktop currentSrc and byte budgets, original SHA unchanged.
- Remote parent chain, concurrent branch changes, generated file consistency and actual Pages deployment.

### Task1 codec
- [x] Generate and repeat-verify variants/manifest with original SHA preservation, codec tests and representative visual checks.
### Task2 shared build and runtime
- [x] Add failing responsive HTML tests, implement shared enrichment and manifest validation, statically render existing covers, update dimension assertions and design context.
- [x] Build and run all required explicit static/targeted/browser/audit checks; fix real regressions and independently review changes.
### Task3 publication
- [ ] Publish verified tree on real remote main parent, await Pages/workflow completion, verify live content/assets, synchronize new server release and record receipt.

## Ledger
- User opted for direct execution and approved the proposed image optimization direction; use existing design and same URL.
- Native worktree created from clean local snapshot; baseline43/43 passes; authoritative remote tree matches baseline.
- Codec:94 originals unchanged,222 previews;6tests green,223file two-pass digest identical. Preserved alpha and ICC;48 full-size PNG previews pixel-identical.
- Shared build: responsive HTML tests RED→GREEN, stale-source validation, native original details/lightbox/no-JS preserved, three project covers moved static; current53 Node tests pass.
- Review: fixed wide singleton/multi-image gallery sizing (unit RED→GREEN and16 fresh headless gallery cases). Strengthened failed-preview test to prove automatic original fallback before click. No remaining P1/P2.
- Browser:16 image-loading cases,34 TapTap checks pass; actual17homeimage bytes7339961→1045296 mobile(-85.76%)/1656252 desktop(-77.44%).
- General accessibility audit with freshly available axe4.14 exposed pre-existing visible chapter01 vs aria-label1 mismatch; fixed accessible labels to include visible padded chapter number (static RED→GREEN), no visible text change. Final70case recheck passed with zero runtime errors. CI now also runs responsive-image regression tests.
- Strict static UI audit retains8 known source-template actionless-button false positives (src/ai.html); handlers are in app.js and actual browser interactions verified. Not claimed strict audit zero.
