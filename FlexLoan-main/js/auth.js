/**
 * FlexiLoan — Auth & Profile System
 * Manages login state via localStorage.
 * - Shows Login/Sign Up buttons when logged out
 * - Shows gradient avatar with dropdown when logged in
 * Inject into every page via: <script src="js/auth.js"></script>
 */

(function () {
  /* ─── Constants ─── */
  const USER_KEY = 'fl_user';

  /* ─── Helpers ─── */
  function getUser() {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  }

  function setUser(data) {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
  }

  function clearUser() {
    localStorage.removeItem(USER_KEY);
  }

  function getInitials(name) {
    if (!name) return '?';
    return name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  function getAvatarColor(name) {
    const colors = [
      ['#e040fb','#ff6d00'], ['#ff6d00','#ffd600'],
      ['#00e5ff','#00bfa5'], ['#7c4dff','#e040fb'],
    ];
    const idx = (name || '').charCodeAt(0) % colors.length;
    return colors[idx];
  }

  /* ─── CSS injected once ─── */
  function injectStyles() {
    if (document.getElementById('fl-auth-styles')) return;
    const style = document.createElement('style');
    style.id = 'fl-auth-styles';
    style.textContent = `
      /* Profile Avatar Button */
      .fl-profile-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        border: none;
        background: none;
        padding: 0;
      }
      .fl-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 13px;
        color: #fff;
        letter-spacing: 0.5px;
        border: 2px solid rgba(255,255,255,0.25);
        transition: transform 0.2s, box-shadow 0.2s;
        flex-shrink: 0;
      }
      .fl-avatar:hover { transform: scale(1.08); box-shadow: 0 0 0 3px rgba(255,215,0,0.35); }
      .fl-avatar-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-primary);
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Profile Dropdown */
      .fl-profile-dropdown {
        position: absolute;
        right: 0;
        top: calc(100% + 10px);
        width: 220px;
        background: var(--bg-surface-elevated, #1a1a2e);
        border: 1px solid var(--border-color, rgba(255,255,255,0.1));
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        padding: 8px;
        z-index: 9999;
        opacity: 0;
        transform: translateY(8px);
        visibility: hidden;
        transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
        backdrop-filter: blur(20px);
      }
      .fl-profile-dropdown.open {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }
      .fl-dropdown-header {
        padding: 12px 14px;
        border-bottom: 1px solid var(--border-color, rgba(255,255,255,0.08));
        margin-bottom: 6px;
      }
      .fl-dropdown-user-name {
        font-weight: 700;
        font-size: 14px;
        color: var(--text-primary, #fff);
        line-height: 1.2;
      }
      .fl-dropdown-user-email {
        font-size: 11px;
        color: var(--text-muted, rgba(255,255,255,0.4));
        margin-top: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fl-dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 14px;
        border-radius: 10px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-secondary, rgba(255,255,255,0.7));
        text-decoration: none;
        transition: background 0.15s, color 0.15s;
        cursor: pointer;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
      }
      .fl-dropdown-item:hover {
        background: var(--bg-surface-hover, rgba(255,255,255,0.06));
        color: var(--text-primary, #fff);
      }
      .fl-dropdown-item svg { flex-shrink: 0; opacity: 0.7; }
      .fl-dropdown-divider {
        height: 1px;
        background: var(--border-color, rgba(255,255,255,0.08));
        margin: 6px 0;
      }
      .fl-dropdown-item.logout { color: #f87171; }
      .fl-dropdown-item.logout:hover { background: rgba(248,113,113,0.1); color: #f87171; }

      /* Mobile profile in drawer */
      .fl-mobile-profile {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 12px;
        background: var(--bg-surface-hover, rgba(255,255,255,0.04));
        border: 1px solid var(--border-color, rgba(255,255,255,0.08));
      }
      .fl-mobile-profile-info { flex: 1; min-width: 0; }
      .fl-mobile-profile-name {
        font-weight: 700;
        font-size: 13px;
        color: var(--text-primary, #fff);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fl-mobile-profile-email {
        font-size: 11px;
        color: var(--text-muted, rgba(255,255,255,0.4));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fl-online-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4ade80;
        box-shadow: 0 0 0 2px rgba(74,222,128,0.25);
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);
  }

  /* ─── Build Profile Avatar HTML ─── */
  function buildProfileHTML(user) {
    const initials = getInitials(user.name);
    const [c1, c2] = getAvatarColor(user.name);
    const fname = user.name.split(' ')[0];

    return `
      <div class="relative" id="fl-profile-wrapper">
        <button class="fl-profile-btn" id="fl-profile-trigger" aria-label="Account menu" aria-expanded="false">
          <div class="fl-avatar" style="background: linear-gradient(135deg, ${c1}, ${c2});">${initials}</div>
          <span class="fl-avatar-name hidden xl:block">${fname}</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color:var(--text-muted)" class="hidden xl:block"><path d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="fl-profile-dropdown" id="fl-profile-dropdown" role="menu">
          <div class="fl-dropdown-header">
            <div class="fl-dropdown-user-name">${user.name}</div>
            <div class="fl-dropdown-user-email">${user.email || 'Borrower Account'}</div>
          </div>
          <a href="contact.html" class="fl-dropdown-item" role="menuitem">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            My Profile
          </a>
          <a href="calculator.html" class="fl-dropdown-item" role="menuitem">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg>
            EMI Calculator
          </a>
          <a href="documents.html" class="fl-dropdown-item" role="menuitem">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            My Documents
          </a>
          <div class="fl-dropdown-divider"></div>
          <button class="fl-dropdown-item logout" id="fl-logout-btn" role="menuitem">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </div>
    `;
  }

  /* ─── Build Logged-Out HTML ─── */
  function buildLoggedOutHTML() {
    return `
      <a href="login.html" class="text-sm font-semibold hover:text-[var(--accent-gold)] transition-colors" id="fl-login-link">Login</a>
      <a href="register.html" class="text-sm font-semibold hover:text-[var(--accent-gold)] transition-colors" id="fl-signup-link">Sign Up</a>
    `;
  }

  /* ─── Build Mobile Profile ─── */
  function buildMobileProfileHTML(user) {
    const initials = getInitials(user.name);
    const [c1, c2] = getAvatarColor(user.name);
    return `
      <div class="fl-mobile-profile mb-2">
        <div class="fl-avatar" style="background: linear-gradient(135deg, ${c1}, ${c2}); width:40px; height:40px; font-size:14px;">${initials}</div>
        <div class="fl-mobile-profile-info">
          <div class="fl-mobile-profile-name">${user.name}</div>
          <div class="fl-mobile-profile-email">${user.email || 'Borrower Account'}</div>
        </div>
        <div class="fl-online-dot"></div>
      </div>
      <button class="fl-dropdown-item logout w-full text-left mb-1" id="fl-mobile-logout-btn" style="border-radius:10px;">
        <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </button>
    `;
  }

  /* ─── Inject into Desktop Navbar ─── */
  function patchDesktopNav(user) {
    // Find the auth link container — look for the Login anchor inside .hidden.lg\\:flex
    const loginLink = document.querySelector('a[href="login.html"].text-sm.font-semibold');
    if (!loginLink) return;

    const signupLink = document.querySelector('a[href="register.html"].text-sm.font-semibold');
    const container = loginLink.parentElement;

    if (user) {
      // Replace Login + Sign Up with avatar
      loginLink.remove();
      if (signupLink) signupLink.remove();
      const placeholder = document.createElement('div');
      placeholder.innerHTML = buildProfileHTML(user);
      container.insertBefore(placeholder.firstElementChild, container.querySelector('.btn-pill-outline, .btn-pill-solid'));
      bindProfileDropdown();
    }
    // If not logged in, buttons already exist — nothing to do
  }

  /* ─── Inject into Mobile Drawer ─── */
  function patchMobileNav(user) {
    // Find mobile login/signup links
    const mobileLogin = document.querySelector('a[href="login.html"].py-2');
    const mobileSignup = document.querySelector('a[href="register.html"].py-2');
    if (!mobileLogin && !mobileSignup) return;

    const nav = (mobileLogin || mobileSignup)?.closest('nav');
    if (!nav) return;

    if (user) {
      // Remove login/signup links, insert profile card at top of nav
      if (mobileLogin) mobileLogin.remove();
      if (mobileSignup) mobileSignup.remove();
      // Also remove any containing <div> that had only auth links
      const authDiv = nav.querySelector('.pt-4.border-t');
      if (authDiv) {
        // Keep div but clear out login/signup items if empty
        if (!authDiv.querySelector('a:not([href="login.html"]):not([href="register.html"])')) {
          authDiv.remove();
        }
      }
      const profileEl = document.createElement('div');
      profileEl.innerHTML = buildMobileProfileHTML(user);
      nav.prepend(profileEl);
      // Bind mobile logout
      document.getElementById('fl-mobile-logout-btn')?.addEventListener('click', logout);
    }
  }

  /* ─── Bind Desktop Dropdown Toggle ─── */
  function bindProfileDropdown() {
    const trigger = document.getElementById('fl-profile-trigger');
    const dropdown = document.getElementById('fl-profile-dropdown');
    const logoutBtn = document.getElementById('fl-logout-btn');
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      dropdown.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!document.getElementById('fl-profile-wrapper')?.contains(e.target)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    logoutBtn?.addEventListener('click', logout);
  }

  /* ─── Logout ─── */
  function logout() {
    clearUser();
    // Flash feedback then redirect to home
    const toast = document.createElement('div');
    toast.textContent = '👋 Signed out successfully';
    toast.style.cssText = `
      position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:rgba(30,30,40,0.95);color:#fff;padding:12px 24px;
      border-radius:99px;font-size:13px;font-weight:600;z-index:99999;
      border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(12px);
      box-shadow:0 8px 32px rgba(0,0,0,0.4);
    `;
    document.body.appendChild(toast);
    setTimeout(() => { window.location.href = 'index.html'; }, 1000);
  }

  /* ─── Main Init ─── */
  function initAuth() {
    injectStyles();
    const user = getUser();
    patchDesktopNav(user);
    patchMobileNav(user);
  }

  /* ─── Public API ─── */
  window.FlexiAuth = { getUser, setUser, clearUser, logout };

  // Auto-init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
})();
