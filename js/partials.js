// ---------- MENU E RODAPÉ CENTRALIZADOS ----------
// Editar o menu ou o rodapé aqui reflete automaticamente em todas as páginas.
// Cada página só precisa ter <div id="site-nav"></div> e <div id="site-footer"></div>.

var FENFIT_NAV = '' +
  '<div class="nav-inner">' +
  '<a href="index.html" class="nav-logo">FENFIT</a>' +
  '<div class="nav-right-group">' +
    '<span class="nav-current-page" id="nav-current-page"></span>' +
    '<button class="nav-toggle-menu" aria-expanded="false" aria-label="Abrir menu">&#9776;</button>' +
  '</div>' +
  '<div class="nav-links">' +
    '<a href="sobre.html">Sobre</a>' +
    '<a href="programacao.html">Programação</a>' +
    '<div class="nav-item">' +
      '<div class="nav-item-row">' +
        '<a href="concursos.html">Concursos</a>' +
        '<button class="nav-toggle-sub" aria-expanded="false" aria-label="Abrir submenu Concursos">&#8964;</button>' +
      '</div>' +
      '<div class="dropdown">' +
        '<a href="concurso-banda.html">Banda - FENFIT 2027</a>' +
        '<a href="concurso-danca.html">Dança - JACK AND JILL WFC FENFIT 2027</a>' +
      '</div>' +
    '</div>' +
    '<a href="ingressos.html">Ingressos</a>' +
    '<div class="nav-item">' +
      '<div class="nav-item-row">' +
        '<a href="parceiros.html">Parceiros</a>' +
        '<button class="nav-toggle-sub" aria-expanded="false" aria-label="Abrir submenu Parceiros">&#8964;</button>' +
      '</div>' +
      '<div class="dropdown">' +
        '<a href="parceiros.html#patrocinadores">Patrocinadores</a>' +
        '<a href="parceiros.html#excursoes">Excursões</a>' +
        '<a href="parceiros.html#pousadas">Pousadas</a>' +
        '<a href="parceiros.html#campings">Campings</a>' +
        '<a href="parceiros.html#restaurantes">Restaurantes</a>' +
        '<a href="parceiros.html#moda-forro">Moda Forró</a>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '</div>';

var FENFIT_FOOTER = '' +
  '<p class="eyebrow">Apoio</p>' +
  '<h3>Patrocínio</h3>' +
  '<p>Em breve, as marcas parceiras que fazem o FENFIT acontecer.</p>' +
  '<div class="sponsor-grid">' +
    '<div class="sponsor-slot">Logo</div>' +
    '<div class="sponsor-slot">Logo</div>' +
    '<div class="sponsor-slot">Logo</div>' +
    '<div class="sponsor-slot">Logo</div>' +
  '</div>' +
  '<div class="footer-contacts">' +
    '<a href="mailto:contato@fenfit.com.br">contato@fenfit.com.br</a>' +
    '<a href="https://instagram.com/oficialfenfit" target="_blank" rel="noopener">instagram.com/oficialfenfit</a>' +
    '<a href="https://www.youtube.com/@ForrodeItaunas" target="_blank" rel="noopener">YouTube</a>' +
  '</div>' +
  '<p class="footer-note">Realização: Bar Forró Itaúnas e Café Brasil</p>' +
  '<p class="footer-note">FENFIT · Itaúnas, Conceição da Barra — ES</p>';

function fenfitInjectPartials() {
  var navSlot = document.getElementById('site-nav');
  var footerSlot = document.getElementById('site-footer');
  if (navSlot) navSlot.innerHTML = FENFIT_NAV;
  if (footerSlot) footerSlot.innerHTML = FENFIT_FOOTER;
}

function fenfitHighlightActiveLink() {
  var current = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('#site-nav .nav-links a');
  var currentPageLabel = document.getElementById('nav-current-page');
  var activeText = '';

  links.forEach(function (link) {
    var linkFile = link.getAttribute('href').split('#')[0];
    if (linkFile === current) {
      link.classList.add('active');
      activeText = link.textContent;
      // Se o link ativo está dentro de um submenu, marca o pai (Concursos/Parceiros) também
      var parentItem = link.closest('.nav-item');
      if (parentItem) {
        var parentLink = parentItem.querySelector('.nav-item-row a');
        if (parentLink) {
          parentLink.classList.add('active');
          activeText = parentLink.textContent;
        }
      }
    }
  });

  // Na home não mostra nada extra (o logo já indica), nas demais mostra o nome da página
  if (currentPageLabel) {
    currentPageLabel.textContent = current === 'index.html' ? '' : activeText;
  }
}