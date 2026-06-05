# Spec 88 — PostHog Analytics: Full Funnel Tracking

**Issue:** [jb-brown/Prosponsive.ai#88](https://github.com/jb-brown/Prosponsive.ai/issues/88)
**Status:** Draft — pending review
**Type:** Implementation spec (marketing site instrumentation + identity-stitch design)
**Scope split:** Marketing site (this repo) — implemented here. App-side instrumentation — deferred to linked Prosponsive repo issue (see §6).

---

## Table of Contents

1. [Goal and Funnel Definition](#1-goal-and-funnel-definition)
2. [Constraints and Non-Negotiables](#2-constraints-and-non-negotiables)
3. [PostHog Integration — Marketing Site](#3-posthog-integration--marketing-site)
   - 3.1 [Snippet Deployment Strategy](#31-snippet-deployment-strategy)
   - 3.2 [Initialization Configuration](#32-initialization-configuration)
   - 3.3 [Page View Tracking](#33-page-view-tracking)
   - 3.4 [CTA Click Events](#34-cta-click-events)
   - 3.5 [UTM Attribution](#35-utm-attribution)
4. [Identity Stitching Design](#4-identity-stitching-design)
   - 4.1 [Web Session Identity (steps 1–2 — this PR)](#41-web-session-identity-steps-12--this-pr)
   - 4.2 [App-Side Identity (steps 3–5 — deferred)](#42-app-side-identity-steps-35--deferred)
5. [PostHog Funnel Dashboard](#5-posthog-funnel-dashboard)
6. [Deferred Scope — App-Side Issue](#6-deferred-scope--app-side-issue)
7. [PII Constraints](#7-pii-constraints)
8. [Open Questions for User Decision](#8-open-questions-for-user-decision)
9. [Acceptance Criteria](#9-acceptance-criteria)

---

## 1. Goal and Funnel Definition

Instrument the complete user acquisition funnel so conversion can be measured at every stage:

```
Website visit
    ↓  [pageview — tracked on this PR]
CTA click / download button
    ↓  [download_click event — tracked on this PR]
Installer download initiated (ph_id stitched into URL — tracked on this PR)
    ↓
App first launch
    ↓  [app_first_launch — deferred, app-side issue]
Auth completed (Clerk sign-in)
    ↓  [auth_completed + posthog.identify() — deferred]
Purchase / subscription
    ↓  [subscription_purchased — deferred, Stripe webhook → PostHog]
Continued use
    ↓  [session_started, agent_run — deferred]
```

The hard problem is **identity stitching**: connecting the anonymous web visitor UUID to the authenticated Clerk user so all six stages collapse into a single PostHog person profile. The design for this is in §4.

---

## 2. Constraints and Non-Negotiables

**Site architecture (ground truth — these are facts, not assumptions):**
- Static GitHub Pages site. No build step, no bundler, no npm, no template/partial system.
- All pages are hand-authored HTML files sharing one stylesheet (`css/styles.css`) and, where needed, one JS file (`js/download.js`).
- HTML files exist at: `index.html`, `download/index.html`, and one `index.html` per section directory: `for/`, `guides/`, `how-it-works/`, `integrations/`, `legal/`, `privacy/`, `releases/`, `security/`, `terms/`. The `guides/` and `for/` directories contain multiple HTML files each.
- `js/download.js` is the only existing JS module. It handles platform detection, version fetching from CloudFront manifests, download URL construction, and DOM updates for the download button. The `ph_id` work attaches here.

**PostHog loading constraint:** posthog-js must be loaded via the PostHog CDN async snippet (a `<script>` tag calling the PostHog loader). An npm import is not possible given the no-bundler constraint.

**PostHog project:** reuse the existing PostHog Cloud project and API key already in use by the Electron app. Do NOT create a separate project. Both web and app events land in the same project so person profiles span both surfaces.

**Analytics must never block UX:** all PostHog calls are fire-and-forget. No event send should be awaited in a way that delays page interaction or download initiation.

**PII discipline:** see §7.

---

## 3. PostHog Integration — Marketing Site

### 3.1 Snippet Deployment Strategy

The site has no shared template or partial system, so the PostHog snippet must be added to every HTML file individually. There are approximately 32 HTML files across the site (counted from the repo).

**Mechanism:** add the PostHog CDN async snippet immediately before `</head>` in every HTML file. The snippet is self-contained and does not depend on any other JS on the page.

**Shared analytics module:** to keep the CTA click event logic maintainable and avoid duplicating it across 32 files, create a new file `js/analytics.js`. This file:
- Assumes `posthog` is already initialized by the inline snippet.
- Exports nothing (vanilla IIFE) — attaches event listeners on `DOMContentLoaded`.
- Captures CTA click events (§3.4) by querying the DOM for known CTA selectors.
- Handles the `ph_id` download-URL stamping (§4.1).

Every HTML page that has a CTA link includes `<script src="/js/analytics.js"></script>` (or the appropriate relative path) before `</body>`. Pages without CTAs (e.g., pure legal/terms pages) do not need this script, but still need the snippet for page view tracking.

**File change surface summary:**
- All ~32 HTML files: add PostHog snippet to `<head>`.
- HTML files with download CTAs or high-value links: add `<script src="...js/analytics.js"></script>` before `</body>`.
- `js/analytics.js`: new file (see §3.4).
- `js/download.js`: modified to stamp `ph_id` into download URLs (see §4.1).

### 3.2 Initialization Configuration

The PostHog CDN async snippet placed in every HTML `<head>` must initialize with this configuration:

```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(a!==void 0?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return a!==void 0&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString()+" (stub people)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a]),e.__SV=1)}(document,window.posthog||[]);
  posthog.init('<POSTHOG_API_KEY>', {
    api_host: 'https://us.i.posthog.com',
    autocapture: false,
    capture_pageview: true,
    persistence: 'localStorage+cookie',
    cross_subdomain_cookie: false,
    disable_session_recording: true,
    loaded: function(ph) {
      // ph_id stamping runs here via analytics.js after init confirms loaded
    }
  });
</script>
```

Configuration decisions:
- `autocapture: false` — explicit events only (§3.4). Autocapture produces noisy, hard-to-interpret data for a simple funnel.
- `capture_pageview: true` — automatic `$pageview` on every page load. This covers all pages without additional code.
- `persistence: 'localStorage+cookie'` — PostHog default; stores the anonymous `distinct_id` in both localStorage and a cookie named `ph_<key>_posthog`. The cookie form is needed for the `ph_id` stitch (§4.1) because localStorage is origin-scoped and not readable by other origins, but the cookie can be set with attributes the app can inspect if needed.
- `cross_subdomain_cookie: false` — prosponsive.ai has no subdomains requiring shared identity.
- `disable_session_recording: true` — not needed for funnel analytics; keeps data lean and avoids capturing sensitive user input.
- `autocapture: false` and `disable_session_recording: true` together mean PostHog sends no data without an explicit event call.
- `<POSTHOG_API_KEY>` — use the existing key from the Electron app. This is a public write-only key (safe to embed in client HTML).

**Note on the `api_host` value:** the Electron app uses `https://us.i.posthog.com`. Use the same host to ensure events land in the same project and are processed by the same pipeline.

### 3.3 Page View Tracking

`capture_pageview: true` in the init config causes PostHog to fire a `$pageview` event automatically on every page load. No additional code is required.

PostHog automatically enriches `$pageview` with:
- `$current_url` (full URL including query string — UTM params captured here)
- `$host`, `$pathname`
- `$referrer`, `$referring_domain`
- Browser/OS properties

This covers every page in the site including the download page, persona pages, guides, compare pages, legal pages, etc. No per-page additions are needed beyond the snippet.

### 3.4 CTA Click Events

`js/analytics.js` attaches click listeners to high-value CTAs on `DOMContentLoaded`. All events use `posthog.capture()` and fire synchronously before the browser follows the link (the download link case is handled specially — see §4.1).

**Events to capture:**

#### `download_click`

Fired when the user clicks the primary download button (element `id="download-btn"` in `download/index.html` and any download button on other pages with `class="btn-download"`).

Properties:
```js
{
  platform: 'macos' | 'windows' | 'unknown',  // from download.js detectPlatform()
  cta_location: 'download_page' | 'home_hero' | 'nav' | 'inline',  // where on the page
  utm_source: <string | null>,
  utm_medium: <string | null>,
  utm_campaign: <string | null>,
  utm_content: <string | null>,
  utm_term: <string | null>
}
```

The `platform` value must be read from the button's current text content or from the `href` attribute (which `download.js` sets to `.../latest` for macOS or `.../latest-win` for Windows) — do not re-run platform detection in analytics.js. Read `btn.href` and derive platform from the URL suffix.

The `cta_location` value is determined by a `data-cta-location` attribute that the code agent adds to each download button at the HTML level:
- `download/index.html` `#download-btn` → `data-cta-location="download_page"`
- `index.html` hero download button (if present) → `data-cta-location="home_hero"`
- Nav download link → `data-cta-location="nav"`
- Other in-page download links → `data-cta-location="inline"`

Adding `data-cta-location` to each button is an HTML change, not a JS change — the code agent handles this as part of implementing this spec.

**CRITICAL: download URL stamping must happen BEFORE the browser navigates.** The `download_click` event capture and the `ph_id` URL stamping (§4.1) both execute in the same click handler. The download link must not navigate until after the URL has been stamped. Implementation: attach the click listener with `e.preventDefault()`, stamp the URL, capture the event, then programmatically follow the link with `window.location.href = btn.href`.

#### `cta_click`

Fired for hero and section CTAs that are not the primary download button but represent high-intent engagement. Captured on elements with `class="btn-secondary"` and on pricing/contact links if they exist.

Properties:
```js
{
  cta_text: <string>,         // button/link text content (trimmed)
  cta_href: <string>,         // destination URL
  cta_location: <string>,     // data-cta-location attribute value
  utm_source: <string | null>,
  utm_medium: <string | null>,
  utm_campaign: <string | null>
}
```

High-value `btn-secondary` CTAs to instrument (based on current site content):
- "See how it works" → `/how-it-works/`
- "Read security architecture" → `/security/`
- "Browse integrations" → `/integrations/`
- Persona card links (`.persona-card` anchors on `index.html`)

For persona card clicks, use `cta_location: 'persona_grid'` and `cta_text: <card heading text>`.

#### `pricing_viewed`

If a pricing section or `/pricing/` page exists at implementation time, fire this event on scroll into view (use `IntersectionObserver` on the pricing section element) with:
```js
{ utm_source, utm_medium, utm_campaign }
```

If no pricing section exists when this spec is implemented, skip this event — do not add an observer to a non-existent element.

### 3.5 UTM Attribution

PostHog's `capture_pageview: true` automatically captures the full URL including query params. UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) present in the URL at page load time are automatically stored in the PostHog person profile under `initial_utm_*` properties on first touch, and as session properties on every subsequent touch.

No custom UTM-parsing code is needed for page view attribution — PostHog handles it.

For click events, `analytics.js` must read UTM params from `window.location.search` at the time the click fires and attach them as properties. This ensures the click event carries campaign context even if PostHog's session properties are not yet flushed.

UTM reader helper (add to `analytics.js`):
```js
function readUTMs() {
  var params = new URLSearchParams(window.location.search);
  return {
    utm_source:   params.get('utm_source'),
    utm_medium:   params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content:  params.get('utm_content'),
    utm_term:     params.get('utm_term')
  };
}
```

---

## 4. Identity Stitching Design

The full stitch spans five steps. Steps 1–2 are implemented in this issue (marketing site). Steps 3–5 are deferred to the app-side issue.

### 4.1 Web Session Identity (steps 1–2 — this PR)

**Step 1 — PostHog assigns a `distinct_id` on first site visit.**

When `posthog.init()` runs on the first visit, PostHog generates a UUID and stores it in localStorage and a cookie named `ph_<API_KEY>_posthog`. This happens automatically. The `distinct_id` value is accessible as `posthog.get_distinct_id()` after initialization.

No code is needed to implement step 1 beyond the snippet in §3.2.

**Step 2 — Stamp `ph_id` into the download URL before the browser follows it.**

When the user clicks the download button, `analytics.js` modifies the `href` on `#download-btn` to append `?ph_id=<distinct_id>` before the navigation proceeds. The installer binary is downloaded from CloudFront; the `ph_id` query param is not consumed by CloudFront but is preserved in the browser's download URL bar and, more importantly, is available to the app on first launch via the mechanism described in step 3 (deferred).

Implementation in `analytics.js` (within the `download_click` handler):

```js
var anonId = posthog.get_distinct_id();
if (anonId) {
  var url = new URL(btn.href, window.location.origin);
  url.searchParams.set('ph_id', anonId);
  btn.href = url.toString();
}
```

This runs after `e.preventDefault()` and before the programmatic navigation that follows the link.

**What this achieves:** the download URL that the browser follows carries the anonymous PostHog ID. The app can read this from the URL at first launch (step 3, deferred) and call `posthog.alias()` to merge the web visitor identity with the install identity.

**What this does NOT achieve:** if the user downloads from a browser that blocks cookies/localStorage, `posthog.get_distinct_id()` may return a fresh UUID that does not match an existing web session. This is expected behavior — PostHog will simply create a new person. The email-match fallback (matching on Clerk email at auth time) is a team decision, not a shipping fallback. See §8.

**Note on the email-match fallback:** the issue notes this as a potential alternative if installer complexity proves prohibitive. The decision point is: if the team later decides not to read `ph_id` from the download URL in the app (step 3), they can instead rely on PostHog's email-based identity merge at the `posthog.identify(clerkUserId, { email })` call (step 4). This would lose the web-visit-to-download linkage but preserve the download-to-auth linkage. This is not an equal alternative to ship alongside the `ph_id` stitch — it is a fallback the team may choose if the installer-parsing approach is not implemented. Document the decision in the app-side issue when step 3 is implemented.

### 4.2 App-Side Identity (steps 3–5 — deferred)

These steps are outside the scope of this issue and will be specified in the linked Prosponsive repo issue. Listed here for design completeness:

**Step 3 — App first launch reads `ph_id`, calls `posthog.alias()`.**
The Electron app inspects the download URL or installer metadata for `ph_id`. If found, calls `posthog.alias(ph_id, installId)` where `installId` is a stable device-scoped UUID. PostHog merges the web visitor profile and the install profile into one person.

**Step 4 — Clerk sign-in triggers `posthog.identify()`.**
On successful Clerk authentication, the app calls `posthog.identify(clerkUserId, { email, plan })`. PostHog merges the install identity into the authenticated person. At this point all three identities (web visitor, installer, Clerk user) are unified.

**Step 5 — Stripe webhook sends server-side purchase event.**
The existing commerce Lambda layer receives the Stripe `customer.subscription.created` (or `checkout.session.completed`) webhook and sends a `subscription_purchased` event to PostHog server-side using `posthog-node`, keyed to the `clerkUserId`. This is more reliable than client-side capture because it does not depend on the app being open at purchase time.

---

## 5. PostHog Funnel Dashboard

Create a PostHog funnel visualization in the existing PostHog Cloud project with these five steps:

| Step | PostHog Event | Source |
|------|---------------|--------|
| 1 | `$pageview` (any page) | Website — automatic |
| 2 | `download_click` | Website — `analytics.js` |
| 3 | `app_first_launch` | App — deferred |
| 4 | `auth_completed` | App — deferred |
| 5 | `subscription_purchased` | Lambda → PostHog server-side — deferred |

**Dashboard configuration:**
- Funnel type: Unique users, ordered steps.
- Conversion window: 30 days (web visit to purchase is a long consideration cycle for this product).
- Optional filter: `utm_source` property to slice by campaign.
- Breakdown by `platform` on the `download_click` step to see macOS vs. Windows conversion rates.

**Note:** steps 3–5 will show zero conversions until the app-side issue is implemented. The dashboard can be created now with the first two steps functional; add steps 3–5 as placeholders so the visualization is ready when app instrumentation ships.

---

## 6. Deferred Scope — App-Side Issue

File a new issue in the **jb-brown/Prosponsive** repo titled:

> "PostHog app-side instrumentation: first launch alias, Clerk identify, lifecycle events, Stripe webhook"

The issue body must reference this spec (Prosponsive.ai#88) and cover:

- First launch: read `ph_id` from download URL, call `posthog.alias(ph_id, installId)`.
- Clerk sign-in: `posthog.identify(clerkUserId, { email, plan })`.
- Lifecycle events: `app_first_launch`, `auth_completed`, `trial_started`, `session_started`, `agent_run`.
- Stripe webhook → PostHog server-side `subscription_purchased` via the existing commerce Lambda layer (uses `posthog-node`; the PostHog write key must be added to the Lambda's environment).
- The app already has `posthog-node` (main process) and `posthog-js` (renderer) dependencies per the issue. Confirm at implementation time.

This issue is a blocker for funnel steps 3–5. The marketing site implementation (this issue) is not blocked by it.

---

## 7. PII Constraints

The following rules apply to all event properties:

- **Email** is allowed ONLY in `posthog.identify()` as a person property (`email`). Never put email in an event name or an event property on any captured event.
- **Clerk user ID** is a pseudonymous identifier — acceptable as the `distinct_id` passed to `posthog.identify()` and as a property on `subscription_purchased`.
- **IP address** — PostHog is initialized without `ip: true` override. PostHog Cloud does not persist the raw IP by default. Confirm in PostHog project settings that "Discard client IP data" is enabled to align with the app's existing configuration.
- **Event names** are all lowercase with underscores. No user-authored content appears in event names.
- **Event properties** must not contain: message content, file paths, API key fragments, or any text the user typed.
- **Download URL after stamping** contains `ph_id` (a UUID). This is not PII. The `ph_id` param is not logged or stored server-side by CloudFront (CloudFront access logging is disabled per the privacy policy §4.2).

---

## 8. Open Questions for User Decision

These questions are surfaced for the user to decide before implementation begins. The spec does not resolve them unilaterally.

### Q1: Cookie consent / EU exposure

**Context:** PostHog JS sets a localStorage entry and a cookie on first page load (before any click). The privacy policy (§4.2) currently describes PostHog analytics as opt-in via the desktop app. The marketing website does not currently mention web analytics. prosponsive.ai is US-focused; GDPR/ePrivacy Directive exposure depends on whether EU visitors are a meaningful audience.

**Options:**
- **A (recommended for now):** No consent banner. Update the privacy policy to disclose marketing site analytics. Reassess if EU expansion becomes a priority.
- **B:** Add a minimal consent banner (cookie notice) before PostHog initializes. PostHog supports `posthog.opt_in_capturing()` / `posthog.opt_out_capturing()` for this pattern.
- **C:** Initialize PostHog in cookieless mode (`persistence: 'memory'`) which avoids setting a persistent cookie but loses cross-visit identity (funnel step 1→2 still works within a session; cross-session attribution is lost).

**Decision required:** the code agent must not proceed with snippet deployment until this is resolved. Option A is the working assumption unless the user selects otherwise.

### Q2: Same PostHog project vs. separate project

**Context:** the issue recommends reusing the existing PostHog Cloud project. This means web visitor profiles and app user profiles are merged in the same project, enabling the identity stitch.

**Consequence of a separate project:** the identity stitch (§4) becomes impossible — there is no cross-project alias. Person profiles would be split across two projects with no linkage.

**Recommendation:** same project (as stated in §2). No decision needed unless there is a reason to separate.

### Q3: Server-side vs. client-side Stripe events

**Context:** `subscription_purchased` can be sent to PostHog from: (a) the client app after receiving a webhook-driven subscription state update, or (b) the commerce Lambda directly on `checkout.session.completed`.

**Recommendation:** server-side via the commerce Lambda (option b). It fires regardless of app state and cannot be blocked by the client. It requires the PostHog write key to be added to the Lambda's environment variables (a secret, not the public API key).

**Decision required:** confirm server-side approach and authorize adding PostHog write key to the Lambda environment before the app-side issue is implemented.

---

## 9. Acceptance Criteria

Tracing each acceptance criterion from the issue to this spec:

| Criterion | Where addressed |
|-----------|----------------|
| posthog-js added to the marketing site using the existing PostHog Cloud project/API key | §3.1, §3.2 — CDN snippet on every page, same project |
| Page views tracked on all marketing site pages | §3.3 — `capture_pageview: true` covers all pages automatically |
| Download button clicks tracked with `{ platform, cta_location, utm_* }` properties | §3.4 — `download_click` event spec |
| Anonymous → authenticated identity stitch documented (or explicit decision on email-match) | §4 — full stitch design; email-match treated as explicit team decision point, not a co-shipped fallback |
| A PostHog funnel dashboard showing: Visited → Downloaded → Launched → Authed → Purchased | §5 — five-step funnel with event mapping |
| No PII in event names or properties beyond what is explicitly needed | §7 — PII constraints |
| Linked issue filed in Prosponsive repo for app-side instrumentation | §6 — issue template defined |

---

## Appendix A — File Change Inventory

Complete list of files the code agent must modify or create:

**New files:**
- `js/analytics.js` — CTA click handlers, `ph_id` URL stamping, UTM reader

**Modified HTML files (snippet added to `<head>`):**
All HTML files in the repo (approximately 32 files). The code agent should `find . -name "*.html"` to get the authoritative list and add the snippet to each.

**Modified HTML files (analytics.js script tag added before `</body>` and `data-cta-location` attributes added to CTAs):**
Priority pages — those with download buttons or high-value CTAs:
- `index.html`
- `download/index.html`
- `for/consultants/index.html`
- `for/power-users/index.html`
- `for/privacy/index.html`
- `for/teams/index.html`
- `how-it-works/index.html`
- `integrations/index.html`
- `security/index.html`

Other pages (guides, compare, legal, releases, privacy, terms): add the analytics.js script tag but no CTA instrumentation is required — they contain no download buttons.

**Modified JS files:**
- `js/download.js` — the `ph_id` stamping logic lives in `analytics.js` (not in download.js itself), but `analytics.js` must execute after `download.js` has updated `btn.href`. The code agent must ensure script load order: `download.js` first, `analytics.js` second. Both load before `</body>`.

**No changes to:**
- `css/styles.css`
- `CNAME`
- `robots.txt`
- `sitemap.xml`
- Any content files

## Appendix B — analytics.js Structure

Skeleton for the code agent. Exact implementation details are the code agent's responsibility; this defines the required shape and event contract.

```js
(function () {
  'use strict';

  // --- UTM helper ---
  function readUTMs() {
    var params = new URLSearchParams(window.location.search);
    return {
      utm_source:   params.get('utm_source'),
      utm_medium:   params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content:  params.get('utm_content'),
      utm_term:     params.get('utm_term')
    };
  }

  // --- Platform from download URL ---
  function platformFromHref(href) {
    if (!href) return 'unknown';
    if (href.indexOf('latest-win') !== -1) return 'windows';
    if (href.indexOf('latest') !== -1) return 'macos';
    return 'unknown';
  }

  // --- Stamp ph_id into download URL ---
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
  function bindDownloadButtons() {
    var buttons = document.querySelectorAll('.btn-download, #download-btn');
    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          stampPhId(btn);
          if (typeof posthog !== 'undefined') {
            posthog.capture('download_click', Object.assign({
              platform: platformFromHref(btn.href),
              cta_location: btn.getAttribute('data-cta-location') || 'unknown'
            }, readUTMs()));
          }
          window.location.href = btn.href;
        });
      })(buttons[i]);
    }
  }

  // --- Secondary CTA click handler ---
  function bindSecondaryCTAs() {
    var ctaSelectors = [
      '.btn-secondary',
      '.persona-card'
    ];
    ctaSelectors.forEach(function (sel) {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) {
        (function (el) {
          el.addEventListener('click', function () {
            if (typeof posthog !== 'undefined') {
              posthog.capture('cta_click', Object.assign({
                cta_text: (el.textContent || '').trim().substring(0, 100),
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
```

**Guard pattern:** every call to `posthog.*` in `analytics.js` is guarded by `typeof posthog !== 'undefined'`. If the CDN snippet fails to load (network error, ad blocker), the page continues to function normally. The download button must still navigate even if PostHog is unavailable — the `e.preventDefault()` / `window.location.href` sequence handles this because `stampPhId` and the capture call are guarded separately.
