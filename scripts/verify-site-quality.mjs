import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const failures = [];

const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(!fs.existsSync('.DS_Store'), 'repository root should not contain .DS_Store');
assert(!fs.existsSync('BUGS.md'), 'resolved scratch bug list should not remain as an untracked root artifact');
assert(/^\.DS_Store$/m.test(read('.gitignore')), '.gitignore should exclude .DS_Store');

const between = (text, startPattern, endPattern) => {
  const start = text.search(startPattern);
  if (start === -1) return '';
  const rest = text.slice(start);
  const end = rest.search(endPattern);
  return end === -1 ? rest : rest.slice(0, end);
};

const homepageSection = (id) => {
  const section = between(home, new RegExp(`^\\s+id:\\s*${id}\\s*$`, 'm'), /^\s+- block:/m);
  assert(section, `homepage section should be readable: ${id}`);
  return section;
};

const scss = read('assets/scss/template.scss');
const cardBlock = between(scss, /^\.card-simple\s*\{/m, /^\}/m);
const homepageCardGridBlock = between(scss, /^#research\s+\.card-simple,\s*$/m, /^\}/m);
assert(/\.page-header\.header--fixed\s*\{[\s\S]*top:\s*0[\s\S]*z-index:\s*1030/.test(scss), 'site header should stay pinned to the top across homepage and subpages');
assert(/\.page-header\.header--fixed\.headroom--unpinned\s*\{[\s\S]*transform:\s*translateY\(0\)\s*!important/.test(scss), 'subpage Headroom state should not shift the navbar away from the top');
assert(/#navbar-main\s*\{[\s\S]*height:\s*70px[\s\S]*min-height:\s*70px/.test(scss), 'desktop navbar height should match the homepage header height');
assert(/@media\s*\(max-width:\s*991\.98px\)\s*\{[\s\S]*#navbar-main\s*\{[\s\S]*height:\s*50px[\s\S]*min-height:\s*50px/.test(scss), 'mobile navbar height should match the homepage header height');
assert(!/height:\s*100%\s*;/.test(cardBlock), 'card-simple must not force global height: 100%');
assert(/border-radius:\s*8px\s*;/.test(cardBlock), 'card-simple should use an 8px radius');
assert(/-webkit-line-clamp:\s*4\s*;/.test(scss), 'card summaries should be clamped to four lines');
assert(/\.summary-link:empty\s*\{[\s\S]*display:\s*none/.test(scss), 'empty summary links should be hidden from rendered lists');

const params = read('config/_default/params.yaml');
assert(!/highly-customizable Hugo research group theme/i.test(params), 'SEO description must not use template copy');
assert(!/GetResearchDev/.test(params), 'Twitter metadata must not use template account');
assert(!/<username>\/<repository>/.test(params), 'repository URL must not use template placeholder');
assert(/org_name:\s*['"]中国科大 AGI 研究组['"]/.test(params), 'org_name should identify the research group in Chinese');
assert(/date_format:\s*['"]2006年1月2日['"]/.test(params), 'site date format should use Chinese year-month-day order');
assert(/address_format:\s*zh-cn/.test(params), 'address format should match the Chinese default language');
assert(/font_size:\s*M/.test(params), 'font size should be set to M for denser research pages');

const footerPartialPath = 'layouts/partials/site_footer.html';
assert(fs.existsSync(footerPartialPath), 'site should use a local custom footer partial');
if (fs.existsSync(footerPartialPath)) {
  const footerPartial = read(footerPartialPath);
  assert(/footer-brand/.test(footerPartial), 'custom footer should render a clear research-group brand block');
  assert(/footer-meta/.test(footerPartial), 'custom footer should render address and affiliation metadata');
  assert(/footer-links/.test(footerPartial), 'custom footer should render useful navigation links');
  assert(!/published_with|Hugo Blox Builder|hugoblox/i.test(footerPartial), 'custom footer should not render the default Hugo Blox powered-by copy');
}
assert(/\.page-footer\s*\{[\s\S]*background:\s*#f7fafc/.test(scss), 'footer should sit on a compact light band');
assert(/\.site-footer\s*\{[\s\S]*display:\s*grid[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto/.test(scss), 'footer should use a desktop two-column layout');
assert(/\.site-footer\s*\{[\s\S]*padding:\s*1\.35rem\s+0/.test(scss), 'footer should reduce the oversized vertical spacing');
assert(/\.footer-links\s*\{[\s\S]*display:\s*flex/.test(scss), 'footer links should render as a compact horizontal group');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.site-footer\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'footer should collapse to one column on mobile');

const hugo = read('config/_default/hugo.yaml');
assert(/defaultContentLanguage:\s*zh/.test(hugo), 'default content language should be Chinese');
assert(/hasCJKLanguage:\s*true/.test(hugo), 'CJK language support should be enabled');
assert(/title:\s*USTC-AGI Research Group/.test(hugo), 'site title should use the requested English navbar brand');

const languages = read('config/_default/languages.yaml');
assert(/^zh:/m.test(languages), 'languages.yaml should define zh as the default language');
assert(/languageCode:\s*zh-Hans/.test(languages), 'languageCode should be zh-Hans');
assert(/title:\s*USTC-AGI Research Group/.test(languages), 'default language title should use the requested English navbar brand');

const home = read('content/_index.md');
const researchHomeSection = homepageSection('research');
const newsHomeSection = homepageSection('news-highlights');
const researchFocusModules = [
  '多模态表征学习',
  '情境表示与推理',
  '慢思考认知推理',
  '自主交互智能体',
];
assert(/title:\s*中国科大 AGI 研究组/.test(home), 'homepage should use a Chinese title');
assert(/alt:\s*中国科大 AGI 研究组首页图/.test(home), 'hero image should include Chinese alt text');
assert(/cta:\s*\n\s*label:\s*查看研究方向/.test(home), 'homepage hero should provide a primary research CTA');
assert(/cta_alt:\s*\n\s*label:\s*代表论文/.test(home), 'homepage hero should provide a secondary publications CTA');
assert(/cta_note:\s*\n\s*label:\s*多模态表征学习 · 情境表示与推理 · 慢思考认知推理 · 自主交互智能体/.test(home), 'homepage hero should use the requested research focus tagline');
assert(/id:\s*home-focus/.test(home), 'homepage should include a compact research focus section after the hero');
assert((home.match(/class="home-focus-item"/g) || []).length === 4, 'homepage research focus should render four modules');
for (const moduleTitle of researchFocusModules) {
  assert(home.includes(moduleTitle), `homepage research focus should include ${moduleTitle}`);
}
assert(/title:\s*代表论文/.test(home), 'homepage should surface recent publications with a Chinese title');
assert(!/title:\s*Latest News/.test(home), 'stale news section should not be labelled Latest News');
assert(!/title:\s*(Research|Selected Publications|News Highlights|Related Links)\b/.test(home), 'homepage section titles should be Chinese');
for (const id of ['hero', 'research', 'selected-publications', 'news-highlights', 'related-links']) {
  assert(new RegExp(`id:\\s*${id}`).test(home), `homepage section should define stable id: ${id}`);
}
assert(!/id:\s*projects/.test(home), 'homepage should not render the Projects section');
assert(/view:\s*card/.test(researchHomeSection) && /columns:\s*["']1["']/.test(researchHomeSection), 'homepage research section should keep the heading and cards in a full-width layout');
assert(/view:\s*card/.test(newsHomeSection) && /columns:\s*["']1["']/.test(newsHomeSection), 'homepage news section should keep the heading and cards in a full-width layout');

assert(/#hero\s*\{/.test(scss), 'homepage hero should have dedicated CSS');
assert(/\.home-focus-grid\s*\{/.test(scss), 'homepage research focus grid should have dedicated CSS');
assert(/\.home-focus-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'homepage research focus modules should use a readable two-column desktop grid');
assert(/#research\s+\.row\s*>\s*\.col-12:not\(\.section-heading\)\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'homepage research cards should be explicitly arranged in a full-width three-column CSS grid');
assert(/#research\s+\.article-metadata\s*\{[\s\S]*display:\s*none/.test(scss), 'homepage research cards should hide publication-style dates');
assert(/#research\s+\.card-simple\s+\.article-banner\s*\{[\s\S]*display:\s*none/.test(scss), 'homepage research cards should not render image banners');
assert(/#research\s+\.card-simple\s*\{[\s\S]*border-top:\s*4px\s+solid\s+#1f6fbc[\s\S]*padding:\s*1\.25rem/.test(scss), 'homepage research cards should mirror the research focus card shell');
assert(/#research\s+\.card-simple:nth-child\(4n\s*\+\s*2\)\s*\{[\s\S]*border-top-color:\s*#0f766e/.test(scss), 'homepage research cards should reuse the focus-card accent colors');
assert(/margin-top:\s*0/.test(homepageCardGridBlock), 'homepage card grids should remove theme card top margins');
assert(/#news-highlights\s+\.row\s*>\s*\.col-12:not\(\.section-heading\)\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'homepage news cards should be explicitly arranged in a three-column CSS grid');
assert(/#news-highlights\s+\.card-simple\s*\{/.test(scss), 'homepage news cards should have scoped CSS');

const peoplePage = read('content/people/index.md');
assert(/id:\s*people-overview/.test(peoplePage), 'people page should include a concise overview section before the member grid');
assert(/class="people-overview-panel"/.test(peoplePage), 'people overview should render as a designed intro panel');
assert(/title:\s*成员列表/.test(peoplePage), 'people widget should use a distinct member-list heading after the overview');
assert(/#people-overview\s*\{/.test(scss), 'people overview should have scoped section CSS');
assert(/\.people-overview-panel\s*\{[\s\S]*border-radius:\s*8px/.test(scss), 'people overview panel should match the site card radius');
assert(/\.people-overview-tags\s*\{[\s\S]*display:\s*grid[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people overview tags should use a balanced three-column desktop grid');
assert(/#section-people\s+\.people-widget\s*\{[\s\S]*display:\s*grid[\s\S]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people page should use a dense five-column member grid on desktop');
assert(/#section-people\s+\.people-widget\s*>\s*\.col-md-12\s+h2\s*\{[\s\S]*border-bottom:\s*1px\s+solid\s+#dbe4ef/.test(scss), 'people group headings should visually separate member groups');
assert(/#section-people\s+\.people-widget\s*>\s*\.col-md-12\s*\+\s*\.people-person\s*\{[\s\S]*margin-top:\s*0\.55rem/.test(scss), 'people group headings should leave visible breathing room before the first member row');
assert(/#section-people\s+\.people-person\s*\{[\s\S]*position:\s*relative[\s\S]*border-top:\s*3px\s+solid\s+#1f6fbc[\s\S]*border-radius:\s*8px[\s\S]*text-align:\s*center/.test(scss), 'people entries should render as polished compact member cards');
assert(/#section-people\s+\.people-person\s+\.avatar\s*\{[\s\S]*width:\s*112px[\s\S]*height:\s*112px/.test(scss), 'people avatars should be compact and consistently sized');
assert(/#section-people\s+\.portrait-title\s+h3\s*\{[\s\S]*min-height:\s*2\.45rem/.test(scss), 'people role text should reserve enough height to keep card bodies aligned');
assert(/#section-people\s+\.network-icon\s*\{[\s\S]*display:\s*flex/.test(scss), 'people social links should align as a compact icon row');
assert(/#section-people\s+\.people-interests\s*\{[\s\S]*-webkit-line-clamp:\s*2/.test(scss), 'people interests should be clamped to keep cards balanced');
assert(/@media\s*\(max-width:\s*991\.98px\)\s*\{[\s\S]*#section-people\s+\.people-widget\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people grid should reduce to three columns on tablets');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.people-overview-tags\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'people overview tags should stack cleanly on mobile');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*#section-people\s+\.portrait-title\s+h3\s*\{[\s\S]*min-height:\s*0/.test(scss), 'people role text should release fixed height on mobile');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*#section-people\s+\.people-widget\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people grid should reduce to two columns on mobile');
assert(/@media\s*\(max-width:\s*479\.98px\)\s*\{[\s\S]*#section-people\s+\.people-widget\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'people grid should use one column on narrow mobile');

const menus = read('config/_default/menus.yaml');
for (const label of ['动态发布', '师生成员', '研究方向', '论文列表', '系统', '代码仓库']) {
  assert(new RegExp(`name:\\s*${label}`).test(menus), `main menu should use Chinese label: ${label}`);
}
assert(!/name:\s*(News|People|Research|Publications|Projects|Repository)\b/.test(menus), 'main menu labels should not remain English');

for (const [path, title] of [
  ['content/post/_index.md', '新闻'],
  ['content/people/index.md', '成员'],
  ['content/research/_index.md', '研究方向'],
  ['content/publication/_index.md', '论文'],
  ['content/project/_index.md', '项目'],
]) {
  assert(new RegExp(`title:\\s*${title}`).test(read(path)), `${path} should use the Chinese section title ${title}`);
}

const postIndex = read('content/post/_index.md');
assert(/summary:\s*['"].+['"]/.test(postIndex), 'post index should define a concise page summary');
assert(/view:\s*card/.test(postIndex), 'post index should use the card view as a fallback instead of compact stream items');

const postListPath = 'layouts/post/list.html';
assert(fs.existsSync(postListPath), 'post section should use a dedicated list layout');
if (fs.existsSync(postListPath)) {
  const postList = read(postListPath);
  assert(/post-index-hero/.test(postList), 'post layout should render a page hero');
  assert(/post-featured-card/.test(postList), 'post layout should emphasize the latest news item');
  assert(/post-card-grid/.test(postList), 'post layout should render remaining news in a grid');
  assert(/post-card-meta/.test(postList), 'post layout should render compact date metadata');
  assert(/partial\s+"blox-core\/functions\/get_featured_image\.html"/.test(postList), 'post layout should reuse featured images through the HugoBlox image helper');
}

assert(/\.post-index\s*\{/.test(scss), 'post index should have a scoped layout shell');
assert(/\.post-card-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'post cards should use a three-column desktop grid');
assert(/\.post-featured-card\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1\.05fr\)\s+minmax\(280px,\s*0\.95fr\)/.test(scss), 'latest post should use a balanced desktop feature layout');
assert(/\.post-card\s*\{[\s\S]*border-radius:\s*8px/.test(scss), 'post cards should use the site card radius');
assert(/\.post-card-summary\s*\{[\s\S]*-webkit-line-clamp:\s*3/.test(scss), 'post card summaries should be clamped to keep the grid balanced');
assert(/@media\s*\(max-width:\s*991\.98px\)\s*\{[\s\S]*\.post-card-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'post cards should reduce to two columns on tablets');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.post-featured-card\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'featured post should stack on mobile');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.post-featured-media\s*\{[\s\S]*order:\s*-1/.test(scss), 'featured post image should move above the copy on mobile');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.post-card-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'post cards should use one column on mobile');

const researchIndex = read('content/research/_index.md');
assert(/summary:\s*['"].+['"]/.test(researchIndex), 'research index should define a concise page summary');
assert(/highlights:\s*\n(?:\s+-\s+.+\n){4,}/.test(researchIndex), 'research index should define four overview highlights');
assert(/pillars:\s*\n(?:\s+-\s+title:\s*['"]?.+['"]?\n\s+text:\s*['"]?.+['"]?\n){4,}/.test(researchIndex), 'research index should define four research focus modules');
for (const moduleTitle of researchFocusModules) {
  assert(researchIndex.includes(moduleTitle), `research index should include ${moduleTitle}`);
}
assert(/applications:\s*\n(?:\s+-\s+.+\n){4,}/.test(researchIndex), 'research index should define representative application scenarios');

const researchListPath = 'layouts/research/list.html';
assert(fs.existsSync(researchListPath), 'research section should use a dedicated list layout');
if (fs.existsSync(researchListPath)) {
  const researchList = read(researchListPath);
  assert(/research-index-hero/.test(researchList), 'research layout should render a page hero');
  assert(/research-pillar-grid/.test(researchList), 'research layout should render research pillars before direction cards');
  assert(/research-application-strip/.test(researchList), 'research layout should render representative application scenarios');
  assert(/research-direction-grid/.test(researchList), 'research layout should render directions in a grid');
  assert(/research-direction-card/.test(researchList), 'research layout should render dedicated direction cards');
  assert(/Params\.topics/.test(researchList), 'research layout should render per-direction topics');
  assert(/partial\s+"blox-core\/functions\/get_featured_image\.html"/.test(researchList), 'research layout should reuse each direction featured image');
}

for (const path of fs.readdirSync('content/research', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `content/research/${entry.name}/index.md`)
  .filter((path) => fs.existsSync(path))) {
  const text = read(path);
  assert(/subtitle:\s*['"].+['"]/.test(text), `${path} should define a subtitle for the research card`);
  assert(/summary:\s*['"].+['"]/.test(text), `${path} should define a summary for the research card`);
  assert(/topics:\s*\n(?:\s+-\s+.+\n){2,}/.test(text), `${path} should define at least two research card topics`);
}

const contextResearch = read('content/research/context/index.md');
assert(/title:\s*情境认知的时间序列分析/.test(contextResearch), 'context research direction should use the requested Chinese title');
assert(!/情境认知的预测理论与方法/.test(contextResearch), 'context research direction should not keep the previous title wording');
for (const topic of ['情境特征融合', '情境认知推理', '情境自主交互']) {
  assert(contextResearch.includes(topic), `context research direction should include topic: ${topic}`);
}

assert(/\.research-index-hero\s*\{/.test(scss), 'research index hero should have dedicated CSS');
assert(/\.research-pillar-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'research focus modules should use a readable two-column desktop grid');
assert(/\.research-application-strip\s*\{[\s\S]*display:\s*flex/.test(scss), 'research application scenarios should render as a compact strip');
assert(/\.research-direction-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'research direction grid should use a six-track desktop layout');
assert(/\.research-direction-card\s*\{[\s\S]*border-radius:\s*8px/.test(scss), 'research direction cards should use the site card radius');
assert(/\.research-direction-card:nth-child\(-n\s*\+\s*2\)\s*\{[\s\S]*grid-column:\s*span\s+3/.test(scss), 'first two research cards should have stronger desktop emphasis');
assert(/@media\s*\(max-width:\s*991\.98px\)\s*\{[\s\S]*\.research-pillar-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'research pillars should stack on tablets');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.research-direction-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'research direction grid should collapse to one column on mobile');

for (const path of [
  'content/authors/Mingfan Pan/_index.md',
  'content/authors/Linjie Wu/_index.md',
]) {
  assert(/user_groups:\s*\[\]/.test(read(path)), `${path} should be hidden from the People page`);
}

const heroPartialPath = 'layouts/partials/blocks/hero.html';
assert(fs.existsSync(heroPartialPath), 'local hero partial should render configured image alt text');
if (fs.existsSync(heroPartialPath)) {
  const heroPartial = read(heroPartialPath);
  assert(/content\.image\.alt/.test(heroPartial), 'hero partial should read content.image.alt');
}

for (const path of ['content/project/writelearn/index.md']) {
  const text = read(path);
  const body = text.split('---').slice(2).join('---');
  assert(!/^\s*https?:\/\/\S+\s*$/m.test(body), `${path} should not render a naked project URL`);
  assert(/\[访问系统\]\(https:\/\/[^)]+\)/.test(body), `${path} should expose a reachable HTTPS project URL as a labelled action`);
}

for (const path of [
  'content/project/chuandao/index.md',
  'content/project/bingjian/index.md',
  'content/project/thesis/index.md',
]) {
  const text = read(path);
  assert(!/\[访问系统\]\(https?:\/\/[^)]+\)/.test(text), `${path} should not link directly to a currently unavailable system`);
  assert(/系统维护中/.test(text), `${path} should show a maintenance note instead of a broken system link`);
}

for (const authorPath of fs.readdirSync('content/authors', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `content/authors/${entry.name}/_index.md`)
  .filter((path) => fs.existsSync(path))) {
  const text = read(authorPath);
  assert(!/mailto:@/.test(text), `${authorPath} should not expose placeholder mailto links`);
  assert(!/email:\s*['"]@/.test(text), `${authorPath} should not expose placeholder email metadata`);
  assert(!/mail\.ustc\.edu\.cns/.test(text), `${authorPath} should not use misspelled mail.ustc.edu.cns domain`);
  assert(!/mail\.ustc\.edu\.com/.test(text), `${authorPath} should not use misspelled mail.ustc.edu.com domain`);
}

for (const path of [
  'content/publication/liu2026fewer/index.md',
  'content/publication/mao2026visual/index.md',
]) {
  assert(/date:\s*['"]2026-04-23['"]/.test(read(path)), `${path} should use the ICLR 2026 conference start date`);
}

for (const sectionPath of ['content/post', 'content/project', 'content/research']) {
  for (const entry of fs.readdirSync(sectionPath, { withFileTypes: true }).filter((item) => item.isDirectory())) {
    const pageDir = `${sectionPath}/${entry.name}`;
    const pagePath = `${pageDir}/index.md`;
    if (!fs.existsSync(pagePath)) continue;

    const hasFeaturedImage = fs.readdirSync(pageDir).some((name) => /^featured\.(png|jpe?g|webp|gif)$/i.test(name));
    if (!hasFeaturedImage) continue;

    const frontMatter = read(pagePath).split('---')[1] || '';
    assert(
      /^image:\s*\n(?:[ \t]+.*\n)*?[ \t]+alt_text:\s*["']?.+/m.test(frontMatter),
      `${pagePath} should define image.alt_text for its featured image`,
    );
  }
}

if (failures.length) {
  console.error('Site quality checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Site quality checks passed.');
