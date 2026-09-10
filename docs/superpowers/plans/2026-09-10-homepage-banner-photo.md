# Homepage Banner Photo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the supplied 2026 research-group photo the first homepage carousel slide while retaining the existing three slides, then publish it with the approved member updates.

**Architecture:** Keep the existing Hugo hero partial and carousel CSS unchanged. Add one optimized media asset, declare it first in the homepage slide list, and extend the repository quality verifier so the asset, order, alt text, and four-slide contract remain stable.

**Tech Stack:** Hugo Extended 0.125.7, Hugo Pipes image resources, YAML front matter, Node.js quality checks, `sips`, and `jpegtran`.

---

### Task 1: Add the failing homepage banner contract

**Files:**
- Modify: `scripts/verify-site-quality.mjs:96-100`
- Test: `scripts/verify-site-quality.mjs`

- [ ] **Step 1: Write the failing test**

Add exact assertions for the new file and first-slide order:

```js
const hero2026PhotoPath = 'assets/media/hero-group-2026.jpg';
assert(fs.existsSync(hero2026PhotoPath), 'homepage hero should include the supplied 2026 group photo');
assert(
  /slides:\s*\n\s*- filename:\s*hero-group-2026\.jpg\s*\n\s*alt:\s*中国科大 AGI 研究组 2026 年团队合影\s*\n\s*- filename:\s*welcome\.png/.test(home),
  'homepage hero should show the supplied 2026 group photo first and retain the existing slides',
);
assert((home.match(/^\s+- filename:\s*.+$/gm) || []).length === 4, 'homepage hero should define exactly four carousel slides');
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node scripts/verify-site-quality.mjs`

Expected: FAIL for the missing `assets/media/hero-group-2026.jpg`, missing first-slide declaration, and three rather than four slides.

### Task 2: Add the optimized image and homepage configuration

**Files:**
- Create: `assets/media/hero-group-2026.jpg`
- Modify: `content/_index.md:15-24`

- [ ] **Step 1: Prepare the image without changing its content**

Run:

```bash
banner_source=/var/folders/54/grmhjtvs6wj0tfgpnhl7xzg40000gn/T/codex-clipboard-2cc38409-d6cf-4167-80f9-f45cc46f5b0f.jpg
banner_tmp=$(mktemp -d /tmp/ustcagi-banner.XXXXXX)
sips --resampleWidth 2000 -s format jpeg -s formatOptions 84 "$banner_source" --out "$banner_tmp/prepared.jpg"
jpegtran -copy none -optimize -outfile assets/media/hero-group-2026.jpg "$banner_tmp/prepared.jpg"
```

Expected: a metadata-free JPEG near 2000×1124 pixels that preserves the supplied composition.

- [ ] **Step 2: Make the new photo the first slide**

Insert this entry before `welcome.png` under `content.image.slides`:

```yaml
- filename: hero-group-2026.jpg
  alt: 中国科大 AGI 研究组 2026 年团队合影
```

- [ ] **Step 3: Run the quality verifier**

Run: `node scripts/verify-site-quality.mjs`

Expected: `Site quality checks passed.`

### Task 3: Verify the production render

**Files:**
- Test: generated homepage in an isolated temporary destination

- [ ] **Step 1: Run formatting and production-build checks**

Run:

```bash
git diff --check
ustcagi_public=$(mktemp -d /tmp/ustcagi-public.XXXXXX)
hugo --minify --baseURL https://ustcagi.github.io/ --destination "$ustcagi_public" --cleanDestinationDir
```

Expected: Hugo exits 0 with no build error.

- [ ] **Step 2: Verify generated homepage output**

Run:

```bash
rg -Fq 'hero-group-2026' "$ustcagi_public/index.html"
rg -Fq '中国科大 AGI 研究组 2026 年团队合影' "$ustcagi_public/index.html"
rg -Fq 'Chenmin Wu' "$ustcagi_public/people/index.html"
rg -Fq 'Yu Long' "$ustcagi_public/people/index.html"
rg -Fq 'Yujia Hou' "$ustcagi_public/people/index.html"
```

Expected: every check exits 0.

### Task 4: Publish the intended update set

**Files:**
- Create: `assets/media/hero-group-2026.jpg`
- Modify: `content/_index.md`
- Create: `content/authors/Chenmin Wu/_index.md`
- Create: `content/authors/Chenmin Wu/avatar.jpg`
- Create: `content/authors/Yu Long/_index.md`
- Create: `content/authors/Yu Long/avatar.jpg`
- Create: `content/authors/Yujia Hou/_index.md`
- Create: `content/authors/Yujia Hou/avatar.jpg`
- Modify: `scripts/verify-site-quality.mjs`
- Create: `docs/superpowers/specs/2026-09-10-homepage-banner-photo-design.md`
- Create: `docs/superpowers/plans/2026-09-10-homepage-banner-photo.md`

- [ ] **Step 1: Selectively stage and inspect**

Stage only the exact paths listed above. Run `git diff --cached --check`, inspect `git diff --cached --stat`, and confirm `git status --short` contains no unintended path.

- [ ] **Step 2: Commit and push**

Run:

```bash
git commit -m "Add 2026 members and refresh homepage banner"
git push origin main
```

Expected: push updates `origin/main` without rejection.

- [ ] **Step 3: Verify remote parity**

Run the quality verifier and production build again, then compare:

```bash
git rev-parse HEAD
git rev-parse origin/main
git ls-remote origin refs/heads/main
git status --short --branch
```

Expected: all three SHAs match and the working tree is clean.
