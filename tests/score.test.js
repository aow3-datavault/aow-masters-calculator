import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScore } from '../score.js';

test('ten wins at rank 30 and 100% win rate give 100', () => {
  assert.equal(calculateScore(30, 100, 10).total, 100);
});

test('zero wins at rank one and zero win rate give zero', () => {
  assert.equal(calculateScore(1, 0, 0).total, 0);
});

test('five wins at rank one and 50% career wins give 35', () => {
  assert.equal(calculateScore(1, 50, 5).total, 35);
});

test('rank above 30 is capped', () => {
  assert.deepEqual(calculateScore(35, 60, 7), calculateScore(30, 60, 7));
});

test('every extra arena win adds 6.5 points', () => {
  for (let rank = 1; rank <= 30; rank++) {
    for (let wins = 0; wins < 10; wins++) {
      assert.ok(Math.abs(calculateScore(rank, 63, wins + 1).total - calculateScore(rank, 63, wins).total - 6.5) < 1e-10);
    }
  }
});

test('arena awards no points for zero wins even at the highest rank', () => {
  const result = calculateScore(30, 100, 0);
  assert.equal(result.arena, 0);
  assert.equal(result.total, 35);
});

test('ten wins contribute the full 65 arena points', () => {
  const result = calculateScore(1, 0, 10);
  assert.equal(result.arena, 65);
  assert.equal(result.total, 65);
});
