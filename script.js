(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var menuButton = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');

  function syncHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  }

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        closeResourceMenu();
      });
    });
  }

  var resourceMenu = document.querySelector('[data-resource-menu]');
  var resourceToggle = document.querySelector('[data-resource-toggle]');
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  var resourceCloseTimer = null;

  function clearResourceCloseTimer() {
    if (resourceCloseTimer) {
      clearTimeout(resourceCloseTimer);
      resourceCloseTimer = null;
    }
  }

  function openResourceMenu() {
    if (!resourceMenu) return;
    clearResourceCloseTimer();
    resourceMenu.classList.add('is-open');
    if (resourceToggle) resourceToggle.setAttribute('aria-expanded', 'true');
  }

  function scheduleResourceMenuClose() {
    if (!resourceMenu) return;
    clearResourceCloseTimer();
    resourceCloseTimer = setTimeout(function () {
      closeResourceMenu();
    }, 900);
  }

  function closeResourceMenu() {
    if (!resourceMenu) return;
    clearResourceCloseTimer();
    resourceMenu.classList.remove('is-open');
    if (resourceToggle) resourceToggle.setAttribute('aria-expanded', 'false');
  }

  if (resourceMenu && resourceToggle) {
    resourceMenu.addEventListener('mouseenter', function () {
      if (!canHover.matches) return;
      openResourceMenu();
    });

    resourceToggle.addEventListener('click', function (event) {
      event.preventDefault();
      var open = resourceMenu.classList.toggle('is-open');
      clearResourceCloseTimer();
      resourceToggle.setAttribute('aria-expanded', String(open));
    });

    resourceMenu.addEventListener('mouseleave', function () {
      if (canHover.matches) scheduleResourceMenuClose();
    });
  }

  function selectTab(tabs, selected) {
    var buttons = tabs.querySelectorAll('[data-tab]');
    var panels = tabs.querySelectorAll('[data-panel]');

    buttons.forEach(function (item) {
      var active = item.getAttribute('data-tab') === selected;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });

    panels.forEach(function (panel) {
      var active = panel.getAttribute('data-panel') === selected;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  }

  document.querySelectorAll('[data-tabs]').forEach(function (tabs) {
    var buttons = tabs.querySelectorAll('[data-tab]');

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        selectTab(tabs, button.getAttribute('data-tab'));
      });
    });
  });

  document.querySelectorAll('[data-open-tab]').forEach(function (link) {
    link.addEventListener('click', function () {
      var tabs = document.querySelector('[data-tabs]');
      if (tabs) selectTab(tabs, link.getAttribute('data-open-tab'));
      closeResourceMenu();
    });
  });

  var copyButton = document.querySelector('[data-copy]');
  if (copyButton) {
    copyButton.addEventListener('click', function () {
      var code = copyButton.parentElement.querySelector('code');
      if (!code) return;

      navigator.clipboard.writeText(code.textContent.trim()).then(function () {
        var original = copyButton.textContent;
        copyButton.textContent = 'Copiado!';
        setTimeout(function () { copyButton.textContent = original; }, 1600);
      });
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (year) {
    year.textContent = new Date().getFullYear();
  });
})();
