document.addEventListener('DOMContentLoaded', function () {
  // ---------- INJETA MENU E RODAPÉ ----------
  fenfitInjectPartials();
  fenfitHighlightActiveLink();

  // ---------- MENU MOBILE ----------
  var navbar = document.querySelector('.navbar');
  var menuToggle = document.querySelector('.nav-toggle-menu');

  if (navbar && menuToggle) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navbar.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (!isOpen) {
        document.querySelectorAll('.nav-item.open').forEach(function (item) {
          item.classList.remove('open');
          var btn = item.querySelector('.nav-toggle-sub');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        var navLinksEl = document.querySelector('.nav-links');
        if (navLinksEl) navLinksEl.scrollTop = 0;
      }
    });
  }

  var subToggles = document.querySelectorAll('.nav-toggle-sub');
  subToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var navItem = btn.closest('.nav-item');
      if (!navItem) return;
      var willOpen = !navItem.classList.contains('open');

      // Fecha qualquer outro submenu aberto antes de abrir este
      document.querySelectorAll('.nav-item.open').forEach(function (otherItem) {
        if (otherItem !== navItem) {
          otherItem.classList.remove('open');
          var otherBtn = otherItem.querySelector('.nav-toggle-sub');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      navItem.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

      // Rola só o painel do menu até o submenu recém-aberto (sem afetar o resto da página)
      if (willOpen) {
        requestAnimationFrame(function () {
          var navLinksEl = document.querySelector('.nav-links');
          if (!navLinksEl) return;
          var panelRect = navLinksEl.getBoundingClientRect();
          var itemRect = navItem.getBoundingClientRect();
          var targetScroll = navLinksEl.scrollTop + (itemRect.top - panelRect.top) - 8;
          navLinksEl.scrollTo({ top: targetScroll, behavior: 'smooth' });
        });
      }
    });
  });

  // Fecha o menu mobile ao navegar por um link (evita ficar aberto ao voltar)
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbar) navbar.classList.remove('menu-open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '&#9776;';
      }
      document.body.style.overflow = '';
    });
  });

  // ---------- MODAL DOS CARDS (Programação) ----------
  var modal = document.getElementById('cardModal');
  if (!modal) return;

  var modalContent = modal.querySelector('.modal-content');
  var closeBtn = modal.querySelector('.modal-close');
  var cards = document.querySelectorAll('.day-card, .day-card-split');

  function openModal(card) {
    modalContent.innerHTML = card.innerHTML;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cards.forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', function () {
      openModal(card);
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
});