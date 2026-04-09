# SPEC-44: Standalone Feedback Guide with Open Product / Closed Source Philosophy

## Summary

Create `guides/feedback.html` — a new standalone guide with two parts: a philosophy section explaining Prosponsive's "Open Product, Closed Source" model, and a how-to section covering the built-in feedback system. Update existing guides to integrate it into the navigation sequence.

## New File: `guides/feedback.html`

### Structure

1. **Cover page** — Same pattern as other guides (icon, title "Feedback & Philosophy", tagline)
2. **Top nav bar** — Back: Email Assistant, Forward: Developer Guide
3. **Section 1: Open Product, Closed Source** (philosophy)
4. **Section 2: How to Give Feedback** (practical how-to, migrated from basics.html section 4)
5. **Bottom nav bar** — Same as top
6. **Footer** — Same pattern as other guides

### Section 1 Key Messaging Points

The philosophy section should cover these concepts in approachable prose (not bullet-point marketing copy):

- **Open Product** means the product development process is transparent to users:
  - Users can see engineering priorities (via "What are the current priorities?" in-app)
  - Users submit feedback that directly shapes the roadmap
  - Users can track what they've submitted and what's being worked on
  - The product is built *with* its users, not just *for* them

- **Closed Source** means the codebase is proprietary, but:
  - This funds sustainable, full-time development
  - Closed source does NOT mean opaque — the open product model ensures users have voice and visibility
  - The built-in feedback system is the mechanism that makes this work — it's not a suggestion box, it's a direct line to engineering

- **The balance**: Open Product + Closed Source = users get the transparency and influence of open source communities without requiring the codebase to be public. The feedback loop is the contract.

### Section 2 Content (migrated from basics.html)

Move the existing feedback how-to content from basics.html section 4, preserving:
- How to report a bug (delegate to Prosponsive Support)
- How to request a feature
- How to check submission history
- How to see current engineering priorities

Expand slightly with:
- A note that feedback goes directly to the engineering team (reinforcing the philosophy)
- The fact that the Prosponsive Support agent handles the conversation naturally

## Changes to Existing Files

### `guides/basics.html`

- **Replace section 4** ("Report a Bug or Request a Feature") with a short bridge paragraph and link:
  - Keep the section heading (renumber if needed — it stays as section 4)
  - Replace the detailed content with ~2 sentences explaining feedback exists and linking to the Feedback guide
  - Preserve the Quick Reference table row for "Report a bug" (it's still useful as a quick ref)

### `guides/user-guide.html`

- **Insert a new guide card** between Email Assistant (3) and Developer Guide:
  - Number: 4. Feedback & Philosophy
  - Link: `feedback.html`
  - Description: ~1 sentence about the open product model and how to use the feedback system
- **Renumber** Developer Guide from 4 to 5

### `guides/email-assistant-example.html`

- **Bottom nav**: Change forward link from `n8n-workflow-developer-guide.html` / "Developer Guide" to `feedback.html` / "Feedback"

### `guides/n8n-workflow-developer-guide.html`

- **Top nav**: Change back link from `email-assistant-example.html` / "Email Assistant" to `feedback.html` / "Feedback"
- **Bottom nav**: Same change

### Navigation Sequence (final state)

```
Install Guide → Basics → Email Assistant → Feedback → Developer Guide
```

## Styling

- Use identical CSS, class names, and HTML patterns from existing guides (copy from basics.html or email-assistant-example.html)
- Same cover page SVG icon pattern
- Same `.guide-nav`, `.tip`, `.section-number` classes
- Same footer pattern

## Footer Link Consolidation

### `index.html` (lines 52-53)

Replace the two separate links:
```html
<a href="https://github.com/jb-brown/Prosponsive/issues/new?template=bug_report.md">Report a Bug</a>
<a href="https://github.com/jb-brown/Prosponsive/issues/new?template=feature_request.md">Request a Feature</a>
```

With a single link to the Feedback guide:
```html
<a href="guides/feedback.html">Feedback</a>
```

### `releases/index.html` (lines 147-148)

Same consolidation — replace the two GitHub issue template links with:
```html
<a href="../guides/feedback.html">Feedback</a>
```

## Out of Scope

- No changes to install-guide.html or n8n-tool-building-guide.html
- No new CSS classes or design patterns
- No changes to basics.html sections 1-3 or 5
