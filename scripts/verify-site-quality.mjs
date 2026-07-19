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
const peoplePersonBlock = between(scss, /^#section-people\s+\.people-person\s*\{/m, /^\}/m);
const peopleInterestsBlock = between(scss, /^#section-people\s+\.people-interests\s*\{/m, /^\}/m);
assert(/:root\s*\{[\s\S]*--site-navbar-height:\s*70px[\s\S]*--site-navbar-height-mobile:\s*50px/.test(scss), 'navbar should define one shared desktop and mobile height');
assert(/body\s*\{[\s\S]*padding-top:\s*var\(--site-navbar-height\)/.test(scss), 'all pages should reserve the same desktop space below the fixed navbar');
assert(/\.page-header\.header--fixed\s*\{[\s\S]*position:\s*fixed[\s\S]*top:\s*0[\s\S]*right:\s*0[\s\S]*left:\s*0[\s\S]*z-index:\s*1030[\s\S]*border-bottom:\s*1px\s+solid\s+#dbe4ef[\s\S]*background:\s*#ffffff[\s\S]*box-shadow:\s*0\s+10px\s+28px\s+rgba\(15,\s*23,\s*42,\s*0\.08\)/.test(scss), 'site header should have one fixed white treatment across homepage and subpages');
assert(/\.page-header\.header--fixed\.headroom--unpinned\s*\{[\s\S]*transform:\s*translateY\(0\)\s*!important/.test(scss), 'subpage Headroom state should not shift the navbar away from the top');
assert(/#navbar-main\s*\{[\s\S]*height:\s*var\(--site-navbar-height\)[\s\S]*min-height:\s*var\(--site-navbar-height\)[\s\S]*background:\s*#ffffff\s*!important/.test(scss), 'desktop navbar height and background should use the shared navbar tokens');
assert(/#navbar-main\s+\.navbar-brand,\s*[\s\S]*#navbar-main\s+\.navbar-nav\s+\.nav-link\s*\{[\s\S]*display:\s*inline-flex[\s\S]*min-height:\s*var\(--site-navbar-height\)[\s\S]*align-items:\s*center/.test(scss), 'navbar brand and links should align consistently within the shared height');
assert(/@media\s*\(max-width:\s*991\.98px\)\s*\{[\s\S]*body\s*\{[\s\S]*padding-top:\s*var\(--site-navbar-height-mobile\)[\s\S]*#navbar-main\s*\{[\s\S]*height:\s*var\(--site-navbar-height-mobile\)[\s\S]*min-height:\s*var\(--site-navbar-height-mobile\)/.test(scss), 'mobile navbar should use the shared mobile height and matching body offset');
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
assert(/我们关注人工智能基础理论与关键方法，包括多模态表征学习、情境表示与推理、慢思考认知推理、智能体学习与可信评测/.test(home), 'homepage hero should describe the updated core research methods');
assert(!/我们关注能够主动理解情境、推理规划并调用工具完成复杂任务的智能系统/.test(home), 'homepage hero should not keep the previous shorter research framing');
assert(/alt:\s*中国科大 AGI 研究组首页图/.test(home), 'hero image should include Chinese alt text');
assert(/image:\s*\n\s*filename:\s*welcome\.png[\s\S]*slides:\s*\n(?:\s+-\s*filename:\s*.+\n\s+alt:\s*.+\n){3,}/.test(home), 'homepage hero image should define at least three configured carousel slides');
assert(/cta:\s*\n\s*label:\s*查看研究方向/.test(home), 'homepage hero should provide a primary research CTA');
assert(/cta_alt:\s*\n\s*label:\s*代表论文/.test(home), 'homepage hero should provide a secondary publications CTA');
assert(/cta_note:\s*\n\s*label:\s*多模态表征学习 · 情境表示与推理 · 慢思考认知推理 · 自主交互智能体/.test(home), 'homepage hero should use the requested research focus tagline');
assert(/id:\s*home-focus/.test(home), 'homepage should include a compact research focus section after the hero');
assert((home.match(/class="home-focus-item"/g) || []).length === 4, 'homepage research focus should render four modules');
for (const moduleTitle of researchFocusModules) {
  assert(home.includes(moduleTitle), `homepage research focus should include ${moduleTitle}`);
}
assert(!/大数据分析与应用安徽省重点实验室|bigdata\.ustc\.edu\.cn/.test(home), 'homepage related links should not include the removed big-data lab link');
assert((home.match(/class="home-link-strip"/g) || []).length === 1, 'homepage should keep one related-links strip');
assert(/\.home-link-strip\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'homepage related links should use a two-column grid after removing the third link');
assert(/title:\s*代表论文/.test(home), 'homepage should surface recent publications with a Chinese title');
assert(!/title:\s*Latest News/.test(home), 'stale news section should not be labelled Latest News');
assert(!/title:\s*(Research|Selected Publications|News Highlights|Related Links)\b/.test(home), 'homepage section titles should be Chinese');
assert(/id:\s*research[\s\S]*title:\s*领域应用研究/.test(home), 'homepage research collection should be labelled 领域应用研究');
assert(/id:\s*research[\s\S]*sort_by:\s*Weight[\s\S]*order:\s*asc/.test(home), 'homepage research collection should use explicit weight ordering');
for (const id of ['hero', 'research', 'selected-publications', 'news-highlights', 'related-links']) {
  assert(new RegExp(`id:\\s*${id}`).test(home), `homepage section should define stable id: ${id}`);
}
assert(!/id:\s*projects/.test(home), 'homepage should not render the Projects section');
assert(/view:\s*card/.test(researchHomeSection) && /columns:\s*["']1["']/.test(researchHomeSection), 'homepage research section should keep the heading and cards in a full-width layout');
assert(/view:\s*card/.test(newsHomeSection) && /columns:\s*["']1["']/.test(newsHomeSection), 'homepage news section should keep the heading and cards in a full-width layout');

assert(/#hero\s*\{/.test(scss), 'homepage hero should have dedicated CSS');
assert(/#hero\s+\.hero-carousel\s*\{[\s\S]*aspect-ratio:\s*16\s*\/\s*9[\s\S]*overflow:\s*hidden/.test(scss), 'homepage hero carousel should reserve a stable 16:9 image frame');
assert(/#hero\s+\.hero-carousel-slide\s*\{[\s\S]*opacity:\s*0[\s\S]*transition:\s*opacity\s+0\.45s\s+ease/.test(scss), 'homepage hero carousel slides should cross-fade');
assert(/#hero\s+\.hero-carousel-slide\.is-active\s*\{[\s\S]*opacity:\s*1/.test(scss), 'homepage hero carousel should expose an active slide state');
assert(/#hero\s+\.hero-carousel-dots\s*\{[\s\S]*display:\s*flex/.test(scss), 'homepage hero carousel should render compact dot controls');
assert(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*#hero\s+\.hero-carousel-slide\s*\{[\s\S]*transition:\s*none/.test(scss), 'homepage hero carousel should respect reduced motion preferences');
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
const authorIndex = (path) => {
  const match = read(path).match(/^index:\s*["']?([^"'\n]+)["']?/m);
  assert(match, `${path} should define an index for People page sorting`);
  return match?.[1] || '';
};
const authorHasGroup = (path, group) => new RegExp(`^user_groups:\\s*\\n\\s+-\\s*${group}\\s*$`, 'm').test(read(path));
const authorGroupPaths = (group) => fs.readdirSync('content/authors', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `content/authors/${entry.name}/_index.md`)
  .filter((path) => fs.existsSync(path) && authorHasGroup(path, group));
const currentStudentGroups = ['在读博士生', '在读硕士生', '本科生同学'];
const currentStudentAuthorPaths = currentStudentGroups.flatMap((group) => authorGroupPaths(group));
const admissionYearOverrides = new Map([
  ['content/authors/Qingyang Mao/_index.md', '2023'],
  ['content/authors/Zhiding Liu/_index.md', '2023'],
  ['content/authors/Jintao Zhang/_index.md', '2026'],
  ['content/authors/Jiawei Cao/_index.md', '2026'],
  ['content/authors/Daoyu Wang/_index.md', '2025'],
  ['content/authors/Shuo Yu/_index.md', '2025'],
  ['content/authors/Huajian Zhang/_index.md', '2025'],
  ['content/authors/Yaguo Liu/_index.md', '2025'],
  ['content/authors/Yiju Zhang/_index.md', '2025'],
  ['content/authors/Mingxuan Zhao/_index.md', '2025'],
  ['content/authors/Zirui Liu/_index.md', '2025'],
]);
assert(!/id:\s*people-overview/.test(peoplePage), 'people page should not render the removed overview module');
assert(!/people-overview/.test(scss), 'removed people overview styles should not remain in template CSS');
assert(/id:\s*people-hero/.test(peoplePage), 'people page should render a top banner before the member grid');
assert(/class="people-banner"/.test(peoplePage), 'people page banner should use the scoped people-banner shell');
for (const label of ['研究团队', '导师团队', '在读博士生', '在读硕士生', '本科生同学', '历届同学']) {
  assert(peoplePage.includes(label), `people page banner should include label: ${label}`);
}
assert(/title:\s*成员列表/.test(peoplePage), 'people widget should keep the member-list heading');
assert(/user_groups:\s*\n\s+-\s*Supervisors\s*\n\s+-\s*在读博士生\s*\n\s+-\s*在读硕士生\s*\n\s+-\s*本科生同学\s*\n\s+-\s*历届同学/.test(peoplePage), 'people page should split current students into doctoral and master groups');
assert(/#section-people\s+\.people-widget\s*\{[\s\S]*display:\s*grid[\s\S]*grid-template-columns:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people page should use a dense five-column member grid on desktop');
assert(/#people-hero\s*\{[\s\S]*background:\s*#f7fafc/.test(scss), 'people banner should sit on the same light page background');
assert(/\.people-banner\s*\{[\s\S]*display:\s*grid[\s\S]*border-left:\s*5px\s+solid\s+#1f6fbc[\s\S]*border-radius:\s*8px/.test(scss), 'people banner should render as a compact framed header');
assert(/\.people-banner-groups\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people banner group labels should use a compact two-column desktop grid');
assert(/#section-people\s+\.people-widget\s*>\s*\.col-md-12\s+h2\s*\{[\s\S]*border-bottom:\s*1px\s+solid\s+#dbe4ef/.test(scss), 'people group headings should visually separate member groups');
assert(!/#section-people\s+\.people-widget\s*>\s*\.col-md-12\s*\+\s*\.people-person\s*\{[\s\S]*margin-top:/.test(scss), 'people group headings should not push only the first member card down');
assert(/#section-people\s+\.section-heading\s*\+\s*\.col-md-12\s*\+\s*\.people-person\s*\{[\s\S]*grid-column:\s*2/.test(scss), 'supervisor cards should start from the second desktop grid column so the row is centered');
assert(/@media\s*\(max-width:\s*1199\.98px\)\s*\{[\s\S]*#section-people\s+\.section-heading\s*\+\s*\.col-md-12\s*\+\s*\.people-person\s*\{[\s\S]*grid-column:\s*auto/.test(scss), 'supervisor centering should reset below the five-column desktop layout');
assert(/#section-people\s+\.people-person\s*\{[\s\S]*position:\s*relative[\s\S]*border-top:\s*3px\s+solid\s+#1f6fbc[\s\S]*border-radius:\s*8px[\s\S]*text-align:\s*center/.test(scss), 'people entries should render as polished compact member cards');
assert(!/overflow:\s*hidden/.test(peoplePersonBlock), 'people cards should not clip long member metadata');
assert(/#section-people\s+\.people-person\s+\.avatar\s*\{[\s\S]*width:\s*120px[\s\S]*height:\s*150px[\s\S]*border-radius:\s*8px/.test(scss), 'people avatars should render as compact rectangular portraits');
assert(/#section-people\s+\.portrait-title\s+h3\s*\{[\s\S]*min-height:\s*2\.45rem/.test(scss), 'people role text should reserve enough height to keep card bodies aligned');
assert(/#section-people\s+\.network-icon\s*\{[\s\S]*display:\s*flex/.test(scss), 'people social links should align as a compact icon row');
assert(!/-webkit-line-clamp/.test(peopleInterestsBlock), 'people interests should not be line-clamped because research directions must be fully visible');
assert(/#section-people\s+\.people-interests\s*\{[\s\S]*overflow:\s*visible/.test(scss), 'people interests should allow all research directions to display');
for (const path of currentStudentAuthorPaths) {
  const expectedAdmissionYear = admissionYearOverrides.get(path) || '2024';
  assert(
    new RegExp(`^admission_year:\\s*${expectedAdmissionYear}\\s*$`, 'm').test(read(path)),
    `${path} should define admission year ${expectedAdmissionYear}`,
  );
}
const peopleBlockPath = 'layouts/partials/blocks/people.html';
assert(fs.existsSync(peopleBlockPath), 'site should override the people block to render student admission years');
if (fs.existsSync(peopleBlockPath)) {
  const peopleBlock = read(peopleBlockPath);
  assert(/Params\.admission_year/.test(peopleBlock), 'people block should read admission_year from author front matter');
  assert(/入学时间/.test(peopleBlock), 'people block should label the admission year in Chinese');
  assert(/Params\.graduation_destination/.test(peopleBlock), 'people block should read graduation_destination from historical author front matter');
  assert(/毕业去向/.test(peopleBlock), 'people block should label historical member graduation destinations in Chinese');
}
assert(/\.people-admission-year\s*\{[\s\S]*font-size:\s*0\.82rem/.test(scss), 'people admission year should have compact card styling');
assert(/\.people-graduation-destination\s*\{[\s\S]*font-size:\s*0\.8rem/.test(scss), 'people graduation destination should have compact card styling');
assert(/@media\s*\(max-width:\s*991\.98px\)\s*\{[\s\S]*#section-people\s+\.people-widget\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people grid should reduce to three columns on tablets');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*#section-people\s+\.portrait-title\s+h3\s*\{[\s\S]*min-height:\s*0/.test(scss), 'people role text should release fixed height on mobile');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*#section-people\s+\.people-widget\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'people grid should reduce to two columns on mobile');
assert(/@media\s*\(max-width:\s*575\.98px\)\s*\{[\s\S]*#section-people\s+\.people-widget\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'people grid should use one column on narrow phones');
assert(/@media\s*\(max-width:\s*479\.98px\)\s*\{[\s\S]*#section-people\s+\.people-widget\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'people grid should use one column on narrow mobile');
assert(
  authorIndex('content/authors/Huajian Zhang/_index.md') > authorIndex('content/authors/Daoyu Wang/_index.md')
    && authorIndex('content/authors/Huajian Zhang/_index.md') < authorIndex('content/authors/Yaguo Liu/_index.md'),
  'Huajian Zhang should appear immediately before Yaguo Liu in the master student group',
);
const firstDoctoralPath = authorGroupPaths('在读博士生')
  .map((path) => ({ path, index: authorIndex(path) }))
  .sort((left, right) => left.index.localeCompare(right.index) || left.path.localeCompare(right.path))[0]?.path;
assert(firstDoctoralPath === 'content/authors/Qingyang Mao/_index.md', 'Qingyang Mao should appear first in the doctoral student group');
assert(authorGroupPaths('学生成员').length === 0, 'people profiles should not use the old student group after doctoral/master split');

const menus = read('config/_default/menus.yaml');
for (const label of ['动态发布', '师生成员', '研究方向', '论文列表', '开源项目', '系统研发', '代码仓库']) {
  assert(new RegExp(`name:\\s*${label}`).test(menus), `main menu should use Chinese label: ${label}`);
}
assert(!/name:\s*(News|People|Research|Publications|Projects|Repository)\b/.test(menus), 'main menu labels should not remain English');
assert(/name:\s*开源项目\s*\n\s*url:\s*open-source/.test(menus), 'main menu should link Open Source Projects to the local open-source page');

for (const [path, title] of [
  ['content/post/_index.md', '新闻'],
  ['content/people/index.md', '成员'],
  ['content/research/_index.md', '研究方向'],
  ['content/publication/_index.md', '论文'],
  ['content/open-source/_index.md', '开源项目'],
  ['content/project/_index.md', '项目'],
]) {
  assert(fs.existsSync(path), `${path} should exist`);
  if (fs.existsSync(path)) {
    assert(new RegExp(`title:\\s*${title}`).test(read(path)), `${path} should use the Chinese section title ${title}`);
  }
}

const openSourceIndexPath = 'content/open-source/_index.md';
assert(fs.existsSync(openSourceIndexPath), 'open-source page should exist');
if (fs.existsSync(openSourceIndexPath)) {
  const openSourceIndex = read(openSourceIndexPath);
  assert(/summary:\s*['"].+['"]/.test(openSourceIndex), 'open-source page should define a concise summary');
  assert(/source_url:\s*https:\/\/github\.com\/USTCAGI/.test(openSourceIndex), 'open-source page should record the source GitHub page');
  assert((openSourceIndex.match(/^\s+- title:/gm) || []).length >= 8, 'open-source page should include at least eight project cards copied from GitHub');
  for (const repo of [
    'Awesome-Papers-Retrieval-Augmented-Generation',
    'CRAG-in-KDD-Cup2024',
    'Awesome-Papers-Time-Series-Forecasting',
    'Awesome-LLM-Table-Mining',
    'PruningRAG',
    'KeyanGPT',
    'Bingjian',
    'OpenTS',
  ]) {
    assert(openSourceIndex.includes(`https://github.com/USTCAGI/${repo}`), `open-source page should include repository: ${repo}`);
  }
}

const openSourceListPath = 'layouts/open-source/list.html';
assert(fs.existsSync(openSourceListPath), 'open-source section should use a dedicated list layout');
if (fs.existsSync(openSourceListPath)) {
  const openSourceList = read(openSourceListPath);
  assert(/opensource-hero/.test(openSourceList), 'open-source layout should render a page hero');
  assert(/opensource-card-grid/.test(openSourceList), 'open-source layout should render repository cards in a grid');
  assert(/opensource-card-meta/.test(openSourceList), 'open-source layout should render repository metadata');
  assert(/Params\.projects/.test(openSourceList), 'open-source layout should render projects from front matter');
}
assert(/\.opensource-hero\s*\{/.test(scss), 'open-source page should have scoped hero CSS');
assert(/\.opensource-card-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'open-source cards should use a three-column desktop grid');
assert(/\.opensource-card\s*\{[\s\S]*border-radius:\s*8px/.test(scss), 'open-source cards should match the site card radius');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.opensource-card-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'open-source cards should stack on mobile');

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
const relatedProjectsBlock = between(researchIndex, /^related_projects:\s*$/m, /^\s*# Listing view/m);
assert(/summary:\s*['"].+['"]/.test(researchIndex), 'research index should define a concise page summary');
assert(/highlights:\s*\n(?:\s+-\s+.+\n){4,}/.test(researchIndex), 'research index should define four overview highlights');
assert(/pillars:\s*\n(?:\s+-\s+title:\s*['"]?.+['"]?\n\s+text:\s*['"]?.+['"]?\n){4,}/.test(researchIndex), 'research index should define four research focus modules');
for (const moduleTitle of researchFocusModules) {
  assert(researchIndex.includes(moduleTitle), `research index should include ${moduleTitle}`);
}
assert(/applications:\s*\n(?:\s+-\s+.+\n){4,}/.test(researchIndex), 'research index should define representative application scenarios');
assert((relatedProjectsBlock.match(/^\s+-\s+title:/gm) || []).length === 3, 'research index should define three related project links');
for (const url of [
  'https://agentr1.github.io/',
  'https://ustc-time-series.github.io/',
  'https://ustcagi-sci.github.io/',
]) {
  assert(researchIndex.includes(`url: "${url}"`), `research index should include related project URL: ${url}`);
}

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
  assert(/Params\.related_projects/.test(researchList), 'research layout should render related project links from front matter');
  assert(/research-related-grid/.test(researchList), 'research layout should render related project cards in a grid');
  assert(!/research-direction-media/.test(researchList), 'research direction cards should not render image media blocks');
  assert(!/partial\s+"blox-core\/functions\/get_featured_image\.html"/.test(researchList), 'research direction cards should not load featured images');
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

for (const [path, weight] of [
  ['content/research/agent/index.md', 10],
  ['content/research/context/index.md', 20],
  ['content/research/science/index.md', 30],
  ['content/research/structured/index.md', 40],
  ['content/research/recommendation/index.md', 50],
]) {
  assert(new RegExp(`weight:\\s*${weight}\\b`).test(read(path)), `${path} should define homepage ordering weight ${weight}`);
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
assert(/\.research-related-grid\s*\{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/.test(scss), 'research related project links should use a three-column desktop grid');
assert(/\.research-related-card\s*\{[\s\S]*border-radius:\s*8px/.test(scss), 'research related project cards should match the site card radius');
assert(/@media\s*\(max-width:\s*991\.98px\)\s*\{[\s\S]*\.research-pillar-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'research pillars should stack on tablets');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.research-direction-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'research direction grid should collapse to one column on mobile');
assert(/@media\s*\(max-width:\s*767\.98px\)\s*\{[\s\S]*\.research-related-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/.test(scss), 'research related project links should stack on mobile');

for (const path of [
  'content/authors/Mingfan Pan/_index.md',
  'content/authors/Linjie Wu/_index.md',
  'content/authors/Yuqian Wang/_index.md',
  'content/authors/Ruikun Cai/_index.md',
  'content/authors/Yuren Zhang/_index.md',
  'content/authors/Hefu Zhang/_index.md',
]) {
  assert(/user_groups:\s*\[\]/.test(read(path)), `${path} should be hidden from the People page`);
}

for (const path of [
  'content/authors/Qingyang Mao/_index.md',
  'content/authors/Zhiding Liu/_index.md',
  'content/authors/Xiaoyu Tao/_index.md',
  'content/authors/Zirui Liu/_index.md',
  'content/authors/Jintao Zhang/_index.md',
  'content/authors/Jiawei Cao/_index.md',
]) {
  assert(authorHasGroup(path, '在读博士生'), `${path} should be listed as a doctoral student`);
}

for (const path of [
  'content/authors/Li Li/_index.md',
  'content/authors/Tingyue Pan/_index.md',
  'content/authors/Jie Ma/_index.md',
  'content/authors/Shilong Zhang/_index.md',
  'content/authors/Yitong Zhou/_index.md',
  'content/authors/Yupeng Li/_index.md',
  'content/authors/Xiaohan Zhang/_index.md',
  'content/authors/Panjing He/_index.md',
  'content/authors/Qingchuan Li/_index.md',
  'content/authors/Jiahao Wang/_index.md',
  'content/authors/Shuo Yu/_index.md',
  'content/authors/Daoyu Wang/_index.md',
  'content/authors/Huajian Zhang/_index.md',
  'content/authors/Yaguo Liu/_index.md',
  'content/authors/Yiju Zhang/_index.md',
  'content/authors/Mingxuan Zhao/_index.md',
]) {
  assert(authorHasGroup(path, '在读硕士生'), `${path} should be listed as a master student`);
}
for (const path of [
  'content/authors/Jintao Zhang/_index.md',
  'content/authors/Jiawei Cao/_index.md',
]) {
  const profile = read(path);
  assert(!authorHasGroup(path, '在读硕士生'), `${path} should not remain in the master student group`);
  assert(/^role:\s*Ph\.D\. Student\s*$/m.test(profile), `${path} should show Ph.D. Student as the role`);
  assert(/^admission_year:\s*2026\s*$/m.test(profile), `${path} should be marked as a 2026 doctoral student`);
}

for (const path of [
  'content/authors/Tian Gao/_index.md',
  'content/authors/Chuan Jiang/_index.md',
  'content/authors/Huibo Xu/_index.md',
  'content/authors/Yucong Luo/_index.md',
  'content/authors/Jie Ouyang/_index.md',
  'content/authors/Jiaying Lin/_index.md',
  'content/authors/Yiming Zhou/_index.md',
]) {
  assert(/user_groups:\s*\n\s+-\s*历届同学/.test(read(path)), `${path} should be listed as a historical member`);
}
for (const path of authorGroupPaths('历届同学')) {
  const graduationDestinationOverrides = new Map([
    ['content/authors/Hao Zhang/_index.md', 'Bytedance'],
    ['content/authors/Yucong Luo/_index.md', 'Bytedance'],
    ['content/authors/Jie Ouyang/_index.md', 'Bytedance'],
    ['content/authors/Huijie Liu/_index.md', 'Shenzhen University'],
    ['content/authors/Jiqian Yang/_index.md', 'Tsinghua University'],
    ['content/authors/Rujiao Zhang/_index.md', 'Ant Finance Group'],
    ['content/authors/Chuan Jiang/_index.md', 'iFlyTek'],
  ]);
  const expectedDestination = graduationDestinationOverrides.get(path) || '待定';
  assert(new RegExp(`^graduation_destination:\\s*["']${expectedDestination}["']\\s*$`, 'm').test(read(path)), `${path} should define graduation destination ${expectedDestination}`);
}

for (const path of [
  'content/authors/Xingpeng Gao/_index.md',
  'content/authors/Zhuang Zhang/_index.md',
  'content/authors/Yucong Wu/_index.md',
  'content/authors/Bokai Pan/_index.md',
  'content/authors/Ze Guo/_index.md',
]) {
  const author = read(path);
  assert(/role:\s*Undergraduate Student/.test(author), `${path} should use Undergraduate Student role`);
  assert(/user_groups:\s*\n\s+-\s*本科生同学/.test(author), `${path} should be listed as an undergraduate member`);
}

const yucongWu = read('content/authors/Yucong Wu/_index.md');
assert(/title:\s*Yucong Wu/.test(yucongWu), 'Yucong Wu profile should define the display name');
assert(
  /interests:\s*\n\s+-\s*Time Series Anomaly Detection\s*\n\s+-\s*Agentic AI\s*\n\s+-\s*LLMs/.test(yucongWu),
  'Yucong Wu profile should list Time Series Anomaly Detection, Agentic AI, LLMs',
);
assert(fs.existsSync('content/authors/Yucong Wu/avatar.jpg'), 'Yucong Wu profile should include the provided avatar image');

const zhuangZhang = read('content/authors/Zhuang Zhang/_index.md');
assert(
  /interests:\s*\n\s+-\s*LLMs and Agent\s*\n\s+-\s*Time Series Cognition/.test(zhuangZhang),
  'Zhuang Zhang profile should list LLMs and Agent, Time Series Cognition',
);
const undergraduateOrder = authorGroupPaths('本科生同学')
  .map((path) => ({ path, index: authorIndex(path) }))
  .sort((left, right) => left.index.localeCompare(right.index) || left.path.localeCompare(right.path))
  .map(({ path }) => path);
const yucongUndergradIndex = undergraduateOrder.indexOf('content/authors/Yucong Wu/_index.md');
const zhuangUndergradIndex = undergraduateOrder.indexOf('content/authors/Zhuang Zhang/_index.md');
assert(
  yucongUndergradIndex !== -1 && zhuangUndergradIndex === yucongUndergradIndex + 1,
  'Yucong Wu should appear immediately before Zhuang Zhang in the undergraduate group',
);
const bokaiPan = read('content/authors/Bokai Pan/_index.md');
assert(
  /interests:\s*\n\s+-\s*Time Series Analysis\s*\n\s+-\s*Agentic AI/.test(bokaiPan),
  'Bokai Pan profile should list Time Series Analysis, Agentic AI',
);
const zeGuo = read('content/authors/Ze Guo/_index.md');
assert(
  /interests:\s*\n\s+-\s*LLMs\s*\n\s+-\s*Agentic AI\s*\n\s+-\s*AI for Science/.test(zeGuo),
  'Ze Guo profile should list LLMs, Agentic AI, AI for Science',
);
const xingpengGao = read('content/authors/Xingpeng Gao/_index.md');
assert(
  /interests:\s*\n\s+-\s*Slow-thinking Reasoning\s*\n\s+-\s*Agentic AI\s*\n\s+-\s*Time Series Analysis/.test(xingpengGao),
  'Xingpeng Gao profile should list Slow-thinking Reasoning, Agentic AI, Time Series Analysis',
);
const shilongZhang = read('content/authors/Shilong Zhang/_index.md');
assert(
  /interests:\s*\n\s+-\s*Time Series Analysis\s*\n\s+-\s*Deep Learning/.test(shilongZhang),
  'Shilong Zhang profile should list Time Series Analysis, Deep Learning',
);
const yitongZhou = read('content/authors/Yitong Zhou/_index.md');
assert(
  /interests:\s*\n\s+-\s*LLMs and Agentic AI\s*\n\s+-\s*Structured Data Mining\s*\n\s+-\s*AI for Science/.test(yitongZhou),
  'Yitong Zhou profile should list LLMs and Agentic AI, Structured Data Mining, AI for Science',
);
const tianGao = read('content/authors/Tian Gao/_index.md');
assert(
  /social:\s*\n\s+-\s*icon:\s*envelope\s*\n\s+icon_pack:\s*fas\s*\n\s+link:\s*["']mailto:ustc25gt@mail\.ustc\.edu\.cn["']/.test(tianGao),
  'Tian Gao profile should expose an email envelope link',
);
assert(/email:\s*["']ustc25gt@mail\.ustc\.edu\.cn["']/.test(tianGao), 'Tian Gao profile should include email metadata');

const heroPartialPath = 'layouts/partials/blocks/hero.html';
assert(fs.existsSync(heroPartialPath), 'local hero partial should render configured image alt text');
if (fs.existsSync(heroPartialPath)) {
  const heroPartial = read(heroPartialPath);
  assert(/content\.image\.alt/.test(heroPartial), 'hero partial should read content.image.alt');
  assert(/content\.image\.slides/.test(heroPartial), 'hero partial should render configured hero carousel slides');
  assert(/hero-carousel/.test(heroPartial), 'hero partial should render a carousel shell');
  assert(/hero-carousel-slide/.test(heroPartial), 'hero partial should render individual carousel slides');
  assert(/hero-carousel-dot/.test(heroPartial), 'hero partial should render accessible carousel dot controls');
  assert(/setInterval/.test(heroPartial), 'hero carousel should auto-advance without external JavaScript dependencies');
  assert(/prefers-reduced-motion/.test(heroPartial), 'hero carousel script should respect reduced motion preferences');
}

for (const path of ['content/project/writelearn/index.md']) {
  const text = read(path);
  const body = text.split('---').slice(2).join('---');
  assert(!/^\s*https?:\/\/\S+\s*$/m.test(body), `${path} should not render a naked project URL`);
  assert(/\[访问系统\]\(https:\/\/[^)]+\)/.test(body), `${path} should expose a reachable HTTPS project URL as a labelled action`);
}

for (const path of [
  'content/project/chuandao/index.md',
  'content/project/thesis/index.md',
]) {
  assert(!fs.existsSync(path), `${path} should remain removed from the project listing`);
}

for (const path of [
  'content/project/bingjian/index.md',
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
