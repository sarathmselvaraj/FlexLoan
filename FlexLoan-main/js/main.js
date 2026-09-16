/**
 * Loan & Mortgage Advisory — Main JavaScript Framework
 * Handles Theme Toggling, RTL Toggle, Mobile Menu, Tabs, Accordions, Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileMenu();
  initDesktopDropdowns();
  initTabs();
  initAccordions();
  initCounters();
  initHeroCalculator();
  initPricingToggle();
  initDocumentFilter();
});

/* --- THEME TOGGLE (DARK / LIGHT) --- */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);

      // Dispatch custom event for Chart.js updates if active
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(icon => {
    if (theme === 'light') {
      // Moon icon for light mode (to switch back to dark)
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    } else {
      // Sun icon for dark mode (to switch to light)
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
    }
  });
}

/* --- RTL TOGGLE --- */
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const savedRTL = localStorage.getItem('rtl') === 'true';

  if (savedRTL) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
  updateRTLUI(savedRTL);

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const newState = !isRTL;

      if (newState) {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl', 'true');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('rtl', 'false');
      }
      updateRTLUI(newState);
    });
  });
}

function updateRTLUI(isRTL) {
  const ltrBadges = document.querySelectorAll('.ltr-badge');
  const rtlBadges = document.querySelectorAll('.rtl-badge');

  ltrBadges.forEach(badge => {
    if (isRTL) {
      badge.className = 'ltr-badge px-2 py-0.5 rounded-full transition-all duration-200 text-[var(--text-muted)] hover:text-[var(--text-primary)] font-normal';
    } else {
      badge.className = 'ltr-badge px-2 py-0.5 rounded-full transition-all duration-200 bg-[var(--accent-gold)] text-black font-extrabold shadow-sm';
    }
  });

  rtlBadges.forEach(badge => {
    if (isRTL) {
      badge.className = 'rtl-badge px-2 py-0.5 rounded-full transition-all duration-200 bg-[var(--accent-gold)] text-black font-extrabold shadow-sm';
    } else {
      badge.className = 'rtl-badge px-2 py-0.5 rounded-full transition-all duration-200 text-[var(--text-muted)] hover:text-[var(--text-primary)] font-normal';
    }
  });
}

/* --- MOBILE MENU & DROPDOWNS (SCOPED BELOW LG BREAKPOINT < 1024px) --- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (menuBtn && mobileNav) {
    function openMenu(e) {
      if (window.innerWidth >= 1024) return;
      if (e) e.stopPropagation();

      mobileNav.classList.remove('translate-x-full', 'hidden');
      if (overlay) overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu(e) {
      if (e) e.stopPropagation();
      mobileNav.classList.add('translate-x-full', 'hidden');
      if (overlay) overlay.classList.add('hidden');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Auto-close mobile drawer when window resizes to desktop (>= 1024px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    });
  }

  // Mobile Accordion Dropdowns inside Drawer
  const dropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth >= 1024) return;
      e.preventDefault();
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      const icon = btn.querySelector('.mobile-dropdown-icon');
      if (menu) {
        menu.classList.toggle('hidden');
      }
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
}

/* --- DESKTOP NAV DROPDOWNS --- */
function initDesktopDropdowns() {
  const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper');

  dropdownWrappers.forEach(wrapper => {
    const toggleBtn = wrapper.querySelector('.nav-dropdown-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('open');
      dropdownWrappers.forEach(w => w.classList.remove('open'));
      if (!isOpen) {
        wrapper.classList.add('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    dropdownWrappers.forEach(wrapper => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
      }
    });
  });
}

/* --- TABS SYSTEM --- */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs-container]');

  tabContainers.forEach(container => {
    const btns = container.querySelectorAll('[data-tab-btn]');
    const contents = container.querySelectorAll('[data-tab-content]');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab-btn');

        btns.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.add('hidden'));

        btn.classList.add('active');
        const activeContent = container.querySelector(`[data-tab-content="${target}"]`);
        if (activeContent) activeContent.classList.remove('hidden');
      });
    });
  });
}

/* --- ACCORDION SYSTEM --- */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close siblings if in standard accordion
      const parent = item.parentElement;
      if (parent && parent.hasAttribute('data-accordion-single')) {
        parent.querySelectorAll('.accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
          const sibContent = sibling.querySelector('.accordion-content');
          if (sibContent) sibContent.style.maxHeight = null;
        });
      }

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });
}

/* --- ANIMATED COUNTERS --- */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseFloat(counter.getAttribute('data-counter'));
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
        
        let startValue = 0;
        const duration = 2000;
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = startValue + (targetValue - startValue) * easeOut;

          counter.textContent = prefix + currentValue.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        }

        requestAnimationFrame(updateNumber);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* --- TOAST NOTIFICATIONS --- */
window.showToast = function(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 right-6 z-50 px-6 py-3.5 rounded-full text-white font-medium shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-10 opacity-0 ${
    type === 'success' ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : 'bg-gradient-to-r from-rose-600 to-amber-500'
  }`;
  
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

/* --- HERO HERO TEASER CALCULATOR MATH --- */
function initHeroCalculator() {
  const amountSlider = document.getElementById('hero-amount-slider');
  const amountVal = document.getElementById('hero-amount-val');
  const tenureSlider = document.getElementById('hero-tenure-slider');
  const tenureVal = document.getElementById('hero-tenure-val');
  const resultVal = document.getElementById('hero-emi-result');

  if (!amountSlider || !tenureSlider || !resultVal) return;

  function updateHeroEMI() {
    const P = parseFloat(amountSlider.value);
    const tenureYears = parseFloat(tenureSlider.value);
    const r = 0.085 / 12; // 8.5% annual rate
    const n = tenureYears * 12;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    if (amountVal) amountVal.textContent = '₹' + P.toLocaleString('en-IN');
    if (tenureVal) tenureVal.textContent = tenureYears + (tenureYears === 1 ? ' Year' : ' Years');
    resultVal.textContent = '₹' + Math.round(emi).toLocaleString('en-IN');
  }

  amountSlider.addEventListener('input', updateHeroEMI);
  tenureSlider.addEventListener('input', updateHeroEMI);
  updateHeroEMI();
}

/* --- PRICING BILLING TOGGLE --- */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-billing-toggle');
  if (!toggle) return;

  const priceElements = document.querySelectorAll('[data-monthly-price]');

  toggle.addEventListener('change', (e) => {
    const isAnnual = e.target.checked;
    priceElements.forEach(el => {
      const monthly = el.getAttribute('data-monthly-price');
      const annual = el.getAttribute('data-annual-price');
      el.textContent = isAnnual ? annual : monthly;
    });
  });
}

/* --- DOCUMENT CHECKLIST TAB FILTER --- */
function initDocumentFilter() {
  const filterBtns = document.querySelectorAll('[data-doc-filter]');
  const docCards = document.querySelectorAll('[data-doc-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-doc-filter');

      filterBtns.forEach(b => b.classList.remove('active', 'bg-[var(--accent-gold)]', 'text-[var(--text-inverse)]'));
      btn.classList.add('active');

      docCards.forEach(card => {
        const cardCat = card.getAttribute('data-doc-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}


/* --- NAVBAR SHRINK ON SCROLL --- */
(function () {
  const header = document.querySelector('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('nav-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* --- SCROLL REVEAL (IntersectionObserver) --- */
(function () {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* --- FLOATING MOBILE CTA DISMISS ON SCROLL (hides after CTA in view) --- */
(function () {
  const floatCta = document.querySelector('.mobile-float-cta');
  if (!floatCta) return;
  const heroBtn = document.querySelector('.btn-pill-solid');
  if (!heroBtn) return;
  const obs = new IntersectionObserver(([entry]) => {
    floatCta.style.opacity = entry.isIntersecting ? '0' : '1';
    floatCta.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
  }, { threshold: 0.5 });
  obs.observe(heroBtn);
})();
