export function calculateScore(rank, winrate, wins) {
  const r = (Math.min(rank, 30) - 1) / 29;
  const a = wins / 10;
  const arena = 65 * a;
  const experience = 25 * r;
  const career = 10 * (winrate / 100) * (0.5 + 0.5 * r);
  return { arena, experience, career, total: arena + experience + career };
}
