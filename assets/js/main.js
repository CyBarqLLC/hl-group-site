(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.lang');
  var KEY = 'hl-lang';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!btn) return;

  function apply(lang) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  btn.addEventListener('click', function () {
    var next = root.lang === 'ar' ? 'en' : 'ar';
    if (reduce) { apply(next); return; }
    root.classList.add('swap');
    window.setTimeout(function () {
      apply(next);
      window.requestAnimationFrame(function () { root.classList.remove('swap'); });
    }, 260);
  });

  // load the Arabic face early so the first switch is smooth
  if (document.fonts && document.fonts.load) {
    window.setTimeout(function () { document.fonts.load('400 1em "Thmanyah Serif"'); }, 1500);
  }
})();
