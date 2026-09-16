# FlexiLoan Final Manual QA Checklist

Use Chrome DevTools and verify at 360px, 768px, 1024px, 1366px and 1440px. Test once in Light Mode, once in Dark Mode, and repeat key pages in RTL.

## Priority fixes requested

1. **Home 01 – Simple & Transparent Process**
   - Open `index.html` and scroll to **Simple & Transparent Process**.
   - Confirm all 4 cards show real line icons (application, matching, verification, approval), not blank icon boxes.
   - Confirm the small step number remains visible on each icon.

2. **Contact – Name validation**
   - Open `contact.html` → **Free Advisor Consultation**.
   - Enter only `A` in Full Name and submit.
   - Expected: form is blocked and shows a name validation message.
   - Enter `Alex Vance`; expected: name is accepted.

3. **Contact – Email validation**
   - Enter `gtyh@GMAIL` and submit.
   - Expected: form is blocked because a complete domain/TLD is required.
   - Enter `USER@GMAIL.COM`; expected: accepted and normalized to lowercase after validation.

4. **Contact – Phone validation**
   - Type alphabetic characters into Phone Number.
   - Expected: alphabetic characters are removed/not retained.
   - Submit with fewer than 8 digits; expected: blocked.
   - Submit with a valid number such as `+91 98765 43210`; expected: accepted.

5. **Contact – Global Office Network map position**
   - Scroll to **Global Office Network**.
   - Confirm office cards appear first and the live map is below the grid.
   - Click **View Live Map ↓** on New York/London/Singapore/Sydney.
   - Expected: the map below updates and scrolls into view; the arrow direction now matches the map position.

6. **Blog author/meta visibility in Light Mode**
   - Open `blog-fixed-vs-floating.html` and switch to Light Mode.
   - Confirm `By Elena Vance · Chief Financial Analyst`, `8 min read`, and `Aug 2026` are clearly readable on the dark glass metadata strip.

7. **Blog – sections/questions 2 and 4 spacing**
   - On `blog-fixed-vs-floating.html`, inspect headings **2. What Is a Floating...** and **4. The 2026 Rate Outlook...**.
   - Confirm headings do not overlap adjacent text and have clean spacing above/below.

8. **Required Documentation Checklist**
   - Open `service-details.html` and `service-home-loans.html`.
   - Confirm checklist headings, bullet rows and descriptions have clean line spacing and no overlap at desktop/mobile widths.

9. **Services grid alignment**
   - Open `services.html`.
   - Compare first 3 service cards.
   - Confirm category line, heading, description and specification divider start at the same horizontal position and visually aligned row level.

10. **Pricing grid alignment**
   - Open `pricing.html`.
   - Confirm all 3 pricing cards are equal-height on desktop.
   - Confirm badge/header area, title/description, price area, feature list and CTA align consistently.

11. **Blog 3-column card alignment**
   - Open `blog.html` at desktop width.
   - Confirm all article cards in each row have equal height, consistent image height, aligned metadata/title/excerpt/footer, and equal grid spacing.

12. **RTL website-wide**
   - Enable RTL on Home, About, Services, Pricing, Blog, Contact and one service-detail page.
   - Confirm text aligns right where appropriate, dropdown opens on the correct side, mobile drawer opens from the left, form fields/layout remain usable, and spacing is mirrored logically.

13. **About Us – RTL heading overlap**
   - Open `about.html`, enable RTL.
   - Inspect hero and Corporate Evolution headings.
   - Confirm bold text has adequate line-height and no overlap.

14. **Blog – bold heading overlap**
   - Open `blog.html` and at least two blog detail pages.
   - Confirm bold headings wrap cleanly with no text collision in LTR and RTL.

15. **Confirm Password**
   - Open `register.html`.
   - Enter Password `TestPass123` and Confirm Password `WrongPass123`.
   - Expected: registration is blocked and `Passwords do not match` appears.
   - Enter matching values; expected: validation passes.

16. **About Us – 360px trust badges**
   - Open `about.html` at 360px.
   - Confirm ISO 27001, 40+ Bank Partner, ₹2,800 Cr+, and 99.4% bullet indicators form one clean vertical list with identical left/start alignment.

17. **Corporate Evolution – 2018 at 360px**
   - At 360px, scroll to Corporate Evolution.
   - Confirm the **2018 Platform Launch** card has the intended accent border/background highlight and is visually distinct without breaking card alignment.

## High-priority common regression checks

18. **Navbar / mobile navigation**
   - Navbar remains sticky on public pages.
   - Mobile menu opens without pushing page content.
   - Overlay and Escape close the drawer.
   - RTL mobile drawer opens from the correct side.

19. **Authentication state**
   - Register a new account with matching passwords.
   - After registration, refresh and confirm Profile state persists.
   - Logout and verify Login/Sign Up return.
   - Registered account should only login with its saved password.
   - Demo login: `client@flexiloan.demo` / `Client@123`.

20. **Action feedback**
   - Newsletter forms and form submits should use in-page toast feedback, not native browser `alert()` popups.

21. **Blog search/filter**
   - Search a title keyword and verify matching cards remain.
   - Select a category and verify only matching category cards remain.
   - Clear search/category and confirm all cards restore.

22. **Pricing toggle / calculator**
   - Toggle monthly/annual pricing and confirm displayed price values update.
   - Open calculator and verify sliders recalculate EMI/output without console errors.

23. **Links and detail navigation**
   - Test Home → Services → service detail → calculator/contact.
   - Test Blog cards → correct blog detail pages.
   - Test footer links and social links.

24. **Light/Dark mode visibility**
   - Check hero text, muted text, forms, cards, tables, badges, buttons and footer in both modes.
   - No white-on-white / dark-on-dark content should remain.

25. **Responsive breakpoints**
   - Verify 360, 390, 414, 768, 1024, 1366, 1440.
   - Confirm no horizontal page overflow, clipped buttons, overlapping headings, image overflow, or broken card grids.

## Automated static QA already completed

- 28 HTML pages scanned.
- No broken local file references found.
- No duplicate HTML IDs found.
- No missing image `alt` attributes found.
- No buttons missing an explicit `type` attribute.
- No dead `href="#"` links remain.
- No native `alert()` calls remain.
- All JavaScript files pass syntax validation.
- All CSS files parse without syntax errors.
- Final correction CSS/JS is loaded on all 28 HTML pages.

26. **Home process premium icons**
   - Check all 4 process cards in Light and Dark mode.
   - Application, Match, Verification and Sanction icons must be clearly visible inside premium gradient tiles; no blank white placeholders.

27. **Pricing redesign**
   - Confirm three equal-height pricing cards: Standard Advisory, Premium Rate Match, Corporate Debt Desk.
   - Middle card must show centered `MOST POPULAR` badge and accent border.
   - Prices, feature ticks and bottom CTAs should align cleanly in Light/Dark mode and stack correctly on mobile/tablet.
