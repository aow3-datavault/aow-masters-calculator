import { calculateScore } from './score.js';
import { messages, englishContent } from './i18n.js?v=5';

const defaults = [[20, 60, 7], [30, 50, 5]];
const bounds = [[1, 30], [0, 100], [0, 10]];
const keys = ['rank', 'winrate', 'wins'];
const params = new URLSearchParams(location.search);
const values = defaults.map((player, index) => player.map((fallback, field) => {
  const raw = params.get(`${keys[field]}${index + 1}`);
  const value = raw === null || raw.trim() === '' ? NaN : Number(raw);
  return Number.isFinite(value) ? Math.round(Math.max(bounds[field][0], Math.min(bounds[field][1], value))) : fallback;
}));
let language = 'ru';
try {
  language = localStorage.getItem('masters-language') === 'en' ? 'en' : 'ru';
} catch {
  console.info('[Masters] Language storage unavailable');
}
if (['ru', 'en'].includes(params.get('lang'))) language = params.get('lang');
let t = messages[language];
const russianContent = new Map(Object.keys(englishContent).map(selector => [selector, document.querySelector(selector)?.innerHTML]));
const format = value => value.toLocaleString(language === 'en' ? 'en-US' : 'ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const suffixes = ['', '<small>%</small>', '<small> / 10</small>'];
const players = document.querySelector('#players');

function buildPlayers() {
players.innerHTML = values.map((player, index) => `<article class="player ${index ? 'second' : ''}" aria-labelledby="player-${index}">
  <div class="player-heading"><h3 id="player-${index}">${t.player} ${index + 1}</h3><span>0${index + 1} / MASTERS</span></div>
  <div class="score-row"><output class="score" id="score-${index}" aria-label="${t.scoreAria} ${index + 1}"></output><small>${t.scoreLabel}</small></div>
  <p class="score-caption">${t.caption}</p>
  <div class="stack" aria-hidden="true"><span class="arena"></span><span class="experience"></span><span class="career"></span></div>
  <div class="breakdown">${t.parts.map(part => `<span>${part} <b></b></span>`).join('')}</div>
  ${player.map((value, field) => `<div class="metric"><div class="metric-head"><label for="${keys[field]}-${index}">${t.labels[field]}</label><output class="metric-value" for="${keys[field]}-${index}" id="value-${index}-${field}"></output></div><input type="range" id="${keys[field]}-${index}" min="${bounds[field][0]}" max="${bounds[field][1]}" step="1" value="${value}" data-player="${index}" data-field="${field}"><div class="range-ends"><span>${t.endpoints[field][0]}</span><span>${t.endpoints[field][1]}</span></div>${field === 1 ? `<p class="metric-note">${t.winrateNote}</p>` : ''}</div>`).join('')}
</article>`).join('');
}

function render() {
  const scores = values.map(player => calculateScore(...player));
  values.forEach((player, index) => {
    const card = players.children[index];
    document.querySelector(`#score-${index}`).textContent = format(scores[index].total);
    player.forEach((value, field) => {
      document.querySelector(`#value-${index}-${field}`).innerHTML = `${value}${suffixes[field]}`;
      document.querySelector(`#${keys[field]}-${index}`).value = value;
    });
    ['arena', 'experience', 'career'].forEach((key, part) => {
      card.querySelector(`.stack .${key}`).style.width = `${scores[index][key] / 83.75 * 100}%`;
      card.querySelectorAll('.breakdown b')[part].textContent = format(scores[index][key]);
    });
  });
  const delta = scores[0].total - scores[1].total;
  const tied = Math.abs(delta) < 1e-9;
  document.querySelector('#difference').textContent = `${tied ? '' : '+'}${format(Math.abs(delta))}`;
  document.querySelector('#difference').style.color = tied ? 'var(--text)' : delta > 0 ? 'var(--cyan)' : 'var(--gold)';
  document.querySelector('#comparison-note').textContent = tied ? t.tied : t.leader.replace('{player}', delta > 0 ? 1 : 2);
}

players.addEventListener('input', event => {
  if (!event.target.matches('input[type=range]')) return;
  values[Number(event.target.dataset.player)][Number(event.target.dataset.field)] = Number(event.target.value);
  document.querySelector('#share-status').textContent = '';
  render();
});

document.querySelector('#reset').addEventListener('click', () => {
  defaults.forEach((player, index) => values[index] = [...player]);
  document.querySelector('#share-status').textContent = '';
  render();
  console.debug('[Masters] Comparison reset');
});

document.querySelector('#share').addEventListener('click', async () => {
  const url = new URL(location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('lang', language);
  values.forEach((player, index) => player.forEach((value, field) => url.searchParams.set(`${keys[field]}${index + 1}`, value)));
  const status = document.querySelector('#share-status');
  try {
    await navigator.clipboard.writeText(url.href);
    status.textContent = t.copied;
    console.debug('[Masters] Comparison link copied');
  } catch {
    history.replaceState(null, '', url);
    status.textContent = t.copyFallback;
    console.info('[Masters] Clipboard unavailable; comparison saved in URL');
  }
});

function setLanguage(next, persist = true) {
  language = next;
  t = messages[language];
  document.documentElement.lang = language;
  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  document.querySelector('section[aria-label]').setAttribute('aria-label', t.calculatorAria);
  for (const [selector, english] of Object.entries(englishContent)) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = language === 'en' ? english : russianContent.get(selector);
  }
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  document.querySelector('#share-status').textContent = '';
  buildPlayers();
  render();
  if (persist) {
    try {
      localStorage.setItem('masters-language', language);
    } catch {
      console.info('[Masters] Language preference could not be saved');
    }
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  }
  console.debug('[Masters] Language selected:', language);
}

document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
setLanguage(language, false);
console.debug('[Masters] Calculator ready');
