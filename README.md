# FlexiLoan — Loan & Mortgage Advisory Multipurpose HTML Template

A multipurpose, service-business HTML template whose primary showcase is a **Loan & Mortgage Advisory Service**. Designed for high-converting financial advisory agencies, mortgage brokers, fintech start-ups, and multipurpose service templates sold on ThemeForest and TemplateMonster.

---

## 🎨 1. Color Palette & Design System

The template features a cinematic gradient identity matching the reference artwork:
- **Dark Mode (Default)**:
  - Base Background: `#0D0B14`
  - Hero Gradient: Violet `#3B1E78` $\rightarrow$ Magenta `#C9396B` $\rightarrow$ Orange `#E67A3E` $\rightarrow$ Teal `#1F7A8C`
  - Accent / CTA: Warm Gold-Orange `#F2A65A` & Solid Accent `#E67A3E`
  - Cards & Surfaces: `#1A1625` with glassmorphism blur
- **Light Mode**:
  - Base Background: `#FDFBF9`
  - Cards & Surfaces: `#FFFFFF`
  - Gradient accent bands (15–20% opacity)

Color tokens are defined as standard CSS Custom Properties in `css/theme.css`:
```css
:root {
  --bg-base: #0D0B14;
  --bg-surface: #1A1625;
  --text-primary: #FFFFFF;
  --accent-gold: #F2A65A;
  --accent-magenta: #C9396B;
}
```

---

## 📁 2. File & Directory Structure

```text
loan-site/
├── css/
│   └── theme.css              # Core design tokens, gradients, pill buttons, RTL, dark/light rules
├── js/
│   ├── main.js                # Theme switcher, RTL toggle, mobile navigation, tabs, accordions, counters
│   ├── calculator.js          # EMI math engine, Chart.js donut rendering, amortization schedule table
│   └── blog.js                # Blog search & category filtering logic
├── index.html                 # Smart Loan Comparison (Primary Loan & Mortgage Advisory)
├── home-2.html                # Agency Advisory (Corporate Debt & Capital Advisory)
├── services.html              # Loan Services Overview (Home, Personal, Business rate cards)
├── service-details.html        # Service Detail Page (Home Loan deep dive, rate table, eligibility, FAQs)
├── calculator.html            # EMI & Mortgage Calculator Page (Sliders, breakdown chart, amortization)
├── documents.html             # Documents Required Checklist by Loan Category + PDF trigger
├── contact.html               # Contact Us & Interactive Loan Enquiry Form with Map Frame
├── about.html                 # About Us (Story, stats counter, team grid, testimonials)
├── services-grid.html         # Generic Services Grid Component Showcase
├── pricing.html               # Plan & Rate Tier Comparison Matrix
├── blog.html                  # Filterable Blog Listing
├── blog-details.html          # Blog Post layout with sidebar widgets
├── login.html                 # Borrower Login Page with show/hide password
├── register.html              # Borrower Registration Page
├── coming-soon.html           # Full-bleed gradient coming soon page with countdown timer
├── 404.html                   # On-brand 404 Error page
├── admin/                     # Decoupled Admin Dashboard Module
│   ├── index.html             # Admin Dashboard Overview & Charts
│   ├── applications.html      # Loan Applications Management Table
│   ├── users.html             # User Directory & Role Management
│   └── settings.html          # Platform Interest Rate & SMS Configurations
└── README.md                  # Project Documentation
```

---

## ⚙️ 3. How to Customization & Features

### A. Toggling Theme Mode (Dark / Light)
Theme mode is controlled via `data-theme="dark"` or `data-theme="light"` on the `<html>` element. The preference is automatically saved in `localStorage` by `js/main.js`.

### B. Enabling Right-to-Left (RTL) Mode
Click the **RTL / LTR** button in the header or set `dir="rtl"` on the `<html>` root tag:
```html
<html lang="ar" dir="rtl" data-theme="dark">
```
Logical CSS properties ensure margins, paddings, gradient angles, and icon directions mirror naturally.

### C. Decoupling or Removing the Admin Module
The admin dashboard resides entirely within the `/admin/` folder. If a client only requires the front-end site, simply delete or exclude the `/admin/` directory.

### D. EMI Calculator Configuration
The EMI formula used in `js/calculator.js` is:
$$E = P \cdot r \cdot \frac{(1+r)^n}{(1+r)^n - 1}$$
Where $P$ is principal amount, $r$ is monthly interest rate ($\text{Annual Rate} / 12 / 100$), and $n$ is tenure in months.

---

## 🚀 4. License & Marketplace Readiness

Clean HTML5, W3C-compliant markup, WCAG AA contrast, modular CSS variables, and zero heavy dependencies — fully ready for ThemeForest and TemplateMonster submission.
