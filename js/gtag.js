// Google tag (gtag.js) — shared across all pages via <script src="/js/gtag.js">.
(function () {
  var TAG_ID = 'AW-18511495062';

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + TAG_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());

  gtag('config', TAG_ID);
})();
