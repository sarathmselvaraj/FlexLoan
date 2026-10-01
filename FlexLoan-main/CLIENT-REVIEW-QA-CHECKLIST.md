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
