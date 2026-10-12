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
