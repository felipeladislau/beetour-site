// BeeTour — interações leves
(function(){
  'use strict';

  // Ano dinâmico no rodapé
  var y = document.getElementById('bt-year');
  if (y) y.textContent = new Date().getFullYear();

  // Sombra na navbar ao rolar
  var nav = document.querySelector('.bt-nav');
  function onScroll(){
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('shadow-sm');
    else nav.classList.remove('shadow-sm');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Fecha o menu mobile ao clicar em um link
  document.querySelectorAll('#navMain .nav-link, #navMain a.btn').forEach(function(a){
    a.addEventListener('click', function(){
      var col = document.getElementById('navMain');
      if (col && col.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(col) || new bootstrap.Collapse(col, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  // Reveal on scroll (suave)
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.bt-stat-card, .bt-feature-card, .bt-result-card, .bt-step-card, .bt-plan, .bt-mini-card')
      .forEach(function(el){
        el.style.opacity = 0;
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
        io.observe(el);
      });
  }
})();
