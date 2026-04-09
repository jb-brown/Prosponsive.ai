# Spec: Split User Guide into Three Standalone Guides

**Issue**: jb-brown/Prosponsive.ai#42
**Status**: Approved (Revision 2)
**Author**: orchestrator

---

## Objective

Split the monolithic `guides/user-guide.html` (714 lines, 13 sections) into three focused, standalone HTML guides plus a landing page. Each guide should be self-contained and cross-linked.

## Current State

`guides/user-guide.html` contains:
- **Sections 1-2**: Install Prosponsive, First Launch
- **Sections 3-5**: Tour the Interface, Your First Conversation, Understanding Agents
- **Sections 6-11**: Connect Email, Watch Triage, Organize with Channels (x2), Delete Rules, Routing Rules at Scale
- **Sections 12-13**: Report a Bug, What's Next
- **Quick Reference**: Action/how table

## Sequential Navigation (All Guides)

All four guides form a linear sequence and share the same header/footer navigation bar:

**Guide Order**:
1. Install Guide (`install-guide.html`)
2. Prosponsive Basics (`basics.html`)
3. Email Assistant Example (`email-assistant-example.html`)
4. Developer Guide (`n8n-workflow-developer-guide.html`) -- existing file, nav added

**Navigation Bar Design**:
- Appears at both the **top** and **bottom** of every guide page
- **Left side**: back arrow with previous guide's subject name (e.g., `<-- Install Guide`), linked to that guide
- **Right side**: next guide's subject name followed by forward arrow (e.g., `Prosponsive Basics -->`), linked to that guide
- **First guide** (Install Guide): no left/back element; right side only
- **Last guide** (Developer Guide): left/back element only; no right/forward element
- Use flexbox layout with `justify-content: space-between` so left and right align to edges
- Style the nav bar with the existing `.tip` class border/padding for visual consistency, but use a horizontal flex layout instead of the tip's block layout

**Navigation Labels**:
| Guide | Left (Back) | Right (Next) |
|-------|-------------|--------------|
| Install Guide | _(none)_ | Prosponsive Basics --> |
| Prosponsive Basics | <-- Install Guide | Email Assistant --> |
| Email Assistant Example | <-- Prosponsive Basics | Developer Guide --> |
| Developer Guide | <-- Email Assistant | _(none)_ |

## Deliverables

### 1. `guides/install-guide.html` (new file)

**Content source**: Sections 1-2 (lines 85-223)

**Structure**:
- Sequential nav bar (top) -- right side only: "Prosponsive Basics -->"
- Cover page with Prosponsive branding (same SVG/icon as current guide)
- Title: "Prosponsive Install Guide"
- Brief intro paragraph explaining this guide covers installation and first launch
- Section 1: Install Prosponsive (macOS, Windows, Installation Overview, What Prosponsive Installs, Installation Time)
- Section 2: First Launch (System Health screen, AI provider, SSL certificate, n8n account, n8n API key)
- Sequential nav bar (bottom) -- right side only: "Prosponsive Basics -->"
- Footer with Prosponsive branding

**Edits from source**:
- Renumber sections to 1 and 2 (no change needed, already 1-2)
- Add intro paragraph: "This guide covers installing Prosponsive and completing first-launch setup. Once you're up and running, continue to Prosponsive Basics to learn the interface."

### 2. `guides/basics.html` (new file)

**Content source**: Sections 3-5, 12-13, and Quick Reference (lines 225-278, 280-350, 635-706)

**Structure**:
- Sequential nav bar (top) -- "<-- Install Guide" | "Email Assistant -->"
- Cover page with Prosponsive branding
- Title: "Prosponsive Basics"
- Brief intro paragraph explaining this guide covers the interface, agents, and core features
- Section 1: Tour the Interface (Sidebar, Chat tab, Agents tab, n8n tab)
- Section 2: Your First Conversation
- Section 3: Understanding Agents (default agents, delegation, sharing)
- Section 4: Report a Bug or Request a Feature
- Section 5: What's Next (custom agents, custom tools)
- Quick Reference table
- Sequential nav bar (bottom) -- "<-- Install Guide" | "Email Assistant -->"
- Footer with Prosponsive branding

**Edits from source**:
- Renumber sections from 1-5 (originally 3-5, 12-13)
- Add intro paragraph: "This guide introduces the Prosponsive interface, agents, and core features. If you haven't installed Prosponsive yet, start with the Install Guide."
- The intro to section "Your First Conversation" references creating a "Project Zen" channel. Keep this as-is since it's self-explanatory and referenced later in the email guide.

### 3. `guides/email-assistant-example.html` (new file)

**Content source**: Sections 6-11 (lines 352-632)

**Structure**:
- Sequential nav bar (top) -- "<-- Prosponsive Basics" | "Developer Guide -->"
- Cover page with Prosponsive branding
- Title: "Example: Email Assistant"
- Brief intro paragraph explaining this is a hands-on walkthrough
- Prerequisites callout: "This guide assumes you have completed the Install Guide and are familiar with the Prosponsive Basics."
- Section 1: Connect Your Email (IMAP credential, polling workflow, move-to-folder tool)
- Section 2: Watch Email Triage in Action
- Section 3: Organize with Channels: Your First Move
- Section 4: Organize with Channels: Approvals
- Section 5: Customize the Email Agent: Add Delete Rules
- Section 6: Add Channel Routing Rules and Manage at Scale (routing rules, filtering, grouping, auto-approval, bulk-approve)
- Sequential nav bar (bottom) -- "<-- Prosponsive Basics" | "Developer Guide -->"
- Footer with Prosponsive branding

**Edits from source**:
- Renumber sections from 1-6 (originally 6-11)
- Add intro paragraph: "This guide walks you through connecting your email inbox to Prosponsive and building an automated triage workflow. By the end, you'll have routing rules, deletion rules, auto-approval, and bulk actions working together."
- Replace the opening sentence of section 1 (currently "To work through a real, valuable use of Prosponsive, let's connect your email inbox so Prosponsive can help you triage it.") with something self-contained: "Let's connect your email inbox so Prosponsive can help you triage it."
- The reference to "Project Zen" channel (created in Section 4 of the original) needs a parenthetical note: "(create this channel first by typing 'Create a channel called Project Zen' in any chat)" since the basics guide covers this but the reader may not have done it.

### 4. `guides/n8n-workflow-developer-guide.html` (modified -- nav added)

**Content**: The existing Developer Guide. No structural changes to its content.

**Changes**:
- Add sequential nav bar at the **top** of the page (after opening body/container): "<-- Email Assistant" | _(no right side -- this is the last guide)_
- Add sequential nav bar at the **bottom** of the page (before closing footer/body): "<-- Email Assistant" | _(no right side)_
- The same nav bar HTML/CSS pattern used in the other three guides

**Note**: `n8n-tool-building-guide.html` is an identical copy of this file. It will NOT be modified -- only `n8n-workflow-developer-guide.html` participates in the navigation sequence.

### 5. `guides/user-guide.html` (modified -- becomes landing page)

**Content**: Replace the full guide with a landing page that links to all four guides in sequence.

**Structure**:
- Same styling as existing guide
- Cover page with Prosponsive branding (same SVG/icon)
- Title: "Prosponsive User Guide"
- Brief intro: "Welcome to Prosponsive. Choose a guide to get started, or follow them in order."
- Four cards/sections, each with:
  - Guide title (numbered to show sequence)
  - 2-3 sentence description of what it covers
  - Link to the guide HTML file
- The four guides:
  1. Install Guide -- "Get Prosponsive running on macOS or Windows. Covers installation, first launch, AI provider setup, SSL certificates, and n8n configuration."
  2. Prosponsive Basics -- "Learn the interface, have your first conversation, and understand how agents, delegation, and channels work together."
  3. Email Assistant Example -- "A hands-on walkthrough: connect your email, set up triage, create routing and deletion rules, and manage at scale with filtering, grouping, and auto-approval."
  4. Developer Guide -- "Build custom n8n tools and workflows to extend Prosponsive's capabilities."
- Footer with Prosponsive branding

## Styling

All five files share the identical `<style>` block from the current `user-guide.html`, plus a small addition for the sequential nav bar. The nav bar uses:
- A container styled similarly to `.tip` (light border, padding) but with `display: flex; justify-content: space-between; align-items: center;`
- Left and right link elements styled as simple text links with arrow characters
- No new colors or fonts -- inherits from existing styles

## File Summary

| File | Action | Description |
|------|--------|-------------|
| `guides/install-guide.html` | Create | Sections 1-2: installation and first launch |
| `guides/basics.html` | Create | Sections 3-5, 12-13, Quick Reference: interface, agents, core features |
| `guides/email-assistant-example.html` | Create | Sections 6-11: email connection, triage, rules, scale |
| `guides/n8n-workflow-developer-guide.html` | Modify | Add sequential nav bar (top + bottom) |
| `guides/user-guide.html` | Replace | Landing page linking to all four guides |

## Acceptance Criteria

1. Each of the three new guides is a standalone, valid HTML file
2. All guides use the same CSS styling as the original
3. Every guide has a sequential nav bar at both top and bottom of the page
4. Nav bar shows back arrow + previous guide name (left) and next guide name + forward arrow (right)
5. First guide (Install Guide) has no back arrow; last guide (Developer Guide) has no forward arrow
6. The original `user-guide.html` URL serves a landing page with links to all four guides
7. No content is lost in the split -- every section from the original appears in exactly one guide
8. Section numbering is reset per guide (starts at 1)
9. Cross-references between guides use relative links (e.g., `basics.html`)
10. Each guide reads as a self-contained document, not a fragment
11. The cover page SVG/icon and branding are consistent across all files
12. The existing Developer Guide (`n8n-workflow-developer-guide.html`) has nav bars added but its content is otherwise unchanged
