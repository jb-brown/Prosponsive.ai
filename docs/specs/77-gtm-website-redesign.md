# Spec 77 — GTM-Driven Website Redesign: Sitemap + Implementation Plan

**Issue:** [jb-brown/Prosponsive.ai#77](https://github.com/jb-brown/Prosponsive.ai/issues/77)
**Status:** Draft — pending review
**Type:** Planning spec (no code in this issue). Output is this document.
**Source of truth:** Four GTM positioning docs authored by the marketing CEO collaborator (see Appendix A for provenance).

> **How to use this document.** It is self-contained. A developer + copywriter can execute the redesign from this spec alone without re-reading the source docs. Verbatim source language is marked with `“quotes”` and the tag **[verbatim]**; everything else is adapted or structural guidance. All quantified claims trace to the source docs and carry the source's own hedge: *directional estimates — validate before customer-facing ROI use.*

---

## Table of Contents

1. [Phase 1 — Extract & Synthesize (GTM Intelligence)](#phase-1)
2. [Phase 2 — Sitemap](#phase-2)
3. [Phase 3 — Implementation Plan](#phase-3)
4. [Appendix A — Source Document Provenance](#appendix-a)
5. [Appendix B — Copy Bank (verbatim-safe language)](#appendix-b)
6. [Appendix C — Design Tokens (extracted from current site)](#appendix-c)

---

<a name="phase-1"></a>
## Phase 1 — Extract & Synthesize

### 1.1 One-line positioning (the spine of the whole site)

> **[verbatim]** "Prosponsive is the personal autonomous agent platform that runs AI assistants locally on your desktop — enabling knowledge workers to assign work to parallel specialized agents, execute tools asynchronously in the background, and protect their data through local-first architecture and credential isolation. Unlike cloud AI chat tools that require your constant presence, Prosponsive works while you don't."

**Primary tagline:** **[verbatim]** "AI That Works While You Don't"
**Alternative tagline:** **[verbatim]** "Your Agents. Your Machine. Your Rules."
**Existing site hero quote (keep — it tested as the brand's signature line):** "If Slack was rebuilt autonomous agent first." The Messaging doc independently arrives at the same metaphor — **[verbatim]** "It's what Slack would look like if it were built agent-first." → This metaphor is load-bearing; carry it forward prominently.

### 1.2 The three message pillars

Everything on the site ladders up to exactly three pillars. Do not introduce a fourth.

| # | Pillar | One-liner | Proof metrics (directional) |
|---|--------|-----------|------------------------------|
| 01 | **Reclaim time from the coordination layer** | Async tools, parallel agents, auto-approvals, and scheduled prompts eliminate task babysitting. | 30–90 min/day reclaimed · hours → minutes for multi-step workflows · 3–7 hrs/week on recurring tasks · 50–100+ daily interruptions eliminated |
| 02 | **Protect data, credentials & continuity** | Local execution, credential isolation, automatic failover across 7+ providers, offline-capable. | 100% local execution · zero credential exposure · 0 downtime from single-provider outages |
| 03 | **Deploy real tool integration — not just conversation** | n8n workflows orchestrate multiple systems per agent call. | 2,533 tools / 216 products · 5–10× faster integration · 60–80% fewer tool calls vs. MCP |

> Pillars 01 and 02 are the **dual value driver** (PRIMARY: time, SECONDARY: privacy/continuity). Pillar 03 is the capability that makes 01 credible. On pages where space is tight, lead with 01 + 02.

### 1.3 ICP personas

Five personas, in two tiers. **Tier 1 = primary economic buyers (lead with these). Tier 2 = conversion targets.**

| Persona | Tier | Title examples | Core pain | Purchase trigger | Jobs-to-be-done | Primary message |
|---------|------|----------------|-----------|------------------|-----------------|-----------------|
| **Power User / Developer** | 1 | Devs using Claude/GPT + MCP, engineers, technical researchers | Still the orchestrator — sequential tool calls, manual context passing | Already running MCP servers; frustrated by sequential execution | Close the orchestration loop; run agents in parallel; isolate credentials | **[verbatim]** "Your AI stack still has you as the orchestrator. Prosponsive closes the loop — parallel agents, async tools, credential isolation, and automatic failover. Built for people who know what they actually want from AI." |
| **Independent Professional** | 1 | Consultants, analysts, freelancers with recurring workflows | High task volume; time-to-output is the constraint | High task volume; time-to-output primary constraint | Turn recurring tasks into automatic outcomes; set up once, walk away | **[verbatim]** "You shouldn't have to manage your AI. Set up once, assign work, walk away. Prosponsive turns recurring tasks into automatic outcomes — with your data staying on your machine." |
| **Privacy-Conscious Professional** | 1 | Legal, finance, HR, healthcare-adjacent | Cloud data exposure is a hard constraint | Cloud routing is an organizational/personal hard constraint | Run sensitive workflows locally; keep credentials off the provider | **[verbatim]** "Sensitive work doesn't have to route through cloud servers. Prosponsive runs locally — your documents, credentials, and workflows stay with you, not with a provider." |
| **Curious Professional** | 2 | Non-technical knowledge workers | AI tools feel like more work than they save | Current tools feel like more work than they save | Get outcomes, not process; a team of assistants in a group chat | **[verbatim]** "AI should work while you don't. Prosponsive gives you a team of specialized assistants in a group chat — you drop a task and come back to results, not process." |
| **IT / Security Decision Maker** | 2 (secondary audience) | CIOs, security leads, IT managers | No audit trail / governance for AI actions | Governance, credential security, data residency are explicit criteria | Auditable AI actions; define what agents may do unattended | **[verbatim]** "Every AI action auditable. Auto-approval rules define what agents can do without human review. Credentials never touch the AI provider. Local execution by design." |

### 1.4 Value propositions ranked by persona

Lead each persona page / section with the value props in this order:

- **Power User / Developer:** (1) async parallel agents close the orchestration gap → (2) credential isolation for production systems → (3) provider-agnostic + failover → (4) n8n multi-system tools vs. single MCP calls.
- **Independent Professional:** (1) scheduled prompts + auto-approvals = recurring tasks run themselves → (2) async "task once, walk away" → (3) local data stays on the machine.
- **Privacy-Conscious Professional:** (1) 100% local execution / data sovereignty → (2) credential isolation → (3) offline capability → (4) encrypted at rest + in transit.
- **Curious Professional:** (1) "team of specialists in a group chat" analogy → (2) come back to outcomes, not process → (3) connects to tools you already use, no code.
- **IT / Security Decision Maker:** (1) governance / audit + auto-approval boundaries → (2) credential isolation → (3) local execution / data residency → (4) provider failover for continuity.

### 1.5 Key proof points & customer quotes

**Headline stat bar (use verbatim on home hero — these are the exact five from the sales asset):**

| 30–90 Min | 2,533 | 7+ | 100% | 50–100+ |
|---|---|---|---|---|
| Reclaimed daily from task babysitting | Tools across 216 products | AI providers — switch anytime | Local execution — data never leaves your machine | Daily interruptions eliminated via auto-approvals |

**Customer quotes** (Tier-1 social proof). ⚠️ The MRD carries an **internal editorial note**: customer evidence "requires named customer validation … Align with Legal on disclosure requirements for all customer-specific metrics prior to external distribution." → **Treat quotes as attributed-by-archetype only (no names, no company), and route any quantified per-customer claim through Legal before publish.** Use these two:

> **[verbatim]** "I was already running Claude with a stack of MCP servers. I thought I had figured out AI automation — until I realized I was still sitting at my desk approving every tool call, copying context between conversations, and manually sequencing the steps. Prosponsive was the first platform where the agents actually worked without me."
> — Early adopter · Software engineer · Independent power user

> **[verbatim]** "The thing that sold me wasn't the feature list — it was the first time I set up a scheduled prompt, walked away, and came back to a completed research brief. I hadn't clicked anything. I hadn't approved anything. It just ran. That's a different category of tool."
> — Early adopter · Independent consultant · Prosponsive beta user

**Outcome-pattern table** (use as a "results by user type" section — architecture-driver framing avoids unverifiable named claims):

| User type | Outcome pattern | Architecture driver |
|---|---|---|
| Power User / Developer | Recovered 60–90 min/day from task babysitting | Async tool execution + parallel agent channels |
| Independent Consultant | Recurring task setup eliminated (briefings, digests, monitoring run automatically) | Scheduled prompts + auto-approvals |
| Privacy-Conscious Professional | Moved sensitive workflows fully local, kept cloud providers for non-sensitive work | Local-first + credential isolation |
| Multi-Tool Power User | Consolidated 4 AI subscriptions → one platform | Provider-agnostic + channel scoping |
| Operations Manager | ~70% per-task tool-call overhead reduction on multi-system workflows | n8n workflow tools + single-call orchestration |

### 1.6 Elevator pitches (1-liner, 3-liner, full)

- **1-liner (reframe sentence — use in meta descriptions, social, hero subhead):**
  **[verbatim]** "Your AI agents actually work while you don't — running tools in the background, in parallel, with your data staying on your machine."

- **3-liner (30-second — use on home sub-hero / "what is this" block):**
  **[verbatim]** "Everyone knows AI assistants can save time. But most knowledge workers are still switching between five different AI tabs, babysitting every task, and watching their screen while tools 'think.' We built Prosponsive so your AI agents actually work while you don't — running tools in the background, in parallel, with your data staying on your machine. It's what Slack would look like if it were built agent-first."

- **Full (2-minute level-set — basis for the home "How it works" + a dedicated explainer):**
  See Appendix B §B.4 for the full verbatim discovery pitch. Its narrative arc — *the bottleneck isn't the model, it's the architecture* → *built differently: local, parallel, async* → *post a task and walk away* → *credentials never touch a provider* → *automatic failover* — is the recommended scroll sequence for the home page.

### 1.7 Competitive differentiation / objection handling

The current site **already has a `/guides/compare/` subtree** with seven competitor pages. The MRD competitor landscape maps onto them almost 1:1 — this is an audit win, not net-new work (see §3.1). Carry forward this exact framing:

| Competitor (existing page) | Architecture gap to lead with **[verbatim-sourced]** |
|---|---|
| Claude.ai / ChatGPT / Gemini (`vs-cloud-chat`) | "Synchronous-only; cloud data; single provider; no parallel agents; no local execution." |
| Claude Cowork (`vs-claude-cowork`) | "Anthropic-locked; synchronous; no auto-approvals; no parallel channels; no failover." |
| OpenClaw (`vs-openclaw`) | "No credential isolation by design; broad system access without defined tool boundaries." |
| Zapier / Make (`vs-automation`) | "Trigger-action only — no AI reasoning; cloud-routed; cannot adapt to context." |
| Ollama / LM Studio / GPT4All (`vs-local-models`) | "Text generation only — no tool use, no agent coordination, no workflow automation." |
| Custom GPTs / OpenAI Assistants (`vs-custom-agents`) | "Cloud-hosted; OpenAI-locked; no local execution; no parallel channels; limited tool depth." |
| (existing extra) `vs-copilot-workspace` | Keep; position on local-first + provider-agnostic + async, consistent with the table above. |

**Objection-handling reframe (the value-selling spine to repeat across the site):**
> Everyone knows AI tools save time → *However, they're still babysitting every tool call — synchronous, sequential, one at a time* → *We help by running parallel AI agents locally — async tools, no vendor lock-in, credentials never leaving the machine.*

### 1.8 Terminology & voice (carry forward exactly)

**Use these exact terms** (do not invent synonyms):
- "personal autonomous agent platform" (the category — always lowercase except in titles)
- "runs AI assistants locally on your desktop"
- "parallel agent channels" / "channels are the coordination layer"
- "async tool execution" / "post a task and walk away" / "results are waiting when you return"
- "auto-approval rules" · "scheduled prompts" · "credential isolation" · "provider-agnostic" · "automatic failover"
- "n8n workflows" (not "plugins"); "2,533 tools across 216 products"
- "data sovereignty by design" · "your secrets never touch an AI provider"

**Numbers to keep consistent everywhere:** 7+ providers · 2,533 tools · 216 products · 12 languages · macOS & Windows.

**Voice:** confident, technical-but-plain, second person ("you"), reframe-first. Avoid hype adjectives; let the architecture and the metrics carry weight. Never imply the product stores anything server-side.

---

<a name="phase-2"></a>
## Phase 2 — Sitemap

### 2.1 Page hierarchy

```
/                         Home — primary conversion (download), full GTM narrative
├── /product/             Product overview hub (the three pillars, expanded)
│   ├── /product/async/           Pillar 01 — async, parallel agents, auto-approvals, scheduled prompts
│   ├── /product/local-first/     Pillar 02 — local execution, credential isolation, failover, offline
│   └── /product/integrations/    Pillar 03 — n8n tools, 2,533/216, visual builder
├── /for/                  Persona hub
│   ├── /for/power-users/         Persona: Power User / Developer (Tier 1)
│   ├── /for/consultants/         Persona: Independent Professional (Tier 1)
│   ├── /for/privacy/             Persona: Privacy-Conscious Professional (Tier 1)
│   └── /for/teams/               Persona: IT / Security Decision Maker (secondary)
├── /compare/              Competitive hub  ← RELOCATE existing /guides/compare/* here (or alias)
│   └── /compare/vs-*              (7 existing pages, refreshed copy)
├── /how-it-works/         Full 2-minute pitch as a scrollable explainer (channels → agents → tools → results)
├── /pricing/              Pricing / "how to start" (free tier / trial — PLG entry per MRD §09)
├── /download/             Canonical download + system requirements (current home's download logic moves here; home CTA deep-links)
├── /guides/               EXISTING — user guide, install, features, feedback, n8n guides (unchanged structure)
├── /releases/             EXISTING — release notes (unchanged)
├── /security/             Security architecture (promote existing whitepaper to top-level; IT/Security persona destination)
└── /legal/ /privacy/ /terms/   EXISTING — unchanged
```

> **Scope guardrail (per project memory — "no design degradation"):** if a page below cannot be filled with grounded copy from the source docs, **hold it** rather than ship placeholder. Pricing depends on a confirmed free-tier/trial model (MRD §09 PLG play) — if that commercial model isn't finalized, ship `/pricing/` as "Download free / how to get started" rather than fabricating tiers.

### 2.2 Per-page purpose, persona, hero & CTA

| Page | Purpose | Primary persona / buying stage | Hero line | Primary CTA |
|---|---|---|---|---|
| **/** | Convert the broadest qualified audience; tell the whole story top-to-bottom | All Tier-1 / awareness→decision | "AI That Works While You Don't" + Slack-agent-first quote | **Download for macOS** (auto-detect Win) |
| **/product/** | Expand the three pillars for evaluators | Power User, Consultant / consideration | "Your agents. Your machine. Your rules." | Download · secondary "See how it works" |
| **/product/async/** | Prove pillar 01 | Power User, Consultant / consideration | "Post a task. Walk away. Come back to results." | Download · "Compare to MCP" |
| **/product/local-first/** | Prove pillar 02 | Privacy, IT/Security / consideration | "Your data never leaves your machine." | Download · "Read security architecture" |
| **/product/integrations/** | Prove pillar 03 | Power User, Consultant / consideration | "2,533 tools. 216 products. One agent call." | Download · "Browse the tool catalog" |
| **/for/power-users/** | Speak to the orchestration gap | Power User / decision | "Your AI stack still has you as the orchestrator." | Download · "vs. MCP stacks" |
| **/for/consultants/** | Recurring-work automation | Independent Professional / decision | "Set up once. Assign work. Walk away." | Download · "See scheduled prompts" |
| **/for/privacy/** | Local-first as the only architecture that qualifies | Privacy-Conscious / decision | "Sensitive work doesn't have to route through the cloud." | Download · "Read security architecture" |
| **/for/teams/** | Governance & audit for evaluators | IT / Security / evaluation | "Every AI action auditable." | "Read security architecture" · Download |
| **/compare/** + children | Win the bake-off | All Tier-1 / decision | "How Prosponsive compares." | Download · per-competitor reframe |
| **/how-it-works/** | Level-set "it's not just a chat app"; primary landing destination for Curious Professional from the home persona selector | Curious + Power User / consideration | "The bottleneck isn't the model. It's the architecture." | Download |
| **/pricing/** | Remove the cost objection; PLG entry | All / decision | "Start free. Keep your data." (pending model — see guardrail) | Download / Get started |
| **/security/** | Credibility for privacy + IT personas | Privacy, IT/Security / evaluation | "Data sovereignty by design." | Download |
| **/download/** | Canonical download + requirements | All / action | "Download Prosponsive" | Platform download buttons |

### 2.3 Home page — content blocks & section sequence

The home page is the full pitch in scroll form. Sequence (this is the build order for the page):

1. **Hero** — wordmark · tagline "AI That Works While You Don't" · the Slack-agent-first quote (keep existing shimmer treatment) · **Download for macOS** button with platform auto-detect (existing `download.js`) · version line.
2. **Reframe strip** — the 3-liner pitch (§1.6) as a single confident paragraph: "Everyone knows AI assistants can save time. But… We built Prosponsive so your AI agents actually work while you don't."
3. **Stat bar** — the five headline stats (§1.5) in a horizontal band (mirrors existing `.requirements` card styling).
4. **Pillar 01 — Reclaim your time** — async / parallel agents / auto-approvals / scheduled prompts, with the 30–90 min + 50–100+ + 3–7 hrs metrics. CTA: "See how it works."
5. **Pillar 02 — Protect your data & continuity** — local execution / credential isolation / failover / offline, with 100% local + zero credential exposure + 0 downtime. CTA: "Read security architecture."
6. **Pillar 03 — Real tool integration** — n8n multi-system tools, 2,533/216, visual builder, the "read a ticket → look up customer → check billing → draft response as ONE tool call" example. CTA: "Browse integrations."
7. **How it works (mini)** — channels → parallel agents → async tools → results-waiting, 3–4 step visual. Link to /how-it-works/.
8. **Persona selector** — Five cards, four linking to their `/for/` destination pages (`/for/power-users/`, `/for/consultants/`, `/for/privacy/`, `/for/teams/`); the Curious Professional card links to `/how-it-works/` where that persona is addressed as primary. Lets each visitor self-route.
9. **Social proof** — the two archetype quotes (§1.5) + outcome-pattern strip (Legal-cleared framing only).
10. **Competitive teaser** — "Already using Claude, GPT, or Zapier?" → links into /compare/.
11. **Final CTA band** — tagline restated + download + system requirements (existing `.requirements` content).
12. **Footer** — existing footer nav, extended with the new top-level pages.

---

<a name="phase-3"></a>
## Phase 3 — Implementation Plan

### 3.1 Current site audit

**What exists today** (`jb-brown/Prosponsive.ai`, static site served via GitHub Pages, `CNAME` → prosponsive.ai):

| Area | Current state | Disposition |
|---|---|---|
| `index.html` | Single-page download page: hero (wordmark, tagline, download button, Slack quote, quick-nav), system-requirements card. 102 lines. | **Rework** into the 12-block home page (§2.3). Preserve hero + download logic. |
| `css/styles.css` | One stylesheet, light "forest" theme, design tokens as CSS vars (see Appendix C). 389 lines. | **Extend** — add section/card/stat/persona-card components. Do NOT change tokens. |
| `js/download.js` | Platform auto-detect + latest-version fetch + download deep-link. | **Reuse as-is.** Home CTA and /download/ both call it. |
| `assets/` | Wordmark, logo icon, transparent logo, favicon, app icon (SVG-first). | **Reuse.** New assets listed in §3.5. |
| `guides/` | user-guide, install-guide, features, basics, feedback, email-assistant-example, 2× n8n guides, **security-architecture-whitepaper**. Inline-styled, same token palette. | Mostly **unchanged**. Promote whitepaper → `/security/`. `features.html` overlaps new `/product/` — keep as deep doc, link from product pages. |
| `guides/compare/` | 7 competitor pages + index, `.compare-card` component. | **Refresh copy** to MRD/Messaging language (§1.7). Relocate to `/compare/` (or alias; see risk note). Net-new copy only — structure exists. |
| `releases/`, `legal/`, `privacy/`, `terms/` | Existing, generated/maintained. | **Unchanged.** |
| `sitemap.xml`, `robots.txt` | Hand-maintained sitemap. | **Update** with all new URLs at end of rollout. |

**Net-new pages:** `/product/` (+3 children), `/for/` (+4 children), `/how-it-works/`, `/pricing/` (conditional), `/security/` (promotion of existing whitepaper), `/download/` (extraction from home).

**Key audit findings:**
- The compare subtree means competitive positioning is **already built** — Phase 1's competitor mapping is a copy refresh, not new IA.
- The security whitepaper already exists — the IT/Security persona destination is a **promotion**, not authoring from scratch.
- The site is **plain static HTML/CSS + one vanilla JS file**, no build step, no framework. Keep it that way (fast, GitHub-Pages-native, no toolchain risk). New pages are hand-authored HTML reusing the shared stylesheet.

### 3.2 Phased rollout order (highest-impact first)

**Phase A — Home page rework (highest impact, single URL).**
Rebuild `index.html` into the 12-block narrative (§2.3). Extend `styles.css` with the new components. Extract download logic into `/download/` and deep-link the hero CTA. This alone delivers the GTM narrative to 100% of current traffic.

**Phase B — Product pillar pages (`/product/` + 3 children).**
The evaluation backbone. Each pillar page expands one of the three message pillars with its capabilities table and metrics. Reuse the home pillar blocks as the section seeds.

**Phase C — Compare refresh + relocation (`/compare/`).**
Refresh the 7 existing competitor pages with §1.7 language; relocate/alias from `/guides/compare/`. Decision-stage, high-intent traffic.

**Phase D — Persona pages (`/for/` + 4 children).**
Self-routing destinations for paid/ABM campaigns (MRD §09). Each leads with the persona's ranked value props (§1.4) and message (§1.3).

**Phase E — Supporting pages.**
`/how-it-works/` (full pitch explainer), `/security/` (whitepaper promotion), `/pricing/` (conditional on commercial model). Update `sitemap.xml` + `robots.txt` + footer nav across all pages. Add per-page JSON-LD `WebPage` schema (pattern already used in `guides/features.html`).

> **robots.txt policy decision required for `/security/` — must be resolved before Phase E begins.** The current `robots.txt` has `Disallow: /guides/security-architecture-whitepaper.html`. Before the `/security/` page is published, the team must make an explicit decision on crawl policy. Options: (a) add `Allow: /security/` and update `robots.txt` to permit indexing, or (b) add `Disallow: /security/` to preserve the existing no-crawl policy. Do NOT default to either — this requires a conscious decision. Document the decision in this spec before Phase E begins.

> Rationale: order maximizes narrative coverage per unit of effort — fix the page everyone sees first (A), then build the evaluation path (B→C), then the campaign landing pages (D), then supporting depth (E). Each phase is independently shippable.

### 3.3 Design aesthetic requirements

**Constraint: GTM-driven content refresh, NOT a visual rebrand.** Match the existing identity exactly. (Per issue and project memory.)

- **Color tokens — use the existing CSS variables verbatim** (Appendix C). Forest-green accent `#2f4f3e` / hover `#3a6149`; light bg `#f4f6f4`; surface `#e6eae7`; text `#1f2321` / `#5c635f`; border `#d6dbd7`. No new brand colors. Greens may be used for section accents/dividers as the guide pages already do (`#4f6f5c`, `#3a5f4a`).
- **Typography** — keep the system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI"…`). h1 3rem/700/-0.02em; existing scale. No web-font dependency.
- **Components — extend, reuse the established patterns:**
  - Cards: the `.requirements` card (rounded 12px, surface bg, 1px border) is the base for stat cards, pillar cards, persona cards.
  - The `.compare-card` pattern from the compare subtree is the model for persona/competitor cards.
  - Buttons: existing `.btn-download` (accent fill, 8px radius, 44px min target) is the primary CTA everywhere; add a `.btn-secondary` outline variant in the same green for "See how it works" etc.
  - Tables: the guide-page table style (green header `#2F4F3E`, zebra rows) for capability/comparison tables.
- **Conversion-optimization within the identity:** clear single primary CTA per viewport (download), secondary CTA muted; stat bar above the fold; persona self-routing; reframe-first copy. Modern feel comes from generous spacing, the existing hero-quote shimmer, and confident typography — not from new colors or chrome.
- **Accessibility (carry forward existing standards):** 44px min tap targets, visible `:focus-visible` outlines, `prefers-reduced-motion` honored (shimmer + transforms already gated), semantic landmarks (`<main>`, `<nav aria-label>`, `aria-labelledby` sections), alt text on wordmark/diagrams. New pages must meet the same bar — route a WCAG pass through the **auditor** agent before publish.
- **Responsive:** single 767px breakpoint already in use; full-width stacked CTAs on mobile; preserve.

### 3.4 Copy strategy — verbatim vs. adapted

| Use verbatim (Appendix B copy bank) | Adapt (structure/flow) |
|---|---|
| Taglines, positioning statement, the reframe sentence | Section headings, nav labels, microcopy |
| The five headline stats + capability/benefit tables | Transitions between blocks |
| Persona messages (§1.3), elevator pitches (§1.6) | CTA button labels (keep short/action) |
| Competitor architecture-gap lines (§1.7) | Meta titles/descriptions (derive from 1-liner) |
| Customer quotes (§1.5) — Legal-cleared framing | "Results by user type" intro copy |

**Hard copy rules (from project memory — release-notes/whitepaper discipline applies to marketing too):**
- Customer value framing first; no implementation-internal detail dumps.
- No security disclosures that imply a past insecure state.
- Quantified per-customer claims → **Legal review before publish** (MRD editorial note + project SLA/whitepaper rules).
- Keep the directional-estimate hedge on ROI ranges in any place a buyer could read them as a guarantee.

### 3.5 New assets needed

| Asset | Purpose | Source / notes |
|---|---|---|
| "How it works" diagram (channels → parallel agents → async tools → results) | Home block 7 + /how-it-works/ | SVG, forest palette, matches existing diagram style in guides |
| Three pillar icons (clock/async, lock-shield/local, plug-graph/integrations) | Pillar sections + product pages | SVG, single-color accent; reuse logo-icon visual language |
| Five persona card icons | Persona selector + /for/ pages | SVG, consistent line weight |
| Stat-bar layout (no new art — type + dividers) | Home block 3 | CSS only |
| (Optional) Product screenshot/animation of a channel with agents working | Pillar 01 / how-it-works | Requires product capture; gate on availability — do not block Phase A |

No photography, no stock imagery — consistent with the current restrained, type-and-logo aesthetic.

### 3.6 Acceptance criteria (from the issue)

- [x] All four source docs read and synthesized → Phase 1 + Appendices A/B.
- [x] Sitemap with page-level purpose mapped to personas/buying stages → Phase 2 (§2.2).
- [x] Implementation plan with phases, page-priority order, design constraints → Phase 3 (§3.1–3.5).
- [x] No placeholder copy — section intent grounded in actual doc content (verbatim tags + copy bank).
- [x] Self-contained — developer + copywriter can execute without re-reading sources (Appendix B copy bank + Appendix C tokens).

---

<a name="appendix-a"></a>
## Appendix A — Source Document Provenance

| Document | Internal codename | What was extracted |
|---|---|---|
| Prosponsive_Messaging_Framework.docx | internal document ID — contact jb@prosponsive.ai | Positioning statement, taglines, 3 pillars, persona quick-reference, competitor table, 50/100/200-word descriptions |
| Prosponsive_Draft Pitches & SolutionBrief.docx | internal document ID — contact jb@prosponsive.ai | 4 elevator pitches, solution brief, headline stat bar, capability/benefit tables, "problem we own" |
| Prosponsive_MRD.docx | internal document ID — contact jb@prosponsive.ai | Personas (2 tiers), 10 pain points, 6 differentiators, market trends, competitor landscape, customer evidence (+ editorial/Legal notes), campaign strategy |
| Prosponsive_Value_Selling_Assets.docx | internal document ID — contact jb@prosponsive.ai | Value-selling pitches, differentiated capabilities & benefits table, quantitative benefit ranges |

Source docs are marked "Confidential — Do Not Distribute" / "For internal use"; **do not copy doc internal notes, SLAs, or the confidential footer onto the public site.**

---

<a name="appendix-b"></a>
## Appendix B — Copy Bank (verbatim-safe language)

### B.1 Taglines & positioning
- "AI That Works While You Don't"
- "Your Agents. Your Machine. Your Rules."
- "It's what Slack would look like if it were built agent-first."
- Positioning statement: see §1.1.

### B.2 50-word description (verbatim — use for /product/ intro & meta)
> "Prosponsive is the personal autonomous agent platform that runs AI assistants locally on your desktop. Multiple specialized agents work in parallel, execute tools asynchronously, and post results while you're away. Your data never leaves your machine. Your credentials never touch an AI provider. Seven providers supported — switch anytime, rebuild nothing."

### B.3 100-word description (verbatim — use for home meta / about)
> "Prosponsive is the personal autonomous agent platform that runs AI assistants locally on your desktop — so AI works while you don't. Multiple specialized agents share channels, work in parallel, and execute tools asynchronously in the background. You post a task and walk away. Results are waiting when you return. Your conversation history, credentials, and workflow data never leave your machine. API keys are encrypted locally and isolated from every AI provider. Prosponsive supports 7+ AI providers with automatic failover, 2,533 pre-built tool integrations via n8n, and a visual workflow builder — no code required for most integrations."

### B.4 Full 2-minute discovery pitch (verbatim — basis for /how-it-works/ and home narrative)
> "Most knowledge workers I talk to are doing the same thing: they've got ChatGPT in one tab, Claude in another, maybe Zapier running in the background—and they're manually stitching it all together. They're copying context between conversations, sitting and watching while tools process one step at a time, and wondering why their 'AI-powered workflow' still feels like a lot of work. Here's what they're often missing: the bottleneck isn't the AI model. It's the architecture around it. Most tools are built synchronously—you wait. They're built for one provider—you're locked in. And your data passes through cloud servers you don't control. Prosponsive was built differently. It runs on your desktop. Multiple specialized agents work in parallel inside channels, using tools that orchestrate across your real systems—email, CRM, databases, Slack—not just one at a time, but as complete workflows. You post a task and walk away. The agents run, tools execute in the background, and results are waiting when you return. Your credentials never touch an AI provider. And if one model goes down, it automatically fails over to the next. For knowledge workers who are serious about reclaiming their time and protecting their data, it's the difference between an AI assistant and an AI that actually works while you're not."

### B.5 Differentiated capabilities table (verbatim — use on /product/ children)
The 11-row "Differentiated Capability / What It Means / Quantitative Benefit" table from the Value Selling Assets doc is the canonical capability copy. Reproduce rows under the matching pillar:
- **Pillar 01:** async background execution (30–90 min/day) · parallel agents in channels (2–4 hrs → 20–40 min) · auto-approval rules (50–100+ interruptions; up to 70% latency) · scheduled prompts (3–7 hrs/week) · channel/thread scoping (30–50% lower inference cost).
- **Pillar 02:** credential isolation (zero exposure) · 7+ providers, one setting (20–40% cost optimization) · automatic failover (100% of single-provider downtime eliminated) · 100% local execution (data sovereignty, offline-capable).
- **Pillar 03:** n8n multi-system tools (60–80% fewer tool calls vs. MCP) · 2,533 integrations / 216 products (5–10× faster than custom API dev).

> Every benefit range above carries the source hedge: *directional estimate — validate with discovery data before customer-facing ROI use.*

> **Important for implementation:** The rows above are structural summaries only. The verbatim three-column table (Capability / What It Means / Quantitative Benefit) is in `Prosponsive_Value_Selling_Assets.docx`, §"Capability Comparison." The developer/copywriter writing each `/product/` page MUST pull the exact row text from that source doc — do not paraphrase the quantified benefit numbers. The bucketed structure above is a guide to which rows belong on which page.

### B.6 — 200-Word Brand Description
*Source: Prosponsive_Messaging_Framework.docx, §"Brand Descriptions"*

[The 200-word version is documented in the Messaging Framework source doc. It is the recommended copy for press kit pages, partner profiles, and App Store / directory descriptions. The copywriter executing Phase C should pull this verbatim from the source doc and adapt only for tense/voice consistency with the site. Do not write a new 200-word description — the source doc version has been through messaging review.]

---

<a name="appendix-c"></a>
## Appendix C — Design Tokens (extracted from current site)

From `css/styles.css` `:root` (use these — do not change):

```css
--bg:             #f4f6f4;  /* page background (light) */
--surface:        #e6eae7;  /* cards / bands */
--text-primary:   #1f2321;
--text-secondary: #5c635f;
--accent:         #2f4f3e;  /* forest green — primary CTA, headings, links */
--accent-hover:   #3a6149;
--border:         #d6dbd7;
--font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
```
Supporting greens used by guide pages (safe to reuse for accents/dividers): `#4f6f5c`, `#3a5f4a`, `#d4edd8` (shimmer highlight).
Radii: 8px (buttons), 12px (cards). Breakpoint: 767px. Min tap target: 44px. Motion gated behind `prefers-reduced-motion`.

---

### Open decisions for reviewer / user
1. **`/compare/` relocation vs. alias** — **Decision: `/guides/compare/` URLs are canonical and must not be moved.** GitHub Pages has no redirect infrastructure; a true 301 is not achievable without a CDN layer not currently in use. The new `/compare/` page is an **alias index** that lists and links to the existing `/guides/compare/` pages — it does not replace them. The `sitemap.xml` must continue to list the `/guides/compare/` URLs as canonical entries. The `/compare/` index is a navigation convenience, not a content migration. Do not add `<meta http-equiv="refresh">` stubs or JavaScript redirects on the old paths — they harm SEO without providing the 301 benefit.
2. **`/pricing/` commercial model** — depends on the free-tier/trial PLG model (MRD §09). Ship as "start free / how to get started" if tiers aren't finalized; do not fabricate pricing.
3. **Customer quotes & quantified claims** — require Legal clearance per the MRD editorial note before any go live. Spec uses archetype attribution only.
