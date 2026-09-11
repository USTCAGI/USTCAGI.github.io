# Photo Memory Wall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive `/gallery/` photo memory wall that features the 2026 group portrait and automatically groups image-backed news memories by year.

**Architecture:** A Hugo section page owns the featured-memory metadata, while a local `gallery/list.html` layout queries existing post page resources at build time. A small progressive-enhancement JavaScript asset provides the dialog viewer, and the existing site stylesheet supplies the timeline, masonry columns, and responsive presentation.

**Tech Stack:** Hugo Extended 0.125.7, Go templates, Hugo image processing, vanilla JavaScript, SCSS, and the Node.js repository quality verifier.

---

### Task 1: Add the failing photo-wall contract

**Files:**
- Modify: `scripts/verify-site-quality.mjs`
- Test: `scripts/verify-site-quality.mjs`

- [ ] **Step 1: Write the failing test**

Add guarded reads for the future content, layout, and JavaScript files, then assert the public contract:

```js
const galleryContentPath = 'content/gallery/_index.md';
const galleryLayoutPath = 'layouts/gallery/list.html';
const galleryScriptPath = 'assets/js/gallery.js';
const galleryContent = fs.existsSync(galleryContentPath) ? read(galleryContentPath) : '';
const galleryLayout = fs.existsSync(galleryLayoutPath) ? read(galleryLayoutPath) : '';
const galleryScript = fs.existsSync(galleryScriptPath) ? read(galleryScriptPath) : '';

assert(fs.existsSync(galleryContentPath), 'photo memory wall should define a gallery section page');
assert(fs.existsSync(galleryLayoutPath), 'photo memory wall should use a dedicated list layout');
assert(fs.existsSync(galleryScriptPath), 'photo memory wall should provide progressive lightbox behavior');
assert(/name:\s*照片墙\s*\n\s*url:\s*gallery\s*\n\s*weight:\s*25/.test(menus), 'main navigation should expose the photo wall after people');
assert(/title:\s*照片纪念墙/.test(galleryContent), 'photo wall should use the approved Chinese title');
assert(/image:\s*hero-group-2026\.jpg/.test(galleryContent), 'photo wall should feature the 2026 group portrait');
assert(/where site\.RegularPages "Section" "post"/.test(galleryLayout), 'photo wall should derive memories from existing posts');
assert(/GroupByDate "2006"/.test(galleryLayout), 'photo wall should group news memories by year');
assert(/<dialog[\s\S]*data-gallery-dialog/.test(galleryLayout), 'photo wall should include an accessible native dialog viewer');
assert(/data-gallery-item/.test(galleryLayout), 'photo cards should expose progressive-enhancement hooks');
assert(/showModal\(\)/.test(galleryScript), 'photo wall script should open the native dialog');
assert(/ArrowLeft/.test(galleryScript) && /ArrowRight/.test(galleryScript), 'photo wall viewer should support keyboard navigation');
assert(/\.gallery-wall\s*\{[\s\S]*display:\s*block[\s\S]*columns:\s*3/.test(scss), 'photo wall should use a three-column desktop masonry layout');
assert(/@media\s*\(max-width:\s*767\.98px\)[\s\S]*\.gallery-wall\s*\{[\s\S]*columns:\s*1/.test(scss), 'photo wall should collapse to one column on mobile');
assert(!/class="gallery-grid"/.test(galleryLayout), 'photo wall should not collide with the theme gallery shortcode grid');
assert(!/\.gallery[\s\S]*\bwidth:\s*min\(/.test(scss), 'photo wall width rules should remain compatible with the pinned Hugo SCSS compiler');
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node scripts/verify-site-quality.mjs`

Expected: FAIL with missing gallery page, layout, navigation, script, and style contract messages.

- [ ] **Step 3: Commit the red contract**

```bash
git add scripts/verify-site-quality.mjs
git commit -m "test: define photo memory wall contract"
```

### Task 2: Add page content and discovery links

**Files:**
- Create: `content/gallery/_index.md`
- Modify: `config/_default/menus.yaml`
- Modify: `layouts/partials/site_footer.html`

- [ ] **Step 1: Define the page and featured memory**

Create `content/gallery/_index.md` with the title, introduction, and the 2026 team photo metadata:

```yaml
---
title: 照片纪念墙
summary: 用影像记录中国科大 AGI 研究组共同走过的时刻。
featured_memory:
  title: 2026年9月教师节合影留念
  date: 2026-09-10
  image: hero-group-2026.jpg
  alt: 中国科大 AGI 研究组 2026 年团队合影
  caption: 新学期，新成员，也是一段共同探索智能边界的新起点。
---
```

- [ ] **Step 2: Add navigation links**

Insert the main-menu item after `师生成员`:

```yaml
  - name: 照片墙
    url: gallery
    weight: 25
```

Add `<a href="/gallery/">照片墙</a>` to the footer link group.

### Task 3: Render featured and year-grouped memories

**Files:**
- Create: `layouts/gallery/list.html`

- [ ] **Step 1: Build the dedicated list layout**

Create the complete layout exactly as follows:

```go-html-template
{{- define "main" -}}
{{- $posts := (where site.RegularPages "Section" "post").ByDate.Reverse -}}
{{- $featured := .Params.featured_memory -}}
{{- $featuredDate := time.AsTime $featured.date -}}
{{- $memoryCount := 1 -}}
{{- $years := slice (time.Format "2006" $featuredDate) -}}
{{- range $posts -}}
  {{- $post := . -}}
  {{- with partial "blox-core/functions/get_featured_image.html" $post -}}
    {{- $memoryCount = add $memoryCount 1 -}}
    {{- $years = $years | append (time.Format "2006" $post.Date) -}}
  {{- end -}}
{{- end -}}
{{- $yearCount := len (uniq $years) -}}

<main class="gallery-page" data-gallery-root>
  <section class="gallery-hero" aria-labelledby="gallery-title">
    <div class="gallery-hero-inner">
      <p class="gallery-eyebrow" lang="en">Moments · Milestones · Memories</p>
      <h1 id="gallery-title">{{ .Title }}</h1>
      {{ with .Params.summary }}<p class="gallery-intro">{{ . }}</p>{{ end }}
      <dl class="gallery-stats" aria-label="照片墙概览">
        <div><dt>{{ $memoryCount }}</dt><dd>段影像记忆</dd></div>
        <div><dt>{{ $yearCount }}</dt><dd>个共同年份</dd></div>
      </dl>
    </div>
  </section>

  {{- $featuredResource := resources.Get (path.Join "media" $featured.image) -}}
  {{- with $featuredResource -}}
    {{- $featuredThumb := .Fill "1600x900 Center" -}}
    {{- $featuredFull := .Fit "1800x1200" -}}
    {{- if ne $featuredThumb.MediaType.SubType "gif" -}}
      {{- $featuredThumb = $featuredThumb.Process "webp" -}}
      {{- $featuredFull = $featuredFull.Process "webp" -}}
    {{- end -}}
    <section class="gallery-featured-section" aria-labelledby="gallery-featured-title">
      <a
        class="gallery-featured-card"
        href="{{ $featuredFull.RelPermalink }}"
        data-gallery-item
        data-gallery-caption="{{ $featured.caption }}"
        data-gallery-date="{{ $featuredDate | time.Format site.Params.locale.date_format }}"
        data-gallery-source=""
        aria-label="查看大图：{{ $featured.alt }}"
      >
        <img
          src="{{ $featuredThumb.RelPermalink }}"
          width="{{ $featuredThumb.Width }}"
          height="{{ $featuredThumb.Height }}"
          alt="{{ $featured.alt }}"
          fetchpriority="high"
        >
        <span class="gallery-featured-overlay" aria-hidden="true"></span>
        <span class="gallery-featured-copy">
          <time datetime="{{ $featuredDate.Format "2006-01-02" }}">{{ $featuredDate | time.Format site.Params.locale.date_format }}</time>
          <strong id="gallery-featured-title">{{ $featured.title }}</strong>
          <span>{{ $featured.caption }}</span>
        </span>
      </a>
    </section>
  {{- end -}}

  <section class="gallery-timeline" aria-label="历年照片">
    {{- range $group := $posts.GroupByDate "2006" -}}
      {{- $hasImages := false -}}
      {{- range $group.Pages -}}
        {{- $post := . -}}
        {{- with partial "blox-core/functions/get_featured_image.html" $post -}}
          {{- $hasImages = true -}}
        {{- end -}}
      {{- end -}}
      {{- if $hasImages -}}
        <section class="gallery-year" aria-labelledby="gallery-year-{{ $group.Key }}">
          <header class="gallery-year-marker">
            <p lang="en">Year</p>
            <h2 id="gallery-year-{{ $group.Key }}">{{ $group.Key }}</h2>
          </header>
          <div class="gallery-wall">
            {{- range $group.Pages -}}
              {{- $post := . -}}
              {{- with partial "blox-core/functions/get_featured_image.html" $post -}}
                {{- $thumb := .Resize "760x" -}}
                {{- $full := .Fit "1800x1800" -}}
                {{- if ne $thumb.MediaType.SubType "gif" -}}
                  {{- $thumb = $thumb.Process "webp" -}}
                  {{- $full = $full.Process "webp" -}}
                {{- end -}}
                {{- $alt := $post.Params.image.alt_text | default $post.Title -}}
                <a
                  class="gallery-card"
                  href="{{ $full.RelPermalink }}"
                  data-gallery-item
                  data-gallery-caption="{{ $post.Title }}"
                  data-gallery-date="{{ $post.Date | time.Format site.Params.locale.date_format }}"
                  data-gallery-source="{{ $post.RelPermalink }}"
                  aria-label="查看大图：{{ $alt }}"
                >
                  <img
                    src="{{ $thumb.RelPermalink }}"
                    width="{{ $thumb.Width }}"
                    height="{{ $thumb.Height }}"
                    alt="{{ $alt }}"
                    loading="lazy"
                    decoding="async"
                  >
                  <span class="gallery-card-overlay" aria-hidden="true"></span>
                  <span class="gallery-card-copy">
                    <time datetime="{{ $post.Date.Format "2006-01-02" }}">{{ $post.Date | time.Format site.Params.locale.date_format }}</time>
                    <strong>{{ $post.Title }}</strong>
                  </span>
                </a>
              {{- end -}}
            {{- end -}}
          </div>
        </section>
      {{- end -}}
    {{- end -}}
  </section>

  <dialog class="gallery-lightbox" data-gallery-dialog aria-label="照片大图预览">
    <div class="gallery-lightbox-shell">
      <button class="gallery-lightbox-close" type="button" data-gallery-close aria-label="关闭大图预览">×</button>
      <button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" data-gallery-prev aria-label="查看上一张照片">‹</button>
      <figure class="gallery-lightbox-figure">
        <div class="gallery-lightbox-stage">
          <img class="gallery-lightbox-image" data-gallery-dialog-image src="" alt="">
        </div>
        <figcaption>
          <div>
            <time data-gallery-dialog-date></time>
            <p data-gallery-dialog-caption></p>
          </div>
          <div class="gallery-lightbox-meta">
            <span data-gallery-dialog-count></span>
            <a href="#" data-gallery-dialog-source>查看相关动态 <span aria-hidden="true">→</span></a>
          </div>
        </figcaption>
      </figure>
      <button class="gallery-lightbox-nav gallery-lightbox-next" type="button" data-gallery-next aria-label="查看下一张照片">›</button>
    </div>
  </dialog>
</main>

{{- $galleryScript := resources.Get "js/gallery.js" | minify | fingerprint -}}
<script src="{{ $galleryScript.RelPermalink }}" integrity="{{ $galleryScript.Data.Integrity }}" defer></script>
{{- end -}}
```

This layout supplies semantic grouping, processed WebP thumbnails, direct-image fallbacks, and the complete dialog control set.

### Task 4: Add progressive lightbox behavior and responsive styling

**Files:**
- Create: `assets/js/gallery.js`
- Modify: `assets/scss/template.scss`

- [ ] **Step 1: Implement progressive enhancement**

The script must select all `[data-gallery-item]` links, preserve their direct-image fallback, open the native dialog when supported, update image/caption/source state, provide previous and next navigation, handle arrow keys, and close on backdrop clicks.

~~~js
(() => {
  const roots = document.querySelectorAll('[data-gallery-root]');

  roots.forEach((root) => {
    const dialog = root.querySelector('[data-gallery-dialog]');
    const items = Array.from(root.querySelectorAll('[data-gallery-item]'));

    if (!dialog || items.length === 0 || typeof dialog.showModal !== 'function') return;

    const image = dialog.querySelector('[data-gallery-dialog-image]');
    const date = dialog.querySelector('[data-gallery-dialog-date]');
    const caption = dialog.querySelector('[data-gallery-dialog-caption]');
    const count = dialog.querySelector('[data-gallery-dialog-count]');
    const source = dialog.querySelector('[data-gallery-dialog-source]');
    const previous = dialog.querySelector('[data-gallery-prev]');
    const next = dialog.querySelector('[data-gallery-next]');
    const close = dialog.querySelector('[data-gallery-close]');
    let activeIndex = 0;
    let lastTrigger = null;

    const render = (index) => {
      activeIndex = (index + items.length) % items.length;
      const item = items[activeIndex];
      const thumbnail = item.querySelector('img');
      image.src = item.href;
      image.alt = thumbnail ? thumbnail.alt : item.dataset.galleryCaption || '';
      date.textContent = item.dataset.galleryDate || '';
      caption.textContent = item.dataset.galleryCaption || image.alt;
      count.textContent = (activeIndex + 1) + ' / ' + items.length;

      if (item.dataset.gallerySource) {
        source.href = item.dataset.gallerySource;
        source.hidden = false;
      } else {
        source.removeAttribute('href');
        source.hidden = true;
      }
    };

    const open = (index, trigger) => {
      lastTrigger = trigger;
      render(index);
      if (!dialog.open) dialog.showModal();
    };

    items.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        open(index, item);
      });
    });

    previous.addEventListener('click', () => render(activeIndex - 1));
    next.addEventListener('click', () => render(activeIndex + 1));
    close.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        render(activeIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        render(activeIndex + 1);
      }
    });

    dialog.addEventListener('close', () => {
      image.removeAttribute('src');
      if (lastTrigger) lastTrigger.focus();
    });
  });
})();
~~~

- [ ] **Step 2: Add the visual system**

Add focused `.gallery-*` styles for the page hero, featured memory, year timeline, three/two/one-column masonry wall, photo overlays, keyboard focus, native dialog, and reduced-motion behavior. Reuse existing color values and the `8px` site radius.

~~~scss
.gallery-page {
  overflow: hidden;
  background: #f7fafc;
  color: #102033;
}

.gallery-hero {
  position: relative;
  padding: 5.25rem 1.5rem 7.5rem;
  border-bottom: 1px solid #dbe4ef;
  background:
    radial-gradient(circle at 82% 18%, rgba(31, 111, 188, 0.14), transparent 29rem),
    linear-gradient(145deg, #f7fafc 0%, #ffffff 48%, #eef6fb 100%);
}

.gallery-hero::after {
  position: absolute;
  right: -6rem;
  bottom: -9rem;
  width: 22rem;
  height: 22rem;
  border: 1px solid rgba(31, 111, 188, 0.14);
  border-radius: 50%;
  content: "";
}

.gallery-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

.gallery-eyebrow {
  margin-bottom: 0.9rem;
  color: #1f6fbc;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.gallery-hero h1 {
  max-width: 760px;
  margin-bottom: 1rem;
  font-size: clamp(2.35rem, 5vw, 4.5rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.gallery-intro {
  max-width: 680px;
  margin-bottom: 1.8rem;
  color: #5d6b7c;
  font-size: 1.05rem;
  line-height: 1.8;
}

.gallery-stats {
  display: flex;
  gap: 2rem;
  margin: 0;
}

.gallery-stats div {
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.45rem;
  align-items: baseline;
}

.gallery-stats dt {
  color: #0f766e;
  font-size: 1.65rem;
  font-weight: 800;
}

.gallery-stats dd {
  margin: 0;
  color: #5d6b7c;
  font-size: 0.88rem;
}

.gallery-featured-section,
.gallery-timeline {
  position: relative;
  z-index: 2;
  width: calc(100% - 3rem);
  max-width: 1180px;
  margin-right: auto;
  margin-left: auto;
}

.gallery-featured-section {
  margin-top: -4.75rem;
  margin-bottom: 5rem;
}

.gallery-featured-card {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 8px;
  background: #102033;
  color: #ffffff;
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.19);
}

.gallery-featured-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s ease;
}

.gallery-featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(4, 15, 28, 0.84) 100%);
}

.gallery-featured-copy {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  max-width: 760px;
  flex-direction: column;
  padding: 2rem;
}

.gallery-featured-copy time,
.gallery-card-copy time {
  margin-bottom: 0.4rem;
  color: #b9def8;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.gallery-featured-copy strong {
  margin-bottom: 0.45rem;
  font-size: clamp(1.45rem, 3vw, 2.35rem);
  line-height: 1.25;
}

.gallery-featured-copy > span {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.65;
}

.gallery-featured-card:hover,
.gallery-featured-card:focus {
  color: #ffffff;
  text-decoration: none;
}

.gallery-featured-card:hover img,
.gallery-featured-card:focus img,
.gallery-card:hover img,
.gallery-card:focus img {
  transform: scale(1.025);
}

.gallery-featured-card:focus-visible,
.gallery-card:focus-visible {
  outline: 4px solid rgba(31, 111, 188, 0.34);
  outline-offset: 5px;
}

.gallery-timeline {
  padding-bottom: 5rem;
}

.gallery-year {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: 2rem;
  margin-bottom: 4.5rem;
}

.gallery-year:last-child {
  margin-bottom: 0;
}

.gallery-year-marker {
  position: relative;
  padding-top: 0.2rem;
}

.gallery-year-marker::before {
  position: absolute;
  top: 0.45rem;
  right: -2.42rem;
  z-index: 1;
  width: 0.78rem;
  height: 0.78rem;
  border: 3px solid #f7fafc;
  border-radius: 50%;
  background: #1f6fbc;
  box-shadow: 0 0 0 1px rgba(31, 111, 188, 0.25);
  content: "";
}

.gallery-year-marker::after {
  position: absolute;
  top: 0.9rem;
  right: -2.05rem;
  bottom: -5rem;
  width: 1px;
  background: #cbd9e7;
  content: "";
}

.gallery-year:last-child .gallery-year-marker::after {
  display: none;
}

.gallery-year-marker p {
  margin: 0 0 0.15rem;
  color: #8aa1bb;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.gallery-year-marker h2 {
  margin: 0;
  color: #102033;
  font-size: 1.75rem;
  line-height: 1;
}

.gallery-wall {
  display: block;
  columns: 3 17rem;
  column-gap: 1.05rem;
}

.gallery-card {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 100%;
  margin: 0 0 1.05rem;
  break-inside: avoid;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 8px;
  background: #102033;
  color: #ffffff;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.1);
  vertical-align: top;
}

.gallery-card img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.45s ease;
}

.gallery-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 38%, rgba(4, 15, 28, 0.88) 100%);
  opacity: 0.88;
  transition: opacity 0.25s ease;
}

.gallery-card-copy {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.gallery-card-copy strong {
  display: -webkit-box;
  overflow: hidden;
  color: #ffffff;
  font-size: 0.96rem;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.gallery-card:hover,
.gallery-card:focus {
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 22px 42px rgba(15, 23, 42, 0.16);
}

.gallery-lightbox {
  width: calc(100vw - 2rem);
  max-width: 1120px;
  max-height: calc(100vh - 2rem);
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 8px;
  background: #07111d;
  color: #ffffff;
  box-shadow: 0 34px 90px rgba(0, 0, 0, 0.42);
}

.gallery-lightbox::backdrop {
  background: rgba(5, 15, 27, 0.84);
  backdrop-filter: blur(6px);
}

.gallery-lightbox-shell {
  position: relative;
}

.gallery-lightbox-figure {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  max-height: calc(100vh - 2rem);
  margin: 0;
}

.gallery-lightbox-stage {
  display: flex;
  min-height: 18rem;
  align-items: center;
  justify-content: center;
  background: #030910;
}

.gallery-lightbox-image {
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 10rem);
  object-fit: contain;
}

.gallery-lightbox figcaption {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.25rem;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #102033;
}

.gallery-lightbox figcaption time {
  color: #9ecbf0;
  font-size: 0.76rem;
  font-weight: 800;
}

.gallery-lightbox figcaption p {
  margin: 0.2rem 0 0;
  color: #ffffff;
  line-height: 1.5;
}

.gallery-lightbox-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  color: #b7c4d2;
  font-size: 0.85rem;
  white-space: nowrap;
}

.gallery-lightbox-meta a {
  color: #8fd8ce;
  font-weight: 700;
}

.gallery-lightbox-close,
.gallery-lightbox-nav {
  position: absolute;
  z-index: 3;
  display: inline-grid;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: rgba(3, 9, 16, 0.68);
  color: #ffffff;
  cursor: pointer;
}

.gallery-lightbox-close:hover,
.gallery-lightbox-close:focus,
.gallery-lightbox-nav:hover,
.gallery-lightbox-nav:focus {
  background: #1f6fbc;
}

.gallery-lightbox-close:focus-visible,
.gallery-lightbox-nav:focus-visible {
  outline: 3px solid rgba(143, 216, 206, 0.72);
  outline-offset: 3px;
}

.gallery-lightbox-close {
  top: 1rem;
  right: 1rem;
  font-size: 1.65rem;
  line-height: 1;
}

.gallery-lightbox-nav {
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
}

.gallery-lightbox-prev {
  left: 1rem;
}

.gallery-lightbox-next {
  right: 1rem;
}

@media (max-width: 991.98px) {
  .gallery-year {
    grid-template-columns: 6rem minmax(0, 1fr);
    gap: 1.5rem;
  }

  .gallery-year-marker::before {
    right: -1.92rem;
  }

  .gallery-year-marker::after {
    right: -1.55rem;
  }

  .gallery-wall {
    columns: 2 16rem;
  }
}

@media (max-width: 767.98px) {
  .gallery-hero {
    padding: 3.5rem 1rem 6rem;
  }

  .gallery-stats {
    gap: 1.25rem;
  }

  .gallery-featured-section,
  .gallery-timeline {
    width: calc(100% - 2rem);
    max-width: 1180px;
  }

  .gallery-featured-section {
    margin-top: -3.5rem;
    margin-bottom: 3.5rem;
  }

  .gallery-featured-card {
    aspect-ratio: 4 / 3;
  }

  .gallery-featured-copy {
    padding: 1.25rem;
  }

  .gallery-featured-copy > span {
    display: none;
  }

  .gallery-year {
    display: block;
    margin-bottom: 3.25rem;
  }

  .gallery-year-marker {
    display: flex;
    gap: 0.55rem;
    align-items: baseline;
    margin-bottom: 1rem;
    padding-left: 1rem;
    border-left: 3px solid #1f6fbc;
  }

  .gallery-year-marker::before,
  .gallery-year-marker::after {
    display: none;
  }

  .gallery-year-marker p {
    margin: 0;
  }

  .gallery-wall {
    columns: 1;
  }

  .gallery-lightbox {
    width: calc(100vw - 1rem);
    max-height: calc(100vh - 1rem);
  }

  .gallery-lightbox-figure {
    max-height: calc(100vh - 1rem);
  }

  .gallery-lightbox-image {
    max-height: calc(100vh - 11.5rem);
  }

  .gallery-lightbox figcaption {
    grid-template-columns: 1fr;
    gap: 0.65rem;
    padding: 0.9rem 1rem;
  }

  .gallery-lightbox-meta {
    justify-content: space-between;
  }

  .gallery-lightbox-nav {
    top: calc(50% - 2rem);
    width: 2.5rem;
    height: 2.5rem;
  }

  .gallery-lightbox-prev {
    left: 0.55rem;
  }

  .gallery-lightbox-next {
    right: 0.55rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-featured-card img,
  .gallery-card img,
  .gallery-card-overlay {
    transition: none;
  }

  .gallery-featured-card:hover img,
  .gallery-featured-card:focus img,
  .gallery-card:hover img,
  .gallery-card:focus img {
    transform: none;
  }
}
~~~

- [ ] **Step 3: Run the quality verifier**

Run: `node scripts/verify-site-quality.mjs`

Expected: `Site quality checks passed.`

- [ ] **Step 4: Commit the green implementation**

```bash
git add content/gallery/_index.md config/_default/menus.yaml layouts/gallery/list.html layouts/partials/site_footer.html assets/js/gallery.js assets/scss/template.scss
git commit -m "feat: add photo memory wall"
```

### Task 5: Verify the production render and responsive preview

**Files:**
- Test: generated files in an isolated temporary destination

- [ ] **Step 1: Run source checks and production build**

```bash
git diff --check
node scripts/verify-site-quality.mjs
gallery_public=$(mktemp -d /tmp/ustcagi-gallery-public.XXXXXX)
hugo --minify --baseURL https://ustcagi.github.io/ --destination "$gallery_public" --cleanDestinationDir
```

Expected: all commands exit 0 and Hugo reports no build errors.

- [ ] **Step 2: Inspect generated gallery contracts**

```bash
rg -Fq '照片纪念墙' "$gallery_public/gallery/index.html"
rg -Fq 'data-gallery-item' "$gallery_public/gallery/index.html"
rg -Fq '2026年9月教师节合影留念' "$gallery_public/gallery/index.html"
rg -Fq '2025' "$gallery_public/gallery/index.html"
rg -Fq '2024' "$gallery_public/gallery/index.html"
rg -Fq '2023' "$gallery_public/gallery/index.html"
```

Expected: every check exits 0.

- [ ] **Step 3: Preview desktop and mobile layouts**

Start Hugo locally, open `/gallery/`, and inspect a desktop viewport plus a narrow mobile viewport. Confirm the featured photo, year groups, natural image proportions, dialog controls, source links, and single-column mobile wall.

- [ ] **Step 4: Commit documentation updates**

```bash
git add docs/superpowers/specs/2026-09-11-photo-memory-wall-design.md docs/superpowers/plans/2026-09-11-photo-memory-wall.md
git commit -m "docs: plan photo memory wall"
```
