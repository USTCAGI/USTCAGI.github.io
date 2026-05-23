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

const scss = read('assets/scss/template.scss');
const cardBlock = between(scss, /^\.card-simple\s*\{/m, /^\}/m);
assert(!/height:\s*100%\s*;/.test(cardBlock), 'card-simple must not force global height: 100%');
assert(/border-radius:\s*8px\s*;/.test(cardBlock), 'card-simple should use an 8px radius');
assert(/-webkit-line-clamp:\s*4\s*;/.test(scss), 'card summaries should be clamped to four lines');

const params = read('config/_default/params.yaml');
assert(!/highly-customizable Hugo research group theme/i.test(params), 'SEO description must not use template copy');
assert(!/GetResearchDev/.test(params), 'Twitter metadata must not use template account');
assert(!/<username>\/<repository>/.test(params), 'repository URL must not use template placeholder');
assert(/org_name:\s*['"]中国科大 AGI 研究组['"]/.test(params), 'org_name should identify the research group in Chinese');
assert(/date_format:\s*['"]2006年1月2日['"]/.test(params), 'site date format should use Chinese year-month-day order');
assert(/address_format:\s*zh-cn/.test(params), 'address format should match the Chinese default language');
assert(/font_size:\s*M/.test(params), 'font size should be set to M for denser research pages');

const hugo = read('config/_default/hugo.yaml');
assert(/defaultContentLanguage:\s*zh/.test(hugo), 'default content language should be Chinese');
assert(/hasCJKLanguage:\s*true/.test(hugo), 'CJK language support should be enabled');
assert(/title:\s*中国科大 AGI 研究组/.test(hugo), 'site title should be Chinese');

const languages = read('config/_default/languages.yaml');
assert(/^zh:/m.test(languages), 'languages.yaml should define zh as the default language');
assert(/languageCode:\s*zh-Hans/.test(languages), 'languageCode should be zh-Hans');
assert(/title:\s*中国科大 AGI 研究组/.test(languages), 'default language title should be Chinese');

const home = read('content/_index.md');
assert(/title:\s*中国科大 AGI 研究组/.test(home), 'homepage should use a Chinese title');
assert(/alt:\s*中国科大 AGI 研究组首页图/.test(home), 'hero image should include Chinese alt text');
assert(/title:\s*代表论文/.test(home), 'homepage should surface recent publications with a Chinese title');
assert(!/title:\s*Latest News/.test(home), 'stale news section should not be labelled Latest News');
assert(!/title:\s*(Research|Selected Publications|News Highlights|Related Links)\b/.test(home), 'homepage section titles should be Chinese');
for (const id of ['hero', 'research', 'selected-publications', 'news-highlights', 'related-links']) {
  assert(new RegExp(`id:\\s*${id}`).test(home), `homepage section should define stable id: ${id}`);
}
assert(!/id:\s*projects/.test(home), 'homepage should not render the Projects section');

const menus = read('config/_default/menus.yaml');
for (const label of ['新闻', '成员', '研究方向', '论文', '项目', '代码仓库']) {
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

if (failures.length) {
  console.error('Site quality checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Site quality checks passed.');
