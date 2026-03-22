# Contributing to Prosponsive

Thank you for helping improve Prosponsive! This document explains how the feedback system works.

## How to Submit Feedback

There are two ways to submit feedback:

1. **Issue Templates** -- Use the bug report or feature request templates in this repository.
2. **In-App Feedback Agent** -- Use the built-in Feedback Agent within Prosponsive (coming soon). The agent guides you through a conversational feedback flow and submits a structured issue on your behalf.

All issues must use the provided templates. Blank issues are disabled to ensure consistent, structured feedback that can be triaged effectively.

## What Happens After You Submit

1. **Submitted** -- Your issue is created with a `triage` label.
2. **Triaged** -- The Prosponsive team reviews your submission and categorizes it.
3. **Promoted** -- If actionable, the issue is linked to an internal engineering issue in the private development repo. The `promoted` label is applied.
4. **Fix In Progress** -- Engineering work begins on the internal issue.
5. **Fix Shipped** -- The fix is merged and deployed in a new release. The `fix-shipped` label is applied to your original issue.
6. **Credit Awarded** -- If eligible, credit is recorded for your account. The `credit-awarded` label is applied.

## Credit System

Prosponsive rewards users who submit actionable feedback that leads to real improvements:

- **Bug reports** that result in a merged fix earn credit toward free subscription months.
- **Feature requests** that are implemented earn credit toward free subscription months.
- Credits are tracked per user and applied automatically to your account.

The exact credit amounts will be published as the system matures.

## What Makes Good Feedback

### Bug Reports
- **Clear description** of what went wrong
- **Steps to reproduce** the issue consistently
- **Expected vs. actual behavior** so we understand the gap
- **Version and platform** information to help us reproduce

### Feature Requests
- **Specific description** of what you want
- **Use case** explaining why it matters to you
- **Alternatives considered** so we understand what you have tried

## Issue Labels

| Label | Meaning |
|-------|---------|
| `bug` | Bug report |
| `feature-request` | Feature request |
| `triage` | Awaiting team review |
| `promoted` | Linked to internal engineering issue |
| `fix-shipped` | Fix has been merged and deployed |
| `credit-awarded` | Credit recorded for the reporter |
| `duplicate` | Duplicate of an existing issue |
| `wont-fix` | Will not be addressed |
| `priority:focus` | Currently in active engineering focus |
