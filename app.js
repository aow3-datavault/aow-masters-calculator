import { calculateScore } from './score.js';

const defaults = [[20, 60, 7], [30, 50, 5]];
const bounds = [[1, 30], [0, 100], [0, 10]];
const keys = ['rank', 'winrate', 'wins'];
const params = new URLSearchParams(location.search);
const values = defaults.map((player, index) => player.map((fallback, field) => {
  const raw = params.get(`${keys[field]}${index + 1}`);
  const value = raw === null || raw.trim() === '' ? NaN : Number(raw);
  return Number.isFinite(value) ? Math.round(Math.max(bounds[field][0], Math.min(bounds[field][1], value))) : fallback;
}));
const format = value => value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const labels = ['Ранг игрока', 'Текущий винрейт', 'Победы на Арене'];
const suffixes = ['', '<small>%</small>', '<small> / 10</small>'];
const endpoints = [['1-й ранг', '30-й ранг'], ['0%', '100%'], ['0 побед', '10 побед']];
const players = document.querySelector('#players');

players.innerHTML = values.map((player, index) => `<article class="player ${index ? 'second' : ''}" aria-labelledby="player-${index}">
  <div class="player-heading"><h3 id="player-${index}">Игрок ${index + 1}</h3><span>0${index + 1} / MASTERS</span></div>
  <div class="score-row"><output class="score" id="score-${index}" aria-label="Итоговый балл игрока ${index + 1}"></output><small>квалификационный<br>балл</small></div>
  <p class="score-caption">Вклад в балл · максимум 83,75</p>
  <div class="stack" aria-hidden="true"><span class="arena"></span><span class="experience"></span><span class="career"></span></div>
  <div class="breakdown"><span>Арена <b></b></span><span>Ранг <b></b></span><span>Винрейт <b></b></span></div>
  ${player.map((value, field) => `<div class="metric"><div class="metric-head"><label for="${keys[field]}-${index}">${labels[field]}</label><output class="metric-value" for="${keys[field]}-${index}" id="value-${index}-${field}"></output></div><input type="range" id="${keys[field]}-${index}" min="${bounds[field][0]}" max="${bounds[field][1]}" step="1" value="${value}" data-player="${index}" data-field="${field}"><div class="range-ends"><span>${endpoints[field][0]}</span><span>${endpoints[field][1]}</span></div>${field === 1 ? '<p class="metric-note">За последние 50 боёв, как в профиле игрока.</p>' : ''}</div>`).join('')}
</article>`).join('');

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
  document.querySelector('#comparison-note').textContent = tied ? 'Баллы игроков равны.' : `У игрока ${delta > 0 ? 1 : 2} балл выше.`;
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
  values.forEach((player, index) => player.forEach((value, field) => url.searchParams.set(`${keys[field]}${index + 1}`, value)));
  const status = document.querySelector('#share-status');
  try {
    await navigator.clipboard.writeText(url.href);
    status.textContent = 'Ссылка скопирована';
    console.debug('[Masters] Comparison link copied');
  } catch {
    history.replaceState(null, '', url);
    status.textContent = 'Скопируйте ссылку из адресной строки';
    console.info('[Masters] Clipboard unavailable; comparison saved in URL');
  }
});

render();
console.debug('[Masters] Calculator ready');
