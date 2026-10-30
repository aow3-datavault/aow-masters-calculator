export const messages = {
  "ru": {
    "player": "Игрок",
    "scoreAria": "Итоговый балл игрока",
    "scoreLabel": "квалификационный<br>балл",
    "caption": "Вклад в балл · максимум 83,75",
    "labels": [
      "Ранг игрока",
      "Текущий винрейт",
      "Победы на Арене"
    ],
    "parts": [
      "Арена",
      "Ранг",
      "Винрейт"
    ],
    "endpoints": [
      [
        "1-й ранг",
        "30-й ранг"
      ],
      [
        "0%",
        "100%"
      ],
      [
        "0 побед",
        "10 побед"
      ]
    ],
    "winrateNote": "За последние 50 боёв, как в профиле игрока.",
    "tied": "Баллы игроков равны.",
    "leader": "У игрока {player} балл выше.",
    "copied": "Ссылка скопирована",
    "copyFallback": "Скопируйте ссылку из адресной строки",
    "title": "Masters — калькулятор квалификации | Art of War 3",
    "description": "Сравните квалификационные баллы Art of War Masters: ранг, текущий винрейт за последние 50 боёв и победы в первых 10 боях Арены.",
    "calculatorAria": "Калькулятор и сравнение"
  },
  "en": {
    "player": "Player",
    "scoreAria": "Total score for player",
    "scoreLabel": "qualification<br>score",
    "caption": "Score breakdown · maximum 83.75",
    "labels": [
      "Player rank",
      "Current win rate",
      "Arena wins"
    ],
    "parts": [
      "Arena",
      "Rank",
      "Win rate"
    ],
    "endpoints": [
      [
        "Rank 1",
        "Rank 30"
      ],
      [
        "0%",
        "100%"
      ],
      [
        "0 wins",
        "10 wins"
      ]
    ],
    "winrateNote": "Last 50 battles, as shown in your profile.",
    "tied": "The players have equal scores.",
    "leader": "Player {player} has the higher score.",
    "copied": "Link copied",
    "copyFallback": "Copy the link from the address bar",
    "title": "Masters — qualification calculator | Art of War 3",
    "description": "Compare Art of War Masters qualification scores using player rank, current win rate over the last 50 battles and wins in the first 10 Arena battles.",
    "calculatorAria": "Calculator and comparison"
  }
};

export const englishContent = {
  "#title": "Masters calculator",
  ".lead": "Calculate your qualification score using your rank, current win rate and wins in your first 10 Arena battles.",
  "#comparison-title": "Compare players",
  "#reset": "Reset ↺",
  ".comparison .eyebrow": "SCORE DIFFERENCE",
  ".share-row p": "Save this comparison or share it with a friend.",
  "#share": "Copy link ↗",
  "#how-title": "Qualification score",
  ".score-intro": "The qualification score is used to compare players’ results in the qualifiers. It combines three factors:",
  ".explanation .section-head .eyebrow": "WEIGHTS 65 / 25 / 10",
  ".weights article:nth-child(1) h3": "Arena results",
  ".weights article:nth-child(1) p": "The main contribution. Results are smoothed so that a short series is not treated as a definitive measure of skill.",
  ".weights article:nth-child(2) h3": "Player rank",
  ".weights article:nth-child(2) p": "Higher ranks earn more points for experience. Rank is capped at 30 for this calculation.",
  ".weights article:nth-child(3) h3": "Current win rate",
  ".weights article:nth-child(3) p": "Your win percentage over the last 50 battles, as shown in your profile. Its contribution increases with rank: a 100% win rate adds between 5 and 10 points.",
  "summary": "View the formula and an example",
  ".formula p:nth-child(1)": "<strong>S = 65A + 25R + 10W × (0.5 + 0.5R)</strong>",
  ".formula p:nth-child(2)": "R = (min(rank, 30) − 1) / 29 · W = current win rate / 100",
  ".formula p:nth-child(3)": "A = 0.25 + 0.05 × wins in the first 10 Arena battles",
  ".formula p:nth-child(4)": "Each extra win in this series adds 3.25 points. With 10 wins, rank 30 and a 100% win rate, the score is <strong>83.75</strong>. The score is not a percentage chance of qualifying.",
  ".formula p:nth-child(5)": "Only the first 10 battles played in the qualifying Arena count towards qualification. Later battles do not affect the score.",
  "#quota-title": "Qualification quotas",
  ".qualification > div:first-child > p:not(.muted)": "Masters has 32 players: 30 qualify through league quotas, and 2 receive invitations from the previous Masters. Each league’s places are split equally between the Confederation and the Resistance. The final roster has 16 players from each faction.",
  ".qualification .muted": "This calculator is for information only and does not guarantee qualification for Masters.",
  "[data-league=\"bronze\"]": "Bronze",
  "[data-league=\"silver\"]": "Silver",
  "[data-league=\"gold\"]": "Gold",
  "[data-league=\"diamond\"]": "Diamond",
  "[data-league=\"star\"]": "Star",
  "[data-league=\"legendary\"]": "Legendary",
  "noscript .notice": "Enable JavaScript in your browser to use the calculator."
};
