# Around Headliner content contract

The three real articles in `src/next/preview-publications.js` are local records,
not a connected CMS. `HomePreview` uses their summaries for cards, and
`PublicationBody` renders their body blocks. The route derives article metadata
and static slugs from the same records.

## Record fields

- `id`: stable content identifier.
- `slug`: unique URL segment.
- `title`, `excerpt`, `category`: editorial card and article copy.
- `image`, `alt`: cover image URL and accessible description.
- `body`: ordered blocks with stable `id`, `type`, and `text`. The current
  renderer supports `paragraph` blocks and `image` blocks with `src`, `alt`, and
  an optional `caption`. New block types need explicit renderer
  support before editors use them.
- `publishedAt`, `credit`: optional; not inferred from image uploads or events.
- `source`: optional external attribution with `label` and `url`.

A future CMS adapter should return this shape. No CMS credentials, database,
admin UI, or publishing connection has been created.

## Editorial notes

- The Shady’s image was supplied twice as the same URL and is used once.
- Posting dates supplied by the editor are October 17, 2026 for Shady’s,
  October 15, 2026 for Jennifer Belle, and October 10, 2026 for Wag & Walk.
  The list is ordered newest first. Dates appear on both cards and articles.
- The telethon date and time are attributed to Jennifer’s announcement. Its
  year, time zone, Roku channel, and viewing URL need confirmation before
  turning it into a calendar event.
- The Facebook group permalink is a source link, not an embed. Public access
  and embed eligibility have not been confirmed.
- Student names are reproduced from the supplied lineup. Confirm applicable
  name/photo publication permissions before production release.