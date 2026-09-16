/**
 * FlexiLoan — Priority functional QA v1
 * Contact validation, registration/password verification, demo auth hardening,
 * RTL/mobile safety and common button/form behavior.
 */
(function () {
  'use strict';

  const ACCOUNT_KEY = 'fl_accounts';
  const DEFAULT_DEMO_ACCOUNT = {
    email: 'client@flexiloan.demo',
    password: 'Client@123',
    name: 'Demo Client'
  };

  function toast(message, type = 'success') {
    if (typeof window.showToast === 'function') window.showToast(message, type);
  }

  function setError(input, message, errorId) {
    if (!input) return false;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    input.setCustomValidity(message || '');
    const err = errorId ? document.getElementById(errorId) : null;
    if (err) err.textContent = message || '';
    return !message;
  }

  function validatePersonName(value) {
    const v = String(value || '').trim();
    const letters = (v.match(/[A-Za-z]/g) || []).length;
    return v.length >= 2 && letters >= 2 && /^[A-Za-z][A-Za-z .'-]*$/.test(v);
  }

  function validateEmail(value) {
    const v = String(value || '').trim();
    // Requires a normal domain + TLD. This rejects e.g. gtyh@GMAIL.
    return /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(v) && /\.[A-Za-z]{2,}$/.test(v);
  }

  function validatePhone(value) {
    const v = String(value || '').trim();
    if (!/^[+0-9() .-]+$/.test(v)) return false;
    const digits = v.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
  }

  window.validateAdvisorForm = function (event) {
    event.preventDefault();
    const form = document.getElementById('advisor-consultation-form');
    if (!form) return false;

    const name = document.getElementById('advisor-name');
    const phone = document.getElementById('advisor-phone');
    const email = document.getElementById('advisor-email');

    const nameOK = setError(name, validatePersonName(name?.value) ? '' : 'Enter a valid full name with at least 2 letters.', 'advisor-name-error');
    const phoneOK = setError(phone, validatePhone(phone?.value) ? '' : 'Use 8–15 digits only; +, spaces, (), dots and hyphens are allowed.', 'advisor-phone-error');
    const emailOK = setError(email, validateEmail(email?.value) ? '' : 'Enter a complete email address, for example name@gmail.com.', 'advisor-email-error');

    // Normalize email domain for consistency without treating uppercase domains as a separate identity.
    if (emailOK && email) email.value = email.value.trim().toLowerCase();

    if (!nameOK || !phoneOK || !emailOK || !form.checkValidity()) {
      const firstInvalid = form.querySelector('[aria-invalid="true"], :invalid');
      firstInvalid?.focus();
      toast('Please correct the highlighted consultation details.', 'error');
      return false;
    }

    toast('Enquiry request submitted successfully! An advisor will call you within 30 minutes.');
    form.reset();
    [name, phone, email].forEach(el => el?.setAttribute('aria-invalid', 'false'));
    return false;
  };

  function loadAccounts() {
    try {
      const arr = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }
  function saveAccounts(arr) { localStorage.setItem(ACCOUNT_KEY, JSON.stringify(arr)); }

  window.handleFlexiRegister = function (event) {
    event.preventDefault();
    const form = document.getElementById('fl-register-form');
    if (!form) return false;
    const first = document.getElementById('fl-reg-first');
    const last = document.getElementById('fl-reg-last');
    const email = document.getElementById('fl-reg-email');
    const pass = document.getElementById('fl-reg-password');
    const confirm = document.getElementById('fl-reg-confirm');
    const confirmErr = document.getElementById('fl-reg-confirm-error');

    const nameValid = validatePersonName(`${first?.value || ''} ${last?.value || ''}`);
    first?.setCustomValidity(nameValid ? '' : 'Please enter a valid name.');
    const emailValid = validateEmail(email?.value);
    email?.setCustomValidity(emailValid ? '' : 'Enter a complete email with a valid domain.');
    const passwordValid = String(pass?.value || '').length >= 8;
    pass?.setCustomValidity(passwordValid ? '' : 'Password must contain at least 8 characters.');
    const passwordsMatch = Boolean(pass && confirm && pass.value === confirm.value);
    confirm?.setCustomValidity(passwordsMatch ? '' : 'Confirm Password must exactly match Password.');
    confirm?.setAttribute('aria-invalid', passwordsMatch ? 'false' : 'true');
    if (confirmErr) confirmErr.textContent = passwordsMatch ? '' : 'Passwords do not match.';

    if (!form.checkValidity() || !nameValid || !emailValid || !passwordValid || !passwordsMatch) {
      form.reportValidity();
      const invalid = form.querySelector(':invalid');
      invalid?.focus();
      toast('Please correct the highlighted registration fields.', 'error');
      return false;
    }

    const normalizedEmail = email.value.trim().toLowerCase();
    const accounts = loadAccounts();
    const existing = accounts.findIndex(a => String(a.email).toLowerCase() === normalizedEmail);
    const account = {
      name: `${first.value.trim()} ${last.value.trim()}`.trim(),
      email: normalizedEmail,
      password: pass.value
    };
    if (existing >= 0) accounts[existing] = account; else accounts.push(account);
    saveAccounts(accounts);

    if (window.FlexiAuth) {
      window.FlexiAuth.setUser({ name: account.name, email: account.email, loggedInAt: Date.now() });
    }
    toast('Account created successfully! Welcome to FlexiLoan portal.');
    setTimeout(() => { window.location.href = 'index.html'; }, 900);
    return false;
  };

  window.handleFlexiLogin = function (event) {
    event.preventDefault();
    const form = document.getElementById('fl-login-form');
    const emailInput = document.getElementById('fl-email');
    const passInput = document.getElementById('fl-password');
    if (!form || !emailInput || !passInput) return false;

    const email = emailInput.value.trim().toLowerCase();
    const password = passInput.value;
    const accounts = [DEFAULT_DEMO_ACCOUNT, ...loadAccounts()];
    const account = accounts.find(a => String(a.email).toLowerCase() === email && a.password === password);

    if (!account) {
      emailInput.setAttribute('aria-invalid', 'true');
      passInput.setAttribute('aria-invalid', 'true');
      toast('Email/Client ID or password is incorrect.', 'error');
      passInput.focus();
      return false;
    }

    emailInput.setAttribute('aria-invalid', 'false');
    passInput.setAttribute('aria-invalid', 'false');
    if (window.FlexiAuth) {
      window.FlexiAuth.setUser({ name: account.name, email: account.email, loggedInAt: Date.now() });
    }
    toast(`Welcome back, ${account.name}! Redirecting...`);
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
    return false;
  };

  document.addEventListener('DOMContentLoaded', () => {
    // Contact phone: never retain alphabetic characters.
    const phone = document.getElementById('advisor-phone');
    phone?.addEventListener('input', () => {
      const clean = phone.value.replace(/[^+0-9() .-]/g, '');
      if (phone.value !== clean) phone.value = clean;
      setError(phone, phone.value && !validatePhone(phone.value) ? 'Use a valid phone number with 8–15 digits.' : '', 'advisor-phone-error');
    });

    const name = document.getElementById('advisor-name');
    name?.addEventListener('blur', () => setError(name, validatePersonName(name.value) ? '' : 'Enter a valid full name with at least 2 letters.', 'advisor-name-error'));

    const email = document.getElementById('advisor-email');
    email?.addEventListener('blur', () => {
      const ok = validateEmail(email.value);
      if (ok) email.value = email.value.trim().toLowerCase();
      setError(email, ok ? '' : 'Enter a complete email address, for example name@gmail.com.', 'advisor-email-error');
    });

    // Confirm-password live feedback.
    const pass = document.getElementById('fl-reg-password');
    const confirm = document.getElementById('fl-reg-confirm');
    const confirmErr = document.getElementById('fl-reg-confirm-error');
    const checkPasswords = () => {
      if (!confirm) return;
      if (!confirm.value) { confirm.setCustomValidity(''); confirm.setAttribute('aria-invalid','false'); if (confirmErr) confirmErr.textContent=''; return; }
      const same = pass && pass.value === confirm.value;
      confirm.setCustomValidity(same ? '' : 'Confirm Password must exactly match Password.');
      confirm.setAttribute('aria-invalid', same ? 'false' : 'true');
      if (confirmErr) confirmErr.textContent = same ? 'Passwords match.' : 'Passwords do not match.';
      if (confirmErr) confirmErr.className = same ? 'qa-password-match-ok' : 'qa-field-error';
    };
    pass?.addEventListener('input', checkPasswords);
    confirm?.addEventListener('input', checkPasswords);

    // Escape closes the mobile navigation drawer for easier RTL/LTR/mobile use.
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const drawer = document.getElementById('mobile-nav-drawer');
      const overlay = document.getElementById('mobile-nav-overlay');
      if (drawer && !drawer.classList.contains('hidden')) {
        drawer.classList.add('translate-x-full', 'hidden');
        overlay?.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });

    // Close mobile drawer after a real navigation link is selected.
    document.querySelectorAll('#mobile-nav-drawer a[href]').forEach(link => {
      link.addEventListener('click', () => { document.body.style.overflow = ''; });
    });
  });
})();
