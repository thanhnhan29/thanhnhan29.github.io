# Thanh-Nhan Vo — academic homepage

Based on [luost26/academic-homepage](https://github.com/luost26/academic-homepage), template commit `2fb6806`. The original template layout, Bootstrap styling, and shared widgets are retained.

Content source: portfolio commit `3210d8fb88481842c0da48bb46c8bc5dd1fbe11b`. Biography, opportunity callout, 17 news entries, 7 publication entries, and 2 project descriptions retain their original wording. The only author-list correction is the explicitly requested addition of Trong-Thuan Nguyen after Thanh-Nhan Vo in the AI City paper. Original images and favicon are retained.

Editorial decision on October 12, 2026: the owner requested removal of the Chấn hưng Việt Nam scholarship from the public website. Keep it out of Honors & Awards and News unless the owner asks to restore it. The news collection contains 17 entries.

## Run

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4322
```

## Build

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

Edit `_data/profile.yml`, `_news`, `_publications`, and `_data/projects.yml`. Navigation is in `_data/navigation.yml`. Collection documents do not generate individual paper pages. No example biographies, affiliations, news, or publications are displayed.

GitHub Pages uses GitHub Actions. `.github/workflows/deploy.yml` builds and deploys `v3-academic-homepage` when pushed. The previous site remains in `master`. Travel entries are in `_showcase/travel`; conference badge metadata is in `_data/venue_rankings.yml`.

## Travel photo journal, local revision on 2026-10-14

`/travel/` now presents Travel & Moments: Applied AI Lab Demo Day, the Pony Chung scholarship ceremony, and Malmö in September 2026. Thanh-Nhan confirmed the three groups and Malmö location. Existing conference notes and upcoming stops remain below the photo albums.

- Album titles, captions, order, and photo metadata: `_data/travel_albums.yml`.
- Reusable album layout: `_includes/widgets/travel_album.html`.
- Page styles and keyboard-accessible photo viewer: `assets/css/travel.css` and `assets/js/travel.js`.
- Ten original uploads are retained in `images/travel/`. This folder is excluded from the built site. Twenty browser-compatible JPEG derivatives, full views and thumbnails, live in `assets/images/travel/`; `manifest.json` maps them to the originals. Derivatives are correctly oriented and do not retain EXIF metadata. Total thumbnail size is approximately 1.9 MB; images outside the first feature use native lazy loading.

The local-only autumn effect remains intact. This gallery is an uncommitted local revision; no push or deployment was performed.

The currently running preview uses the existing Jekyll gems in `.worktrees/v3-academic-homepage/vendor/bundle/ruby/2.6.0`, without changing Gemfile or Gemfile.lock. Where the temporary Bundler installation is unavailable, use the installed gems directly:

```sh
JEKYLL_NO_BUNDLER_REQUIRE=true \
GEM_HOME="$PWD/.worktrees/v3-academic-homepage/vendor/bundle/ruby/2.6.0" \
GEM_PATH="$PWD/.worktrees/v3-academic-homepage/vendor/bundle/ruby/2.6.0" \
ruby .worktrees/v3-academic-homepage/vendor/bundle/ruby/2.6.0/bin/jekyll build --watch --force_polling --destination /private/tmp/autumn-preview-site
```

Serve that generated directory in a second terminal:

```sh
python3 -m http.server 4322 --bind 127.0.0.1 --directory /private/tmp/autumn-preview-site
```
