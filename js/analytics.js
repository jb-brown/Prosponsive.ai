(function () {
  'use strict';

  // --- UTM helper ---
  function readUTMs() {
    var params = new URLSearchParams(window.location.search);
    var raw = {
      utm_source:   params.get('utm_source'),
      utm_medium:   params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content:  params.get('utm_content'),
      utm_term:     params.get('utm_term')
    };
    return Object.fromEntries(Object.entries(raw).filter(function(e) { return e[1] !== null; }));
  }

  // --- Platform from download URL ---
  // download.js sets btn.href to a CloudFront URL ending in /latest (macOS)
  // or /latest-win (Windows). Derive platform from that suffix.
  function platformFromHref(href) {
    if (!href) return 'unknown';
    if (href.indexOf('latest-win') !== -1) return 'windows';
    if (href.indexOf('latest') !== -1) return 'macos';
    return 'unknown';
  }

  // --- Stamp ph_id into download URL ---
  // Appends ?ph_id=<posthog.get_distinct_id()> so the installer URL carries
  // the anonymous web visitor ID for the identity stitch at first app launch.
  function stampPhId(btn) {
    if (typeof posthog === 'undefined' || !posthog.get_distinct_id) return;
    var anonId = posthog.get_distinct_id();
    if (!anonId) return;
    try {
      var url = new URL(btn.href, window.location.origin);
      url.searchParams.set('ph_id', anonId);
      btn.href = url.toString();
    } catch (e) {
      // malformed URL — skip stamping
    }
  }

  // --- Download click handler ---
  // Binds to [data-download-btn] and #download-btn. On click: distinguishes
  // between real installer URLs (CloudFront, /latest, /latest-win) and
  // navigation links to the /download/ page.
  //
  // Installer URLs: prevent default, stamp ph_id, capture download_click, then
  // follow the link. This ordering ensures ph_id is stamped before navigation.
  //
  // Page navigation URLs (/download/): let the browser follow naturally and
  // capture a cta_click (like other secondary CTAs) — no ph_id stamping and
  // no preventDefault, since the download page reconstructs the installer URL
  // from scratch and the stitch would be lost anyway.
  function isInstallerUrl(href) {
    return href.indexOf('cloudfront.net') !== -1
      || href.indexOf('/latest') !== -1; // covers /latest and /latest-win
  }

  function bindDownloadButtons() {
    var buttons = document.querySelectorAll('[data-download-btn], #download-btn');
    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function (e) {
          var href = btn.href || '';
          if (isInstallerUrl(href)) {
            e.preventDefault();
            stampPhId(btn);
            if (typeof posthog !== 'undefined') {
              posthog.capture('download_click', Object.assign({
                platform: platformFromHref(btn.href),
                cta_location: btn.getAttribute('data-cta-location') || 'unknown'
              }, readUTMs()));
            }
            window.location.href = btn.href;
          } else {
            // Navigation to /download/ page — let browser follow naturally,
            // track as CTA intent only.
            if (typeof posthog !== 'undefined') {
              posthog.capture('cta_click', Object.assign({
                cta_text: (btn.textContent || '').trim().substring(0, 100),
                cta_href: href,
                cta_location: btn.getAttribute('data-cta-location') || 'unknown'
              }, readUTMs()));
            }
          }
        });
      })(buttons[i]);
    }
  }

  // --- Secondary CTA click handler ---
  // Captures cta_click on .btn-secondary, .persona-card, and .nav-cta elements.
  // These are high-intent engagement signals (not primary download buttons).
  function bindSecondaryCTAs() {
    var ctaSelectors = [
      '.btn-secondary',
      '.persona-card',
      '.nav-cta'
    ];
    ctaSelectors.forEach(function (sel) {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) {
        (function (el) {
          el.addEventListener('click', function () {
            if (typeof posthog !== 'undefined') {
              var text = el.classList.contains('persona-card')
                ? (el.querySelector('h3') || el).textContent.trim()
                : (el.textContent || '').trim().substring(0, 100);
              posthog.capture('cta_click', Object.assign({
                cta_text: text,
                cta_href: el.href || '',
                cta_location: el.getAttribute('data-cta-location') || 'unknown'
              }, readUTMs()));
            }
          });
        })(els[i]);
      }
    });
  }

  // --- Init ---
  function init() {
    bindDownloadButtons();
    bindSecondaryCTAs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
