# Refreshed site release checklist

## Prepared locally

- Public routes use the approved designs: `/`, `/tiny-keys`, `/little-rockers`, `/programs/band`, `/services/rehearsal-space`, `/services/recording-music-production`.
- Homepage publications have public `/publications/[slug]` routes and sitemap entries.
- Public pages retain production canonical metadata and service structured data. Preview copies remain noindex and canonicalize to their public counterparts.
- Little Rockers intentionally opens the main website for its booking handoff; Tiny Keys retains its existing Opus destination.
- Form routing and CRM schema are unchanged. Rehearsal production details use the existing message field; document emailing remains a separate manual attachment step.

## Reproducible local validation

From `/Users/brunowong/headliner-app`:

```sh
node --test scripts/*.test.mjs
npm run build
# Start the rebuilt app on port 3007 before browser checks.
node scripts/preview-forms.browser.mjs
FORM_TEST_PUBLIC=1 node scripts/preview-forms.browser.mjs
node scripts/release-pages.browser.mjs
git diff --check
```

Browser scripts intercept or block all POST requests and block external media. They do not prove actual CRM receipt, notifications, or external media availability.

## Before production deployment

- Review the complete uncommitted change set, including previously approved homepage content. Commit and push only on explicit instruction.
- Confirm the deployment project, branch, build command (`npm run build`), and intended production domain.
- Confirm production `NEXT_PUBLIC_FORM_DELIVERY_MODE` and `NEXT_PUBLIC_CRM_API_BASE_URL` before building. Code defaults are `pulse` and `/api/intake`; local defaults do not prove deployed settings.
- Pulse/CRM delivery saves intake first, then sends the existing EmailJS notification. Email failure is logged without failing an accepted lead. Verify the EmailJS service, template recipient, quota, and allowed origins with a controlled inbox test after deployment; mocked tests do not prove inbox delivery.
- Confirm the production CRM tenant configuration. Do not copy secrets into source control or release notes.
- Deploy only on explicit instruction; retain a known-good deployment for rollback.

## Final live delivery gate

- With approval, send a clearly labeled test inquiry with controlled contact information through the deployed form.
- Confirm the expected contact, student, program/service, source URL, and message arrive in Pulse, including rehearsal production answers where relevant.
- Verify the staff notification expected for the selected delivery mode. For `emailjs` or `shadow`, inspect an actual rendered email; local transport tests do not verify template rendering.
- Confirm staff know stage plots/input lists arrive as separate manually attached emails, not automatic CRM attachments.
- Identify and clean up the test record using the normal staff workflow.
- Smoke-test public navigation, social/media loading, mobile forms, canonicals, robots, sitemap, and analytics on the deployed domain.

Do not declare live delivery verified until the receiving system has been checked.