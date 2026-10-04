# FlexiLoan — Client Review Corrections & Manual QA Checklist

## Client review issues
- [x] 1. Logo wordmark uses one solid text colour; no gradient treatment on brand text.
- [x] 2. Theme, RTL, secondary Login and primary CTA share a consistent 44px control height and 12px radius.
- [x] 3. Home Page 2 hero redesigned into a distinct executive mandate-board layout with corporate capabilities and metrics.
- [x] 4. Home Page 1 FAQ answers have additional bottom breathing room.
- [x] 5. Named section kickers/headings (Tailored Financing, Strategic Corporate Finance, Advisory Standard, Latest Briefings) use one readable alignment/visibility system.
- [x] 6. First Institutional Excellence icon has a visible premium background in light and dark modes.
- [x] 7. Residential Home Loans destination hero whitespace reduced and next section pulled into a balanced rhythm.
- [x] 8. EMI Calculator content uses consistent left/right gutters at mobile, tablet and desktop widths.
- [x] 9. Primary and secondary CTA text increased for readability.
- [x] 10. 100% Money-Back Policy full card has a coherent light-theme treatment.
- [x] 11. Contact regional offices and Live Office Map have clear vertical separation.
- [x] 12. Primary/secondary CTAs have explicit high-contrast light-theme styles.
- [x] 13. Login is the consistent secondary header CTA; Apply/Book action is primary.
- [x] R1. Every mobile drawer includes Client Portal.
- [x] R2. At 1024px the desktop navigation is replaced by the hamburger layout to prevent menu-link crowding.

## Regression tests completed
- [x] 28 HTML pages return HTTP 200 locally.
- [x] Broken local links/assets: 0.
- [x] Broken local anchors: 0.
- [x] Duplicate IDs: 0.
- [x] Images without ALT text: 0.
- [x] Buttons without explicit type: 0.
- [x] Dead href="#" links: 0.
- [x] JavaScript syntax: PASS.
- [x] CSS brace integrity: PASS.
- [x] All 28 pages have a mobile navigation drawer.
- [x] All 28 mobile drawers contain Client Portal.
- [x] All page headers expose Theme, RTL, secondary and primary control hierarchy.
- [x] Latest auth, EMI calculator, blog filtering/search, document/filter and theme/RTL JS files retained.

## Suggested manual viewport checks
- 360px: hamburger opens, Client Portal is visible, CTA text does not clip.
- 768px: Home 2 mandate board stacks cleanly; buttons remain full-width where appropriate.
- 1024px: hamburger layout is used on Home, Blog, EMI Calculator and other pages; no crowded desktop links.
- 1280/1440px: desktop navigation and Home 2 mandate board use full desktop layout.
- Light/Dark: header CTAs, section badges, Institutional Excellence icon and Money-Back section remain readable.

## 2026-10-04 Screenshot Alignment Pass
- [x] Home 1 FAQ: active answer opens fully; header/content padding and text contrast normalized.
- [x] Home 2 Institutional Financial Advisory: six cards use aligned icon/title/paragraph/list/CTA rows.
- [x] Home 1 Loan Portfolio: six cards use aligned title/description/features/CTA rows; bullets and arrows standardized.
- [x] Desktop card headings: kept on one line where the 3-column layout provides sufficient width; tablet/mobile wrap safely.
- [x] About — 6 Core Pillars: all paragraphs start on the same visual baseline in desktop/tablet grids.
- [x] Home Loan Documentation Checklist: bullet and complete sentence use two fixed columns; no word-by-word wrapping.
- [x] 1024px: desktop nav is intentionally replaced by the mobile drawer; open drawer overrides Tailwind lg:hidden correctly.
- [x] 768–1023px: two-column cards retain equal internal content starts.
- [x] 320–575px: FAQ/card/checklist padding reduces without clipping or horizontal overflow.

## 1024px navbar restoration — 2026-10-04
- [ ] Set viewport to exactly 1024px: full FlexiLoan desktop navbar is visible (Home, Services, EMI Calculator, About Us, Pricing, Blog, Contact).
- [ ] At 1024px: LTR/RTL, theme, secondary Login/Client Portal and primary CTA remain visible without horizontal overflow.
- [ ] At 1024px: hamburger is hidden.
- [ ] At 768px/phone widths: hamburger returns and drawer still opens correctly.
- [ ] Repeat the 1024px check on Home 1, Home 2, Blog, EMI Calculator, About, Contact and Home Loan detail pages.
