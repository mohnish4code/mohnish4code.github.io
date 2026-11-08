/* mohnish.ml: small progressive enhancements. The page works without this file. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------- theme toggle (dark default, remembered) ---------- */
  var themeBtn = document.querySelector(".theme-toggle");
  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function syncThemeButton() {
    if (!themeBtn) return;
    var next = currentTheme() === "dark" ? "light" : "dark";
    themeBtn.setAttribute("aria-label", "Switch to " + next + " theme");
    themeBtn.setAttribute("title", "Switch to " + next + " theme");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      if (next === "light") root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
      syncThemeButton();
    });
    syncThemeButton();
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-toggle");
  var navLinks = document.getElementById("nav-links");
  function setMenu(open) {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (navLinks.classList.contains("open") && !e.target.closest(".nav")) setMenu(false);
    });
  }

  /* ---------- active nav link on scroll ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[href^='#']"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var activeId = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id]) { activeId = sections[i].id; break; }
      }
      links.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + activeId;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- copy email ---------- */
  var copyBtn = document.querySelector(".copy-email");
  var emailEl = document.getElementById("email-text");
  var statusEl = document.getElementById("copy-status");

  function selectEmail() {
    var range = document.createRange();
    range.selectNodeContents(emailEl);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  function flash(msg) {
    statusEl.textContent = msg;
    clearTimeout(flash.t);
    flash.t = setTimeout(function () { statusEl.textContent = ""; }, 3500);
  }
  function fallback() {
    selectEmail();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    flash(ok ? "Copied to clipboard." : "Selected. Press Ctrl+C (⌘C on Mac) to copy.");
  }

  if (copyBtn && emailEl && statusEl) {
    copyBtn.addEventListener("click", function () {
      var email = emailEl.textContent.trim();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () {
          flash("Copied to clipboard.");
          copyBtn.querySelector(".label").textContent = "Copied";
          setTimeout(function () { copyBtn.querySelector(".label").textContent = "Copy"; }, 2000);
        }, fallback);
      } else {
        fallback();
      }
    });
  }
})();
