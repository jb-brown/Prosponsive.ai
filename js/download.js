(function () {
  'use strict';

  var CLOUDFRONT = 'https://dyk1asoq4bvxx.cloudfront.net';
  var MANIFEST_URL = CLOUDFRONT + '/latest-mac.yml';
  var FALLBACK_VERSION = '1.0.9';

  // ---- Platform detection ----

  function detectPlatform() {
    var platform = navigator.platform || '';
    if (/Mac/.test(platform)) return 'macos';
    if (/Win/.test(platform)) return 'windows';
    if (/Linux/.test(platform)) return 'linux';
    return 'unknown';
  }

  // ---- Version fetching ----

  function fetchVersionInfo() {
    return fetch(MANIFEST_URL)
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
      .then(function (text) {
        var versionMatch = text.match(/^version:\s*(.+)$/m);
        var sizeMatch = text.match(/size:\s*(\d+)/);

        var version = versionMatch ? versionMatch[1].trim() : null;
        var sizeMB = sizeMatch ? Math.round(parseInt(sizeMatch[1], 10) / (1024 * 1024)) : null;

        return { version: version, sizeMB: sizeMB };
      })
      .catch(function () {
        return { version: null, sizeMB: null };
      });
  }

  // ---- URL construction ----

  function buildDownloadURL(version) {
    var v = version || FALLBACK_VERSION;
    return CLOUDFRONT + '/Prosponsive-' + v + '-arm64.dmg';
  }

  // ---- DOM updates ----

  function updateForPlatform(platform) {
    var btn = document.getElementById('download-btn');
    var note = document.getElementById('platform-note');

    if (platform === 'macos' || platform === 'unknown') {
      btn.textContent = 'Download for macOS';
      btn.removeAttribute('aria-disabled');
      if (platform === 'unknown') {
        note.textContent = 'Platform not detected. Showing macOS download.';
      }
    } else {
      var name = platform === 'windows' ? 'Windows' : 'Linux';
      btn.textContent = name + ' — Coming Soon';
      btn.setAttribute('aria-disabled', 'true');
      btn.removeAttribute('href');
      note.textContent = name + ' support is coming soon. Stay tuned!';
    }
  }

  function updateVersionInfo(info) {
    var btn = document.getElementById('download-btn');
    var versionEl = document.getElementById('version-info');

    // Set download URL regardless of version display
    btn.href = buildDownloadURL(info.version);
    btn.setAttribute(
      'aria-label',
      'Download Prosponsive' +
        (info.version ? ' version ' + info.version : '') +
        ' for macOS'
    );

    if (info.version) {
      var text = 'Version ' + info.version;
      if (info.sizeMB) text += ' \u2014 ' + info.sizeMB + ' MB';
      versionEl.textContent = text;
    }
  }

  // ---- Platform switch buttons ----

  function bindPlatformSwitches() {
    var buttons = document.querySelectorAll('[data-platform]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        updateForPlatform(this.getAttribute('data-platform'));
      });
    }
  }

  // ---- Init ----

  function init() {
    var platform = detectPlatform();
    updateForPlatform(platform);
    bindPlatformSwitches();

    // Only fetch version info if macOS (or unknown, which defaults to macOS)
    if (platform === 'macos' || platform === 'unknown') {
      fetchVersionInfo().then(function (info) {
        updateVersionInfo(info);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
