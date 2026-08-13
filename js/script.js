document.addEventListener('DOMContentLoaded', function () {
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
