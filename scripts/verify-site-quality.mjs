import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const failures = [];

const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

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
assert(/org_name:\s*['"]USTC AGI Research Group['"]/.test(params), 'org_name should identify the research group');
assert(/font_size:\s*M/.test(params), 'font size should be set to M for denser research pages');

const hugo = read('config/_default/hugo.yaml');
assert(/defaultContentLanguage:\s*zh/.test(hugo), 'default content language should be Chinese');
assert(/hasCJKLanguage:\s*true/.test(hugo), 'CJK language support should be enabled');

const languages = read('config/_default/languages.yaml');
assert(/^zh:/m.test(languages), 'languages.yaml should define zh as the default language');
assert(/languageCode:\s*zh-Hans/.test(languages), 'languageCode should be zh-Hans');

const home = read('content/_index.md');
assert(/title:\s*Agentic Intelligence Research at USTC/.test(home), 'hero should have a visible title');
assert(/alt:\s*USTC AGI Research Group welcome graphic/.test(home), 'hero image should include alt text');
assert(/title:\s*Selected Publications/.test(home), 'homepage should surface recent publications');
assert(!/title:\s*Latest News/.test(home), 'stale news section should not be labelled Latest News');
for (const id of ['hero', 'research', 'projects', 'selected-publications', 'news-highlights', 'related-links']) {
  assert(new RegExp(`id:\\s*${id}`).test(home), `homepage section should define stable id: ${id}`);
}

const heroPartialPath = 'layouts/partials/blocks/hero.html';
assert(fs.existsSync(heroPartialPath), 'local hero partial should render configured image alt text');
if (fs.existsSync(heroPartialPath)) {
  const heroPartial = read(heroPartialPath);
  assert(/content\.image\.alt/.test(heroPartial), 'hero partial should read content.image.alt');
}

for (const path of [
  'content/project/writelearn/index.md',
  'content/project/bingjian/index.md',
  'content/project/chuandao/index.md',
  'content/project/thesis/index.md',
]) {
  const text = read(path);
  const body = text.split('---').slice(2).join('---');
  assert(!/^\s*https?:\/\/\S+\s*$/m.test(body), `${path} should not render a naked project URL`);
  assert(/\[访问系统\]\(https?:\/\/[^)]+\)/.test(body), `${path} should expose the project URL as a labelled action`);
}

if (failures.length) {
  console.error('Site quality checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Site quality checks passed.');
