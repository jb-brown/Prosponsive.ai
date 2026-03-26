(function () {
  'use strict';

  var CLOUDFRONT = 'https://dyk1asoq4bvxx.cloudfront.net';
  var MAC_MANIFEST_URL = CLOUDFRONT + '/latest-mac.yml';
  var WIN_MANIFEST_URL = CLOUDFRONT + '/latest.yml';

  // Cached version info per platform
  var cachedMacInfo = null;
  var cachedWinInfo = null;

  // ---- Platform detection ----

  function detectPlatform() {
    var platform = navigator.platform || '';
    if (/Mac/.test(platform)) return 'macos';
    if (/Win/.test(platform)) return 'windows';
    return 'unknown';
  }

  // ---- Version fetching ----

  function parseManifest(text) {
    var versionMatch = text.match(/^version:\s*(.+)$/m);
    var sizeMatch = text.match(/size:\s*(\d+)/);

    var version = versionMatch ? versionMatch[1].trim() : null;
    var sizeMB = sizeMatch ? Math.round(parseInt(sizeMatch[1], 10) / (1024 * 1024)) : null;

    return { version: version, sizeMB: sizeMB };
  }

  function fetchManifest(url) {
    return fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
      .then(parseManifest)
      .catch(function () {
        return { version: null, sizeMB: null };
      });
  }

  function fetchAllVersionInfo() {
    return Promise.all([
      fetchManifest(MAC_MANIFEST_URL),
      fetchManifest(WIN_MANIFEST_URL)
    ]).then(function (results) {
      cachedMacInfo = results[0];
      cachedWinInfo = results[1];
      return { mac: results[0], win: results[1] };
    });
  }

  // ---- URL construction ----

  function buildDownloadURL(platform) {
    if (platform === 'windows') {
      return CLOUDFRONT + '/latest-win';
    }
    return CLOUDFRONT + '/latest';
  }

  // ---- DOM updates ----

  function updateForPlatform(platform) {
    var btn = document.getElementById('download-btn');
    var note = document.getElementById('platform-note');
    var effectivePlatform = (platform === 'unknown') ? 'macos' : platform;

    if (effectivePlatform === 'macos') {
      btn.textContent = 'Download for macOS';
      btn.removeAttribute('aria-disabled');
      btn.href = buildDownloadURL('macos');
      var macInfo = cachedMacInfo || { version: null, sizeMB: null };
      updateVersionDisplay(macInfo, 'macOS');
      note.textContent = (platform === 'unknown')
        ? 'Platform not detected. Showing macOS download.'
        : '';
    } else {
      btn.textContent = 'Download for Windows';
      btn.removeAttribute('aria-disabled');
      btn.href = buildDownloadURL('windows');
      var winInfo = cachedWinInfo || { version: null, sizeMB: null };
      updateVersionDisplay(winInfo, 'Windows');
      note.textContent = '';
    }
  }

  function updateVersionDisplay(info, platformLabel) {
    var btn = document.getElementById('download-btn');
    var versionEl = document.getElementById('version-info');

    btn.setAttribute(
      'aria-label',
      'Download Prosponsive' +
        (info.version ? ' version ' + info.version : '') +
        ' for ' + platformLabel
    );

    if (info.version) {
      var text = 'Version ' + info.version;
      if (info.sizeMB) text += ' \u2014 ' + info.sizeMB + ' MB';
      versionEl.textContent = text;
    } else {
      versionEl.textContent = '';
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

    fetchAllVersionInfo().then(function () {
      // Re-render with version data now available
      updateForPlatform(platform);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
