/**
 * Static assertions on the generated legal pages.
 *
 * The marketing site is a static GitHub Pages build — no server, no bundler.
 * A Playwright run here would need a live HTTP server and real DNS, which is
 * beyond what this repo ships. Instead we verify the invariants that would
 * matter in a live redirect test by reading the files on disk:
 *
 *   1. Redirect stubs at /privacy/, /terms/, /eula/ point at their dated
 *      siblings, and do so via BOTH meta-refresh and window.location.replace.
 *   2. The dated pages exist and contain the right title.
 *   3. versions.json parses as JSON, has all three keys, and each `current`
 *      is a YYYY-MM-DD string.
 *   4. The legal hub at /legal/index.html links to the three dated versions.
 *
 * Run: node --test legal/tests/legal-pages.test.js
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '..');
const VERSION = '2026-04-24';

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

test('/privacy redirect points at /privacy/<current>/', () => {
  const html = read('privacy/index.html');
  assert.match(html, /meta http-equiv="refresh" content="0; url=\/privacy\/2026-04-24\/"/);
  assert.match(html, /window\.location\.replace\('\/privacy\/2026-04-24\/'\)/);
});

test('/terms redirect points at /terms/<current>/', () => {
  const html = read('terms/index.html');
  assert.match(html, /meta http-equiv="refresh" content="0; url=\/terms\/2026-04-24\/"/);
  assert.match(html, /window\.location\.replace\('\/terms\/2026-04-24\/'\)/);
});

test('/eula redirect points at /eula/<current>/', () => {
  const html = read('eula/index.html');
  assert.match(html, /meta http-equiv="refresh" content="0; url=\/eula\/2026-04-24\/"/);
  assert.match(html, /window\.location\.replace\('\/eula\/2026-04-24\/'\)/);
});

test('dated Privacy Policy page exists and has expected heading', () => {
  const html = read(`legal/privacy/${VERSION}/index.html`);
  assert.match(html, /<h1>Privacy Policy<\/h1>/);
  assert.match(html, /prosponsive-icon|Prosponsive/i);
});

test('dated Terms of Service page exists and has expected heading', () => {
  const html = read(`legal/terms/${VERSION}/index.html`);
  assert.match(html, /<h1>Terms of Service<\/h1>/);
});

test('dated EULA page exists and has expected heading', () => {
  const html = read(`legal/eula/${VERSION}/index.html`);
  assert.match(html, /<h1>End User License Agreement \(EULA\)<\/h1>/);
});

test('Terms of Service ships only Alternate A (Delaware courts) — no arbitration text', () => {
  const html = read(`legal/terms/${VERSION}/index.html`);
  // User decision 1 (2026-04-24): Alternate A only. Guard against accidental
  // re-inclusion of Alternate B (JAMS arbitration) in a future bump.
  assert.ok(!/JAMS/i.test(html), 'Terms must not reference JAMS (Alternate B removed).');
  assert.ok(!/Alternate A|Alternate B/i.test(html), 'Terms must not contain alternate selection markers.');
  assert.match(html, /New Castle County, Delaware/);
});

test('versions.json is valid JSON with current versions for all three documents', () => {
  const raw = read('legal/versions.json');
  const parsed = JSON.parse(raw);
  for (const key of ['privacy_policy', 'terms_of_service', 'eula']) {
    assert.ok(parsed[key], `missing key ${key}`);
    assert.match(parsed[key].current, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Array.isArray(parsed[key].versions));
    assert.ok(parsed[key].versions.includes(parsed[key].current));
  }
});

test('legal hub page lists all three dated documents', () => {
  const html = read('legal/index.html');
  assert.match(html, new RegExp(`/privacy/${VERSION}/`));
  assert.match(html, new RegExp(`/terms/${VERSION}/`));
  assert.match(html, new RegExp(`/eula/${VERSION}/`));
  assert.match(html, /\/legal\/versions\.json/);
});
